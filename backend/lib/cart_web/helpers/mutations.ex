defmodule CartWeb.Helpers.Mutations do
  use Absinthe.Schema.Notation

  object :mutation_error do
    field :path, :string
    field :message, :string
  end

  defmacro mutation_response_object(payload_name, result_object_name) do
    quote location: :keep do
      object unquote(payload_name) do
        field(:success, non_null(:boolean),
          description: "Indicates if the mutation completed successfully or not. "
        )

        field(:errors, non_null(list_of(:mutation_error)),
          description: "A list of failed validations. May be blank or null if mutation succeeded."
        )

        field(:data, unquote(result_object_name),
          description: "The object modified by the mutation. May be null if mutation failed."
        )
      end
    end
  end

  def mutation_response({:ok, obj}) do
    {:ok, %{success: true, data: obj, errors: []}}
  end

  def mutation_response({:error, %Ecto.Changeset{} = changeset}) do
    {:ok, %{success: false, data: nil, errors: handle_changeset_errors(changeset)}}
  end

  def mutation_response({:error, message}) when is_binary(message) do
    {:ok, %{success: false, data: nil, errors: [%{message: message, path: nil}]}}
  end

  defp handle_changeset_errors(%Ecto.Changeset{} = changeset) do
    changeset.errors
    |> Enum.map(fn {field, {msg, opts}} ->
      %{
        path: field,
        message: apply_opts(msg, opts)
      }
    end)
  end

  defp apply_opts(msg, opts) do
    Regex.replace(~r"%{(\w+)}", msg, fn _, key ->
      opts |> Keyword.get(String.to_existing_atom(key), key) |> to_string()
    end)
  end
end
