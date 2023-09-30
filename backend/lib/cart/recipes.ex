defmodule Cart.Recipes do
  @moduledoc """
  The recipes context.
  """

  import Ecto.Query

  alias Cart.Accounts.User
  alias Cart.Pantry
  alias Cart.Recipes.{Ingredient, Recipe}
  alias Cart.{Pagination, Repo}
  alias Ecto.Multi

  @grocery_trip_shelf_name "Grocery Trip"

  @doc """
  Retrieves a recipe belonging to the given user by its id.

  Each recipe will have its ingredients preloaded in ascending order of
  the time they were created.
  """
  def get_recipe(%User{} = user, id) do
    Recipe
    |> where([r], r.id == ^id and r.user_id == ^user.id)
    |> join(:left, [r], i in Ingredient, on: i.recipe_id == r.id)
    |> preload(:ingredients)
    |> first()
    |> Repo.one()
  end

  @doc """
  Retrieves all ingredients for the given recipe.
  """
  def list_ingredients(%Recipe{} = recipe) do
    Ingredient
    |> where([i], i.recipe_id == ^recipe.id)
    |> order_by([i], i.inserted_at)
    |> Repo.all()
  end

  @doc """
  Retrieves a recipe by its id. Returns `nil` if the recipe does not exist.
  """
  @spec get_recipe(binary() | integer()) :: Recipe.t() | nil
  def get_recipe(id) when is_integer(id) or is_binary(id) do
    Recipe
    |> where([r], r.id == ^id)
    |> Repo.one()
  end

  @doc """
  Retrieves an ingredient by its id.
  """
  def get_ingredient(id) do
    Ingredient
    |> where([i], i.id == ^id)
    |> Repo.one()
  end

  def count_recipes, do: Repo.aggregate(Recipe, :count)

  @doc """
  Retrieves all recipes for the given user.

  ## Options

    * `:limit` - Limits the number of results
    * `:skip` - Skips the first `:skip` results
    * `:query` - Filters results by name
    * `:meal_plan_only` - Will return only recipes that are in the meal plan
    * `:original_only` - Will return only recipes that are not copies

  """
  def list_recipes(%{} = args \\ %{}) do
    Recipe
    |> maybe_for_user(args)
    |> search_by_name(args)
    |> search_by_meal_plan(args)
    |> search_by_original(args)
    |> order_by([s], desc: s.inserted_at)
    |> Pagination.paginate(args)
    |> Repo.all()
  end

  defp maybe_for_user(queryable, %{user_id: user_id}) when not is_nil(user_id),
    do: where(queryable, [s], s.user_id == ^user_id)

  defp maybe_for_user(queryable, _), do: queryable

  defp search_by_name(queryable, %{query: query}) when is_binary(query),
    do: where(queryable, [s], ilike(s.name, ^"%#{query}%"))

  defp search_by_name(queryable, _), do: queryable

  defp search_by_meal_plan(queryable, %{meal_plan_only: true}),
    do: where(queryable, [s], not is_nil(s.meal_plan_multiplier))

  defp search_by_meal_plan(queryable, _), do: queryable

  defp search_by_original(queryable, %{original_only: true}),
    do: where(queryable, [s], is_nil(s.original_id))

  defp search_by_original(queryable, _), do: queryable

  @doc """
  Calculates and returns all grocery list items for the given user.
  """
  def list_grocery_list_items(%User{} = user) do
    Ingredient
    |> join(:left, [i], r in Recipe, on: r.id == i.recipe_id)
    |> where([i, r], i.user_id == ^user.id and not is_nil(r.meal_plan_multiplier))
    |> preload(:recipe)
    |> Repo.all()
    |> filter_by_not_in_pantry(user)
    |> Enum.reduce(%{}, fn ingredient, acc ->
      ingredient_name = String.downcase(ingredient.name)
      existing = Map.get(acc, ingredient_name, %{uses: []})

      Map.put(acc, ingredient_name, %{
        id: ingredient.id,
        name: ingredient_name,
        uses:
          existing.uses ++
            [
              %{
                id: ingredient.recipe.id,
                amount: ingredient.amount,
                recipe_name: ingredient.recipe.name,
                multiplier: ingredient.recipe.meal_plan_multiplier
              }
            ]
      })
    end)
    |> Map.values()
  end

  defp filter_by_not_in_pantry(ingredients, %User{} = user) do
    pantry_items = Pantry.list_items(user)

    ingredients
    |> Enum.filter(fn ingredient ->
      not Enum.any?(pantry_items, fn item -> names_match?(item.name, ingredient.name) end)
    end)
  end

  defp names_match?(a, b) when is_binary(a) and is_binary(b),
    do: String.downcase(a) == String.downcase(b)

  @doc """
  Copies the given recipe, including all ingredients.
  """
  def copy_recipe(%User{} = user, %Recipe{} = recipe) do
    Ecto.Multi.new()
    |> Ecto.Multi.insert(:copy, fn _changes ->
      Recipe.copy_changeset(
        %Recipe{},
        %{
          name: recipe.name,
          total_time: recipe.total_time,
          image_url: recipe.image_url,
          instructions: recipe.instructions,
          user_id: user.id,
          original_id: recipe.id
        }
      )
    end)
    |> Ecto.Multi.insert_all(:ingredient_copies, Ingredient, fn %{copy: copy} ->
      recipe = Repo.preload(recipe, :ingredients)

      Enum.map(recipe.ingredients, fn ingredient ->
        %{
          name: ingredient.name,
          amount: ingredient.amount,
          user_id: user.id,
          recipe_id: copy.id,
          inserted_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second),
          updated_at: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second)
        }
      end)
    end)
    |> Repo.transaction()
  end

  @doc """
  Checks if a recipe has been copied by the given user.
  """
  def copied?(%User{} = user, %Recipe{} = recipe) do
    query = from(r in Recipe, where: r.user_id == ^user.id and r.original_id == ^recipe.id)

    case Repo.aggregate(query, :count) do
      0 -> false
      _ -> true
    end
  end

  @doc """
  Creates a new ingredient.

  ## Examples

      iex> create_ingredient(%{name: value, user_id: user_id, recipe_id: recipe_id})
      {:ok, %Ingredient{}}

      iex> create_ingredient(%{name: value, user_id: invalid_user_id, recipe_id: recipe_id})
      {:error, %Ecto.Changeset{}}

  """
  def create_ingredient(%{} = args) do
    %Ingredient{}
    |> Ingredient.creation_changeset(args)
    |> Repo.insert()
  end

  @doc """
  Creates a new recipe.

  ## Examples

      iex> create_recipe(%{name: value, user_id: user_id})
      {:ok, %Recipe{}}

      iex> create_recipe(%{name: value, user_id: invalid_user_id})
      {:error, %Ecto.Changeset{}}

  """
  def create_recipe(%{} = args) do
    %Recipe{}
    |> Recipe.creation_changeset(args)
    |> Repo.insert()
  end

  @doc """
  Updates an ingredient.
  """
  def update_ingredient(%Ingredient{} = ingredient, %{} = args) do
    ingredient
    |> Ingredient.changeset(args)
    |> Repo.update()
  end

  @doc """
  Updates a recipe, including any ingredients that are passed.
  """
  def update_recipe_with_ingredients(%Recipe{} = recipe, %{} = args) do
    multi = Multi.update(Multi.new(), :recipe, Recipe.changeset(recipe, args))

    ingredients_to_update =
      args
      |> Map.get(:ingredients, [])
      |> Enum.map(fn i -> i.id end)
      |> get_ingredients(recipe)

    args
    |> Map.get(:ingredients, [])
    |> Enum.reduce(multi, fn ingredient_args, multi ->
      ingredients_to_update
      |> Enum.find(fn i -> ids_match(i.id, ingredient_args.id) end)
      |> case do
        %Ingredient{} = ingredient ->
          Multi.update(
            multi,
            {:ingredient, ingredient.id},
            Ingredient.changeset(ingredient, ingredient_args)
          )

        _ ->
          multi
      end
    end)
    |> Repo.transaction()
    |> case do
      {:ok, %{recipe: recipe}} ->
        {:ok, recipe}

      {:error, _failed_operation, failed_value, _changes_so_far} ->
        {:error, failed_value}
    end
  end

  defp ids_match(a, b) when is_integer(a) and is_binary(b), do: Integer.to_string(a) == b
  defp ids_match(a, b) when is_integer(a) and is_integer(b), do: a == b

  @doc """
  Retrieves all ingredients by the given ids.
  """
  def get_ingredients([id | _] = ids, %Recipe{} = recipe) when is_binary(id) do
    Repo.all(from(i in Ingredient, where: i.id in ^ids and i.recipe_id == ^recipe.id))
  end

  def get_ingredients([], %Recipe{}), do: []

  @doc """
  Clears the meal plan multiplier for all recipes belonging
  to the given user.
  """
  def clear_meal_plan(%User{} = user) do
    Recipe
    |> where([s], s.user_id == ^user.id and not is_nil(s.meal_plan_multiplier))
    |> Repo.update_all(set: [meal_plan_multiplier: nil, updated_at: DateTime.utc_now()])
  end

  @doc """
  Deletes a recipe by its id.
  """
  def delete_recipe(id) do
    Recipe
    |> where([r], r.id == ^id)
    |> select([r], r)
    |> Repo.delete_all()
  end

  @doc """
  Deletes an ingredient by its id.
  """
  def delete_ingredient(id) do
    Ingredient
    |> where([i], i.id == ^id)
    |> select([i], i)
    |> Repo.delete_all()
  end

  @doc """
  Checks off an item from the grocery list.
  """
  def check_off_grocery_list_item(%User{} = user, item_name) do
    case Pantry.get_or_create_shelf_by_name(user, @grocery_trip_shelf_name) do
      {:ok, shelf} ->
        Pantry.create_item(%{user_id: user.id, shelf_id: shelf.id, name: item_name})

      error ->
        error
    end
  end
end
