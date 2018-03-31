import React from 'react';

function Task(params) {
  let completed = params.task.completed ? "completed" : "pending";

  return <tr>
      <td>{params.task.title}</td>
      <td>{params.task.description}</td>
      <td>{completed}</td>
      <td>{params.task.time}</td>
      <td>{params.task.user.name}</td>
    </tr>;
}

export default function Tasks(params) {
  let tasks = _.map(params.tasks, (tt) => <Task key={tt.id} task={tt} />);
  return (
    <div>
      <h2>All Users</h2>
      <table className="table table-bordered table-dark">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Completed</th>
            <th scope="col">Time</th>
            <th scope="col">Worker</th>
          </tr>
        </thead>
        <tbody>
          {tasks}
        </tbody>
      </table>
    </div>
  );
}
