import React from 'react';

export const LoginButton = ({ keycloak }) => {
  const handleLogin = () => {
    keycloak.login();
  };

  return (
    <button onClick={handleLogin}>Login</button>
  );
};