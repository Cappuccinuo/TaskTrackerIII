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
    this.state = {
      token: undefined,
    };
  }

  componentWillMount() {
    let token = this.props.cookies.get('token');
    this.props.dispatch({
      type: "SET_TOKEN",
      token: token
    });
    this.setState({ token });
  }

  render() {
    let isLoggedIn = (this.state.token != null);
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
            isLoggedIn ? (
              <Users users={this.props.users} />
            ) : (
              <Redirect to="/"></Redirect>
            )} />

          <Route path="/tasks" exact={true} render={() =>
              <Tasks tasks={this.props.tasks}/>} />

          <Route path="/signup" exact={true} render={() =>
            isLoggedIn ? (
              <Redirect to="/"></Redirect>
            ) : (
              <Signup />
            )} />

          <Switch>
            <Route path="/newtask" render={() =>
                <Newtask boss_id={this.state.token.user_id}/>} />
            <Route path="/tasks/:task_id/edit" render={({match}) =>
                <Taskedit task={filter(this.props.tasks, match.params.task_id)} update_id={match.params.task_id}/>} />
            <Route path="/tasks/:task_id/modify" render={({match}) =>
                <Taskmodify task={filter(this.props.tasks, match.params.task_id)} modify_id={match.params.task_id}/>} />
          </Switch>

          <Route path="/mytasks" exact={true} render={() =>
            isLoggedIn ? (
              <Mytasks tasks={_.filter(this.props.tasks, (tt) =>
                tt.user.id == this.state.token.user_id)} />
            ) : (
              <Redirect to="/"></Redirect>
            )} />

          <Route path="/myassigned" exact={true} render={() =>
            isLoggedIn ? (
              <Myassigned tasks={this.props.tasks} user_id={this.state.token.user_id} />
            ) : (
              <Redirect to="/"></Redirect>
            )} />


        </div>
      </div>
    </Router>
  }
};

let Tasktracker = withCookies(connect((state) => state)(TaskTracker));
