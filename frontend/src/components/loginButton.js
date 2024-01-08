import React from 'react';

const LoginButton = ({ keycloak }) => {
  const handleLogin = () => {
    keycloak.login();
  };

  return (
    <button onClick={handleLogin}>Login</button>
  );
};

export default LoginButton;