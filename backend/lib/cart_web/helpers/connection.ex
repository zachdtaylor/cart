defmodule CartWeb.Helpers.Connection do
  @moduledoc """
  Connection (pagination) support for a GraphQL schema.
  """

  @doc """
  Adds connection support to an object or a field.

  When used on an object, defines an additional type for the
  connection. For example,

  ```
  connection object :company do
    field :id, non_null(:id)
    field :name, :string
  end
  ```

  will define the object named `:company` as shown, _and_ an
  object named `:company_connection`. The `:company_connection`
  object will have two fields:
    - `:nodes`, of type `list_of(:company)`
    - `:total_count`, of type `:integer`.

  You can also use this macro on a field. For example,

  ```
  connection field :companies, :company do
    resolve(resolver_fn)
  end
  ```

  will define a field named `:companies` of type
  `:company_connection`. This field will have two
  arguments:
    - `:limit`, of type `:integer`
    - `:skip`, of type `:integer`

  """
  defmacro connection({:object, _, [object_name]}, do: block) do
    connection_object_name = :"#{object_name}_connection"

    quote do
      object unquote(object_name) do
        unquote(block)
      end

      object unquote(connection_object_name) do
        field(:nodes, list_of(unquote(object_name)))
        field(:total_count, :integer)
      end
    end
  end

  defmacro connection({:field, _, [field_name, node_type]}, do: block) do
    connection_type = :"#{node_type}_connection"

    quote do
      field(unquote(field_name), unquote(connection_type)) do
        arg(:limit, :integer)
        arg(:skip, :integer)

        unquote(block)
      end
    end
  end
end
