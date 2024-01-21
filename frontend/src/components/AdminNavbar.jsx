import React from "react";
import { Link } from "react-router-dom";

export const AdminNavbar = () => {
    return(
        <nav>
            <ul>
                <li>
                    <Link to='/panel/addTravel' className="link">Dodaj Wycieczke</Link>
                </li>
                <li>
                    <Link to='/panel/manageTravel' className="link">Zarzadzaj Wycieczkami</Link>
                </li>
                <li>
                    <Link to='/panel/analysis' className="link">Rapotry i wykresy</Link>
                </li>
            </ul>
        </nav>
    )
}