import React from 'react';
import { NavLink, Redirect, Link } from 'react-router-dom';
import Login from "./account/login";
import api from '../api';
import { connect } from 'react-redux';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { CookiesProvider } from 'react-cookie';

function Nav(props) {
  let isLoggedIn = (props.token != null);
  const toggleVisible = isLoggedIn ? 'visible' : 'hidden';
  let style = {
    visibility: toggleVisible,
    marginTop: '15%',
  };
  let loginstyle = {
    marginTop: '8%',
  };
  return <header className="header">
    <nav role="navigation">
      <ul className="nav nav-pills pull-right">
        <li style={style}>
          <NavLink to="/">
            Home
          </NavLink>
        </li>
        <li style={style}>
          <NavLink to="/users">
            All Users
          </NavLink>
        </li>
        <li style={style}>
          <div className="dropdown">
            <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Tasks
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <NavLink to="/tasks" className="nav-link">
                All Tasks
              </NavLink>
              <NavLink to="/newtask" className="nav-link">
                New Task
              </NavLink>
              <NavLink to="/mytasks" className="nav-link">
                My Todo Task
              </NavLink>
              <NavLink to="/myassigned" className="nav-link">
                My Assigned Task
              </NavLink>
            </div>
          </div>
        </li>
        <li style={loginstyle}>
          <CookiesProvider>
            <Login/>
          </CookiesProvider>
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
  };
}
export default connect(state2props)(Nav);
