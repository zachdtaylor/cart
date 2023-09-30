defmodule Cart.Recipes.Recipe do
  use Ecto.Schema
  import Ecto.Changeset

  alias Cart.Accounts.User
  alias Cart.Recipes.Ingredient
  alias __MODULE__

  schema "recipes" do
    field :name, :string
    field :instructions, :string
    field :total_time, :string
    field :image_url, :string
    field :meal_plan_multiplier, :integer

    belongs_to :user, User
    belongs_to :original, Recipe

    has_many :ingredients, Ingredient

    timestamps()
  end

  @doc """
  A changeset for creating a new recipe.
  """
  def creation_changeset(recipe, attrs) do
    recipe
    |> cast(attrs, [:name, :total_time, :image_url, :user_id])
    |> validate_required([:name, :user_id])
    |> validate_name()
  end

  @doc """
  A changeset for copying a recipe.
  """
  def copy_changeset(recipe, attrs) do
    recipe
    |> cast(attrs, [:name, :total_time, :image_url, :instructions, :user_id, :original_id])
    |> validate_required([:name, :user_id])
    |> validate_name()
  end

  defp validate_name(changeset) do
    changeset
    |> validate_length(:name, min: 1, max: 100)
  end

  @doc """
  A changeset for updating an existing recipe.
  """
  def changeset(recipe, attrs) do
    recipe
    |> cast(attrs, [:name, :instructions, :total_time, :image_url, :meal_plan_multiplier])
  end
end
