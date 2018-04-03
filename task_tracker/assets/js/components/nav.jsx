import React from 'react';
import { NavLink, Redirect, Link } from 'react-router-dom';
import Login from "./account/login";
import api from '../api';
import { connect } from 'react-redux';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { CookiesProvider } from 'react-cookie';

let Session = connect(({token, users}) => {return {token, users};})((props) => {
  function delete_token(ev) {
    props.dispatch({
      type: "DELETE_TOKEN",
    });
  }

  let user = _.filter(props.users, (uu) => props.token.user_id == uu.id);
  let user_name = user[0].name;

  return <div className="navbar-text">
    <span>Welcome back, { user_name }</span>
    <Button onClick={delete_token}>Log out</Button>
  </div>;
});

function Nav(props) {
  return <header className="header">
    <nav role="navigation">
      <ul className="nav nav-pills pull-right">
        <li>
          <NavLink to="/" exact={true} activeClassName="active" className="nav-link">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" exact={false} activeClassName="active" className="nav-link">
            All Users
          </NavLink>
        </li>
        <li>
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Tasks
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <NavLink to="/tasks" exact={true} activeClassName="active" className="nav-link">
                All Tasks
              </NavLink>
              <NavLink to="/newtask" exact={true} activeClassName="active" className="nav-link">
                New Task
              </NavLink>
              <NavLink to="/mytasks" exact={true} activeClassName="active" className="nav-link">
                My Todo Task
              </NavLink>
              <NavLink to="/myassigned" exact={true} activeClassName="active" className="nav-link">
                My Assigned Task
              </NavLink>
            </div>
          </div>
        </li>
        <li>
          <Login users={props.users}/>
        </li>
      </ul>
    </nav>
    <span className="logo"></span>
  </header>;
}

function state2props(state) {
  console.log(state.token);
  return {
    token: state.token,
    users: state.users,
  };
}
export default connect(state2props)(Nav);
