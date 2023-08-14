defmodule Cart.Repo.Migrations.AddNameToUsers do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :first_name, :string, null: false
      add :last_name, :string, null: false
    end
  end
end
