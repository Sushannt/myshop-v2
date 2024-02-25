import PropTypes from "prop-types";

const Alert = ({ variant, children }) => {
  return (
    <div role="alert" className={`alert ${variant ? `alert-${variant}` : ""}`}>
      {children}
    </div>
  );
};

Alert.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Alert;
