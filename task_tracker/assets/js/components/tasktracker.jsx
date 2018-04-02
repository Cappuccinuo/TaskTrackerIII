import React                                                    from 'react';
import ReactDOM                                                 from 'react-dom';
import { BrowserRouter as Router, Route, Redirect }             from 'react-router-dom';
import { Provider, connect }                                    from 'react-redux';
import Nav                                                      from './nav'
import Users                                                    from './account/users'
import Newtask                                                  from './task/newtask'
import Tasks                                                    from './task/tasks'
import TaskInfo                                                 from './task/taskinfo'
import Taskedit                                                 from './task/taskedit'
import Signup                                                   from './account/signup'
import Mytasks                                                  from './task/mytask'

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
          <Tasks tasks={props.tasks} user_id={props.token.user_id}/>} />
        <Route path="/mytasks" exact={true} render={() =>
          <Mytasks tasks={_.filter(props.tasks, (tt) =>
            tt.user.id == props.token.user_id)} />} />
        <Route path="/newtask" exact={true} render={() =>
          <Newtask />} />
        <Route path="/tasks/:task_id" exact={true} render={({match}) =>
          <TaskInfo task={filter(props.tasks, match.params.task_id)}/> }/>
        <Route path="/tasks/:task_id/edit" exact={true} render={({match}) =>
          <Taskedit task={filter(props.tasks, match.params.task_id)} update_id={match.params.task_id}/> }/>
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
