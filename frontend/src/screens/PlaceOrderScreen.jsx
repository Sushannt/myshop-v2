import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import useCart from "../hooks/useCart";

import CheckoutSteps from "../components/CheckoutSteps";
import { ErrorAlert, InfoAlert } from "../components/Alert";
import AvatarComponent from "../components/AvatarComponent";
import { useCreateOrderMutation } from "../slices/ordersApiSlice.mjs";
import { clearCartItems, removeFromCart } from "../slices/cartSlice.mjs";

import { XMarkIcon } from "@heroicons/react/24/outline";

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    cartItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = useCart();

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    } else if (!paymentMethod) {
      navigate("/payment");
    }
  }, [shippingAddress.address, paymentMethod, navigate]);

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [errorMsg, setErrorMsg] = useState(null);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/orders/${res._id}`);
    } catch (error) {
      setErrorMsg(error?.message || error?.data?.message);
    }
  };

  return (
    <>
      {errorMsg && (
        <div className="toast toast-top toast-end">
          <ErrorAlert message={errorMsg} />
        </div>
      )}
      <CheckoutSteps step1 step2 step3 step4 />
      <section className="grid grid-cols-12 w-11/12 mx-auto text-secondary-900 pt-10 divide-x-2">
        <div className="col-span-8 w-11/12 mx-auto">
          <ul className="flex flex-col space-y-6 divide-y">
            <li className="flex flex-col space-y-2 justify-center">
              <div>
                <h1 className="text-3xl  font-semibold text-neutral-500">
                  Shipping
                </h1>
              </div>
              <div className="flex gap-x-4">
                <strong>Address:</strong>
                <p>
                  {shippingAddress.address}, {shippingAddress.city}{" "}
                  {shippingAddress.postalCode}, {shippingAddress.country}
                </p>
              </div>
            </li>
            <li className="flex flex-col space-y-2">
              <div>
                <h1 className="text-3xl font-semibold text-neutral-500">
                  Payment Method
                </h1>
              </div>
              <div className="flex gap-x-4">
                <strong>Method:</strong>
                <p>{paymentMethod}</p>
              </div>
            </li>
            <li className="flex flex-col space-y-2">
              <div>
                <h1 className="text-3xl  font-semibold text-neutral-500">
                  Order Items
                </h1>
              </div>
              {cartItems.length === 0 ? (
                <InfoAlert
                  message={
                    <>
                      {" "}
                      Your cart is empty{" "}
                      <Link to="/" className="link text-accent">
                        Go Back
                      </Link>
                    </>
                  }
                />
              ) : (
                <div className="overflow-x-auto">
                  <table className="table">
                    <tbody>
                      {cartItems.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <AvatarComponent>
                              <img src={item.image} alt={item.name} />
                            </AvatarComponent>
                          </td>
                          <td>
                            <Link to={`/products/${item._id}`}>
                              {item.name}
                            </Link>
                          </td>
                          <td>
                            {item.qty} x ${item.price} ={" "}
                            <em>${(item.qty * item.price).toFixed(2)}</em>
                          </td>
                          <td>
                            <button
                              className="btn btn-outline btn-circle border-none"
                              onClick={() => removeFromCartHandler(item._id)}
                            >
                              <XMarkIcon className="w-6 md:w-8" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </li>
          </ul>
        </div>
        <div className="col-span-4">
          <table className="table w-11/12 mx-auto">
            <caption className="caption-top mb-3">
              <h1 className="text-4xl font-semibold text-left">
                Order Summary
              </h1>
            </caption>
            <tbody>
              <tr>
                <td>Items:</td>
                <td>${itemsPrice}</td>
              </tr>
              <tr>
                <td>Shipping:</td>
                <td>${shippingPrice}</td>
              </tr>
              <tr>
                <td>Tax:</td>
                <td>${taxPrice}</td>
              </tr>
              <tr>
                <td>Total:</td>
                <td className="font-semibold text-2xl">${totalPrice}</td>
              </tr>
              <tr>
                <td>
                  <button
                    className="btn btn-accent btn-wide text-neutral-100 uppercase text-lg"
                    disabled={cartItems.length === 0}
                    onClick={placeOrderHandler}
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin h-8 w-8 text-white mr-3"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>

                        <span className="text-white text-lg font-bold">
                          processing...
                        </span>
                      </>
                    ) : (
                      "Place Order"
                    )}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default PlaceOrderScreen;
