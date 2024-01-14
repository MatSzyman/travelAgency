import React, { useEffect, useState } from 'react';
import axios from 'axios';


function CreateTravelOption({keycloak,authenticated, travelId}){


    const[reservationData, setReservationData] = useState({
        travel:travelId,
        arrivalTime: '',
        departureTime: '',
        travelPrice: '',
    })


    useEffect(()=>{
        console.log(reservationData.travel)

    })

    // function getTravelFromLocalStorage(travelId) {
    //     const travelString = localStorage.getItem(`travel-${travelId}`);
    //     return travelString ? JSON.parse(travelString) : null;
    // }


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
        
        const travelSubmission = {
            ...reservationData,
            arrivalTime: reservationData.arrivalTime ? new Date(reservationData.arrivalTime).toISOString() : null,
            departureTime: reservationData.departureTime ? new Date(reservationData.departureTime).toISOString() : null,
        
        };

        try{
            const response = await axios.post('http://localhost:8080/travelOption/add', travelSubmission,  {
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