import PropTypes from "prop-types";

const FormControl = ({ type, label, value, setValue }) => (
  <div className="form-control">
    <input
      type={type}
      required
      onChange={(e) => setValue(e.target.value)}
      className={value.length > 0 ? "notepmty" : ""}
    />
    <label>
      {label.split("").map((char, index) => (
        <span key={index} style={{ transitionDelay: `${index * 50}ms` }}>
          {char}
        </span>
      ))}
    </label>
  </div>
);

FormControl.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default FormControl;
