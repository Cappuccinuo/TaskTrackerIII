defmodule TaskTrackerWeb.TokenController do
  use TaskTrackerWeb, :controller
  alias TaskTracker.Users.User

  action_fallback TaskTrackerWeb.FallbackController

  def create(conn, %{"email" => email}) do
    user = TaskTracker.Users.get_and_auth_user(email)
    if (user) do
      %User{} = user
      token = Phoenix.Token.sign(conn, "auth token", user.id)
      conn
      |> put_status(:created)
      |> render("token.json", user: user, token: token)
    end
  end
end
