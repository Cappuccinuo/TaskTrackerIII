import React from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { NavLink, Redirect, Link } from 'react-router-dom';

function Task(params) {
  let completed = params.task.completed == "1" ? "completed" : "pending";

  return <tr>
      <td>{params.task.title}</td>
      <td>{params.task.description}</td>
      <td>{completed}</td>
      <td>{params.task.time}</td>
      <td>{params.task.user.name}</td>
      <td><Link to={"/tasks/" + params.task.id}>
        Detail
      </Link></td>
    </tr>;
}

export default function Mytasks(params) {
  let tasks = _.map(params.tasks, (tt) => <Task key={tt.id} task={tt} />);
  return (
    <div>
      <h2>My Tasks</h2>
      <table className="table table-bordered table-dark">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Completed</th>
            <th scope="col">Time</th>
            <th scope="col">Worker</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {tasks}
        </tbody>
      </table>
    </div>
  );
}
