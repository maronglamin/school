import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Inputs from '../../components/Inputs';
import { QueryDB } from './../../services/QueryDB';

let Add = () => {
  let navigate = useNavigate();
  let [values, setValues] = useState({
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
  });

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

  let handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response = await QueryDB.createUsers(values.user);
      if (response) {
        navigate('/students', { replace: true });
      }
    } catch (error) {
      setValues({ ...values });
      navigate('/users/add', { replace: false });
    }
  };

  let onChange = (event) => {
    setValues({
      ...values,
      user: {
        ...values.user,
        [event.target.name]: event.target.value,
      },
    });
  };

  return (
    <React.Fragment>
      <section className="container p-3">
        <div className="grid">
          <div className="row">
            <div className="col">
              <p className="h3">
                <i className="fa fa-user" /> Add Student's Record
              </p>
              <p>
                Add student records and it serve as an admission data from
                Students
              </p>
            </div>
          </div>
          <form className="form-group" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col">
                <div className="col-md-9 mb-2">
                  {formInputFields.map((input) => (
                    <Inputs
                      key={input.id}
                      {...input}
                      value={values[input.name]}
                      onChange={onChange}
                    />
                  ))}
                </div>
                <div className="col-md-6 mb-2">
                  <input
                    type="submit"
                    value="Create"
                    className="btn btn-primary"
                  />
                  <Link className="btn btn-secondary mx-2" to="/students">
                    Back
                  </Link>
                </div>
              </div>
              <div className="col-md-3">
                {values.user.photo !== '' ? (
                  <img
                    src={values.user.photo}
                    className="user-img"
                    alt={values.user.photo}
                  />
                ) : (
                  <h2 className="text-center text-secondary mt-5">
                    {'Photo URL not inputted'}
                  </h2>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>
    </React.Fragment>
  );
};
export default Add;
