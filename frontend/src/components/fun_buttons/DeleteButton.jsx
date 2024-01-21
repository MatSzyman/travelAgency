import React from "react";
import axios from "axios";
import '../../styles/TravelComponent.css';

export const DeleteButton = ({keycloak,travel}) =>{
    const handleDelete = async () =>{
         try{
            const response  = axios.delete(`http://localhost:8080/travel/${travel.id}`)
            console.log("Succesfully deleted travel: " + response);
         }
         catch(error){
            console.error("cipa")
         }
    }

    if(keycloak && keycloak.token){
        handleDelete();
    }

    return(
        <button onClick={handleDelete} id='btn-res'>  Delete Travel</button>
    )
}