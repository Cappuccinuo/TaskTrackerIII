import React from 'react';
import { connect } from 'react-redux';
import { Input } from 'reactstrap';
import api from 'js/api';

function Signup(props) {
  console.log("props@SignupForm", props);

  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_SIGNUP_FORM',
      data: data,
    };
    console.log(action);
    props.dispatch(action);
  }

  function submit(ev) {
    api.submit_user(props.signup);
    console.log(props.signup);
  }

  function clear(ev) {
    props.dispatch({
      type: 'CLEAR_FORM',
    });
  }

  return (
    <form>
      <h2>New User</h2>
      <div className="form-group">
        <label>Name</label>
        <input className="form-control" name="name"
          value={props.signup.name} onChange={update}/>
      </div>
      <div className="form-group">
        <label>Email</label>
        <input className="form-control"
          name="email" value={props.signup.email}
          onChange={update} />
      </div>
      <div className="form-group">
         <label>Password</label>
         <Input type="password" name="password" placeholder="password"
                value={props.signup.password} onChange={update} />
      </div>
      <button onClick={submit} className="btn btn-primary">Sign up</button>
      <button onClick={clear} className="btn btn-primary">Reset</button>
    </form>
  );
}


function state2props(state) {
  console.log("props@SignupForm", state);
  return {
    signup: state.signup,
  };
}

export default connect(state2props)(Signup);
