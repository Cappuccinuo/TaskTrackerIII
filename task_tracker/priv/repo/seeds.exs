# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     TaskTracker.Repo.insert!(%TaskTracker.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
defmodule Seeds do
  alias TaskTracker.Repo
  alias TaskTracker.Users.User
  alias TaskTracker.Tasks.Task

  def run do
    Repo.delete_all(User)
    a = Repo.insert!(%User{ email: "alice@example.com", name: "alice" })
    b = Repo.insert!(%User{ email: "bob@example.com", name: "bob" })
    c = Repo.insert!(%User{ email: "carol@example.com", name: "carol" })
    d = Repo.insert!(%User{ email: "dave@example.com", name: "dave" })

    Repo.delete_all(Task)
    Repo.insert!(%Task{ title: "test1", description: "Hi", completed: :false, time: 0, user_id: b.id, boss_id: a.id })
    Repo.insert!(%Task{ title: "test2", description: "Hello", completed: :true, time: 145, user_id: c.id, boss_id: b.id })
    Repo.insert!(%Task{ title: "test3", description: "Hey", completed: :false, time: 0, user_id: d.id, boss_id: c.id })
    Repo.insert!(%Task{ title: "test4", description: "What", completed: :true, time: 15, user_id: a.id, boss_id: d.id })
  end

end
Seeds.run
