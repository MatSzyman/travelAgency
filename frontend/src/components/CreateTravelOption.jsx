import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/CreateTravelOption.css"
import { renderStars } from './TravelCard'
import CreateReservation from './CreateReservation'
import CircularProgress from '@mui/material/CircularProgress';
import { TypeAnimation } from 'react-type-animation';


function CreateTravelOption({keycloak,authenticated, travel}){

    const[reservationData, setReservationData] = useState({
        travel: travel,
        arrivalTime: '',
        departureTime: '',
    })

    const [travelImageUrl, setTravelImageUrl] = useState(null); // State to store the image URL
    const [responseData, setResponseData] = useState(null);
    const[trackSucces,setTrackSucces] = useState(false);
    const [proposalPrice, setProporsalPrice] = useState(0);

    const [chatResponse, setChatResponse] = useState(" ");
    const [isLoading, setIsLoading] = useState(false);
    const [submission, setSubmission] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
      const calculatePrice = async () => {
        const arrivalTime = new Date(reservationData.arrivalTime)
        const departureTime = new Date(reservationData.departureTime)

        console.log(arrivalTime, departureTime);
        const differenceInMiliseconds = Math.abs(arrivalTime - departureTime);

        const differenceInDays = differenceInMiliseconds / (1000*60*60*24)

        setProporsalPrice(differenceInDays * travel.hotelPrice + travel.basePrice);
      }
      if(reservationData.arrivalTime !== '' && reservationData.departureTime !== ''){
        calculatePrice();
      }else{
        setProporsalPrice(0);
      }
    },[reservationData.arrivalTime, reservationData.departureTime])

    useEffect(() => {
        const fetchImageById = async () => {
          
          try {
            const response = await axios.get(`http://localhost:8080/image/download/${travel.fileDataId}`, {
              responseType: 'blob',
            });
      
            const imageBlobUrl = URL.createObjectURL(response.data);
            setTravelImageUrl(imageBlobUrl);

          } catch (error) {
            console.error('Error fetching image:', error);
          }
        };
 
        if(keycloak && keycloak.token){
            fetchImageById();
        }

    },[keycloak, travel.fileDataId]);


    const handleChange =  (e) => {
        console.log(travel)
        setReservationData({...reservationData, [e.target.name]:e.target.value})
    }

    // useEffect(() => {
    //   // This will be called after `responseData` is updated
    //   console.log(responseData);
    //   setResponseData(responseData)
    // }, [responseData]); // The effect depends on `responseData` and will run when it changes
    

    const handleSubmit = async (e) =>{
        e.preventDefault()

        if (!keycloak || !authenticated) {
            console.log('Not authenticated');
            return;
        }


        //Opcji wycieczki
        const startDate = new Date(reservationData.arrivalTime);
        const endDate = new Date(reservationData.departureTime);


        if (startDate >= endDate) {
            console.error("End date must be after the start date");
            return; 
        }
        
        const travelSubmission = {
            ...reservationData,
            arrivalTime: reservationData.arrivalTime ? new Date(reservationData.arrivalTime).toISOString() : null,
            departureTime: reservationData.departureTime ? new Date(reservationData.departureTime).toISOString() : null,
        
        };

    

        try{
            const response = await axios.post('http://localhost:8080/travelOption', travelSubmission,  {
                headers: {
                    'Authorization': `Bearer ${keycloak.token}` // Include the JWT token in the request header
                  }
                });

                setSubmission(true);
                setTrackSucces(true);
            setResponseData(response.data)

        }
        catch(error){
          setSubmission(false);
            console.error('Submission failed:', error);
        }

    }

    const handleChatPrompt = async () => {
      try {
        setIsLoading(true);
        const respone = await axios.get(`http://localhost:8080/prompt/entertainment?cityName=${travel.city_name}&travelName=${travel.name}`, {
          headers: {
            'Authorization': `Bearer ${keycloak.token}`
          }
        });
        console.log(respone.data);
        setChatResponse(respone.data);
      } catch(error) {
        console.error(error);
        setChatResponse("Coś poszło nie tak");
      } finally {
        setIsLoading(false);
      }
    }

    const disableCallendarInput = () => {
      setIsDisabled(true)
    }

    return (
      <div className='container section' id='main'>
        <div id='describe'>
          <h1 className='travel-name'><span>{travel.name}</span>{renderStars(travel.stars_count, '35px')}</h1>
          {travelImageUrl && <img src={travelImageUrl} alt="Travel" className='travel-image'/>} 
          <h2>Opis:</h2>
          <p>{travel.description}</p>
          <h2>Daty obowiązywania Wycieczki {travel.name}</h2> 
          <p>Od: <span id='date'>{new Date(travel.startSeason).toLocaleDateString()}</span> Do: <span id='date'>{new Date(travel.endSeason).toLocaleDateString()}</span></p> 
          <h2>Hotel: {travel.hotel_name}</h2> 
          <p id='opis-hotel'>Opis hotelu: {travel.hotelDescription}</p> 
          <p id='opis-hotel'>Liczba gwiazdek: {travel.stars_count}</p> 
          <p id='opis-hotel'><span id='date'>Cena:</span> {travel.hotelPrice}$/za noc + jednorazowo {travel.basePrice}$</p>     
          <h2 className='h2-date'>Wybierz daty, aby zobaczyć proponowaną cenę</h2>
          <form onSubmit={handleSubmit} className='describe-callendar'>
            <div className='callendar-date'>
              <input
                type="date"
                name="arrivalTime"
                value={reservationData.arrivalTime}
                onChange={handleChange}
                min={new Date(travel.startSeason).toISOString().split("T")[0]} 
                max={new Date(travel.endSeason).toISOString().split("T")[0]}
                placeholder="Starts here"
                disabled={isDisabled}
              /> 
              <input
                type="date"
                name="departureTime"
                value={reservationData.departureTime}
                onChange={handleChange}
                min={new Date(travel.startSeason).toISOString().split("T")[0]}
                max={new Date(travel.endSeason).toISOString().split("T")[0]}
                placeholder="Ends here"
                disabled={isDisabled}
              />
            </div>
            <h1>Proponowana cena: <span id='date'>{proposalPrice}$</span></h1>
            <button type="submit" disabled={submission} className='btn' id='save' onClick={disableCallendarInput}>Zapisz</button>
           {/* {trackSucces}  */}
           
          </form>
          {trackSucces && (
            <CreateReservation travelOption={responseData} keycloak={keycloak} authenticated={authenticated} finalPrice = {proposalPrice}/>
          )}
        </div>
        <div className='gpt'>
          <h2>Nie jesteś zdecydowany na {travel.city_name}?</h2>
          <div className='gpt__prompt'>
            <div id='rainbow-outside'><button id='rainbow-inside' className='btn' onClick={handleChatPrompt}>Zapytaj</button></div>
            <h3>ChatGPT 3.5 o ciekawe miejsca w tym mieście</h3> 
          </div>
            {isLoading ? (
              <CircularProgress
              color="primary"
              fourColor
              variant="indeterminate"
              className='loading-circle'
              />
            ) : (
              <TypeAnimation 
                sequence={[chatResponse]}
                className='response'
                speed={60}
                cursor={false}
              />
            )}
        </div>    
      </div>
    );
    


};

export default CreateTravelOption;