defmodule Cart.Pantry.PantryShelf do
  use Ecto.Schema
  import Ecto.Changeset

  alias Cart.Pantry.PantryItem
  alias Cart.Accounts.User

  schema "pantry_shelves" do
    field :name, :string

    belongs_to :user, User

    has_many :items, PantryItem, foreign_key: :shelf_id

    timestamps()
  end

  @doc """
  A pantry shelf changeset for creating a new shelf.
  """
  def creation_changeset(pantry_shelf, attrs) do
    pantry_shelf
    |> cast(attrs, [:name, :user_id])
    |> validate_required([:name, :user_id])
    |> validate_name()
  end

  defp validate_name(changeset) do
    changeset
    |> validate_length(:name, min: 1, max: 100)
  end

  @doc """
  A pantry shelf changeset for changing the shelf's name.
  """
  def name_changeset(pantry_shelf, attrs) do
    pantry_shelf
    |> cast(attrs, [:name])
    |> validate_name()
  end
end
