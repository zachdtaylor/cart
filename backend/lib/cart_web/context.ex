defmodule CartWeb.Context do
  @behaviour Plug

  import Plug.Conn

  alias Cart.Accounts

  def init(opts), do: opts

  def call(conn, _) do
    context = build_context(conn)
    Absinthe.Plug.put_options(conn, context: context)
  end

  @doc """
  Return the graphql context based on the authorization header
  """
  def build_context(conn) do
    with ["Bearer " <> token] <- get_req_header(conn, "authorization"),
         {:ok, current_user} <- authorize(token) do
      %{current_user: current_user}
    else
      _ -> %{current_user: :unauthorized}
    end
  end

  defp authorize(token) do
    token
    |> Base.url_decode64!()
    |> Accounts.get_user_by_session_token()
    |> case do
      nil -> :not_found
      user -> {:ok, user}
    end
  end
end
