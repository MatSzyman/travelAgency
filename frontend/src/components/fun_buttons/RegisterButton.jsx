import React from "react";

export const RegisterButton = ({keycloak}) => {
      const handleRegister = () => {
        keycloak.register();
      };
    
      return (
        <button id="singup" onClick={handleRegister}>Sing up</button>
      );
};