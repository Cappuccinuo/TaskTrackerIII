import React                                                    from 'react';
import ReactDOM                                                 from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch }     from 'react-router-dom';
import { Provider, connect }                                    from 'react-redux';
import Nav                                                      from './nav'
import Users                                                    from './account/users'
import Newtask                                                  from './task/newtask'
import Tasks                                                    from './task/tasks'
import Taskedit                                                 from './task/taskedit'
import Taskmodify                                               from './task/taskmodify'
import Signup                                                   from './account/signup'
import Mytasks                                                  from './task/mytask'
import Myassigned                                               from './task/myassigned'
import { CookiesProvider, withCookies, Cookies, cookie }        from 'react-cookie';

export default function tasktracker_init(store) {
  ReactDOM.render(
    <Provider store={store}>
      <CookiesProvider>
        <Tasktracker state={store.getState()} />
      </CookiesProvider>
    </Provider>,
    document.getElementById('root')
  );
}

function filter(tasks, id) {
  let task = "";
  _.map(tasks, (tt) => {
    if (tt.id == id) {
      task = tt;
    }
  })
  return task;
}

class TaskTracker extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let token = this.props.cookies.get('token');
    this.props.dispatch({
      type: "SET_TOKEN",
      token: token
    });
  }

  componentDidUpdate() {
    console.log(this.props);
  }

  render() {
    console.log("start");
    let isLoggedIn = (this.props.token != null);
    console.log(isLoggedIn);
    if (isLoggedIn) {
      return <Router>
        <div>
          <Nav/>
          <div>
            <Route path="/" exact={true} render={() =>
              <div className="jumbotron">
                <h2>Welcome to Task Tracker</h2>
                <p className="lead">A simple web application that<br />helps you and your friends follow through tasks efficiently.</p>
              </div>} />

            <Route path="/users" exact={true} render={() =>
                <Users users={this.props.users} />
              } />

            <Route path="/tasks" exact={true} render={() =>
                <Tasks tasks={this.props.tasks}/>} />

            <Route path="/signup" exact={true} render={() =>
                <Redirect to="/"></Redirect>} />

            <Route path="/newtask" render={() =>
                <Newtask boss_id={this.props.token.user_id}/>} />

            <Switch>
              <Route path="/tasks/:task_id/edit" render={({match}) =>
                <Taskedit task={filter(this.props.tasks, match.params.task_id)} update_id={match.params.task_id}/>} />
              <Route path="/tasks/:task_id/modify" render={({match}) =>
                <Taskmodify task={filter(this.props.tasks, match.params.task_id)} modify_id={match.params.task_id}/>} />
            </Switch>

            <Route path="/mytasks" exact={true} render={() =>
                <Mytasks tasks={_.filter(this.props.tasks, (tt) =>
                  tt.user.id == this.props.token.user_id)} />} />

            <Route path="/myassigned" exact={true} render={() =>
                <Myassigned tasks={this.props.tasks} user_id={this.props.token.user_id} />} />
          </div>
        </div>
      </Router>
    }
    else {
      return <Router>
        <div>
          <Nav/>
          <div>
            <Route path="/" exact={true} render={() =>
              <div className="jumbotron">
                <h2>Welcome to Task Tracker</h2>
                <p className="lead">A simple web application that<br />helps you and your friends follow through tasks efficiently.</p>
              </div>} />

            <Route path="/users" exact={true} render={() =>
                <Redirect to="/"></Redirect>
              } />

            <Route path="/tasks" exact={true} render={() =>
                <Redirect to="/"></Redirect>} />

            <Route path="/signup" exact={true} render={() =>
                <Signup />} />

            <Route path="/newtask" render={() =>
                <Redirect to="/"></Redirect>} />

            <Switch>
              <Route path="/tasks/:task_id/edit" render={({match}) =>
                <Redirect to="/"></Redirect>} />
              <Route path="/tasks/:task_id/modify" render={({match}) =>
                <Redirect to="/"></Redirect>} />
            </Switch>

            <Route path="/mytasks" exact={true} render={() =>
                <Redirect to="/"></Redirect>} />

            <Route path="/myassigned" exact={true} render={() =>
                <Redirect to="/"></Redirect>} />
          </div>
        </div>
      </Router>
    }
  }
};

let Tasktracker = withCookies(connect((state) => state)(TaskTracker));
