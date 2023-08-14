defmodule CartWeb.Resolvers.AccountsResolver do
  @moduledoc """
  Resolvers for the accounts context.
  """
  import CartWeb.Helpers.Mutations, only: [mutation_response: 1]

  alias Cart.Accounts
  alias Cart.Accounts.User

  def current_user(_parent, _args, %{context: context}) do
    {:ok, Map.get(context, :current_user, nil)}
  end

  def register_user(_parent, %{input: input}, _resolution) do
    input
    |> Accounts.register_user()
    |> case do
      {:ok, user} ->
        token = Accounts.generate_user_session_token(user)
        {:ok, %{user_id: user.id, token: Base.url_encode64(token)}}

      error ->
        error
    end
    |> mutation_response()
  end

  def log_in_user(_parent, %{input: input}, _resolution) do
    input.email
    |> Accounts.get_user_by_email_and_password(input.password)
    |> case do
      %User{} = user ->
        token = Accounts.generate_user_session_token(user)
        {:ok, %{user_id: user.id, token: Base.url_encode64(token)}}

      nil ->
        {:error, "Invalid email or password"}
    end
    |> mutation_response()
  end
end
