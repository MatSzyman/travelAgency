import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageUploadComponent from './ImageUpload';
import { useNavigate } from 'react-router-dom';
import TravelCard from './TravelCard';
import Select from "react-select";
import "../styles/CreateTravelCard.css"


function CreateTravelCard({keycloak, authenticated}) {
  const [travelData, setTravelData] = useState({
    name: 'Name not selected',
    basePrice: 0,
    description: '',
    startSeason: '',
    endSeason: '',
    hotel: '', 
    city: '', 
    fileDataId: '',

  });

  const [url, setUrl] = useState("");
  const preview = true;

  const getPreviewTravelBeforeAdd = () => {
    const selectedCity = cities.find(city => city.id.toString() === travelData.city);
    const selectedHotel = hotels.find(hotel => hotel.id.toString() === travelData.hotel);
  
    return {
      name: travelData.name,
      basePrice: travelData.basePrice,
      hotelPrice: selectedHotel ? selectedHotel.price : 0,
      description: travelData.description,
      startSeason: travelData.startSeason,
      endSeason: travelData.endSeason,
      hotel_name: selectedHotel ? selectedHotel.name : 'Hotel not selected', // Use the name property from the found hotel object
      city_name: selectedCity ? selectedCity.name : 'City not selected', // Use the name property from the found city o
    };
  };

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false); 
  const [isTravelAdded, setTravelAdded] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries  = async () =>{
      try{
        const response = await axios.get('http://localhost:8080/country',{
          headers: {
            'Authorization': `Bearer ${keycloak.token}` 
          }
        });
        console.log('Countries:', response.data); 
        setCountries(response.data)
         
        // const allCities = response.data.flatMap(country => Array.from(country.cities));
        // setCities(allCities);

        // console.log(cities)
        
      }catch(error){
        console.error("Error fetching countries");
      }
    };

    if(keycloak && keycloak.token){
    fetchCountries();
    }
    
  }, [keycloak])

  // useEffect(() => {
  //   const updateImage = async () => {
  //     pathToImage = travelData.fileDataId
  //   }
  // }, [pathToImage])



  //CITIES
  useEffect(() => {
    const selectedCountry = countries.find(c => { return String(c.id) === String(selectedCountryId);});
    if (selectedCountry) {
      setCities(selectedCountry.cities || []); // Fallback to an empty array if no cities
    } else {
      setCities([]);
    }
  }, [selectedCountryId, countries]);

// HOTELS
useEffect(() => {
  const selectedCity = cities.find(city => String(city.id) === String(travelData.city));

  if (selectedCity) {
    console.log('Selected City:', selectedCity);
    setHotels(Array.from(selectedCity.hotels)); 
  } else {
    setHotels([]); 
  }
}, [travelData.city, cities]);


  const handleCountryChange = (e) => {
    setSelectedCountryId(e.target.value);
    setTravelData({ ...travelData, city: '', hotel: '' }); // Resetuj te wartości gdy zmienia sie Country
  };

const handleCityChange = (e) => {
  const newCityId = e.target.value;
  setTravelData({ ...travelData, city: newCityId, hotel: '' });
};

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
  
      console.log(travelSubmission)
      console.log(response)
      setTravelAdded(true);
  
    } catch (error) {
      console.error('Submission failed:', error);

    }
  };


  return (
    <div className='main'>
      {!isTravelAdded ? (
        <>
          <form onSubmit={handleSubmit} className='form'>
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
              className='date'
            />
            <textarea
              name="description"
              value={travelData.description}
              onChange={handleChange}
              placeholder="Description"
              id='desc'
            />
            <div className='break'></div>
            <select value={selectedCountryId} onChange={handleCountryChange}>
              <option value="">Select a Country</option>
              {countries.map(country => (
              <option key={country.id} value={country.id}>{country.name}</option>
              ))}
            </select>
              <select name="city" value={travelData.city} onChange={handleCityChange}>
                <option value="">Select a City</option>
                {cities.map((city) => (
               <option key={city.id} value={city.id}>{city.name}</option>
                ))}
            </select>
            <select name="hotel" value={travelData.hotel} onChange={handleChange}>
              <option value="">Select a Hotel</option>
              {hotels.map(hotel => (
                <option key={hotel.id} value={hotel.id}>{hotel.name}</option>
              ))}
            </select>
            <button type="submit" className= "btn">Add Travel</button>
          </form>

          {/* Image Preview Section */}
          {travelData.previewImageUrl && (
            <div className="image-preview">
              <h3>Image Preview:</h3>
              <img src={travelData.previewImageUrl} alt="Preview" style={{ maxHeight: '200px' }} />
            </div>
          )}
  
  
          {/* Preview Section */}
          {
            <div className="travel-preview">
              <h3 className='prev'>Podgląd:</h3>
              <TravelCard travel={getPreviewTravelBeforeAdd()} preview={preview}/>
            </div>
          }
          
          <ImageUploadComponent keycloak={keycloak} authenticated={authenticated} onImageUpload={handleImageUpload}/>
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