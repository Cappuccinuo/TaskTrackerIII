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
  let task = props.task;
  return (
    <form>
      <h2>Modify Task</h2>

      <div>
        <h3>Title</h3>
        <p>{task.title}</p>
        <h3>Description</h3>
        <p>{task.description}</p>
      </div>

      <div className="form-group">
        <label><h3>New Title</h3></label>
        <input className="form-control" name="title"
          value={props.modify_form.title} onChange={modify} required/>
      </div>
      <div className="form-group">
        <label><h3>New Description</h3></label>
        <textarea className="form-control"
          name="description" value={props.modify_form.description}
          rows="3" onChange={modify} required></textarea>
      </div>

      <div className="form-group">
          <label className="form-check-label">
            <h3>New Assigned Worker</h3>
          </label>
          <Input className="form-control" type="select"
            name="user_id" value={props.modify_form.user_id} onChange={modify} required>
            <option></option>
            {users}
          </Input>
      </div>
      <button style={{marginRight: '10px'}} onClick={submit} className="btn btn-primary">Submit</button>
      <span>
        <Link to={"/myassigned/"} style={{ textDecoration: 'none', color: 'white'}}><Button color="primary">Back</Button></Link>
      </span>
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
