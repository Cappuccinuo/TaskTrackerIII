import React from 'react';
import { Link } from 'react-router-dom';

function User(params) {
  return <tr>
      <td>{params.user.id}</td>
      <td>{params.user.email}</td>
      <td>{params.user.name}</td>
    </tr>;
}

export default function Users(params) {
  let users = _.map(params.users, (uu) => <User key={uu.id} user={uu} />);
  return <div>
    <h2>All Users</h2>
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Email</th>
          <th scope="col">Name</th>
        </tr>
      </thead>
      <tbody>
        {users}
      </tbody>
    </table>
  </div>
}
