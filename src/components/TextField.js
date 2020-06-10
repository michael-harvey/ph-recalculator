import React from "react";

// TODO: field styles
// TODO: bring label in
// TODO: proptypes
function InputField({ id, type, name, value, placeholder, onChange }) {
  return (
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

export default InputField;
