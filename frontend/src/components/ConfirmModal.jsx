import axios from "axios";
import React, { useState } from "react";
import '../styles/TravelComponent.css';

export const ConfirmModal = ({isOpen, onClose, onConfirm, travelId, travelName, keycloak}) => {
    const [numOfactiveReservation, setNum] = useState(0);

    const getReservationCount = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/reservation/count?travelId=${travelId}`, {
                headers: {
                    'Authorization': `Bearer ${keycloak.token}`
                }
            })
            console.log(response.data);
            setNum(response.data);
        } catch(error) {
            console.error('Error fetching count of reservations', error)
        }
    }

    if(!isOpen) return null;

    if(isOpen && travelName){
        getReservationCount();
        return (
            <>
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Potwierdź usunięcie</h2>
                            <p>Jesteś pewny, że chcesz usunąć wycieczkę <span>{travelName}</span>?</p>
                            <p>Ta wycieczka ma <span>{numOfactiveReservation} aktywnych rezerwacji</span></p>
                            <div className="buttons">
                                <button onClick={onConfirm} id="btn-res">Tak, usuń</button>
                                <button onClick={onClose} id="btn-res-green">Anuluj</button>
                            </div>
                            
                        </div>
                    </div>
                </div> 
            </>
        )
    }
}