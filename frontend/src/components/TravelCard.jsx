import React from 'react';
import LazyLoad from 'react-lazyload';
import '../styles/TravelComponent.css';

function TravelCard({travel, travelImages}) {
    // Format the dates using a library like date-fns or moment.js, or write your own formatter.
    const formattedStartSeason = new Date(travel.startSeason).toLocaleDateString();
    const formattedEndSeason = new Date(travel.endSeason).toLocaleDateString();

    const imageSrc = travelImages[travel.fileDataId]; // Use fileDataId to reference the image

    console.log(imageSrc);
    const renderStars = (count) => {
      let stars = [];
      for (let i = 0; i < count; i++) {
        stars.push(
          <img key={i} src="/star.svg" alt="Star" className="star"/>
        );
      }
      return <div className='stars-container'>{stars}</div>;
    }

    return (
      <div className="travel-card">
        <div className="img">
          <LazyLoad>
            {imageSrc ? ( // Use imageSrc for the conditional rendering
            <img src={imageSrc} alt={travel.name} />
            ) : (
            <p>No image available</p>
            )}
          </LazyLoad>
        </div>
        <div className='wrapper'>
          <h3>{travel.name}, {renderStars(travel.stars_count)}</h3>
          <p>{travel.description}</p>
          <p>You can sign-up from {formattedStartSeason} to {formattedEndSeason}</p>
          <div className='wrapper3'>
            <img src='hotel.svg' alt='hotel' className='hotel'/>
            <p>{travel.hotel_name}, {travel.city_name}</p>
          </div>
        </div>
        <div className='price-button'>
          <div className='price-wrapper'>
            <p id='price'><span id='cena'>Cena:</span> <span className="price-value">${travel.basePrice}/za osobę</span></p>
            <button id='btn-res'>Zarezerwuj</button>
          </div>
        </div>
        
      </div>
    );
  }

export default TravelCard;