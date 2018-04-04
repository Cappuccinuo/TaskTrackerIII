import React from 'react';
import { connect } from 'react-redux';
import api from 'js/api';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { Redirect } from 'react-router'
import swal from 'sweetalert';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
    this.update = this.update.bind(this);
    this.submit = this.submit.bind(this);
    this.clear = this.clear.bind(this);
  }

  update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_SIGNUP_FORM',
      data: data,
    };
    this.props.dispatch(action);
  }

  submit(ev) {
    api.submit_user(this.props.signup);
    this.props.dispatch({
      type: 'CLEAR_SIGNUP_FORM',
    });
    this.setState({ redirect: true });
  }

  clear(ev) {
    this.props.dispatch({
      type: 'CLEAR_SIGNUP_FORM',
    });
  }

  render() {
    const { from } = '/';
    const { redirect } = this.state;

    return (
      <div>
      <form>
        <h2>New User</h2>
        <div className="form-group">
          <label>Name</label>
          <input className="form-control" name="name" placeholder="name"
            value={this.props.signup.name} onChange={this.update} required/>
        </div>
        <div className="form-group">
          <label>Email</label>
          <input className="form-control"
            name="email" type="email" placeholder="email" value={this.props.signup.email}
            onChange={this.update} required/>
        </div>
        <div className="form-group">
           <label>Password</label>
           <Input type="password" name="password" placeholder="password"
                  value={this.props.signup.password} onChange={this.update} required/>
        </div>
        <button style={{marginRight: '10px'}} onClick={this.submit} className="btn btn-primary">Sign up</button>
        <button style={{marginRight: '10px'}} onClick={this.clear} className="btn btn-primary">Reset</button>
        <Link to={"/"} style={{ textDecoration: 'none', color: 'white'}}><Button color="primary">Back</Button></Link>
      </form>
      {redirect && (
          <Redirect to={from || '/'}/>
        )}
      </div>
    );
  }

}


function state2props(state) {
  console.log("props@SignupForm", state);
  return {
    signup: state.signup,
  };
}

export default connect(state2props)(Signup);
