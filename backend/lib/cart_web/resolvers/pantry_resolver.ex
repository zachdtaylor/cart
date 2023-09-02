defmodule CartWeb.Resolvers.PantryResolver do
  import CartWeb.Helpers.Mutations

  alias CartWeb.Abilities
  alias CartWeb.Helpers.Errors
  alias Cart.Accounts.User
  alias Cart.Pantry
  alias Cart.Pantry.{PantryItem, PantryShelf}

  def list_pantry_shelves(_parent, %{query: query}, %{context: context}) do
    case Map.get(context, :current_user) do
      %User{} = user -> {:ok, Pantry.list_shelves(user, %{query: query})}
      :unauthorized -> Errors.unauthorized()
    end
  end

  def create_pantry_shelf(_parent, %{input: input}, %{context: context}) do
    user = Map.get(context, :current_user, nil)

    if Abilities.can?(user, :create, %PantryShelf{}) do
      %{user_id: user.id, name: input.name}
      |> Pantry.create_shelf()
      |> mutation_response()
    else
      Errors.unauthorized_mutation()
    end
  end

  def update_pantry_shelf_name(_parent, %{input: input}, %{context: context}) do
    user = Map.get(context, :current_user, nil)
    shelf = Pantry.get_shelf(input.shelf_id)

    if Abilities.can?(user, :update, shelf) do
      shelf
      |> Pantry.change_shelf_name(input.name)
      |> mutation_response()
    else
      Errors.unauthorized_mutation()
    end
  end

  def delete_pantry_shelf(_parent, %{input: input}, %{context: context}) do
    user = Map.get(context, :current_user, nil)
    shelf = Pantry.get_shelf(input.shelf_id)

    if Abilities.can?(user, :delete, shelf) do
      Pantry.delete_shelf(input.shelf_id)
      mutation_response({:ok, shelf})
    else
      Errors.unauthorized_mutation()
    end
  end

  def create_pantry_item(_parent, %{input: input}, %{context: context}) do
    user = Map.get(context, :current_user, nil)

    if Abilities.can?(user, :create, %PantryItem{}) do
      %{shelf_id: input.shelf_id, user_id: user.id, name: input.name}
      |> Pantry.create_item()
      |> mutation_response()
    else
      Errors.unauthorized_mutation()
    end
  end

  def delete_pantry_item(_parent, %{input: input}, %{context: context}) do
    user = Map.get(context, :current_user, nil)
    item = Pantry.get_item(input.item_id)

    if Abilities.can?(user, :delete, item) do
      Pantry.delete_item(input.item_id)
      mutation_response({:ok, item})
    else
      Errors.unauthorized_mutation()
    end
  end
end
