import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TravelCard from './TravelCard';
import '../styles/TravelComponent.css';

function TravelList({}){
  const [travels, setTravels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [travelImages, setTravelImages] = useState({});

  //dostepne dla wszytskich 
  useEffect(() => { //nie tutaj {keycloak}
    const fetchTravels = async () => {

        try{
          const response = await axios.get('http://localhost:8080/travel/all',{

        });
            setTravels(response.data);
        }catch (err) {
            setError('Error fetching travels');
            console.error(err);
        } finally {
        setLoading(false);
      }
    };

        fetchTravels();
    
  }, []); //tutaj wstawia sie zaleznosci w useEffect


  
  const fetchImageById = async (fileDataId) => {
    if (travelImages[fileDataId]) {
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/image/fileSystem/${fileDataId}`, {
        responseType: 'blob'
      });
      
      const imageBlobUrl = URL.createObjectURL(response.data);
      setTravelImages((prevImages) => ({
        ...prevImages,
        [fileDataId]: imageBlobUrl,

      }));
     
    } catch (error) {
      
      console.error('Error fetching image:', error);
    }
  };


// Use an effect to fetch images for each travel item when the component mounts
useEffect(() => {
  travels.forEach((travel) => {
    if (travel.fileDataId) {
      fetchImageById(travel.fileDataId);
    }
    else{
      console.log("Error during fetching images")
    }
  });
}, [travels]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="travel-list">
      {travels.map(travel => (
        <TravelCard key={travel.id} travel={travel} travelImages={travelImages} />
      ))}
    </div>
  );
}

export default TravelList;
