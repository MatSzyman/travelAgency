import React, {useEffect, useState, useRef} from 'react';
import Keycloak from 'keycloak-js';
import { Navbar } from './components/Navbar';
import { Home } from './components/pages/Home';
import { Route, Routes,useLocation  } from 'react-router-dom';
import CreateTravelCard from './components/CreateTravelCard'
import { Reservation } from './components/pages/Reservation';
import CircularIndeterminate from './components/Loading';
import {PaymentSucces} from './components/pages/Succes';
import {PaymentCancell} from './components/pages/Cancell';

function App() {
  const [keycloak, setKeycloak] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const location = useLocation(); // To detect route changes
  const [isLoading, setIsLoading] = useState(true); // New loading state
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

  useEffect(() => {
    // Set loading to true when route changes
    setIsLoading(true);
    // Simulate loading (can be replaced with actual loading logic)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [location]);
  
  return (
    <div>
      {isLoading && <CircularIndeterminate />} {/* Show loader when loading */}
      {!isLoading && (
        <>
          <Navbar keycloak={keycloak} authenticated={authenticated}/>
          <Routes>
            <Route path='/' element={<Home keycloak={keycloak} authenticated={authenticated}/>}/>
            <Route path='/panel' element={<CreateTravelCard keycloak={keycloak} authenticated={authenticated}/>}/>
            <Route path="/reservation/:travelId" element={<Reservation keycloak={keycloak} authenticated={authenticated} />} />
            <Route path="/success" element={<PaymentSucces />} />
            <Route path="/cancel" element={<PaymentCancell />} />
          </Routes>
        </>
      )}
    </div>
  )
}

export default App;
