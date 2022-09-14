import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Yalding from './components/Yalding';
import Add from './components/users/Add';
import ViewStudent from './components/users/View_student';
import List from './components/users/List';
import Edit from './components/users/Edit';

let App = () => {
  return (
    <div className="App">
      <React.Fragment>
        <NavBar />
        <Routes>
          <Route path={'/'} element={<Navigate to={'/yalding'} />} />
          <Route path={'/yalding'} element={<Yalding />} />
          <Route path={'/users/add'} element={<Add />} />
          <Route path={'/student/:userId'} element={<ViewStudent />} />
          <Route path={'/students'} element={<List />} />
          <Route path={'/student/edit/:userId'} element={<Edit />} />
        </Routes>
      </React.Fragment>
    </div>
  );
};

export default App;
