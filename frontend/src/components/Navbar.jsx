import React from "react";
import {Link} from "react-router-dom"
import {LogoutButton} from './fun_buttons/LogoutButton';
import {LoginButton} from './fun_buttons/LoginButton';
import {RegisterButton} from "./fun_buttons/RegisterButton";
import '../styles/Navbar.css'
import ClientButton from "./fun_buttons/clientButton";

export const Navbar = ({keycloak, authenticated}) => {
    return <div className="container">
        <nav className="container">
        <div className="title">
            <span>Preku Travel</span>
        </div>
        <ul>
            <li>
                <Link to = '/home' className="link">Strona główna</Link>
            </li>
            {authenticated && keycloak.tokenParsed.roles.includes("admin") &&(
                <li>
                    <Link to = '/panel' className="link">Panel Administratora</Link>
                </li>
            )}
            <li>
                <a className="link">Wycieczki</a>
            </li>
            {authenticated ? (
                <li>
                    <LogoutButton keycloak={keycloak}/>
                </li>   
            ) : (
                <>
                    <li>
                        <LoginButton keycloak={keycloak}/>
                    </li>
                    <li>
                        <RegisterButton keycloak={keycloak}/>
                    </li>
                </>
                
            )}
        </ul>
    </nav>
    </div> 
};