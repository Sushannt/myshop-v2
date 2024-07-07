import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className="pt-5">
      <ul className="flex justify-between w-full md:w-3/4 lg:w-2/4 mx-auto font-semibold">
        <li>
          {step1 ? (
            <NavLink to={"/login"} className="text-neutral-800">
              Sign In
            </NavLink>
          ) : (
            <span className="text-neutral-800/25">Sign In</span>
          )}
        </li>
        <li>
          {step2 ? (
            <NavLink to={"/shipping"} className="text-neutral-800">
              Shipping
            </NavLink>
          ) : (
            <span className="text-neutral-800/25">Shipping</span>
          )}
        </li>
        <li>
          {step3 ? (
            <NavLink to={"/payment"} className="text-neutral-800">
              Payment
            </NavLink>
          ) : (
            <span className="text-neutral-800/25">Payment</span>
          )}
        </li>
        <li>
          {step4 ? (
            <NavLink to={"/placeorder"} className="text-neutral-800">
              Place Order
            </NavLink>
          ) : (
            <span className="text-neutral-800/25">Place Order</span>
          )}
        </li>
      </ul>
    </nav>
  );
};

CheckoutSteps.propTypes = {
  step1: PropTypes.bool,
  step2: PropTypes.bool,
  step3: PropTypes.bool,
  step4: PropTypes.bool,
};

export default CheckoutSteps;
