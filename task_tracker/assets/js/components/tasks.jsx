import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Tasks(params) {
  return (
    <p>test3</p>
    <NavLink to="/tasks" exact={true} activeClassName="active" className="nav-link">
      Tasks
    </NavLink>
  );
}
