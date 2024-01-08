import React from 'react';
import '../styles/TravelComponent.css';

function TravelCard({ travel }) {
    // Format the dates using a library like date-fns or moment.js, or write your own formatter.
    const formattedStartSeason = new Date(travel.startSeason).toLocaleDateString();
    const formattedEndSeason = new Date(travel.endSeason).toLocaleDateString();

    return (
      <div className="travel-card">
        <div className="img">
          <img src={travel.image_path} alt={travel.name} />
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
