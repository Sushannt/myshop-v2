import PropTypes from "prop-types";

const FormContainer = ({ children }) => {
  return (
    <section className="flex justify-normal md:justify-center">
      <div className="w-3/4 md:w-2/4 space-y-10 mx-auto">{children}</div>
    </section>
  );
};

FormContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
export default FormContainer;
