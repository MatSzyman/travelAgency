import React from "react";
import {Link} from "react-router-dom"
import {LogoutButton} from './fun_buttons/LogoutButton';
import {LoginButton} from './fun_buttons/LoginButton';
import {RegisterButton} from "./fun_buttons/RegisterButton";
import '../styles/Navbar.css'

export const Navbar = ({keycloak, authenticated}) => {
    if(!authenticated){
        return <div className="container">
            <nav className="container">
            <div className="title">
                <span>Preku Travel</span>
            </div>
            <ul>
                <li>
                    <Link to = '/' className="link">Strona główna</Link>
                </li>
                <li>
                    <a className="link">Wycieczki</a>
                </li>
                <li>
                    <LoginButton keycloak={keycloak}/>
                </li>
                <li>
                    <RegisterButton keycloak={keycloak}/>
                </li>
            </ul>
        </nav>
        <p>Odkryj nieznane, doświadcz niezapomnianych przygód i stwórz wspomnienia, które przetrwają całe życie, razem z Preku Travel. Nasza misja to zapewnienie Ci nie tylko podróży, ale prawdziwej życiowej przygody.</p>
            <p>Z Preku Travel każda podróż staje się niezapomnianą opowieścią. <strong>Rozpocznij swoją przygodę już teraz!</strong></p>
        </div> 
        
    }else {
        return <div className="container">
             <nav className="container">
            <div className="title">
                <span>Preku Travel</span>
            </div>
            <ul>
                <li>
                    <Link to = '/' className="link">Strona główna</Link>
                </li>
                <li>
                    <a className="link">Wycieczki</a>
                </li>
                <li>
                    <LogoutButton keycloak={keycloak}/>
                </li>
            </ul>
        </nav>
            <h1>Witamy z powrotem <strong>{keycloak.tokenParsed.given_name}!</strong></h1>
            <p>Odkryj nieznane, doświadcz niezapomnianych przygód i stwórz wspomnienia, które przetrwają całe życie, razem z Preku Travel. Nasza misja to zapewnienie Ci nie tylko podróży, ale prawdziwej życiowej przygody.</p>
            <p>Z Preku Travel każda podróż staje się niezapomnianą opowieścią. <strong>Rozpocznij swoją przygodę już teraz!</strong></p>
        </div>
    }

    
};