import React from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import api from 'js/api';
import { NavLink, Redirect, Link } from 'react-router-dom';

function Login(props) {
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

  return <div className="container-fluid">
    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav navbar-right">
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown"><b>Login</b> <span className="caret"></span></a>
            <ul id="login-dp" className="dropdown-menu">
            <li>
               <div className="row">
                  <div className="col-md-12">
                    Login
                     <form className="form" role="form" method="post" action="login" id="login-nav">
                        <div className="form-group">
                           <label className="sr-only">Email address</label>
                           <Input type="text" name="email" placeholder="email"
                                  value={props.login.email} onChange={update} />
                        </div>
                        <div className="form-group">
                           <label className="sr-only">Password</label>
                           <Input type="password" name="password" placeholder="password"
                                  value={props.login.password} onChange={update} />
                        </div>
                        <div className="form-group">
                           <Button className="btn btn-primary btn-block" onClick={create_token}>Sign in</Button>
                        </div>
                     </form>
                  </div>
                  <div className="bottom text-center">
                    New here ? <Link to="/signup">Sign up</Link>
                  </div>
               </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>;
}

function state2props(state) {
  console.log(state.token);
  return {
    login: state.login,
    token: state.token,
  };
}
export default connect(state2props)(Login);
