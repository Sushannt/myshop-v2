import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../slices/cartSlice.mjs";
import FormContainer from "../components/FormContainer";
import InputControl from "../components/InputControl";

import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1 className="text-3xl font-semibold tracking-wide text-secondary-800">
        Payment Method
      </h1>
      <form onSubmit={submitHandler}>
        <InputControl>
          <fieldset>
            <legend>Select Method</legend>
            <label htmlFor="paymentMethod">Paypal or Credit Card</label>
            <input
              type="radio"
              className="my-2"
              id="paypal"
              name="paymentMethod"
              value={paymentMethod}
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </fieldset>
          <button type="submit" className="btn btn-primary mt-5 w-2/4 ">
            Continue
          </button>
        </InputControl>
      </form>
    </FormContainer>
  );
};

export default PaymentScreen;
