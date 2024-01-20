import React from "react";
import axios from "axios";

export const UsunWycieczke = ({keycloak,travel}) =>{
    const handleDelete = async () =>{
         try{
            const response  = axios.delete(`http://localhost:8080/travel/${travel.id}`)
            console.log("Succesfully deleted travel: " + response);
         }
         catch(error){
            console.log
         }
    }

    if(authorized && keycloak.token){
        handleDelete();
    }

    return(
        <button> onClick={handleDelete} Delete Travel</button>
    )
}