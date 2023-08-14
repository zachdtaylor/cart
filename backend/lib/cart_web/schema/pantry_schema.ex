defmodule CartWeb.Schema.PantrySchema do
  @moduledoc """
  Defines the GraphQL schema (types and mutations) for the
  pantry context.
  """
  use Absinthe.Schema.Notation
  import CartWeb.Helpers.Mutations

  alias CartWeb.Resolvers.PantryResolver

  object :pantry_item do
    field :id, non_null(:id)
    field :name, non_null(:string)
    field :shelf_id, non_null(:id)
    field :user_id, non_null(:id)
  end

  object :pantry_shelf do
    field :id, non_null(:id)
    field :name, non_null(:string)
    field :user_id, non_null(:id)
    field :items, non_null(list_of(non_null(:pantry_item)))
  end

  input_object :create_pantry_shelf_input do
    field :name, non_null(:string)
  end

  mutation_response_object(:create_pantry_shelf_response, :pantry_shelf)

  input_object :update_pantry_shelf_name_input do
    field :shelf_id, non_null(:id)
    field :name, non_null(:string)
  end

  mutation_response_object(:update_pantry_shelf_name_response, :pantry_shelf)

  input_object :delete_pantry_shelf_input do
    field :shelf_id, non_null(:id)
  end

  mutation_response_object(:delete_pantry_shelf_response, :pantry_shelf)

  input_object :create_pantry_item_input do
    field :name, non_null(:string)
    field :shelf_id, non_null(:id)
  end

  mutation_response_object(:create_pantry_item_response, :pantry_item)

  input_object :delete_pantry_item_input do
    field :item_id, non_null(:id)
  end

  mutation_response_object(:delete_pantry_item_response, :pantry_item)

  object :pantry_mutations do
    @desc "Create a new pantry shelf"
    field :create_pantry_shelf, :create_pantry_shelf_response do
      arg(:input, non_null(:create_pantry_shelf_input))

      resolve(&PantryResolver.create_pantry_shelf/3)
    end

    @desc "Update the name of a pantry shelf"
    field :update_pantry_shelf_name, :update_pantry_shelf_name_response do
      arg(:input, non_null(:update_pantry_shelf_name_input))

      resolve(&PantryResolver.update_pantry_shelf_name/3)
    end

    @desc "Delete a pantry shelf"
    field :delete_pantry_shelf, :delete_pantry_shelf_response do
      arg(:input, non_null(:delete_pantry_shelf_input))

      resolve(&PantryResolver.delete_pantry_shelf/3)
    end

    @desc "Create a new pantry item"
    field :create_pantry_item, :create_pantry_item_response do
      arg(:input, non_null(:create_pantry_item_input))

      resolve(&PantryResolver.create_pantry_item/3)
    end

    @desc "Delete a pantry item"
    field :delete_pantry_item, :delete_pantry_item_response do
      arg(:input, non_null(:delete_pantry_item_input))

      resolve(&PantryResolver.delete_pantry_item/3)
    end
  end
end
