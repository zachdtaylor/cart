# Cart

This is a monorepo for the Cart app.

Right now, the app is made up of a GraphQL api written in Elixir and a web frontend written with React Router v7.

## Backend

To run the backend:

```shell
$ cd backend
$ mix deps.get
$ iex -S mix phx.server
```

## Web Frontend

To run the web frontend:

```shell
$ cd web
$ npm install
$ npm run dev
```
