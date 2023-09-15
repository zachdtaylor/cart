defmodule Cart.Repo.Migrations.ChangeInstructionsType do
  use Ecto.Migration

  def change do
    alter table(:recipes) do
      modify :instructions, :text
      modify :image_url, :text
    end
  end
end
