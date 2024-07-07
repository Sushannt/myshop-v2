import PropTypes from "prop-types";

export const InfoAlert = ({ message }) => {
  return (
    <div
      role="alert"
      className="alert alert-info  z-10 border-2 border-blue-500/75 bg-blue-300/75 text-blue-800"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="h-6 w-6 shrink-0 stroke-current"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <span>{message}</span>
    </div>
  );
};

export const ErrorAlert = ({ message }) => {
  return (
    <div
      role="alert"
      className="alert alert-error z-10 border-2 border-red-500/75 bg-red-300/75 text-red-800"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{message}</span>
    </div>
  );
};

export const SuccessAlert = ({ message }) => {
  return (
    <div
      role="alert"
      className="alert alert-success  z-10 border-2 border-green-500/75 bg-green-300/75 text-green-800"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{message}</span>
    </div>
  );
};

export const WarningAlert = ({ message }) => {
  return (
    <div
      role="alert"
      className="alert alert-warning  z-10 border-2 border-yellow-500/75 bg-yellow-300/75 text-yellow-800"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <span>{message}</span>
    </div>
  );
};

InfoAlert.propTypes = {
  message: PropTypes.string.isRequired,
};
ErrorAlert.propTypes = {
  message: PropTypes.string.isRequired,
};
SuccessAlert.propTypes = {
  message: PropTypes.string.isRequired,
};
WarningAlert.propTypes = {
  message: PropTypes.string.isRequired,
};
