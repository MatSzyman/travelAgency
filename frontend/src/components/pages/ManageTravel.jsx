import React, { useState } from "react";
import { Filter } from "../Filter";
import TravelList from "../TravelLIst";

export const ManageTravel = ({keycloak, authenticated}) => {
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

    return(
        <div>
            <Filter onFilterSubmit={handleFilterSubmit}/>
            <TravelList keycloak={keycloak} filters = {filters} authenticated={authenticated}/>
        </div>
    )
}
