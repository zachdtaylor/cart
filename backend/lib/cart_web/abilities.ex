defmodule CartWeb.Abilities do
  alias Cart.Accounts.User
  alias Cart.Pantry.{PantryItem, PantryShelf}
  alias Cart.Recipes
  alias Cart.Recipes.{Ingredient, Recipe}

  def can?(%User{id: id}, :clear_meal_plan) when is_integer(id), do: true
  def can?(_user, _action), do: false

  def can?(%User{}, :create, %PantryShelf{}), do: true
  def can?(%User{}, :create, %PantryItem{}), do: true
  def can?(%User{}, :create, %Recipe{}), do: true
  def can?(%User{id: user_id}, :update, %Recipe{user_id: user_id}), do: true
  def can?(%User{id: user_id}, :update, %PantryShelf{user_id: user_id}), do: true
  def can?(%User{id: user_id}, :update, %Ingredient{user_id: user_id}), do: true
  def can?(%User{id: user_id}, :delete, %PantryShelf{user_id: user_id}), do: true
  def can?(%User{id: user_id}, :delete, %PantryItem{user_id: user_id}), do: true
  def can?(%User{id: user_id}, :delete, %Recipe{user_id: user_id}), do: true
  def can?(%User{id: user_id}, :delete, %Ingredient{user_id: user_id}), do: true

  def can?(%User{} = user, :create, %Ingredient{} = ingredient) do
    ingredient
    |> Map.get(:recipe_id, "")
    |> Recipes.get_recipe()
    |> case do
      %Recipe{user_id: user_id} when user_id == user.id ->
        true

      _ ->
        false
    end
  end

  def can?(_user, _action, _object), do: false
end
