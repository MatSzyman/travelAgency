import React, { useEffect } from "react";
import CreateTravelOption from "../CreateTravelOption";
import { Navigate, useNavigate, useParams  } from 'react-router-dom';

export const Reservation = ({keycloak, authenticated}) => {
    const navigate = useNavigate();
    const { travelId } = useParams(); // Extract travelId from URL
    
    function getTravelFromLocalStorage(travelId) {
        const travelString = localStorage.getItem(`travel-${travelId}`);
        return travelString ? JSON.parse(travelString) : null;
    }

    const travel = getTravelFromLocalStorage(travelId);

    useEffect(() => {
        if(!authenticated) navigate('/home');
    }, [authenticated])

    return(
        <CreateTravelOption keycloak = {keycloak} authenticated ={authenticated} travel={travel}/>
        
    ) 

    
}

