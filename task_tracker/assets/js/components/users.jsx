import React from 'react';
import { Link } from 'react-router-dom';

export default function Users(params) {
  let users = _.map(params.users, (uu) => <p>{uu.id}</p>);
  return <div>
    {users}
  </div>;
}
