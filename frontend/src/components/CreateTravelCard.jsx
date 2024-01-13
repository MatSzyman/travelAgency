import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageUploadComponent from './ImageUpload';
import { useNavigate } from 'react-router-dom';
import TravelCard from './TravelCard';

function CreateTravelCard({keycloak, authenticated}) {
  const [travelData, setTravelData] = useState({
    name: '',
    basePrice: 0,
    description: '',
    startSeason: '',
    endSeason: '',
    hotel: '', 
    city: '', 
    fileDataId: '',

  });

  const getPreviewTravelBeforeAdd = () => {

    const selectedHotel = hotels.find(hotel => hotel.id.toString() === travelData.hotel);
    const selectedCity = cities.find(city => city.id.toString() === travelData.city);

    return {
      name: travelData.name,
      basePrice: travelData.basePrice,
      description: travelData.description,
      startSeason: travelData.startSeason,
      endSeason: travelData.endSeason,
      hotel_name: selectedHotel ? selectedHotel.name : 'Hotel not selected', // Use the name property from the found hotel object
      city_name: selectedCity ? selectedCity.name : 'City not selected', // Use the name property from the found city o

    };
    
  };

  const [hotels, setHotels] = useState([]);
  const [cities, setCities] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false); 
  const [isTravelAdded, setTravelAdded] = useState(false); 
  const navigate = useNavigate();


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
  }, [keycloak]);


  const handleChange = (e) => {

    if (e.target.name === "basePrice") {
        // Ensure base price is not negative
        const value = Math.max(0, Number(e.target.value));
        setTravelData({...travelData, [e.target.name]: value});
      } else {
        // For other fields, just set the value directly
        setTravelData({ ...travelData, [e.target.name]: e.target.value });
      }
  };




 // This function will be passed to ImageUploadComponent and called after successful upload
 const handleImageUpload = (uploadedImageId) => {
  setTravelData({ ...travelData, fileDataId: uploadedImageId });
  setIsUploaded(true);    
};

  const isFormComplete = () => {
    return (
      travelData.name &&
      travelData.startSeason &&
      travelData.endSeason &&
      travelData.hotel &&
      travelData.city &&
      isUploaded 
    );
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!keycloak || !authenticated) {
        console.log('Not authenticated');
        return;
      }
      

    const startDate = new Date(travelData.startSeason);
    const endDate = new Date(travelData.endSeason);

    if (startDate >= endDate) {
        console.error("End date must be after the start date");
        return; // Prevent form submission
    }
    console.log(isFormComplete());

    if (!isFormComplete()) {
      console.log('Form is not complete.');
      alert('Please complete all form fields and upload an image.');
      return; 
    }
  
    const travelSubmission = {
      ...travelData,
      startSeason: travelData.startSeason ? new Date(travelData.startSeason).toISOString() : null,
      endSeason: travelData.endSeason ? new Date(travelData.endSeason).toISOString() : null,
      
    };

    try {
      const response = await axios.post('http://localhost:8080/travel', travelSubmission, {
        headers: {
          'Authorization': `Bearer ${keycloak.token}` // Include the JWT token in the request header
        }
      });
  
      setTravelAdded(true);
  
    } catch (error) {
      console.error('Submission failed:', error);

    }
  };

  // const goHome = () => {
  //   navigate('/'); 
  // };

  return (
    <div>
      {!isTravelAdded ? (
        <>
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
            <button type="submit" disabled={!isFormComplete()}>Add Travel</button>
          </form>

          {/* Image Preview Section */}
          {travelData.previewImageUrl && (
            <div className="image-preview">
              <h3>Image Preview:</h3>
              <img src={travelData.previewImageUrl} alt="Preview" style={{ maxHeight: '200px' }} />
            </div>
          )}
  
  
          {/* Preview Section */}
          {(travelData.name || travelData.basePrice || travelData.description) && (
            <div className="travel-preview">
              <h3>Preview:</h3>
              <TravelCard travel={getPreviewTravelBeforeAdd()} travelImages={travelData.fileDataId}/>
            </div>
          )}
  
          <ImageUploadComponent
            keycloak={keycloak}
            authenticated={authenticated}
            onImageUpload={handleImageUpload}  
          />
        </>
      ) : (
        <div>
          <p>Travel added successfully!</p>
          <button onClick={() => navigate('/')}>Go to Home Page</button>
        </div>
      )}
    </div>
  );
  
}
  export default CreateTravelCard;