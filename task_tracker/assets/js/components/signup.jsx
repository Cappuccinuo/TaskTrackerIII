import React from 'react';
import { connect } from 'react-redux';
import { Input } from 'reactstrap';
import api from '../api';

function Signup(props) {
  console.log("props@SignupForm", props);

  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_FORM',
      data: data,
    };
    console.log(action);
    props.dispatch(action);
  }

  function submit(ev) {
    api.submit_user(props.form);
    console.log(props.form);
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
          value={props.form.name} onChange={update}/>
      </div>
      <div className="form-group">
        <label>Email</label>
        <textarea className="form-control"
          name="email" value={props.form.email}
          onChange={update}></textarea>
      </div>
      <button onClick={submit} className="btn btn-primary">Sign up</button>
    </form>
  );
}


function state2props(state) {
  console.log("props@SignupForm", state);
  return {
    form: state.form,
  };
}

export default connect(state2props)(Signup);
