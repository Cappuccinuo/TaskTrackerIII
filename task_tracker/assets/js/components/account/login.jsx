import React from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import api from 'js/api';
import { NavLink, Redirect, Link } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.create_token = this.create_token.bind(this);
    this.delete_token = this.delete_token.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.token != this.props.token) {
      if(this.props.token) {
        this.props.cookies.set("token", this.props.token);
      }
      else {
        this.props.cookies.remove("token");
      }
      console.log("cookie", this.props.cookies);
    }
  }

  update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    this.props.dispatch({
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    });
  }

  create_token(ev) {
    api.submit_login(this.props.login);
  }

  delete_token(ev) {
    this.props.dispatch({
      type: "DELETE_TOKEN",
    });
  }

  get_current_user_name(users, user_id) {
    let user = "";
    _.map(users, (uu) => {
      if (uu.id == user_id) {
        user = uu;
      }
    })
    return user.name;
  }

  render() {
    if (this.props.token) {
      console.log("props", this.props.users);
      let user_name = this.get_current_user_name(this.props.users, this.props.token.user_id);

      return <div className="navbar-text">
        <span>Welcome back, { user_name }</span>
        <Button onClick={this.delete_token}>Log out</Button>
      </div>;
    }
    else {
      return <div className="container-fluid">
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right">
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown"><b>Login</b> </a>
                <ul id="login-dp" className="dropdown-menu">
                <li>
                   <div className="row">
                      <div className="col-md-12">
                         <form className="form" role="form" method="post" action="login" id="login-nav">
                            <div className="form-group">
                               <label className="sr-only">Email address</label>
                               <Input type="text" name="email" placeholder="email"
                                      value={this.props.login.email} onChange={this.update} />
                            </div>
                            <div className="form-group">
                               <label className="sr-only">Password</label>
                               <Input type="password" name="password" placeholder="password"
                                      value={this.props.login.password} onChange={this.update} />
                            </div>
                            <div className="form-group">
                               <Button className="btn btn-primary btn-block" onClick={this.create_token}>Sign in</Button>
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
  }
}

function state2props(state) {
  console.log(state.token);
  return {
    login: state.login,
    token: state.token,
    users: state.users,
  };
}

export default connect(state2props)(withCookies(Login));
