import React from 'react';
import { NavLink } from 'react-router-dom';
import Login from "./login";
import api from '../api';
import { connect } from 'react-redux';
import { Form, FormGroup, Input, Button } from 'reactstrap';

let LoginForm = connect(({login}) => {return {login};})((props) => {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    });
  }

  function create_token(ev) {
    api.submit_login(props.login);
    console.log(props.login);
  }

  return <div className="navbar-text">
    <Form inline>
      <FormGroup>
        <Input type="text" name="email" placeholder="email"
               value={props.login.email} onChange={update} />
      </FormGroup>
      <Button onClick={create_token}>Log In</Button>
    </Form>
  </div>;
});

let Session = connect(({token}) => {return {token};})((props) => {
  return <div className="navbar-text">
    User id = { props.token.user_id }
  </div>;
});

function Nav(props) {
  let session_info;

  if (props.token) {
    session_info = <Session token={props.token} />;
  }
  else {
    session_info = <LoginForm />
  }

  return <header className="header">
    <nav role="navigation">
      <ul className="nav nav-pills pull-right">
        <li>
          <NavLink to="/users" exact={true} activeClassName="active" className="nav-link">
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/tasks" exact={true} activeClassName="active" className="nav-link">
            Tasks
          </NavLink>
        </li>
        <li>
          <NavLink to="/newtask" exact={true} activeClassName="active" className="nav-link">
            New Task
          </NavLink>
        </li>
        <li>
          { session_info }
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
