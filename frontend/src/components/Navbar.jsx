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
                    <Link to = '/panel' className="link">Dodaj wycieczke</Link>
                </li>
                <li>
                    <a className="link">Wycieczki</a>
                </li>
                <li>
                    <LogoutButton keycloak={keycloak}/>
                </li>
            </ul>
        </nav>
        </div>
    }

    
};