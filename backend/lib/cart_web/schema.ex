defmodule CartWeb.Schema do
  @moduledoc """
  Defines the graphql schema.
  """
  use Absinthe.Schema

  alias CartWeb.Resolvers.AccountsResolver

  import_types(CartWeb.Schema.Types)

  query do
    field :current_user, :user do
      resolve(&AccountsResolver.current_user/3)
    end
  end

  mutation do
    import_fields(:account_mutations)
    import_fields(:pantry_mutations)
  end
end
