import React from "react";
import CreateTravelOption from "../CreateTravelOption";

export const Reservation = ({keycloak, authenticated}) => {
    return(
        <CreateTravelOption keycloak = {keycloak} authenticated ={authenticated}/>
    )
}

