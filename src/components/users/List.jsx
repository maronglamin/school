import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { QueryDB } from '../../services/QueryDB';
import Spin from './../Spin';

let List = () => {
  let [query, setQuery] = useState({
    text: '',
  });
  let [state, setState] = useState({
    loading: false,
    users: [],
    filtered: [],
    errorMessage: '',
  });

  let clickDelete = async (userId) => {
    try {
      let response = await QueryDB.deleteUser(userId);
      if (response) {
        setState({ ...state, loading: true });
        let responseDel = await QueryDB.getAllStudents;
        setState({
          ...state,
          loading: false,
          users: responseDel.data,
          filtered: responseDel.data,
        });
      }
    } catch (error) {
      setState({
        ...state,
        loading: false,
        errorMessage: error.message,
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setState({ ...state, loading: true });
        let response = await QueryDB.getAllStudents();
        setState({
          ...state,
          loading: false,
          users: response.data,
          filtered: response.data,
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
  }, []);

  let searchUser = (event) => {
    setQuery({ ...query, text: event.target.value });
    let theUser = state.filtered.filter((user) => {
      return user.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setState({
      ...state,
      filtered: theUser,
    });
  };

  let { loading, filtered } = state;

  return (
    <React.Fragment>
      <section className="container p-3">
        <div className="grid">
          <div className="row">
            <div className="col">
              <p className="h3">
                <i className="fa fa-home" /> Overall Students in the school
                <Link to={'/users/add'} className="btn btn-primary ms-2">
                  <i className="fa fa-plus-circle me-1"></i> New Student
                </Link>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-sm-8 col-xs-8">
              <form className="row">
                <div className="col">
                  <div className="mb-2">
                    <input
                      type="text"
                      value={query.text}
                      className="form-control"
                      onChange={searchUser}
                      placeholder="Search Student by names"
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="mb-2">
                    <input
                      type="submit"
                      value="Search"
                      className="btn btn-outline-dark"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <Spin />
      ) : (
        <React.Fragment>
          <section className="contact-list">
            <div className="container">
              <div className="row">
                <div className="col-md-12 key={contact.id}">
                  <div className="card my-2">
                    <div className="card-body">
                      <div className="row">
                        <h2 className="text-center text-secondary text-bold">
                          Student Records
                        </h2>
                        <div className="container">
                          <table className="table table-responsive table-bordered table-condensed table-striped table-hover table-sm">
                            <thead>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Email</th>
                              <th>Previous School</th>
                              <th>Address</th>
                              <th></th>
                            </thead>
                            <tbody>
                              {filtered.length > 0 &&
                                filtered.map((user) => {
                                  return (
                                    <tr key={user.id}>
                                      <td>
                                        {user.fname} {user.mname}
                                      </td>
                                      <td>{user.lname}</td>
                                      <td>{user.email}</td>
                                      <td>{user.pschool}</td>
                                      <td>{user.address}</td>
                                      <td>
                                        <Link
                                          to={`/student/${user.id}`}
                                          className="my-1 mx-3"
                                        >
                                          <i className="fa fa-eye"></i>
                                        </Link>
                                        <Link
                                          to={`/student/edit/${user.id}`}
                                          className="my-1 me-3"
                                        >
                                          <i className="fa fa-pen"></i>
                                        </Link>
                                        <button
                                          className="my-1 me-3 bg-danger text-light"
                                          onClick={() => clickDelete(user.id)}
                                        >
                                          <i className="fa fa-trash ms-1"></i>
                                          {' Detele Record'}
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default List;
