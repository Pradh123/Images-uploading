import React from "react";
const Card = ({ image, title, rating, author }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-author">By {author}</p>
        <div className="card-rating">
          <span>{rating}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
