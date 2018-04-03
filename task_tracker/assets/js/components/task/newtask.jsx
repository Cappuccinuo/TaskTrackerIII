import React from 'react';
import { connect } from 'react-redux';
import { Input } from 'reactstrap';
import api from 'js/api';

function Newtask(props) {
  console.log("props@TaskForm", props);

  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data["boss_id"] = props.boss_id;
    if (tgt.attr('name') == "completed") {
      if ($(tgt).is(':checked')) {
        tgt.attr('value', 'true');
        data["completed"] = 'true';
      }
      else {
        tgt.attr('value', 'false');
        data["completed"] = 'false';
      }
    }
    else {
      data[tgt.attr('name')] = tgt.val();
    }
    let action = {
      type: 'UPDATE_FORM',
      data: data,
    };
    console.log(action);
    props.dispatch(action);
  }

  function submit(ev) {
    api.submit_task(props.form);
    console.log(props.form);
  }

  function clear(ev) {
    props.dispatch({
      type: 'CLEAR_FORM',
    });
  }
  let users = _.map(props.users, (uu) => <option key={uu.id} value={uu.id}>{uu.name}({uu.email})</option>);
  let meUser = _.filter(props.users, (uu) => props.boss_id == uu.id);
  return (
    <form>
      <h2>New Task</h2>
      <div className="form-group">
        <label>Title</label>
        <input className="form-control" name="title"
          value={props.form.title} onChange={update} required/>
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea className="form-control"
          name="description" value={props.form.description}
          rows="3" onChange={update} required></textarea>
      </div>

      <div className="form-group">
          <label className="form-check-label">
            Assigned Worker
          </label>
          <Input className="form-control" type="select"
            name="user_id" value={props.form.user_id} onChange={update} required>
            <option></option>
            {users}
          </Input>
      </div>
      <button onClick={submit} className="btn btn-primary">Submit</button>
    </form>
  );
}


function state2props(state) {
  console.log("rerender@TaskForm", state);
  return {
    form: state.form,
    users: state.users,
  };
}

export default connect(state2props)(Newtask);
