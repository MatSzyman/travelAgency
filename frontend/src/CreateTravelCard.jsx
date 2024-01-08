import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CreateTravelCard({keycloak, authenticated}) {
  const [travelData, setTravelData] = useState({
    name: '',
    basePrice: 0,
    description: '',
    startSeason: '',
    endSeason: '',
    hotel: '', 
    city: '', 
  });

  const [hotels, setHotels] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get('http://localhost:8080/hotel/all',{
            headers: {
              'Authorization': `Bearer ${keycloak.token}` 
            }
          }); 
        console.log('Hotels:', response.data); 
        setHotels(response.data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
        
      }
    };
    fetchHotels();

    const fetchCities = async () => {
      try {
        const response = await axios.get('http://localhost:8080/city/all',{
            headers: {
              'Authorization': `Bearer ${keycloak.token}` // Include the JWT token in the request header
            }
          }); 
        console.log('Cities:', response.data); // Log to see the data
        setCities(response.data);
      } catch (error) {
        console.error('Error fetching cities:', error);
        // Handle error
      }
    };

   
    fetchCities();
  }, []);


  const handleChange = (e) => {
    setTravelData({ ...travelData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {

    if (!keycloak || !authenticated) {
        console.log('Not authenticated');
        return;
      }

    e.preventDefault();
  
    const travelSubmission = {
      ...travelData,
      startSeason: travelData.startSeason ? new Date(travelData.startSeason).toISOString() : null,
      endSeason: travelData.endSeason ? new Date(travelData.endSeason).toISOString() : null,
    };
  
    console.log('Sending travel submission to backend:', travelSubmission);

    try {
      const response = await axios.post('http://localhost:8080/travel', travelSubmission, {
        headers: {
          'Authorization': `Bearer ${keycloak.token}` // Include the JWT token in the request header
        }
      });
  
      console.log('Submission successful:', response.data);
      // Handle success, e.g., show a success message, clear the form, or redirect the user
    } catch (error) {
      console.error('Submission failed:', error);
      // Handle errors, e.g., show an error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={travelData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="number"
        name="basePrice"
        value={travelData.basePrice}
        onChange={handleChange}
        placeholder="Base Price"
      />
      <textarea
        name="description"
        value={travelData.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        type="date"
        name="startSeason"
        value={travelData.startSeason}
        onChange={handleChange}
      />
      <input
        type="date"
        name="endSeason"
        value={travelData.endSeason}
        onChange={handleChange}
      />
      <select name="hotel" value={travelData.hotel} onChange={handleChange}>
      <option value="">Select a Hotel</option>
      {hotels.map(hotel => (
        <option key={hotel.id} value={hotel.id}>{hotel.name}</option>
      ))}
    </select>
    <select name="city" value={travelData.city} onChange={handleChange}>
      <option value="">Select a City</option>
      {cities.map(city => (
        <option key={city.id} value={city.id}>{city.name}</option>
      ))}
    </select>
      <button type="submit">Add Travel</button>
    </form>
  );
}

export default CreateTravelCard;


