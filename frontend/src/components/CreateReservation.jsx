import React, { useEffect, useState } from 'react';
import axios from 'axios';



export default  function CreateReservation({keycloak,authenticated, travelOption, finalPrice}) {

    const[createReserv, setCreateReserv] = useState({
        client: keycloak.subject,
        travelOption: '',
        insurance:'',
        isAllFood: false,
        isCanceled:false,

    })


    const [isSubmitted, setIsSubmitted] = useState(false);
    const [responser,setResponser] = useState(null);

    const isFormComplete = () => {
        return (

            createReserv.insurance
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

        console.log("Proposal price: ", finalPrice);

        if(createReserv.isAllFood){
          finalPrice = finalPrice + finalPrice * 0.2;
        }
        console.log("Final price: ", finalPrice);

        if(createReserv.insurance === '1'){
          finalPrice = finalPrice + 300;
        }else if(createReserv.insurance === '2'){
          finalPrice = finalPrice + 200;
        }else {finalPrice = finalPrice + 100;}

        console.log("Final price: ", finalPrice);

        const reservationSubmission = {
            ...createReserv,
            travelOption:travelOption.id,
            finalPrice
        }

        if (!isFormComplete()) {
            console.log('Form is not complete.');
            alert('Uzupełnij wszystkie pola przed Rezerwacją');
            return; 
          }

          setIsSubmitted(true);
        

        try{
            const response = await axios.post('http://localhost:8080/reservation/add', reservationSubmission,  {
                headers: {
                    'Authorization': `Bearer ${keycloak.token}` // Include the JWT token in the request header
                  }
                });

                setResponser(response);
                
            console.log(response);

      
            const paymentDetails = {
                price: {finalPrice}, // Assuming this is how you get the price
                currency: 'USD',
                method: 'paypal',
                intent: 'sale',
                reservationId: response.data.id
            };
            console.log(response.data.id);
            try {
                const paymentResponse = await axios.post('http://localhost:8080/pay', paymentDetails, {
                    headers: {
                        'Authorization': `Bearer ${keycloak.token}`
                    }
                });
                    // Redirect to PayPal approval URL
                    const approvalUrl = paymentResponse.data.url; 
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
          <form onSubmit={handleSubmit} style={{ maxWidth: '300px', marginTop: '40px', fontSize: 'var(--size-lg)', justifySelf: 'flex-start'}}>       
            <div style={{ marginBottom: '20px'}}>
              <label>
                All Inclusive (+{finalPrice*0.2}$)
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
                Ubezpieczenie: Travel+ 
                <input
                  type="radio"
                  name="insurance"
                  value="Option1"
                  checked={createReserv.insurance === "1"}
                  onChange={handleChange}
                  style={{marginRight: '10px'}}
                />
              </label>
              <label>
                Ubezpieczenie: Lot + Pobyt 
                <input
                  type="radio"
                  name="insurance"
                  value="Option2"
                  checked={createReserv.insurance === "2"}
                  onChange={handleChange}
                />
              </label>
              <label>
                Ubezpieczenie podstawowe
                <input
                  type="radio"
                  name="insurance"
                  value="Option3"
                  checked={createReserv.insurance === "3"}
                  onChange={handleChange}
                />
              </label>
            </div>
        
            <button type="submit" disabled={isSubmitted} style={{padding: '0.5em 1em', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '0.5em', marginTop: '40px' }}>
              ZAREZERWUJ
            </button>
          </form>
      );

}