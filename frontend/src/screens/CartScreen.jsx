import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { XMarkIcon } from "@heroicons/react/24/outline";

//hooks
import useCart from "../hooks/useCart";

// Components
import { InfoAlert } from "../components/Alert";

// redux reducer
import { addToCart, removeFromCart } from "../slices/cartSlice.mjs";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems, itemsPrice } = useCart();

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <div className="w-11/12 mx-auto relative">
        <div className="py-5 text-xl text-primary font-black absolute top-0 left-0">
          <h1>Shopping Cart</h1>
        </div>
        <div className="grid grid-cols-12 space-x-5 space-y-5 md:space-y-0 place-items-center w-full pt-[8vh]">
          <div className="col-span-12 md:col-span-8 overflow-y-auto w-full">
            {cartItems.length === 0 ? (
              <InfoAlert
                message={
                  <>
                    {" "}
                    Your cart is empty{" "}
                    <Link to="/" className="link text-accent">
                      Go Back
                    </Link>{" "}
                  </>
                }
              />
            ) : (
              <>
                <table className="hidden md:table">
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <Link to={`/products/${item._id}`}>
                            <img
                              src={item.image}
                              alt={item.description}
                              className="rounded max-w-20  border-2 border-neutral-200/35"
                            />
                          </Link>
                        </td>
                        <td>
                          <Link
                            to={`/products/${item._id}`}
                            className="text-wrap text-secondary-800"
                          >
                            {item.name}
                          </Link>
                        </td>
                        <td className="text-secondary-800">${item.price}</td>
                        <td>
                          <select
                            className="select w-3/4 max-w-xs text-secondary-800 bg-neutral-100"
                            value={item.qty}
                            onChange={(e) => {
                              addToCartHandler(item, Number(e.target.value));
                            }}
                          >
                            {[...Array(item.countInStock).keys()].map(
                              (item) => {
                                return (
                                  <option value={item + 1} key={item + 1}>
                                    {item + 1}
                                  </option>
                                );
                              }
                            )}
                          </select>
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
                <div className="block md:hidden max-h-[60vh] overflow-y-auto">
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="grid grid-cols-5 place-items-center gap-10 py-2"
                    >
                      <div className="col-span-2">
                        <img
                          src={item.image}
                          alt={item.description}
                          className="w-full rounded"
                        />
                      </div>
                      <div className="col-span-3 max-h-3/4 overflow-y-auto">
                        <table className="table-auto">
                          <caption className="caption-top text-sm text-wrap text-start">
                            {item.name}
                          </caption>
                          <tbody>
                            <tr>
                              <td className="text-sm">
                                <p>{item.price}</p>
                              </td>
                              <td>
                                <select
                                  className="select w-2/4 max-w-xs bg-neutral-100"
                                  value={item.qty}
                                  onChange={(e) => {
                                    addToCartHandler(
                                      item,
                                      Number(e.target.value)
                                    );
                                  }}
                                >
                                  {[...Array(item.countInStock).keys()].map(
                                    (item) => {
                                      return (
                                        <option value={item + 1} key={item + 1}>
                                          {item + 1}
                                        </option>
                                      );
                                    }
                                  )}
                                </select>
                              </td>
                              <td>
                                <button
                                  className="btn btn-outline btn-circle text-neutral-300 border-none"
                                  onClick={() =>
                                    removeFromCartHandler(item._id)
                                  }
                                >
                                  <XMarkIcon className="w-6" />
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="col-span-12 md:col-span-4 w-3/4 mx-auto">
            <div className="card bg-neutral text-neutral-100 card-compact md:card-normal">
              <div className="card-body">
                <h2 className="card-title border-b-2 border-accent pb-2">
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) Items
                </h2>
                <p>${itemsPrice}</p>
                <div className="card-actions justify-start mt-5">
                  <button
                    className="btn btn-accent text-neutral rounded"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartScreen;
