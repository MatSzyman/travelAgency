import React from "react";
import '../styles/Navbar.css'

export const Greet = ({keycloak, authenticated}) => {
    if(!authenticated){
      return(
        <div>
            <p>Odkryj nieznane, doświadcz niezapomnianych przygód i stwórz wspomnienia, które przetrwają całe życie, razem z Preku Travel. Nasza misja to zapewnienie Ci nie tylko podróży, ale prawdziwej życiowej przygody.</p>
            <p>Z Preku Travel każda podróż staje się niezapomnianą opowieścią. <strong>Rozpocznij swoją przygodę już teraz!</strong></p>
        </div>
      ) 
    }else{
        return (
            <div>
                 <h1>Witamy z powrotem <strong>{keycloak.tokenParsed.given_name}!</strong></h1>
                <p>Odkryj nieznane, doświadcz niezapomnianych przygód i stwórz wspomnienia, które przetrwają całe życie, razem z Preku Travel. Nasza misja to zapewnienie Ci nie tylko podróży, ale prawdziwej życiowej przygody.</p>
                <p>Z Preku Travel każda podróż staje się niezapomnianą opowieścią. <strong>Rozpocznij swoją przygodę już teraz!</strong></p>
            </div>
        )
    }  
}