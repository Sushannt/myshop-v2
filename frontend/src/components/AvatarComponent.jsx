import PropTypes from "prop-types";

const AvatarComponent = ({ children }) => {
  return (
    <div className="avatar">
      <div className="w-16 rounded-xl">{children}</div>
    </div>
  );
};

AvatarComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AvatarComponent;
