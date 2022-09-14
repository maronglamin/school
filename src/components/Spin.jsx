import React from 'react';
import spinnerImg from './../assets/img/spinner.gif';

let Spin = () => {
  return (
    <React.Fragment>
      <img src={spinnerImg} alt="" className="d-block m-auto img-size" />
    </React.Fragment>
  );
};

export default Spin;
