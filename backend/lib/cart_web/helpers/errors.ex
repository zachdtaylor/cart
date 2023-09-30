defmodule CartWeb.Helpers.Errors do
  @code_unauthorized "UNAUTHORIZED"
  @code_not_found "NOT_FOUND"

  def already_copied do
    {:error,
     message: "You have already copied this recipe", extensions: %{code: @code_unauthorized}}
  end

  def cannot_copy_own_recipe do
    {:error, message: "You cannot copy your own recipe", extensions: %{code: @code_unauthorized}}
  end

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

  def not_found do
    {:error, message: "Resource not found", extensions: %{code: @code_not_found}}
  end
end
