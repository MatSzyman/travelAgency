import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateReservation from './CreateReservation';

function CreateTravelOption({keycloak,authenticated, travel}){

    const[reservationData, setReservationData] = useState({
        travel: travel,
        arrivalTime: '',
        departureTime: '',
    })

    const [travelImageUrl, setTravelImageUrl] = useState(null); // State to store the image URL
    const [responseData, setResponseData] = useState(null);
    const[trackSucces,setTrackSucces] = useState(false);


    useEffect(() => {
        const fetchImageById = async () => {
          
          try {
            const response = await axios.get(`http://localhost:8080/image/download/${travel.fileDataId}`, {
              responseType: 'blob',
            });
      
            const imageBlobUrl = URL.createObjectURL(response.data);
            setTravelImageUrl(imageBlobUrl);

          } catch (error) {
            console.error('Error fetching image:', error);
          }
        };
 
        if(keycloak && keycloak.token){
            fetchImageById();
        }

    },[keycloak, travel.fileDataId]);


    const handleChange =  (e) => {
        console.log(travel)
        setReservationData({...reservationData, [e.target.name]:e.target.value})
    }

    // useEffect(() => {
    //   // This will be called after `responseData` is updated
    //   console.log(responseData);
    //   setResponseData(responseData)
    // }, [responseData]); // The effect depends on `responseData` and will run when it changes
    

    const handleSubmit = async (e) =>{
        e.preventDefault()

        if (!keycloak || !authenticated) {
            console.log('Not authenticated');
            return;
        }


        //Opcji wycieczki
        const startDate = new Date(reservationData.arrivalTime);
        const endDate = new Date(reservationData.departureTime);


        if (startDate >= endDate) {
            console.error("End date must be after the start date");
            return; 
        }
        
        const travelSubmission = {
            ...reservationData,
            arrivalTime: reservationData.arrivalTime ? new Date(reservationData.arrivalTime).toISOString() : null,
            departureTime: reservationData.departureTime ? new Date(reservationData.departureTime).toISOString() : null,
        
        };

    

        try{
            const response = await axios.post('http://localhost:8080/travelOption', travelSubmission,  {
                headers: {
                    'Authorization': `Bearer ${keycloak.token}` // Include the JWT token in the request header
                  }
                });

                setTrackSucces(true);
            setResponseData(response.data)
            console.log("tu chyba null" +responseData)
        }
        catch(error){
            console.log(travelSubmission)
            console.error('Submission failed:', error);
        }

    }

    return (
        <div>
            <h1>{travel.name}</h1>
            {travelImageUrl && <img src={travelImageUrl} alt="Travel" />} 
            <p>Description: {travel.description}</p> 
            <p>Start Date: {new Date(travel.startSeason).toLocaleDateString()}</p> 
            <p>End Date: {new Date(travel.endSeason).toLocaleDateString()}</p> 


            <p>Hotel: {travel.hotel_name}</p> 
            <p>Hotel PRice: {travel.hotel_price}</p> 
            <p>Stars: {travel.stars_count}</p> 
            <p>Base Price: {travel.basePrice}</p>     
            <p>City: {travel.city_name}</p> 
          <form onSubmit={handleSubmit}>
            <input
              type="date"
              name="arrivalTime"
              value={reservationData.arrivalTime}
              onChange={handleChange}
              min={new Date(travel.startSeason).toISOString().split("T")[0]} 
              max={new Date(travel.endSeason).toISOString().split("T")[0]}
              placeholder="Starts here"
            /> 
            <input
              type="date"
              name="departureTime"
              value={reservationData.departureTime}
              onChange={handleChange}
              min={new Date(travel.startSeason).toISOString().split("T")[0]}
              max={new Date(travel.endSeason).toISOString().split("T")[0]}
              placeholder="Ends here"
            />
            <button type="submit">Zapisz</button>
           {trackSucces} 
          </form>
          {trackSucces && (
            <CreateReservation travelOption={responseData} keycloak={keycloak} authenticated={authenticated} />
            )}
        </div>
    );
    


};

export default CreateTravelOption;