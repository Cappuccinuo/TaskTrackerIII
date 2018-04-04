import React from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import api from 'js/api';
import { Link, Redirect } from 'react-router-dom';

class Taskedit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
    this.update = this.update.bind(this);
    this.submit = this.submit.bind(this);
  }

  update(ev) {
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
      task_id: this.props.update_id,
      tasks: this.props.tasks,
    };
    this.props.dispatch(action);
  }

  submit(ev) {
    api.update_task(this.props.update_form, this.props.update_id);
    this.setState({ redirect: true });
    
  }

  render() {
    let task = this.props.task;
    const { from } = '/mytasks';
    const { redirect } = this.state;
    return (
      <div>
        <div>
          <h3>Title</h3>
          <p>{task.title}</p>
          <h3>Description</h3>
          <p>{task.description}</p>
        </div>
        <form>
          <div className="form-group">
              <label className="form-check-label">
                <h3>Complete</h3>
              </label>
              <br />
              <input className="form-check-input" type="checkbox" name="completed"
                value={this.props.update_form.completed} onChange={this.update}/>
          </div>
          <div className="form-group">
              <label className="form-check-label">
                <h3>Time Spent(min)</h3>
              </label>
              <input className="form-control" type="number" step="15" min="0"
                name="time" value={this.props.update_form.time} onChange={this.update}/>
          </div>
          <button style={{marginRight: '10px'}} onClick={this.submit} className="btn btn-primary">Submit</button>
          <Link to={"/mytasks/"} style={{ textDecoration: 'none', color: 'white'}}><Button color="primary">Back</Button></Link>
        </form>
        {redirect && (
          <Redirect to={from || '/mytasks'}/>
        )}
      </div>
    );
  }
}


function state2props(state) {
  console.log("rerender@TaskEdit", state);
  return {
    update_form: state.update_form,
  };
}

export default connect(state2props)(Taskedit);
