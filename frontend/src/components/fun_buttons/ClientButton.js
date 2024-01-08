import React from "react";
import axios from "axios";

const ClientButton = ({ keycloak, authenticated }) => {
    // Assuming keycloak is available in your component's context
    const handleClick = async () => {
      if (!keycloak || !authenticated) {
        console.log('Not authenticated');
        return;
      }
  
      try {
        const response = await axios.post('http://localhost:8080/Client', {}, {
          headers: {
            'Authorization': `Bearer ${keycloak.token}` // Include the JWT token in the request header
          }
        });
  
        console.log('Client added:', response.data);
      } catch (error) {
        console.error('Error adding client:', error);
      }
    };
  
    return (
      <button onClick={handleClick}>Add Client</button>
    );
  };

  export default ClientButton;