defmodule CartWeb.Abilities do
  alias Cart.Accounts.User
  alias Cart.Pantry.{PantryItem, PantryShelf}

  def can?(%User{}, :create, %PantryShelf{}), do: true
  def can?(%User{}, :create, %PantryItem{}), do: true
  def can?(%User{id: user_id}, :update, %PantryShelf{user_id: user_id}), do: true
  def can?(%User{id: user_id}, :delete, %PantryShelf{user_id: user_id}), do: true
  def can?(%User{id: user_id}, :delete, %PantryItem{user_id: user_id}), do: true
  def can?(_user, _action, _object), do: false
end
