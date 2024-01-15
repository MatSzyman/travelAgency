import React from "react";
import CreateTravelOption from "../CreateTravelOption";
import { useParams  } from 'react-router-dom';

export const Reservation = ({keycloak, authenticated}) => {

    const { travelId } = useParams(); // Extract travelId from URL



    function getTravelFromLocalStorage(travelId) {
        const travelString = localStorage.getItem(`travel-${travelId}`);
        return travelString ? JSON.parse(travelString) : null;
    }

    const travel = getTravelFromLocalStorage(travelId);

    return(
        <CreateTravelOption keycloak = {keycloak} authenticated ={authenticated} travel={travel}/>
    ) 
}

