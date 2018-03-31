import React from 'react';
import { connect } from 'react-redux';
import api from '../api';

function Newtask(props) {
  console.log("props@TaskForm", props);

  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
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

  return (
    <form>
      <h2>New Task</h2>
      <div className="form-group">
        <label>Title</label>
        <input className="form-control" name="title"
          value={props.form.title} onChange={update}/>
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea className="form-control"
          name="description" value={props.form.description}
          rows="3" onChange={update}></textarea>
      </div>
      <div className="form-group">
          <label className="form-check-label">
            Complete
          </label>
          <br />
          <input className="form-check-input" type="checkbox" name="completed"
            value="" onChange={update}/>
      </div>
      <div className="form-group">
          <label className="form-check-label">
            Time Spent
          </label>
          <input className="form-control" type="number" step="15" min="0"
            name="time" value={props.form.time} onChange={update}/>
      </div>
      <div className="form-group">
          <label className="form-check-label">
            Assigned Worker
          </label>
          <input className="form-control" type="number" min="1"
            name="user_id" value={props.form.user_id} onChange={update}/>
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
