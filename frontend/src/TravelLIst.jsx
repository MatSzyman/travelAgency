import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TravelCard from './TravelCard';
import './styles/TravelComponent.css';

function TravelList({keycloak}){
  const [travels, setTravels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { //nie tutaj {keycloak}
    const fetchTravels = async () => {
        console.log("Keycloak token:", keycloak?.token);
        try{
          const response = await axios.get('http://localhost:8080/travel/all',{
            headers: {
                'Authorization': `Bearer ${keycloak.token}` // Include the JWT token in the request header
              }
        });
            setTravels(response.data);
        }catch (err) {
            setError('Error fetching travels');
            console.error(err);
        } finally {
        setLoading(false);
      }
    };

    if (keycloak && keycloak.token) {
        fetchTravels();
    }
  }, [keycloak]); //tutaj wstawia sie zaleznosci w useEffect

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="travel-list">
      {travels.map(travel => (
        // name, bo nie ma ID, poznie sie cos wymysli
        <TravelCard key={travel.name} travel={travel} />
      ))}
    </div>
  );
}

export default TravelList;
