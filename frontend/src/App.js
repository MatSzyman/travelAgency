import React, {useEffect, useState, useRef} from 'react';
import Keycloak from 'keycloak-js';
import { Navbar } from './components/Navbar';
import { Home } from './components/pages/Home';
import { Route, Routes } from 'react-router-dom';
import CreateTravelCard from './components/CreateTravelCard'
import { Reservation } from './components/pages/Reservation';

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

  
  return (
    <div>
      <Navbar keycloak={keycloak} authenticated={authenticated}/>
      <Routes>
        <Route path='/' element={<Home keycloak={keycloak} authenticated={authenticated}/>}/>
        <Route path='/panel' element={<CreateTravelCard keycloak={keycloak} authenticated={authenticated}/>}/>
        <Route path='/reservation' element={<Reservation keycloak={keycloak} authenticated ={authenticated}/>}/>
      </Routes>
    </div>
  )
}

export default App;
