defmodule Cart.Pantry.PantryItem do
  use Ecto.Schema
  import Ecto.Changeset

  alias Cart.Pantry.PantryShelf
  alias Cart.Accounts.User

  schema "pantry_items" do
    field :name, :string

    belongs_to :user, User
    belongs_to :shelf, PantryShelf

    timestamps()
  end

  @doc """
  A pantry item changeset for creating a new item.
  """
  def creation_changeset(pantry_item, attrs) do
    pantry_item
    |> cast(attrs, [:name, :user_id, :shelf_id])
    |> validate_required([:name, :user_id, :shelf_id])
    |> validate_name()
  end

  defp validate_name(changeset) do
    changeset
    |> validate_length(:name, min: 1, max: 100)
    |> validate_format(:name, ~r/[a-zA-Z]+/)
  end
end
