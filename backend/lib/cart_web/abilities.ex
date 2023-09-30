defmodule CartWeb.Abilities do
  @moduledoc """
  Defines the abilities of users.
  """

  import Ecto.Query

  alias Cart.Accounts.User
  alias Cart.Pantry.{PantryItem, PantryShelf}
  alias Cart.Recipes
  alias Cart.Recipes.{Ingredient, Recipe}
  alias Cart.Repo

  @doc """
  Checks if a user can perform an action.

  Returns true if the user can perform the action. Otherwise, returns false
  or an atom indicating why the user cannot perform the action.
  """
  @spec can?(User.t() | nil, atom()) :: boolean | atom()
  def can?(%User{id: id}, :check_off_grocery_list_item) when is_integer(id), do: true
  def can?(%User{id: id}, :clear_meal_plan) when is_integer(id), do: true
  def can?(_user, _action), do: false

  @doc """
  Checks if a user can perform an action on an object.

  Returns true if the user can perform the action. Otherwise, returns false
  or an atom indicating why the user cannot perform the action.
  """
  @spec can?(User.t() | nil, atom(), any()) :: boolean | atom()
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

  def can?(%User{id: user_id}, :copy, %Recipe{user_id: user_id}), do: :own_recipe

  def can?(%User{} = user, :copy, %Recipe{} = recipe) do
    query = from(r in Recipe, where: r.user_id == ^user.id and r.original_id == ^recipe.id)

    case Repo.aggregate(query, :count) do
      0 -> true
      _ -> :already_copied
    end
  end

  def can?(_user, _action, _object), do: false
end
