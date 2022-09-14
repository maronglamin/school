import React from 'react';
import { Link } from 'react-router-dom';

let NavBar = () => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-dark bg-dark bavbar-expand-sm">
        <div className="container">
          <Link to={'/'} className="navbar-brand">
            <i className="fa fa-home text-warning" /> Yalding{' '}
            <span className="text-warning">Basic Cycle School</span>
          </Link>
        </div>
      </nav>
    </React.Fragment>
  );
};
export default NavBar;
