defmodule CartWeb.Resolvers.RecipesResolver do
  import CartWeb.Helpers.Mutations

  alias CartWeb.Abilities
  alias CartWeb.Helpers.Errors
  alias Cart.Accounts.User
  alias Cart.Recipes
  alias Cart.Recipes.{Ingredient, Recipe}

  ## Queries

  def list_recipes(_parent, args, %{context: context}) do
    case Map.get(context, :current_user) do
      %User{} = user ->
        query = Map.get(args, :query)
        meal_plan_only = Map.get(args, :meal_plan_only, false)
        {:ok, Recipes.list_recipes(user, %{query: query, meal_plan_only: meal_plan_only})}

      :unauthorized ->
        Errors.unauthorized()
    end
  end

  def list_ingredients(recipe, _args, _context),
    do: {:ok, Recipes.list_ingredients(recipe)}

  def get_recipe(_parent, %{id: id}, %{context: context}) do
    case Map.get(context, :current_user) do
      %User{} = user ->
        case Recipes.get_recipe(user, id) do
          %Recipe{} = recipe ->
            {:ok, recipe}

          nil ->
            Errors.not_found()
        end

      :unauthorized ->
        Errors.unauthorized()
    end
  end

  def list_grocery_list_items(_parent, _args, %{context: context}) do
    case Map.get(context, :current_user) do
      %User{} = user ->
        {:ok, Recipes.list_grocery_list_items(user)}

      :unauthorized ->
        Errors.unauthorized()
    end
  end

  ## Mutations

  def create_ingredient(_parent, %{input: input}, %{context: context}) do
    user = Map.get(context, :current_user, nil)

    if Abilities.can?(user, :create, %Ingredient{recipe_id: input.recipe_id}) do
      %{
        recipe_id: input.recipe_id,
        user_id: user.id,
        name: input.name,
        amount: input.amount
      }
      |> Recipes.create_ingredient()
      |> mutation_response()
    else
      Errors.unauthorized_mutation()
    end
  end

  def create_recipe(_parent, %{input: input}, %{context: context}) do
    user = Map.get(context, :current_user, nil)

    if Abilities.can?(user, :create, %Recipe{}) do
      %{
        user_id: user.id,
        name: input.name,
        total_time: input.total_time,
        image_url: input.image_url
      }
      |> Recipes.create_recipe()
      |> mutation_response()
    else
      Errors.unauthorized_mutation()
    end
  end

  def update_recipe(_parent, %{input: input}, %{context: context}) do
    user = Map.get(context, :current_user, nil)
    recipe = Recipes.get_recipe(input.id)

    if Abilities.can?(user, :update, recipe) do
      recipe
      |> Recipes.update_recipe_with_ingredients(input)
      |> mutation_response()
    else
      Errors.unauthorized_mutation()
    end
  end

  def update_ingredient(_parent, %{input: input}, %{context: context}) do
    user = Map.get(context, :current_user, nil)
    ingredient = Recipes.get_ingredient(input.id)

    if Abilities.can?(user, :update, ingredient) do
      ingredient
      |> Recipes.update_ingredient(input)
      |> mutation_response()
    else
      Errors.unauthorized_mutation()
    end
  end

  def clear_meal_plan(_parent, _args, %{context: context}) do
    user = Map.get(context, :current_user, nil)

    if Abilities.can?(user, :clear_meal_plan) do
      {n, _} = Recipes.clear_meal_plan(user)
      {:ok, %{success: true, count: n}}
    else
      Errors.unauthorized_mutation()
    end
  end

  def delete_recipe(_parent, %{input: input}, %{context: context}) do
    user = Map.get(context, :current_user, nil)
    recipe = Recipes.get_recipe(input.recipe_id)

    if Abilities.can?(user, :delete, recipe) do
      do_delete_recipe(input.recipe_id)
    else
      Errors.unauthorized_mutation()
    end
  end

  defp do_delete_recipe(recipe_id) do
    case Recipes.delete_recipe(recipe_id) do
      {n, recipes} when n == 1 ->
        mutation_response({:ok, Enum.at(recipes, 0)})

      {n, _} when n == 0 ->
        Errors.not_found()
    end
  end

  def delete_ingredient(_parent, %{input: input}, %{context: context}) do
    user = Map.get(context, :current_user, nil)
    ingredient = Recipes.get_ingredient(input.ingredient_id)

    if Abilities.can?(user, :delete, ingredient) do
      do_delete_ingredient(input.ingredient_id)
    else
      Errors.unauthorized_mutation()
    end
  end

  defp do_delete_ingredient(recipe_id) do
    case Recipes.delete_ingredient(recipe_id) do
      {n, ingredients} when n == 1 ->
        mutation_response({:ok, Enum.at(ingredients, 0)})

      {n, _} when n == 0 ->
        Errors.not_found()
    end
  end

  def check_off_grocery_list_item(_parent, %{input: input}, %{context: context}) do
    user = Map.get(context, :current_user, nil)

    if Abilities.can?(user, :check_off_grocery_list_item) do
      mutation_response(Recipes.check_off_grocery_list_item(user, input.item_name))
    else
      Errors.unauthorized_mutation()
    end
  end
end
