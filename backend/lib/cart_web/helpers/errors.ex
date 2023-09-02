defmodule CartWeb.Helpers.Errors do
  @code_unauthorized "UNAUTHORIZED"

  def unauthorized do
    {:error,
     message: "You are not authorized to access this resource",
     extensions: %{code: @code_unauthorized}}
  end

  def unauthorized_mutation do
    {:error,
     message: "You are not authorized perform this action",
     extensions: %{code: @code_unauthorized}}
  end
end
