defmodule Cart.Repo.Migrations.AddOriginalIdToRecipes do
  use Ecto.Migration

  def change do
    alter table(:recipes) do
      add :original_id, references(:recipes, on_delete: :nothing), null: true
    end
  end
end
