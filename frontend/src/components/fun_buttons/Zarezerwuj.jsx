import React from "react";
import { useNavigate } from 'react-router-dom';

export const Zarezerwuj = ({travel}) =>{

    const navigate = useNavigate();

    function saveToLocalStorage(travel) {
        const travelString = JSON.stringify(travel);
        localStorage.setItem(`travel-${travel.id}`, travelString);
      }

    const handleReservationClick = () =>{
        saveToLocalStorage(travel);
        console.log("saving" + travel)
        console.log("i got from it " + travel.id)
        navigate(`/reservation/${travel.id}`); // Use backticks here
    };

    return(
        <button id='btn-res' onClick={handleReservationClick}>Zarezerwuj</button>
    );

};

