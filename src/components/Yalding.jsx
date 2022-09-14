import React from 'react';
import { Link } from 'react-router-dom';

let Yalding = () => {
  return (
    <React.Fragment>
      <section className="container p-3">
        <div className="grid">
          <div className="row">
            <div className="col">
              <p className="h3">
                <i className="fa fa-home" /> Welcome to Yalding Basic Cycle
                School
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-sm-8 col-xs-8">
              <h3>
                Options:{' '}
                <Link className="btn btn-secondary mx-2" to={'/users/add'}>
                  <i className="fa fa-plus-circle me-1"></i> New Student
                </Link>{' '}
                <Link className="btn btn-primary mx-2" to="/students">
                  Enrolled Students
                </Link>
              </h3>
              <div className="col-md-12">
                <img className="wrapper-img" src="/logo.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Yalding;
