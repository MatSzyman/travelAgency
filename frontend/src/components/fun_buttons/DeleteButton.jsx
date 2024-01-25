import React, { useState } from "react";
import axios from "axios";
import '../../styles/TravelComponent.css';
import '../../styles/ConfirmModal.css';
import { ConfirmModal } from "../ConfirmModal";


export const DeleteButton = ({keycloak,travel}) =>{

    const[isModalOpen, setIdModalOpen] = useState(false)

    const handleDelete = async () =>{
        if(keycloak && keycloak.token){
            try{
                console.log(travel.id)
                const response = await axios.delete(`http://localhost:8080/travel/delete/${travel.id}`, {
                    headers: {
                        'Authorization': `Bearer ${keycloak.token}`
                    }
                })
                console.log("Succesfully deleted travel: " + response.data);
            }catch(error){
                console.error(error)
            } finally {
                setIdModalOpen(false);
            }
        }
        
    }

    const openModal = () => {
        setIdModalOpen(true);
    }

    const closeModal = () => {
        setIdModalOpen(false);
    }

    return(
        <>
            <button onClick={openModal} id='btn-res'>  Delete Travel</button>
            <ConfirmModal 
                isOpen = {isModalOpen}
                travelId = {travel.id}
                travelName = {travel.name}
                keycloak = {keycloak}
                onClose={closeModal}
                onConfirm={handleDelete}
            />
        </>
        
    )
}