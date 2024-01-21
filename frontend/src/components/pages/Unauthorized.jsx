import React from "react";
import "../../styles/Unauthorized.css"

export const Unauthorized = () => {
    return (
        <div className="unauthorized">
            <h2>Twoje konto nie pozwala Ci wejść do Panelu Administratora</h2>
            <h3 id="zaloguj">Jeżeli masz jakiś problem</h3>
        </div>
    )
}