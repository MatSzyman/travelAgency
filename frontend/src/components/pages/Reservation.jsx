import React from "react";
import CreateTravelOption from "../CreateTravelOption";
import { useLocation } from 'react-router-dom';

export const Reservation = ({keycloak, authenticated}) => {

    const location = useLocation();
    const { travelId } = location.state || {};
    return(
        <CreateTravelOption keycloak = {keycloak} authenticated ={authenticated} travelId={travelId}/>
    )
}

