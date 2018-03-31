defmodule TaskTracker.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :completed, :boolean, default: false
    field :description, :string, null: false
    field :time, :integer, default: 0, null: false
    field :title, :string, null: false
    belongs_to :user, TaskTracker.Users.User
    belongs_to :worker, TaskTracker.Users.User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :description, :completed, :time, :user_id, :worker_id])
    |> validate_required([:title, :description, :completed, :time, :user_id, :worker_id])
  end
end
