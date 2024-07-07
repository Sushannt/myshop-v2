import PropTypes from "prop-types";
const InputControl = ({ children, label, altLabel }) => {
  return (
    <label className="form-control min-w-full">
      <div className="label">
        <span className="label-text tracking-wide text-secondary-700">
          {label}
        </span>
        <span className="label-text-alt tracking-wide text-red-500">
          {altLabel}
        </span>
      </div>
      {children}
    </label>
  );
};

InputControl.propTypes = {
  label: PropTypes.string.isRequired,
  altLabel: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default InputControl;
