import React from 'react';

export const LogoutButton = ({ keycloak }) => {
  const handleLogout = () => {
    keycloak.logout();
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};