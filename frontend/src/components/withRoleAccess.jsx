import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { NotAuthenticated } from "./pages/NotAuthenticated";

export const withRoleAccess = (WrappedComponent, keycloak, requiredRole) => {
    return props => {
        const [hasAccess, setHasAccess] = useState(false);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const checkRoles = async () => {
                try {
                    const response = await axios.get('http://localhost:8080/Client/roles', {
                        headers: {
                            'Authorization': `Bearer ${keycloak.token}`
                        }
                    });
                    console.log(response, response.data);
                    const userRolesString = response.data;
                    const userRolesList = userRolesString.split(',');
                    const access = requiredRole.some(role => userRolesList.includes(role))
                    setHasAccess(access);
                } catch(error){
                    console.error('Error checking roles: ', error);
                    setHasAccess(false);
                } finally {
                    setLoading(false);
                }
            };

            if(keycloak && keycloak.token){
                checkRoles();
            }else{
                
            }
        }, [keycloak, requiredRole]);

        
        if(loading) return <NotAuthenticated />
        if(!keycloak.authenticated) return <Navigate to="/not-authenticated" replace />
        if(!hasAccess) return <Navigate to="/unauthorized" replace />;

        return <WrappedComponent {...props} />;
    };
};