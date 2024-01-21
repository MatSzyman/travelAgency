import React from "react";
import CreateTravelCard from "../CreateTravelCard";
import { AdminNavbar } from "../AdminNavbar";
import { Outlet } from "react-router";

export const Panel = ({keycloak, authenticated}) => {
    return(
        <div className="container">
            <AdminNavbar />
            <Outlet /> {}
        </div>
        
    )
}