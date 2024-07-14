import React from "react";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
interface Ratingprop {
  rating: number;
}
const RatingComponent: React.FC<Ratingprop> = ({ rating }) => {
  return <Rater total={5} rating={rating} />;
};

export default RatingComponent;
