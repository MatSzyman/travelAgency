import React from 'react';
import { useNavigate } from 'react-router-dom';

 export const PaymentCancell = () =>{

    const navigate = useNavigate();

    const redirectToHome = () =>{
        navigate('/');
    }

    return (
        <div>
            <h2>Payment Canceled</h2>
            <p>You have canceled the payment.</p>
            <button onClick={redirectToHome}>Return to Home Page</button>
        </div>
    );

};

