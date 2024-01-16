import React, { useState } from "react";
import TravelList from "../TravelLIst";
import { Greet } from "../Greet";
import '../../styles/Navbar.css'
import { Filter } from "../Filter";

export const Home = ({keycloak, authenticated}) => {
    const [filters, setFilters] = useState({
        cityNames: [],
        hotelStars: 0,
        minPrice: null,
        maxPrice: null
    });


    const handleFilterSubmit = (newFilters) => {
        // setSelectedCities(cities);
        setFilters(newFilters);
    };

    return (
        <div className="container">
            <Greet keycloak={keycloak} authenticated={authenticated}/>
            <Filter onFilterSubmit={handleFilterSubmit}/>
            <TravelList keycloak={keycloak} filters = {filters}/> 
        </div>
        //zmienilem na filters ale jeszcze filtersCities zostalo jutro zmienic odtad i w TravelList
    )
}