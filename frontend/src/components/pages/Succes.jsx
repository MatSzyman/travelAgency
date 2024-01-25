import React from 'react';
import { useNavigate } from 'react-router-dom';

export const PaymentSucces = () => {
    const navigate = useNavigate();

    const redirectToHome = () =>{
        navigate('/');
    }


    return (
        <div>
            <h2>Payment Successful!</h2>
            <p>Your payment was processed successfully.</p>
            <button onClick={redirectToHome}>Go to Home Page</button>
        </div>
    );
}

