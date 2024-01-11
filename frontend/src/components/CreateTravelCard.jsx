import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageUploadComponent from './ImageUpload';

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

  const [hotels, setHotels] = useState([]);
  const [cities, setCities] = useState([]);
  //const [travelId, setTravelId] = useState(null);
  //const [showImageUpload, setShowImageUpload] = useState(true); 
  const [isUploaded, setIsUploaded] = useState(false); 
  



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
      // Optionally show an alert or notification to the user
      alert('Please complete all form fields and upload an image.');
      return; // Prevent the form submission if the form is not complete
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
  
  
        //setTravelId(response.data.id);
        
       
        //setShowImageUpload(true); 
    } catch (error) {
      console.error('Submission failed:', error);

    }
  };

  //const handleImageUpload = async (imageId) => {
   // if (travelId) {
    //try {
        //await axios.post(`http://localhost:8080/image/fileSystem/${travelId}`,  imageId , {
      //      headers: { 'Authorization': `Bearer ${keycloak.token}`,
    //        'Content-Type': 'application/json' },
  //      });
//
      //  console.log(`Image ${imageId} associated with travel ${travelId}`);
    //} catch (error) {
      //  console.error('Error in associating image with travel:', error);
    //}
   // }else{
    //    console.log('No travel ID available for image association.');
 //
  //  }
//};


  return (
    <div>
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

        <ImageUploadComponent
          keycloak={keycloak}
          authenticated={authenticated}
          onImageUpload={handleImageUpload}  
        />
 
    </div>
  );
}

export default CreateTravelCard;