import React from 'react';

export const LogoutButton = ({ keycloak }) => {
  const handleLogout = () => {
    keycloak.logout();
  };

  return (
    <button className = 'btn' onClick={handleLogout}>Logout</button>
  );
};