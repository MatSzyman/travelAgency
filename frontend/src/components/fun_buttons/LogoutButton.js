import React from 'react';
import { redirect } from 'react-router-dom';

export const LogoutButton = ({ keycloak }) => {
  const handleLogout = () => {
    keycloak.logout({ redirectUri: 'http://localhost:3000/' });
  };

  return (
    <button className = 'btn' onClick={handleLogout}>Logout</button>
  );
};