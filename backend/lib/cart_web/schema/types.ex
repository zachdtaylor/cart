defmodule CartWeb.Schema.Types do
  use Absinthe.Schema.Notation

  import_types(CartWeb.Helpers.Mutations)
  import_types(CartWeb.Schema.AccountsSchema)
  import_types(CartWeb.Schema.PantrySchema)
end
