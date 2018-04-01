defmodule TaskTracker.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :title, :text, null: false
      add :description, :text, null: false
      add :completed, :text, default: "0", null: false
      add :time, :text, default: "0", null: false
      add :boss_id, references(:users, on_delete: :nothing)
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end
    create index(:tasks, [:boss_id])
    create index(:tasks, [:user_id])
  end
end
