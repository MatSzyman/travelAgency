import React, { useEffect, useState } from 'react';
import axios from 'axios';


function CreateTravelOption({keycloak,authenticated, travel}){

    const[reservationData, setReservationData] = useState({
        travel: travel,
        arrivalTime: '',
        departureTime: '',

    })



    const handleChange =  (e) => {
        setReservationData({...reservationData, [e.target.name]:e.target.value})
    }


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

            console.log(response);
        }
        catch(error){
            console.error('Submission failed:', error);
        }

    }

    return (
        <div>
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
          </form>
        </div>
    );
    


};

export default CreateTravelOption;