defmodule CartWeb.Router do
  use CartWeb, :router

  pipeline :graphql do
    plug :accepts, ["json"]
    plug CartWeb.Context
  end

  scope "/" do
    pipe_through :graphql

    forward "/graphql", Absinthe.Plug.GraphiQL, schema: CartWeb.Schema
  end
end
