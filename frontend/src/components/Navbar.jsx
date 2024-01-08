import React from "react";
import {Link} from "react-router-dom"
import {LogoutButton} from './fun_buttons/LogoutButton';
import {LoginButton} from './fun_buttons/LoginButton';
import {RegisterButton} from "./fun_buttons/RegisterButton";
import '../styles/Navbar.css'

export const Navbar = ({keycloak, authenticated}) => {
    if(!authenticated){
        return <nav>
            <Link to = '/'>Strona główna</Link>
            <ul>
                <li>
                    <a>Wycieczki</a>
                </li>
                <li>
                    <LoginButton keycloak={keycloak}/>
                </li>
                <li>
                    <RegisterButton keycloak={keycloak}/>
                </li>
            </ul>
        </nav>;
    }else {
        return <nav>
            <Link to = '/'>Strona główna</Link>
            <ul>
                <li>
                    <a>Wycieczki</a>
                </li>
                <li>
                    <LogoutButton keycloak={keycloak}/>
                </li>
            </ul>
        </nav>
    }

    
};