import React from "react";

function TextField({ id, type, name, value, placeholder, onChange }) {
  return (
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default TextField;
