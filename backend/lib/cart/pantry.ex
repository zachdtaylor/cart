defmodule Cart.Pantry do
  @moduledoc """
  The pantry context.
  """
  import Ecto.Query

  alias Cart.Pantry.PantryItem
  alias Cart.Accounts.User
  alias Cart.Pantry.{PantryItem, PantryShelf}
  alias Cart.{Pagination, Repo}

  @doc """
  Retrieves all shelves for the given user.

  Each shelf will have its items preloaded in descending order of
  the time they were created.

  ## Options

    * `:limit` - Limits the number of results
    * `:skip` - Skips the first `:skip` results

  """
  def list_shelves(%User{} = user, %{} = args \\ %{}) do
    PantryShelf
    |> where([s], s.user_id == ^user.id)
    |> search_by_name(args)
    |> order_by([s], desc: s.inserted_at)
    |> Pagination.paginate(args)
    |> preload(items: ^from(i in PantryItem, order_by: [desc: i.inserted_at]))
    |> Repo.all()
  end

  defp search_by_name(queryable, %{query: query}) do
    queryable
    |> where([s], ilike(s.name, ^"%#{query}%"))
  end

  defp search_by_name(queryable, _), do: queryable

  @doc """
  Retrieves all pantry items for the given user.
  """
  def list_items(%User{} = user) do
    PantryItem
    |> where([p], p.user_id == ^user.id)
    |> Repo.all()
  end

  @doc """
  Retrieves a pantry shelf by its id.
  """
  def get_shelf(id) do
    PantryShelf
    |> where([s], s.id == ^id)
    |> Repo.one()
  end

  @doc """
  Retrieves a pantry shelf by its name. If not found, creates a new shelf
  with the given name.

  ## Examples

      iex> get_or_create_shelf_by_name(user, name)
      {:ok, %PantryShelf{}}

      iex> get_or_create_shelf_by_name(user, name)
      {:error, %Ecto.Changeset{}}

  """
  @spec get_or_create_shelf_by_name(User.t(), String.t()) ::
          {:ok, PantryShelf.t()} | {:error, Ecto.Changeset.t()}
  def get_or_create_shelf_by_name(%User{} = user, name) do
    PantryShelf
    |> where([s], s.user_id == ^user.id and s.name == ^name)
    |> limit(1)
    |> Repo.one()
    |> case do
      nil ->
        create_shelf(%{user_id: user.id, name: name})

      shelf ->
        {:ok, shelf}
    end
  end

  @doc """
  Retrieves a pantry item by its id.
  """
  def get_item(id) do
    PantryItem
    |> where([s], s.id == ^id)
    |> Repo.one()
  end

  @doc """
  Creates a new shelf.

  ## Examples

      iex> create_shelf(%{name: value, user_id: user_id})
      {:ok, %PantryShelf{}}

      iex> create_shelf(%{name: value, user_id: invalid_user_id})
      {:error, %Ecto.Changeset{}}

  """
  @spec create_shelf(map) :: {:ok, PantryShelf.t()} | {:error, Ecto.Changeset.t()}
  def create_shelf(%{} = args) do
    %PantryShelf{}
    |> PantryShelf.creation_changeset(args)
    |> Repo.insert()
  end

  @doc """
  Changes a shelf's name.

  ## Examples

      iex> change_shelf_name(pantry_shelf, value)
      {:ok, %PantryShelf{}}

      iex> change_shelf_name(pantry_shelf, bad_value)
      {:error, %Ecto.Changeset{}}

  """
  def change_shelf_name(pantry_shelf, name) when is_binary(name) do
    pantry_shelf
    |> PantryShelf.name_changeset(%{name: name})
    |> Repo.update()
  end

  @doc """
  Deletes a shelf by its id.

  ## Examples

      iex> delete_shelf(pantry_shelf_id)
      :ok

  """
  def delete_shelf(pantry_shelf_id) do
    Repo.delete_all(from s in PantryShelf, where: s.id == ^pantry_shelf_id)
    :ok
  end

  @doc """
  Creates a new item on a shelf.

  ## Examples

      iex> create_item(%{name: value, shelf_id: shelf_id, user_id: user_id})
      {:ok, %PantryShelf{}}

      iex> create_item(%{name: value, shelf_id: shelf_id user_id: invalid_user_id})
      {:error, %Ecto.Changeset{}}

  """
  def create_item(%{} = args) do
    %PantryItem{}
    |> PantryItem.creation_changeset(args)
    |> Repo.insert()
  end

  @doc """
  Deletes an item by its id.

  ## Examples

      iex> delete_item(pantry_item_id)
      :ok

  """
  def delete_item(pantry_item_id) do
    Repo.delete_all(from s in PantryItem, where: s.id == ^pantry_item_id)
    :ok
  end
end
