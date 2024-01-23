import React, { useEffect, useState } from 'react';
import axios from 'axios';



export default  function CreateReservation({keycloak,authenticated, travelOption}) {

    const[createReserv, setCreateReserv] = useState({
        client: keycloak.subject,
        travelOption: '',
        insurance:'',
        reservationNumber: '',
        isAllFood: false,
        isCanceled:false,

    })


    const [isSubmitted, setIsSubmitted] = useState(false);

    const isFormComplete = () => {
        return (

            createReserv.insurance &&
            createReserv.reservationNumber
        );
      };



    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setCreateReserv({ ...createReserv, [name]: checked });
        } else if (name === "insurance") {
            // Assuming insurance IDs are numbers 1, 2, and 3
            const insuranceId = value.replace('Option', '');
            setCreateReserv({ ...createReserv, insurance: insuranceId });
        } else {
            setCreateReserv({ ...createReserv, [name]: value });
        }
    };


    const handleSubmit = async (e) =>{
        e.preventDefault()

        if (!keycloak || !authenticated) {
            console.log('Not authenticated');
            return;
        }

        console.log("TRAVEL RESERVATION LOG: " + travelOption.id);


        const reservationSubmission = {
            ...createReserv,
            travelOption:travelOption.id
        }

        if (!isFormComplete()) {
            console.log('Form is not complete.');
            alert('Please complete all form fields befora Signing up');
            return; 
          }

          setIsSubmitted(true);
        

        try{
            const response = await axios.post('http://localhost:8080/reservation/add', reservationSubmission,  {
                headers: {
                    'Authorization': `Bearer ${keycloak.token}` // Include the JWT token in the request header
                  }
                });
                
            console.log(response);

                  // Step 1: Initiate Payment
            const paymentDetails = {
                price: 2500.00, // Assuming this is how you get the price
                currency: 'USD',
                method: 'paypal',
                intent: 'sale'
            };
         
            try {
                const paymentResponse = await axios.post('http://localhost:8080/pay', paymentDetails, {
                    headers: {
                        'Authorization': `Bearer ${keycloak.token}`
                    }
                });
                    // Redirect to PayPal approval URL
                    const approvalUrl = paymentResponse.data.url; // Adjust this based on your actual response structure
                    console.log(approvalUrl)
                    window.location.href = approvalUrl;
            }catch(error) {
                console.error("Error initiating payment", error);
            }

        } catch (error) {
            console.log(reservationSubmission);
            setIsSubmitted("false");
            console.error("Error in reservation ", error);
        }
        };

    
    return (
        <div>
          <form onSubmit={handleSubmit} style={{ maxWidth: '300px', margin: 'auto' }}>  
            <div style={{ marginBottom: '10px' }}>
              <input
                type="text"
                name="reservationNumber"
                placeholder="Reservation Number"
                value={createReserv.reservationNumber}
                onChange={handleChange}
                style={{ width: '100%', padding: '5px' }}
              />
            </div>
      
            <div style={{ marginBottom: '10px' }}>
              <label>
                All Food Included:
                <input
                  type="checkbox"
                  name="isAllFood"
                  checked={createReserv.isAllFood}
                  onChange={handleChange}
                />
              </label>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '10px' }}>
              <label>
                Insurance Option 1:
                <input
                  type="radio"
                  name="insurance"
                  value="Option1"
                  checked={createReserv.insurance === "1"}
                  onChange={handleChange}
                />
              </label>
              <label>
                Insurance Option 2:
                <input
                  type="radio"
                  name="insurance"
                  value="Option2"
                  checked={createReserv.insurance === "2"}
                  onChange={handleChange}
                />
              </label>
              <label>
                Insurance Option 3:
                <input
                  type="radio"
                  name="insurance"
                  value="Option3"
                  checked={createReserv.insurance === "3"}
                  onChange={handleChange}
                />
              </label>
            </div>
        
            <button type="submit" disabled={isSubmitted} style={{ width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
              ZAREZERWUJ WYCIECZKE
            </button>
          </form>
        </div>
      );

}