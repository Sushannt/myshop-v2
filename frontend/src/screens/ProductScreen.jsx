import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";

// components
import Rating from "../components/Rating.jsx";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const { data } = await axios.get(`/api/products/${productId}`);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching Product", error);
      }
    };

    fetchProductById();
  }, [productId]);

  return (
    <>
      <Link to="/">
        <button className="btn btn-outline btn-primary mt-5 ml-5">
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
            <li className="pt-8 text-2xl font-bold">Price: ${product.price}</li>
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
                <td>{product.countInStock}</td>
              </tr>
              <tr>
                <td colSpan="3" className="text-right sm:text-left">
                  <button className="btn btn-primary mt-5">Add to Cart</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default ProductScreen;
