import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { Unstable_NumberInput as NumberInput} from '@mui/base/Unstable_NumberInput';
import '../styles/Filter.css';

export const Filter = ({onFilterSubmit}) => {
    const [localFilters, setLocalFilters] = useState({
        cityNames: [],
        hotelStars: 0,
        minPrice: 0,
        maxPrice: 0
    });
    const[cities, setCities] = useState([])
    const[selectedStarsFilterOnly, setSelectedStarsFilterOnly] = useState([]);

    const stars = [
        { value: "1", label: "1-gwiazdkowy"},
        { value: "2", label: "2-gwiazdkowy"},
        { value: "3", label: "3-gwiazdkowy"},
        { value: "4", label: "4-gwiazdkowy"},
        { value: "5", label: "5-gwiazdkowy"}
    ]
    const[selectedMin, setSelectedMin] = useState();
    const[selectedMax, setSelectedMax] = useState();

    useEffect(() => {
        fetchCities();
    }, [])

    const fetchCities = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/city/all`);
            setCities(
                response.data.map((city) => ({
                    value: city.id,
                    label: city.name,
                }))
            )
            console.log("Cities: ", response.data);
        } catch(error) {
            console.log("Err fetching cities", error);
        }
    }

    const handleCityChange = (selectedOptions) => {
        setLocalFilters(prevFilters => ({
            ...prevFilters,
            cityNames: selectedOptions
        }))
    }

    const handleStarChange = (selectedOptions) => {
        var stars = 0;
        selectedOptions === null ? stars = 0 : stars = selectedOptions.value;
        setSelectedStarsFilterOnly(selectedOptions)
        setLocalFilters(prevFilters => ({
            ...prevFilters,
            hotelStars: stars
        }))
    }

    const handleSubmit = () => {
        onFilterSubmit(localFilters);
    }

    return (
        <div className="filter">
            <div className="filter-container">
                <Select
                    className="select"
                    options={cities}
                    placeholder = "Wyierz miasto"
                    value={localFilters.cityNames}
                    onChange={handleCityChange}
                    isMulti
                />
                <Select
                    className="select"
                    options={stars}
                    placeholder = "Wybierz standard hotelu"
                    value={selectedStarsFilterOnly}
                    onChange={handleStarChange}
                    isClearable={true}
                />
                <NumberInput
                    className="number"
                    placeholder="Cena minimalna"
                    value={selectedMin}
                    onChange={(event, val) => 
                        {setLocalFilters(prevFilters => ({
                            ...prevFilters,
                            minPrice: val
                    }));}}
                    min={0}
                    max={localFilters.maxPrice}
                />
                <NumberInput
                    className="number"
                    placeholder="Cena maksymalna"
                    value={selectedMax}
                    onChange={(event, val) => 
                        {setLocalFilters(prevFilters => ({
                            ...prevFilters,
                            maxPrice: val
                    }));}}
                    min={localFilters.minPrice ?? 0}
                />
            </div>
            <div>
                <button onClick={handleSubmit} className="btn">Filtruj</button>
            </div>
            
        </div>
    )

    
}