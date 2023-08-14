defmodule Cart.Pagination do
  @moduledoc """
  Provides support for various query filters.
  """

  import Ecto.Query

  @doc """
  Add limit and skip clauses to the query.

  The limit clause is added if `args` contains a key `limit` with an integer value.
  The skip clause is added if `args` contains a key `skip` with an integer value.

  ### Examples

      iex>paginate(Transaction, %{limit: 2})
      #Ecto.Query<from t0 in Transaction, limit: ^2>

      iex>paginate(Transaction, %{skip: 2})
      #Ecto.Query<from t0 in Transaction, offset: ^2>

      iex>paginate(Transaction, %{limit: 2, skip: 2})
      #Ecto.Query<from t0 in Transaction, limit: ^2, offset: ^2>

      iex>paginate(Transaction, %{})
      Transaction
  """
  def paginate(query, %{} = args) do
    query
    |> limit_results(args)
    |> skip_results(args)
  end

  defp limit_results(query, %{limit: limit}) when is_integer(limit) do
    query
    |> limit(^limit)
  end

  defp limit_results(query, _), do: query

  defp skip_results(query, %{skip: skip}) when is_integer(skip) do
    query
    |> offset(^skip)
  end

  defp skip_results(query, _), do: query
end
