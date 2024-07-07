import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../slices/cartSlice.mjs";
import FormContainer from "../components/FormContainer";
import InputControl from "../components/InputControl";

import useCart from "../hooks/useCart";

import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingAddress } = useCart();

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
            <label
              htmlFor="paymentMethod"
              className="label cursor-pointer w-1/2"
            >
              <span className="label-text">Paypal or Credit Card</span>
              <input
                type="radio"
                className="my-2 radio radio-primary"
                id="paypal"
                name="paymentMethod"
                value={paymentMethod}
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </label>
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
