import PropTypes from "prop-types";
import { StarIcon } from "@heroicons/react/24/solid";

const Rating = ({ rating }) => {
  // Round the rating to the nearest whole number
  const roundedRating = Math.round(rating);

  // Create an array of length 5 for all stars
  const starsArray = Array.from({ length: 5 }, (_, index) => {
    // If the current star index is less than the rounded rating, color it yellow, otherwise gray
    const starColor =
      index < roundedRating ? "text-yellow-400" : "text-gray-400";
    return <StarIcon key={index} className={`w-5 h-5 ${starColor}`} />;
  });

  return <div className="flex items-center">{starsArray}</div>;
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default Rating;
