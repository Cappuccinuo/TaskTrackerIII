import api from '../api';
import React from 'react';

export default function TaskInfo(props) {
  console.log(task);
  let task = props.task;
  return (
    <div>
      <h3>Title</h3>
      <p>{task.title}</p>
      <h3>Description</h3>
      <p>{task.description}</p>
    </div>
  )
}
