import React from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import api from 'js/api';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router'

class Taskmodify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
    this.modify = this.modify.bind(this);
    this.submit = this.submit.bind(this);
  }

  modify(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();

    let action = {
      type: 'MODIFY_FORM',
      data: data,
    };
    this.props.dispatch(action);
  }

  submit(ev) {
    ev.preventDefault();
    api.modify_task(this.props.modify_form, this.props.modify_id);
    swal({
      title: "Modify Success!",
      text: "You can check the task now",
      icon: "success",
    });
    this.setState({ redirect: true });
  }


  render() {
    let users = _.map(this.props.users, (uu) => <option key={uu.id} value={uu.id}>{uu.name}({uu.email})</option>);
    let task = this.props.task;

    const { from } = '/myassigned';
    const { redirect } = this.state;
    return (
      <div>
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
            value={this.props.modify_form.title} onChange={this.modify} required/>
        </div>
        <div className="form-group">
          <label><h3>New Description</h3></label>
          <textarea className="form-control"
            name="description" value={this.props.modify_form.description}
            rows="3" onChange={this.modify} required></textarea>
        </div>

        <div className="form-group">
            <label className="form-check-label">
              <h3>New Assigned Worker</h3>
            </label>
            <Input className="form-control" type="select"
              name="user_id" value={this.props.modify_form.user_id} onChange={this.modify} required>
              <option></option>
              {users}
            </Input>
        </div>
        <button style={{marginRight: '10px'}} onClick={this.submit} className="btn btn-primary">Submit</button>
        <span>
          <Link to={"/myassigned/"} style={{ textDecoration: 'none', color: 'white'}}><Button color="primary">Back</Button></Link>
        </span>
      </form>
      {redirect && (
          <Redirect to={from || '/myassigned'}/>
        )}
    </div>
    );
  }
}

function state2props(state) {
  console.log("rerender@TaskModify", state);
  return {
    modify_form: state.modify_form,
    users: state.users,
  };
}

export default connect(state2props)(Taskmodify);
