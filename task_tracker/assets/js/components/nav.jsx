import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavItem } from 'reactstrap';

export default function Nav(props) {
  return <header className="header">
    <nav role="navigation">
      <ul className="nav nav-pills pull-right">
        <li>
          <NavLink to="/users" exact={true} activeClassName="active" className="nav-link">
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/tasks" exact={true} activeClassName="active" className="nav-link">
            Tasks
          </NavLink>
        </li>
      </ul>
    </nav>
    <span className="logo"></span>
  </header>;
}
