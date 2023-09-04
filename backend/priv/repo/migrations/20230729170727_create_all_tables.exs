defmodule Cart.Repo.Migrations.CreateAllTables do
  use Ecto.Migration

  def change do
    create table(:pantry_shelves) do
      add :name, :string, null: false
      add :user_id, references(:users, on_delete: :delete_all), null: false

      timestamps()
    end

    create table(:pantry_items) do
      add :name, :string, null: false
      add :shelf_id, references(:pantry_shelves, on_delete: :delete_all), null: false
      add :user_id, references(:users, on_delete: :delete_all), null: false

      timestamps()
    end

    create table(:recipes) do
      add :name, :string, null: false
      add :instructions, :string
      add :total_time, :string
      add :image_url, :string
      add :user_id, references(:users, on_delete: :delete_all), null: false
      add :meal_plan_multiplier, :integer

      timestamps()
    end

    create table(:ingredients) do
      add :name, :string, null: false
      add :amount, :string
      add :recipe_id, references(:recipes, on_delete: :delete_all), null: false
      add :user_id, references(:users, on_delete: :delete_all), null: false

      timestamps()
    end
  end
end
