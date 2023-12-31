defmodule CartWeb.Schema.AccountsSchema do
  @moduledoc """
  Defines the GraphQL schema (types and mutations) for the
  accounts context.
  """
  use Absinthe.Schema.Notation
  import CartWeb.Helpers.Mutations

  alias CartWeb.Resolvers.AccountsResolver
  alias CartWeb.Resolvers.PantryResolver
  alias CartWeb.Resolvers.RecipesResolver

  object :user do
    field :id, non_null(:id)
    field :email, non_null(:string)
    field :first_name, non_null(:string)
    field :last_name, non_null(:string)

    field :full_name, non_null(:string) do
      resolve(fn user, _, _ -> {:ok, "#{user.first_name} #{user.last_name}"} end)
    end

    field :pantry_shelves, non_null(list_of(non_null(:pantry_shelf))) do
      arg(:query, :string)

      resolve(&PantryResolver.list_pantry_shelves/3)
    end

    field :recipes, non_null(list_of(non_null(:recipe))) do
      arg(:query, :string)
      arg(:meal_plan_only, :boolean)

      resolve(&RecipesResolver.list_recipes/3)
    end

    field :recipe, :recipe do
      arg(:id, non_null(:id))

      resolve(&RecipesResolver.get_recipe/3)
    end

    field :grocery_list_items, non_null(list_of(non_null(:grocery_list_item))) do
      resolve(&RecipesResolver.list_grocery_list_items/3)
    end
  end

  object :auth_info do
    field :user_id, non_null(:id)
    field :token, non_null(:string)
  end

  input_object :register_user_input do
    field :email, non_null(:string)
    field :password, non_null(:string)
    field :first_name, non_null(:string)
    field :last_name, non_null(:string)
  end

  mutation_response_object(:register_user_response, :auth_info)

  input_object :log_in_user_input do
    field :email, non_null(:string)
    field :password, non_null(:string)
  end

  mutation_response_object(:log_in_user_response, :auth_info)

  object :account_mutations do
    @desc "Register a new user"
    field :register_user, :register_user_response do
      arg(:input, non_null(:register_user_input))

      resolve(&AccountsResolver.register_user/3)
    end

    @desc "Log in an existing user"
    field :log_in_user, :log_in_user_response do
      arg(:input, non_null(:log_in_user_input))

      resolve(&AccountsResolver.log_in_user/3)
    end
  end
end
