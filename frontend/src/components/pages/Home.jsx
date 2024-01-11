import React from "react";
import TravelList from "../TravelLIst";
import { Greet } from "../Greet";
import '../../styles/Navbar.css'

export const Home = ({keycloak, authenticated}) => {
    return (
        <div className="container">
            <Greet keycloak={keycloak} authenticated={authenticated}/>
            <TravelList keycloak={keycloak}/>
        </div>
        
    )
}