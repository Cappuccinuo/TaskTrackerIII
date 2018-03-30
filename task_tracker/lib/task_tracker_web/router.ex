defmodule TaskTrackerWeb.Router do
  use TaskTrackerWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", TaskTrackerWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/users", PageController, :index
    get "/tasks", PageController, :index
    get "/newtask", PageController, :index
  end

  # Other scopes may use custom stacks.
  scope "/api", TaskTrackerWeb do
    pipe_through :api
    resources "/users", UserController, except: [:new, :edit]
    post "/token", TokenController, :create
  end
end
