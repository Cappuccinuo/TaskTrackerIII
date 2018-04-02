import React from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import api from 'js/api';
import { Link } from 'react-router-dom';

function Taskmodify(props) {
  console.log("props@TaskModify", props);

  function modify(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();

    let action = {
      type: 'MODIFY_FORM',
      data: data,
    };
    console.log(action);
    props.dispatch(action);
  }

  function submit(ev) {
    api.modify_task(props.modify_form, props.modify_id);
    console.log(props.modify_form);
    console.log(props.modify_id);
  }
  let users = _.map(props.users, (uu) => <option key={uu.id} value={uu.id}>{uu.name}</option>);
  return (
    <form>
      <h2>Modify Task</h2>
      <div className="form-group">
        <label>Title</label>
        <input className="form-control" name="title"
          value={props.modify_form.title} onChange={modify}/>
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea className="form-control"
          name="description" value={props.modify_form.description}
          rows="3" onChange={modify}></textarea>
      </div>
      <div className="form-group">
          <label className="form-check-label">
            Boss
          </label>
          <Input className="form-control" type="select"
            name="boss_id" value={props.modify_form.boss_id} onChange={modify}>
            <option></option>
            {users}
          </Input>
      </div>
      <div className="form-group">
          <label className="form-check-label">
            Assigned Worker
          </label>
          <Input className="form-control" type="select"
            name="user_id" value={props.modify_form.user_id} onChange={modify}>
            <option></option>
            {users}
          </Input>
      </div>
      <button onClick={submit} className="btn btn-primary">Submit</button>
    </form>
  );
}


function state2props(state) {
  console.log("rerender@TaskModify", state);
  return {
    modify_form: state.modify_form,
    users: state.users,
  };
}

export default connect(state2props)(Taskmodify);
