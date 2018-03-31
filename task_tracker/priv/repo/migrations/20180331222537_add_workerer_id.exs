defmodule TaskTracker.Repo.Migrations.AddWorkererID do
  use Ecto.Migration

  def change do
    alter table(:tasks) do
      add :worker_id, references(:users, on_delete: :nothing)
    end
  end
end
