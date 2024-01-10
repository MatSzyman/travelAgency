import React from 'react';
import './styles/TravelComponent.css';


function TravelCard({ travel, travelImages }) {
  // Format the dates using a library like date-fns or moment.js, or write your own formatter.
  const formattedStartSeason = new Date(travel.startSeason).toLocaleDateString();
  const formattedEndSeason = new Date(travel.endSeason).toLocaleDateString();
  const imageSrc = travelImages[travel.fileDataId]; // Use fileDataId to reference the image

  return (
    <div className="travel-card">
      <div className="img">
      {imageSrc ? ( // Use imageSrc for the conditional rendering
        <img src={imageSrc} alt={travel.name} />
      ) : (
        <p>No image available</p>
      )}
      </div>
      <div>
        <h3>{travel.name}</h3>
      <p>{travel.description}</p>
      <p>Price: <span className="price-value">${travel.basePrice}</span></p>
      <p>You can sign-up from {formattedStartSeason} to {formattedEndSeason}</p>
      </div>
      
    </div>
  );
}

export default TravelCard;
