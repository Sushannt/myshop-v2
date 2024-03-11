import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import { useGetProductByIdQuery } from "../slices/productsApiSlice.mjs";
import { addToCart } from "../slices/cartSlice.mjs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// components
import Rating from "../components/Rating.jsx";
import Alert from "../components/Alert.jsx";

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
        <div className="flex w-full min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : isError ? (
        <Alert variant="error">
          <span> message={error?.error || error?.data?.message} </span>
        </Alert>
      ) : (
        <div className="bg-neutral-100 text-secondary-800">
          <Link to="/">
            <button className="btn btn-outline text-accent hover:bg-accent mt-5 ml-5">
              <ArrowLongLeftIcon className="size-6" /> Go back
            </button>
          </Link>
          <section className="grid grid-cols-8 gap-5 w-11/12 mx-auto mt-5">
            <div className="col-span-8 sm:col-span-4">
              <img
                src={product.image}
                alt={product.description}
                className="object-cover max-h-[40vh] md:max-h-full min-w-96 mx-auto"
              />
            </div>
            <div className="col-span-4 sm:col-span-2">
              <ul className="divide-y space-y-8">
                <li className="font-bold">{product.name}</li>
                <li className="pt-8">
                  <div className="flex justify-between w-full md:w-3/4">
                    <Rating rating={product.rating} />
                    <span>{product.numReviews} reviews</span>
                  </div>
                </li>
                <li className="pt-8 text-2xl font-bold">
                  Price: ${product.price}
                </li>
                <li className="pt-8 text-md tracking-wide">
                  <span className="underline underline-offset-2">
                    Description:
                  </span>{" "}
                  {product.description}
                </li>
              </ul>
            </div>
            <div className="col-span-4 sm:col-span-2 overflow-x-auto">
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
                            }
                          )}
                        </select>
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td colSpan="3" className="text-right sm:text-left">
                      <button
                        className="btn btn-primary text-neutral-100 mt-5"
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
