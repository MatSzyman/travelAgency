import React from "react";
import { redirect, useNavigate } from 'react-router-dom';


export const Zarezerwuj = ({travel, keycloak,authenticated}) =>{

    const navigate = useNavigate();
    const Uri = "http://locallhost:3000/reservation/".concat(travel.id)

    function saveToLocalStorage(travel) {
        const travelString = JSON.stringify(travel); 
        localStorage.setItem(`travel-${travel.id}`, travelString);
      }

    const handleReservationClick = () =>{
        if(!authenticated){
            saveToLocalStorage(travel);
            keycloak.login({ redirectUri: window.location.origin + `/reservation/${travel.id}` });
        }
        saveToLocalStorage(travel);
        navigate(`/reservation/${travel.id}`);
    };

    return(
        <button id='btn-res' onClick={handleReservationClick}>Zarezerwuj</button>
    );

};

