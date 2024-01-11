import './styles/App.css';
import './styles/modern-normalize.css';
import './styles/style.css'
import './styles/utils.css'
import React, {useEffect, useState, useRef} from 'react';
import Keycloak from 'keycloak-js';
import LogoutButton from './components/fun_buttons/logoutButton';
import LoginButton from './components/fun_buttons/loginButton';
import ClientButton from './components/fun_buttons/clientButton';
import TravelList from './components/TravelLIst';
import CreateTravelCard from './components/CreateTravelCard';

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
              <LogoutButton keycloak={keycloak} />
              <CreateTravelCard keycloak={keycloak} authenticated={authenticated}/>
              <ClientButton keycloak={keycloak} authenticated={authenticated}/>
              <hr></hr>
              <TravelList keycloak={keycloak}></TravelList>
              
          </header>
        </div>
      );
    } else return (
      <div>Unable to authenticate!
      <LoginButton keycloak={keycloak} />
      <ClientButton keycloak={keycloak} authenticated={authenticated}/>
      </div>
    );
  }
  return (
    <div>Loading...</div>
  );
}

export default App;
