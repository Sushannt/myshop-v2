import PropTypes from "prop-types";
const InputControl = ({ children, label, altLabel }) => {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text text-secondary-700 tracking-wide">
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
