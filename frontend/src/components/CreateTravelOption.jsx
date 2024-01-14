import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateTravelOption({keycloak,authenticated,passedTravel}){


    const[reservationData, setReservationData] = useState({
        travel:passedTravel,
        arrivalTime: '',
        departureTime: '',
        travelPrice: '',
    })


    useEffect(()=>{
        

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

        
        const startDate = new Date(reservationData.arrivalTime);
        const endDate = new Date(reservationData.departureTime);

        if (startDate >= endDate) {
            console.error("End date must be after the start date");
            return; // Prevent form submission
        }
        
        // const travelSubmission = {
        //     ...travelData,
        //     startSeason: travelData.startSeason ? new Date(travelData.startSeason).toISOString() : null,
        //     endSeason: travelData.endSeason ? new Date(travelData.endSeason).toISOString() : null,
        
        // };

        try{
            const response = await axios.post('http://localhost:8080/travelOption/add',  {
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

    // return{
    //     <div>
    //       <form onSubmit={handleSubmit}>
    //        <input
    //          type="date"
    //          name="arrivalTime"
    //          value={reservationData.arrivalTime}
    //          onChange={handleChange}
    //         />
    //     <input
    //         type="date"
    //         name="arrivalTime"
    //         value={reservationData.arrivalTime}
    //         onChange={handleChange}
    //        />
    //       </form>
       
        
    //     </div>
    // };


}
export default CreateTravelOption;