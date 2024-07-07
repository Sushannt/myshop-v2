import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import { useGetProductByIdQuery } from "../slices/productsApiSlice.mjs";
import { addToCart } from "../slices/cartSlice.mjs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// components
import Rating from "../components/Rating.jsx";
import { ErrorAlert } from "../components/Alert.jsx";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetProductByIdQuery(productId);

  return (
    <>
      {isLoading ? (
        <div className="flex min-h-screen w-full items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : isError ? (
        <div className="mx-auto flex h-[60vh] w-2/4 flex-col justify-center gap-y-5 pt-[10vh]">
          <ErrorAlert message={error?.message || error?.data?.message} />
          <Link to="/">
            <button className="btn btn-outline btn-primary w-2/4">
              {`<< Go Back`}
            </button>
          </Link>
        </div>
      ) : (
        <div className="bg-neutral-100 text-secondary-800">
          <Link to="/">
            <button className="btn btn-outline ml-5 mt-5 text-accent hover:bg-accent">
              <ArrowLongLeftIcon className="size-6" /> Go back
            </button>
          </Link>
          <section className="mx-auto mt-5 grid w-11/12 grid-cols-8 gap-5">
            <div className="col-span-8 sm:col-span-4">
              <img
                src={product.image}
                alt={product.description}
                className="mx-auto max-h-[40vh] min-w-96 object-cover md:max-h-full"
              />
            </div>
            <div className="col-span-4 sm:col-span-2">
              <ul className="space-y-8 divide-y">
                <li className="font-bold">{product.name}</li>
                <li className="pt-8">
                  <div className="flex w-full justify-between md:w-3/4">
                    <Rating rating={product.rating} />
                    <span>{product.numReviews} reviews</span>
                  </div>
                </li>
                <li className="pt-8 text-2xl font-bold">
                  Price: ₹{product.price}
                </li>
                <li className="text-md pt-8 tracking-wide">
                  <span className="underline underline-offset-2">
                    Description:
                  </span>{" "}
                  {product.description}
                </li>
              </ul>
            </div>
            <div className="col-span-4 overflow-x-auto sm:col-span-2">
              <table className="table">
                <tbody>
                  <tr>
                    <th>Price: </th>
                    <td>{product.price}</td>
                  </tr>
                  <tr>
                    <th>Status:</th>
                    <td>
                      {product.countInStock > 0 ? (
                        <span className="text-green-500">In Stock</span>
                      ) : (
                        <span className="text-red-500">Out of Stock</span>
                      )}
                    </td>
                  </tr>
                  {product.countInStock > 0 && (
                    <tr>
                      <th>Qty:</th>
                      <td>
                        <select
                          className="select w-2/4 max-w-xs bg-neutral-100"
                          value={qty}
                          onChange={(e) => setQty(parseInt(e.target.value))}
                        >
                          {[...Array(product.countInStock).keys()].map(
                            (item) => {
                              return (
                                <option value={item + 1} key={item + 1}>
                                  {item + 1}
                                </option>
                              );
                            },
                          )}
                        </select>
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td colSpan="3" className="text-right sm:text-left">
                      <button
                        className="btn btn-primary mt-5 text-neutral-100"
                        onClick={addToCartHandler}
                        disabled={product.countInStock < 1}
                      >
                        Add to Cart
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default ProductScreen;
