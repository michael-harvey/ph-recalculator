import React from "react";
import PropTypes from "prop-types";

// TODO: field styles
function InputField({ label, id, type, name, value, placeholder, onChange }) {
  return (
    <div className="field">
      <label className="field__label">{label}</label>
      <input
        className="field__input"
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      <span className="field__error">{error}</span>
    </div>
  );
}

InputField.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default InputField;
