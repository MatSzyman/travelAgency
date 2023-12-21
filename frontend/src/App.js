import './App.css';
import React, {useEffect, useState, useRef} from 'react';
import Keycloak from 'keycloak-js';
import LogoutButton from './logoutButton';
import LoginButton from './loginButton';

function App() {
  const [keycloak, setKeycloak] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  const isRun = useRef(false);

  useEffect(() => {
    if(isRun.current) return;
    const keycloakInstance = new Keycloak({
      url: 'http://127.0.0.1:8081/',
      realm: 'Travel-Agency',
      clientId: 'React-FE-client'
    });

    isRun.current = true;

    keycloakInstance.init({ onLoad: 'check-sso'}).then(auth => {
      setKeycloak(keycloakInstance);
      setAuthenticated(auth);
    });

  }, []);

  if(keycloak) {
    if(authenticated) {
      return (
        <div className="App">
          <header className="App-header">
            <p>
              This is a React application secured by Keycloak.
            </p>
            {/* Render the rest of your app's components here */
              <LogoutButton keycloak={keycloak} />
            }
          </header>
        </div>
      );
    } else return (
      <div>Unable to authenticate!
      {/* Render the rest of your app's components here */
      <LoginButton keycloak={keycloak} />
      }
      </div>
    );
  }
  return (
    <div>Loading...</div>
  );
}

export default App;