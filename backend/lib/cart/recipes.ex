defmodule Cart.Recipes do
  @moduledoc """
  The recipes context.
  """

  import Ecto.Query

  alias Cart.Accounts.User
  alias Cart.Recipes.{Ingredient, Recipe}
  alias Cart.{Pagination, Repo}
  alias Ecto.Multi

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
  Retrieves a recipe by its id.
  """
  def get_recipe(id) do
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

  @doc """
  Retrieves all recipes for the given user.

  ## Options

    * `:limit` - Limits the number of results
    * `:skip` - Skips the first `:skip` results
    * `:query` - Filters results by name
    * `:meal_plan_only` - Will return only recipes that are in the meal plan

  """
  def list_recipes(%User{} = user, %{} = args \\ %{}) do
    Recipe
    |> where([s], s.user_id == ^user.id)
    |> search_by_name(args)
    |> search_by_meal_plan(args)
    |> order_by([s], desc: s.inserted_at)
    |> Pagination.paginate(args)
    |> Repo.all()
  end

  defp search_by_name(queryable, %{query: query}) when is_binary(query) do
    queryable
    |> where([s], ilike(s.name, ^"%#{query}%"))
  end

  defp search_by_name(queryable, _), do: queryable

  defp search_by_meal_plan(queryable, %{meal_plan_only: true}) do
    queryable
    |> where([s], not is_nil(s.meal_plan_multiplier))
  end

  defp search_by_meal_plan(queryable, _), do: queryable

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
end
