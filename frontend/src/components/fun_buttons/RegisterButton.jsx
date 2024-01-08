import React from "react";

export const RegisterButton = ({keycloak}) => {
      const handleRegister = () => {
        keycloak.register();
      };
    
      return (
        <button onClick={handleRegister}>Sing up</button>
      );
};