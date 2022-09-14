import { useState } from 'react';

let Inputs = (props) => {
  let [focused, setFocused] = useState(false);
  let { onChange, errorMesg, id, ...inputProps } = props;

  let handleFocus = (event) => {
    setFocused(true);
  };

  return (
    <div className="mb-2">
      <input
        className="form-control mb-1"
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        focused={focused.toString()}
      />
      <span className="fstyle text-danger">{errorMesg}</span>
    </div>
  );
};

export default Inputs;
