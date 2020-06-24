import React from "react";
import PropTypes from "prop-types";

function InputField({
  label,
  id,
  type,
  name,
  value,
  placeholder,
  onChange,
  pattern,
}) {
  return (
    <div className="field">
      <label
        htmlFor={id}
        dangerouslySetInnerHTML={{ __html: label }} // label contains subscript tags
      />
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        pattern={pattern}
      />
    </div>
  );
}

InputField.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  pattern: PropTypes.string,
};

export default InputField;
