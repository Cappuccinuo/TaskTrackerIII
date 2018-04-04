import React                from 'react';
import { connect }          from 'react-redux';
import { Input }            from 'reactstrap';
import api                  from 'js/api';
import { Redirect }         from 'react-router-dom';

class Newtask extends React.Component {
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
    data["boss_id"] = this.props.boss_id;
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
    this.props.dispatch(action);
  }

  submit(ev) {
    api.submit_task(this.props.form);
    this.setState({ redirect: true });
    
  }

  clear(ev) {
    this.props.dispatch({
      type: 'CLEAR_FORM',
    });
  }

  render() {
    const { from } = '/myassigned';
    const { redirect } = this.state;
    let users = _.map(this.props.users, (uu) => <option key={uu.id} value={uu.id}>{uu.name}({uu.email})</option>);
    let meUser = _.filter(this.props.users, (uu) => this.props.boss_id == uu.id);
    return (
      <div>
        <form>
          <h2>New Task</h2>
          <div className="form-group">
            <label>Title</label>
            <input className="form-control" name="title"
              value={this.props.form.title} onChange={this.update} required/>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea className="form-control"
              name="description" value={this.props.form.description}
              rows="3" onChange={this.update} required></textarea>
          </div>

          <div className="form-group">
              <label className="form-check-label">
                Assigned Worker
              </label>
              <Input className="form-control" type="select"
                name="user_id" value={this.props.form.user_id} onChange={this.update} required>
                <option></option>
                {users}
              </Input>
          </div>
          <button onClick={this.submit} className="btn btn-primary">Submit</button>
        </form>
        {redirect && (
          <Redirect to={from || '/myassigned'}/>
        )}
      </div>
    );
  }
}


function state2props(state) {
  console.log("rerender@TaskForm", state);
  return {
    form: state.form,
    users: state.users,
  };
}

export default connect(state2props)(Newtask);
