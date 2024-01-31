import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const PaymentSucces = ({ keycloak }) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        // Extract the paymentId and PayerID from the URL

        const paymentId = searchParams.get('paymentId');
        const PayerID = searchParams.get('PayerID');
        
        // Make sure you have a paymentId before making the call
        if (paymentId) {
            axios.get(`http://localhost:8080/success?paymentId=${paymentId}&PayerID=${PayerID}`)
            .then((response) => {
                console.log('Payment status updated:', response.data);
                // Perform further actions based on the response if necessary
            })
            .catch((error) => {
                console.error('Error updating payment status:', error);
                // Handle error
            });
        }

    }, []);

    const redirectToHome = () => {
        navigate('/home');
    };

    return (
        <div>
            <h2>Payment Successful!</h2>
            <p>Your payment was processed successfully.</p>
            <button onClick={redirectToHome}>Go to Home Page</button>
        </div>
    );
};
