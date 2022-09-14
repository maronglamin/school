import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Spin from './../Spin';
import { QueryDB } from '../../services/QueryDB';

let View_student = () => {
  let { userId } = useParams();

  let [state, setState] = useState({
    loading: false,
    user: {},
    errorMessage: '',
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setState({ ...state, loading: true });
        let response = await QueryDB.getStudent(userId);
        setState({
          ...state,
          loading: false,
          user: response.data,
        });
      } catch (error) {
        setState({
          ...state,
          loading: false,
          errorMessage: error.message,
        });
      }
    }
    fetchData();
  }, [userId]);

  let { loading, user } = state;
  return (
    <React.Fragment>
      <section className="view-contact p-3">
        <div className="container">
          <div className="row">
            <p className="h3 text-secondary fw-bold">View Student</p>
            <p className="col-md-6 fst-italic">
              View a student enrolled in the school. This recorded data was
              inputted from the enrollment time. This is an enrolled student
            </p>
          </div>
        </div>
      </section>
      {loading ? (
        <Spin />
      ) : (
        <React.Fragment>
          {Object.keys(user).length > 0 && (
            <section className="mt-3">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-4 userImg">
                    <img
                      src={user.photo}
                      alt={user.name}
                      className="user-img d-block m-auto mb-2"
                    />
                  </div>
                  <div className="col-md-8">
                    <ul className="list-group">
                      <li className="list-group-item list-group-item-action">
                        Name: <br />
                        <span className="fw-bold">
                          {user.fname} {user.mname} {user.lname}
                        </span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Email: <br />
                        <span className="fw-bold">{user.email}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Address: <br />
                        <span className="fw-bold">{user.address}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Previous Attended School: <br />
                        <span className="fw-bold">{user.pschool}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <Link to={`/students`} className="btn btn-secondary ms-2">
                      <i className="fa fa-arrow-left"></i> Back
                    </Link>
                    <Link
                      to={`/student/edit/${userId}`}
                      className="btn btn-primary ms-2"
                    >
                      <i className="fa fa-pen"></i> Edit
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default View_student;
