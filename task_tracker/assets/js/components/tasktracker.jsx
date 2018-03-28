import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Nav from './nav'

export default function tasktracker_init() {
  ReactDOM.render(
    <Tasktracker />,
    document.getElementById('root')
  );
}

class Tasktracker extends React.Component {
  render() {
    return <Router>
      <div>
        <Nav />
        <div>
          <Route path="/users" exact={true} render={() =>
            <p>test</p>} />
          <Route path="/tasks" exact={true} render={() =>
            <p>test2</p>} />
          <Route path="/" exact={true} render={() =>
            <div className="jumbotron">
              <h2>Welcome to Task Tracker</h2>
              <p className="lead">A simple web application that<br />helps you and your friends follow through tasks efficiently.</p>
            </div>} />
        </div>
      </div>
    </Router>;
  }
}
