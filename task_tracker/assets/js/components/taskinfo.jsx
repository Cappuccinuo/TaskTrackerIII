import api from '../api';
import React from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input, Button } from 'reactstrap';

export default function TaskInfo(props) {
  console.log(task);
  let task = props.task;
  return (
    <div>
      <h3>Title</h3>
      <p>{task.title}</p>
      <h3>Description</h3>
      <p>{task.description}</p>
      <Link to={"/tasks/" + task.id + "/edit"} style={{ textDecoration: 'none', color: 'white'}}><Button color="primary">Edit</Button></Link>
    </div>
  )
}
