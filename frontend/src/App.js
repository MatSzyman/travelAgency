import React, {useEffect, useState, useRef, useContext} from 'react';
import Keycloak from 'keycloak-js';
import { Navbar } from './components/Navbar';
import { Home } from './components/pages/Home';
import { Route, Routes } from 'react-router-dom';
import CreateTravelCard from './components/CreateTravelCard'
import { Reservation } from './components/pages/Reservation';
import { NotAuthenticated } from './components/pages/NotAuthenticated';
import axios from 'axios';
import { withRoleAccess } from './components/withRoleAccess';
import { Unauthorized } from './components/pages/Unauthorized';

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
      // if(keycloak !== null && keycloak.token){
      //   addClientToDataBase();
      // }else{
      //   console.log("Keycloak: ", keycloak);
      // }
    });

    

  }, []);

  useEffect(() => {
    const addClientToDataBase = async () => {
      try {
        const response = await axios.post('http://localhost:8080/Client', {}, {
          headers: {
            'Authorization': `Bearer ${keycloak.token}`
          }
        });
        console.log('Client added: ', response.data);
      } catch(error) {
        console.error('Error adding client: ', error);
      }
    };

    if(authenticated){
      addClientToDataBase();
    }
  }, [keycloak, authenticated])

  const ProtectedAdminPanel = withRoleAccess(CreateTravelCard, keycloak, ['admin']);

  return (
    <div>
      <Navbar keycloak={keycloak} authenticated={authenticated}/>
      <Routes>
        <Route path='/home' element={<Home keycloak={keycloak} authenticated={authenticated}/>}/>
        <Route path='/panel' element={<ProtectedAdminPanel />}/>
        <Route path="/reservation/:travelId" element={<Reservation keycloak={keycloak} authenticated={authenticated} />} />
        <Route path='/not-authenticated' element={<NotAuthenticated />}/>
        <Route path='/unauthorized' element={<Unauthorized />}/>
      </Routes>
    </div>
  )
}

export default App;
