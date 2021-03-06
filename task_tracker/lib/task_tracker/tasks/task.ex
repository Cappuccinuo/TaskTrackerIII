defmodule TaskTracker.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :completed, :string, default: "0", null: false
    field :description, :string, null: false
    field :time, :string, default: "0", null: false
    field :title, :string, null: false
    belongs_to :boss, TaskTracker.Users.User
    belongs_to :user, TaskTracker.Users.User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :description, :completed, :time, :user_id, :boss_id])
    |> validate_required([:title, :description, :completed, :time, :user_id, :boss_id])
  end
end
