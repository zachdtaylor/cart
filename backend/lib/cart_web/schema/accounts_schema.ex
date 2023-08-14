defmodule CartWeb.Schema.AccountsSchema do
  @moduledoc """
  Defines the GraphQL schema (types and mutations) for the
  accounts context.
  """
  use Absinthe.Schema.Notation
  import CartWeb.Helpers.Mutations

  alias CartWeb.Resolvers.PantryResolver
  alias CartWeb.Resolvers.AccountsResolver

  object :user do
    field :id, non_null(:id)
    field :email, non_null(:string)
    field :first_name, non_null(:string)
    field :last_name, non_null(:string)

    field :pantry_shelves, non_null(list_of(non_null(:pantry_shelf))) do
      resolve(&PantryResolver.list_pantry_shelves/3)
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
