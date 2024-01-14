import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TravelCard from './TravelCard';
import '../styles/TravelComponent.css';

function TravelList(){
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


// Use an effect to fetch images for each travel item when the component mounts
useEffect(() => {
  const fetchImages = async (fileDataIds) => {
    console.log(fileDataIds)
    try {
      const response = await axios.get(`http://localhost:8080/image/batchDownload`, {
        params: { ids: fileDataIds.join(',') }
      });
      const images = response.data;
      const newImages = {};
      images.forEach((base64, index) => {
        newImages[fileDataIds[index]] = `data:image/jpeg;base64,${base64}`;
      });
      setTravelImages(newImages);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const fileDataIds = travels.map(travel => travel.fileDataId).filter(id => id != null);
  if (fileDataIds.length > 0) {
    fetchImages(fileDataIds);
  }
}, [travels]);



// function saveToLocalStorage(travel) {
//   const travelString = JSON.stringify(travel);
//   localStorage.setItem(`travel-${travel.id}`, travelString);
// }


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="travel-list">
      {travels.map(travel => {
        //saveToLocalStorage(travel);
        return <TravelCard key={travel.id} travel={travel} travelImages={travelImages} />;
  })}
    </div>
  );
}

export default TravelList;
