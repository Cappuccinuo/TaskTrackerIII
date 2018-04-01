import React                                                    from 'react';
import ReactDOM                                                 from 'react-dom';
import { BrowserRouter as Router, Route, Redirect }             from 'react-router-dom';
import { Provider, connect }                                    from 'react-redux';
import Nav                                                      from './nav'
import Users                                                    from './users'
import Newtask                                                  from './newtask'
import Tasks                                                    from './tasks'
import TaskInfo                                                 from './taskinfo'
import Signup                                                   from './signup'

export default function tasktracker_init(store) {
  ReactDOM.render(
    <Provider store={store}>
      <Tasktracker state={store.getState()} />
    </Provider>,
    document.getElementById('root')
  );
}

let Tasktracker = connect((state) => state)((props) => {
  function filter(tasks, id) {
    let task = "";
    _.map(tasks, (tt) => {
      if (tt.id == id) {
        task = tt;
      }
    })
    return task;
  }

  return <Router>
    <div>
      <Nav />
      <div>
        <Route path="/users" exact={true} render={() =>
          <Users users={props.users} />} />
        <Route path="/signup" exact={true} render={() =>
          <Signup />} />
        <Route path="/tasks" exact={true} render={() =>
          <Tasks tasks={props.tasks} />} />
        <Route path="/newtask" exact={true} render={() =>
          <Newtask />} />
        <Route path="/tasks/:task_id" exact={true} render={({match}) =>
          <TaskInfo task={filter(props.tasks, match.params.task_id)}/> }/>
        <Route path="/" exact={true} render={() =>
          props.state.token ? (
            <Redirect to="/"></Redirect>
          ) : (
          <div className="jumbotron">
            <h2>Welcome to Task Tracker</h2>
            <p className="lead">A simple web application that<br />helps you and your friends follow through tasks efficiently.</p>
          </div>
          )
        } />
      </div>
    </div>
  </Router>
});
