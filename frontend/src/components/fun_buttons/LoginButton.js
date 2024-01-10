import React from 'react';

export const LoginButton = ({ keycloak }) => {
  const handleLogin = () => {
    keycloak.login();
  };

  return (
    <button className = 'btn' onClick={handleLogin}>Login</button>
  );
};