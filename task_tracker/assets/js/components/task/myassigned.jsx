import React from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { NavLink, Redirect, Link } from 'react-router-dom';
import api from 'js/api';

function TaskSpecific(params) {
  let completed = (params.task.completed == "1") ? "completed" : "pending";

  function del(ev) {
    api.delete_task(params.task.id);
  }

  return <tr>
      <td>{params.task.title}</td>
      <td>{params.task.description}</td>
      <td>{completed}</td>
      <td>{params.task.time}</td>
      <td>{params.task.user.name}</td>
      <td><button onClick={del} className="btn btn-primary">Delete</button></td>
      <td><Link to={"/tasks/" + params.task.id + "/modify"} style={{ textDecoration: 'none', color: 'white'}}><Button color="primary">Modify</Button></Link></td>
    </tr>;
}

export default function Myassigned(params) {
  let my_assigned_tasks = _.filter(params.tasks, (tt) => params.user_id == tt.boss.id);
  let show_assigned_tasks = _.map(my_assigned_tasks, (tt) => <TaskSpecific key={tt.id} task={tt}/>);
  return (
    <div>
      <h2>My Assigned Tasks</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Completed</th>
            <th scope="col">Time</th>
            <th scope="col">Worker</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {show_assigned_tasks}
        </tbody>
      </table>
    </div>
  );
}
