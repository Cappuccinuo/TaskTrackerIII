import React from 'react';
import { connect } from 'react-redux';
import { Input } from 'reactstrap';
import api from 'js/api';

function Taskedit(props) {
  console.log("props@TaskEdit", props);

  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    if (tgt.attr('name') == "completed") {
      if ($(tgt).is(':checked')) {
        tgt.attr('value', "1");
      }
      else {
        tgt.attr('value', "0");
      }
    }
    data[tgt.attr('name')] = tgt.val();

    let action = {
      type: 'UPDATE_FORM',
      data: data,
    };
    console.log(action);
    props.dispatch(action);
  }

  function submit(ev) {
    api.update_task(props.update_form, props.update_id);
    console.log(props.update_form);
    console.log(props.update_id);
  }

  return (
    <form>
      <div className="form-group">
          <label className="form-check-label">
            Complete
          </label>
          <br />
          <input className="form-check-input" type="checkbox" name="completed"
            value={props.update_form.completed} onChange={update}/>
      </div>
      <div className="form-group">
          <label className="form-check-label">
            Time Spent
          </label>
          <input className="form-control" type="number" step="15" min="0"
            name="time" value={props.update_form.time} onChange={update}/>
      </div>
      <button onClick={submit} className="btn btn-primary">Submit</button>
    </form>
  );
}


function state2props(state) {
  console.log("rerender@TaskEdit", state);
  return {
    update_form: state.update_form,
  };
}

export default connect(state2props)(Taskedit);
