import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//Components
import Rating from "./Rating";

const ProductCard = ({ product }) => {
  return (
    <div className="card w-11/12 mx-auto bg shadow-xl">
      <Link to={`/products/${product._id}`}>
        <figure className="p-2 md:p-4">
          <img
            src={product.image}
            alt={product.description}
            className="rounded-lg"
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`/products/${product._id}`}>
          <h3 className="card-title text-md underline text-ellipsis overflow-hidden">
            {product.name}
          </h3>
        </Link>
        <div className="flex justify-between w-3/4">
          <Rating rating={product.rating} />
          <p className="text-right">{product.numReviews} Reviews</p>
        </div>
        <p className="text-3xl font-bold">{`$${product.price}`}</p>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductCard;
