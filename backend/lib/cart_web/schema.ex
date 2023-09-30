defmodule CartWeb.Schema do
  @moduledoc """
  Defines the graphql schema.
  """
  use Absinthe.Schema
  import CartWeb.Connection

  alias CartWeb.Resolvers.AccountsResolver
  alias CartWeb.Resolvers.RecipesResolver

  import_types(CartWeb.Schema.Types)

  query do
    field :current_user, :user do
      resolve(&AccountsResolver.current_user/3)
    end

    @desc "Lists all original recipes."
    connection field :recipes, :recipe do
      resolve(&RecipesResolver.list_all_recipes/3)
    end

    field :recipe, :recipe do
      arg(:id, non_null(:id))

      resolve(&RecipesResolver.get_recipe_unauthorized/3)
    end
  end

  mutation do
    import_fields(:account_mutations)
    import_fields(:pantry_mutations)
    import_fields(:recipe_mutations)
  end
end
