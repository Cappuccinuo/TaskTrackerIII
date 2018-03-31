import React                                          from 'react';
import ReactDOM                                       from 'react-dom';
import { BrowserRouter as Router, Route }             from 'react-router-dom';
import { Provider, connect }                          from 'react-redux';
import Nav                                            from './nav'
import Users                                          from './users'
import Newtask                                        from './newtask'
import Tasks                                          from './tasks'

export default function tasktracker_init(store) {
  ReactDOM.render(
    <Provider store={store}>
      <Tasktracker state={store.getState()} />
    </Provider>,
    document.getElementById('root')
  );
}
let Tasktracker = connect((state) => state)((props) => {
    return <Router>
      <div>
        <Nav />
        <div>
          <Route path="/users" exact={true} render={() =>
            <Users users={props.users} />} />
          <Route path="/tasks" exact={true} render={() =>
            <Tasks tasks={props.tasks} />} />
          <Route path="/newtask" exact={true} render={() =>
            <Newtask />} />
          <Route path="/" exact={true} render={() =>
            <div className="jumbotron">
              <h2>Welcome to Task Tracker</h2>
              <p className="lead">A simple web application that<br />helps you and your friends follow through tasks efficiently.</p>
            </div>} />
        </div>
      </div>
    </Router>
});
