import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Spin from './../Spin';
import Inputs from '../../components/Inputs';
import { QueryDB } from './../../services/QueryDB';

let Edit = () => {
  let navigate = useNavigate();
  let { userId } = useParams();

  let [state, setState] = useState({
    loading: false,
    user: {
      fname: '',
      mname: '',
      lname: '',
      email: '',
      pschool: '',
      address: '',
      photo: '',
    },
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

  let formInputFields = [
    {
      id: 1,
      type: 'text',
      name: 'fname',
      errorMesg: 'First Name must be 3-10 letters and no space in-between.',
      pattern: '^[A-Za-z]{3,10}$',
      placeholder: 'First Name',
      required: true,
    },
    {
      id: 2,
      type: 'text',
      name: 'mname',
      errorMesg: 'Middle Name must be 1-10 letters and no space in-between.',
      pattern: '^[A-Za-z]{1,10}$',
      placeholder: 'middle Name',
    },
    {
      id: 3,
      type: 'text',
      name: 'lname',
      errorMesg: 'Last Name must be 3-10 letters and no space in-between.',
      pattern: '^[A-Za-z]{3,10}$',
      placeholder: 'Last Name',
      required: true,
    },
    {
      id: 4,
      type: 'email',
      name: 'email',
      errorMesg: 'Email is not valid',
      placeholder: 'Email Address',
      required: true,
    },
    {
      id: 5,
      type: 'text',
      name: 'pschool',
      errorMesg: 'Field can not be Empty',
      placeholder: 'Student previous school',
      required: true,
    },
    {
      id: 6,
      type: 'text',
      name: 'address',
      errorMesg: 'Field can not be Empty',
      placeholder: 'Address',
      pattern: '^[A-Za-z]{3,10}$',
      required: true,
    },
    {
      id: 7,
      type: 'text',
      name: 'photo',
      errorMesg: 'Field can not be Empty',
      placeholder: 'User photo URL',
      required: true,
    },
  ];

  let onChange = (event) => {
    setState({
      ...state,
      user: {
        ...state.user,
        [event.target.name]: event.target.value,
      },
    });
  };

  let handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response = await QueryDB.updateUser(state.user, userId);
      if (response) {
        navigate(`/student/${userId}`, { replace: true });
      }
    } catch (error) {
      setState({ ...state, errorMessage: error.message });
      navigate(`/student/edit/${userId}`, { replace: false });
    }
  };

  let { loading, user } = state;

  return (
    <React.Fragment>
      <section className="container p-3">
        <div className="grid">
          <div className="row">
            <div className="col">
              <p className="h3">
                <i className="fa fa-user" /> Edit Student's Record
              </p>
              <p>
                Edit student's records and it serve as an admission data from
                Students
              </p>
            </div>
          </div>
          {loading ? (
            <Spin />
          ) : (
            <form className="form-group" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col">
                  <div className="col-md-9 mb-2">
                    {formInputFields.map((input) => (
                      <Inputs
                        key={input.id}
                        {...input}
                        value={state.user[input.name]}
                        onChange={onChange}
                      />
                    ))}
                  </div>
                  <div className="col-md-6 mb-2">
                    <input
                      type="submit"
                      value="Update"
                      className="btn btn-primary"
                    />
                    <Link to="/students" className="btn btn-secondary mx-2">
                      Cancel
                    </Link>
                  </div>
                </div>
                <div className="col-md-3">
                  <img src={user.photo} className="user-img" alt={user.photo} />
                </div>
              </div>
            </form>
          )}
        </div>
      </section>
    </React.Fragment>
  );
};
export default Edit;
