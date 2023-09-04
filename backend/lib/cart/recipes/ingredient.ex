defmodule Cart.Recipes.Ingredient do
  use Ecto.Schema
  import Ecto.Changeset

  alias Cart.Accounts.User
  alias Cart.Recipes.Recipe

  schema "ingredients" do
    field :name, :string
    field :amount, :string

    belongs_to :recipe, Recipe
    belongs_to :user, User

    timestamps()
  end

  @doc """
  A changeset for creating a new ingredient.
  """
  def creation_changeset(ingredient, attrs) do
    ingredient
    |> cast(attrs, [:name, :amount, :recipe_id, :user_id])
    |> validate_required([:name, :recipe_id, :user_id])
    |> validate_name()
  end

  defp validate_name(changeset) do
    changeset
    |> validate_length(:name, min: 1, max: 100)
  end

  @doc """
  A changeset for changing the ingredient's name or amount.
  """
  def changeset(ingredient, attrs) do
    ingredient
    |> cast(attrs, [:name, :amount])
    |> validate_name()
  end
end
