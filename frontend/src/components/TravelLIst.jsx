import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TravelCard from './TravelCard';
import '../styles/TravelComponent.css';

function TravelList({keycloak}){
  const [travels, setTravels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [travelImages, setTravelImages] = useState({});

  useEffect(() => { //nie tutaj {keycloak}
    const fetchTravels = async () => {
        console.log("Keycloak token:", keycloak?.token);
        try{
          const response = await axios.get('http://localhost:8080/travel/all',{
            headers: {
                'Authorization': `Bearer ${keycloak.token}` // Include the JWT token in the request header
              }
        });
            setTravels(response.data);
        }catch (err) {
            setError('Error fetching travels');
            console.error(err);
        } finally {
        setLoading(false);
      }
    };

    if (keycloak && keycloak.token) {
        fetchTravels();
    }
  }, [keycloak]); //tutaj wstawia sie zaleznosci w useEffect

  // Function to fetch images based on their IDs
  
  const fetchImageById = async (fileDataId) => {
    try {
      const response = await axios.get(`http://localhost:8080/image/fileSystem/${fileDataId}`, {
        responseType: 'blob',
        headers: { 'Authorization': `Bearer ${keycloak.token}` },
      });
      
      const imageBlobUrl = URL.createObjectURL(response.data);
      setTravelImages((prevImages) => ({
        ...prevImages,
        [fileDataId]: imageBlobUrl,

      }));
      console.log("ImageBLOB" + imageBlobUrl);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };


// Use an effect to fetch images for each travel item when the component mounts
useEffect(() => {
  travels.forEach((travel) => {
    if (travel.fileDataId) {
      console.log(travel.fileDataId);
      fetchImageById(travel.fileDataId);
    }
    else{
      console.log("Err")
      
      
    }
  });
}, [travels]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="travel-list">
      {travels.map(travel => (
        // name, bo nie ma ID, poznie sie cos wymysli
        <TravelCard key={travel.id} travel={travel} travelImages={travelImages} />
      ))}
    </div>
  );
}

export default TravelList;
