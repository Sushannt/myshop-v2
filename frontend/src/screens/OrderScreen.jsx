import { Link, useParams } from "react-router-dom";
//paypal
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

// slices
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
} from "../slices/ordersApiSlice.mjs";

// redux tools
import { useDispatch, useSelector } from "react-redux";

//hooks
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";

//components
import Loader from "../components/Loader";
import AvatarComponent from "../components/AvatarComponent";
import { ErrorAlert, SuccessAlert } from "../components/Alert";
import { useEffect } from "react";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  const { userInfo } = useAuth();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async (details) => {
      try {
        await payOrder({ orderId, details });
        refetch();
        <div className="toast toast-end">
          <SuccessAlert message="Payment Successful!" />
        </div>;
      } catch (err) {
        <div className="toast toast-end">
          <ErrorAlert message={err?.data?.message || err?.message} />
        </div>;
      }
    });
  };
  const onApproveTest = async () => {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    <div className="toast toast-end">
      <SuccessAlert message="Payment Successful!" />
    </div>;
  };
  const onError = (err) => {
    <div className="toast toast-end">
      <ErrorAlert message={err?.data?.message || err?.message} />
    </div>;
  };
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorAlert message={error?.message || error?.data?.message} />
      ) : (
        <section className="divide-y pt-[2vh] text-secondary-800">
          <h1 className="mx-auto w-11/12 text-4xl text-neutral-500">
            Order {order._id}
          </h1>
          <div className="grid grid-cols-12 pt-10">
            <div className="col-span-12 mx-auto w-11/12 md:col-span-8">
              <ul className="flex w-full  flex-col space-y-4 divide-y">
                <li className="w-full">
                  <table className="w-full table-auto">
                    <caption className="caption-top text-left text-3xl font-semibold text-neutral-600">
                      Shipping
                    </caption>
                    <tbody className="text-sm">
                      <tr>
                        <td className="py-2">
                          <strong>Name:</strong>
                        </td>
                        <td className="ps-2">
                          <p>{order.user.name}</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">
                          <strong>Email:</strong>
                        </td>
                        <td className="ps-2">
                          <p>{order.user.email}</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">
                          <strong>Address:</strong>
                        </td>
                        <td className="ps-2">
                          {order.shippingAddress.address},{" "}
                          {order.shippingAddress.city}{" "}
                          {order.shippingAddress.postalCode},{" "}
                          {order.shippingAddress.country}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="2">
                          {order.isDelivered ? (
                            <SuccessAlert
                              message={`Order delivered at ${order.deliveredAt}`}
                            />
                          ) : (
                            <ErrorAlert message="Not Delivered" />
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </li>
                <li className="w-full pt-5">
                  <table className="w-full table-auto">
                    <caption className="caption-top text-left text-3xl font-semibold  text-neutral-600">
                      Payment
                    </caption>
                    <tbody className="text-sm">
                      <tr>
                        <td className="flex gap-x-28 py-2">
                          <strong>Method:</strong>
                          <p>{order.paymentMethod}</p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {order.isPaid ? (
                            <SuccessAlert
                              message={`Order paid at ${order.paidAt}`}
                            />
                          ) : (
                            <ErrorAlert message="Not Paid" />
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </li>
                <li>
                  <div className="overflow-x-auto pt-4">
                    <table className="table">
                      <caption className="caption-top pb-3 text-left text-3xl font-semibold  text-neutral-600">
                        Order Items
                      </caption>
                      <tbody className="rounded-md border-2 border-neutral-200 text-sm">
                        {order.orderItems.map((item, index) => (
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
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-span-12 md:col-span-4">
              <table className=" table mx-auto w-10/12 divide-y shadow-sm">
                <caption className="mb-3 caption-top">
                  <h1 className="text-left text-4xl font-semibold text-neutral-600">
                    Order Summary
                  </h1>
                </caption>
                <tbody className="text-secondary-800">
                  <tr>
                    <td className="py-1">Items:</td>
                    <td className="text-sm">${order.itemsPrice}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Shipping:</td>
                    <td className="text-sm">${order.shippingPrice}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Tax:</td>
                    <td className="text-sm">${order.taxPrice}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Total:</td>
                    <td className="text-xl font-semibold">
                      ${order.totalPrice}
                    </td>
                  </tr>

                  <tr>
                    {!order.isPaid && (
                      <td colSpan="2">
                        {loadingPay && <Loader />}
                        {isPending ? (
                          <Loader />
                        ) : (
                          <div>
                            {/* <button
                              onClick={onApproveTest}
                              className="btn-accent mb-10 mt-4 w-full rounded-sm bg-orange-400 px-4 py-2 font-bold text-white"
                            >
                              Test Pay Order
                            </button> */}
                            <div>
                              <PayPalButtons
                                // style={{ layout: "horizontal" }}
                                createOrder={createOrder}
                                onApprove={onApprove}
                                onError={onError}
                              ></PayPalButtons>
                            </div>
                          </div>
                        )}
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default OrderScreen;
