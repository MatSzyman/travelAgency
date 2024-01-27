import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TravelCard from './TravelCard';
import '../styles/TravelComponent.css';

function TravelList({keycloak, filters, authenticated, manage}){
  const [travels, setTravels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [travelImages, setTravelImages] = useState({});

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const generateUriToRequest = (filters) => {
    var requestUri = `http://localhost:8080/travel/pageable/filtered?`

    if(filters.cityNames.length > 0){
      const cityNames = createRequestFilterParam();
      const param = "cityNames=" + encodeURIComponent(cityNames);
      requestUri += param;
    }

    if(filters.hotelStars > 0){
      requestUri += "&starsCount=" + filters.hotelStars;
    }

    if(filters.minPrice !== undefined && filters.minPrice !== 0){
      requestUri += "&minPrice=" + filters.minPrice
    }

    if(filters.maxPrice !== undefined && filters.maxPrice !== 0){
      requestUri += "&maxPrice=" + filters.maxPrice
    }

    return requestUri += `&page=0&size=${pageSize}`
  }

  const createRequestFilterParam = () => {
    const cityNamesList = filters.cityNames.map((city) => city.label)
    const requestParam = cityNamesList.join(",")
    return requestParam;
  }

  useEffect(() => { //fetch all travels once when first load
    const fetchTravels = async () => {
      try{
        const response = await axios.get(`http://localhost:8080/travel/pageable/all?page=${currentPage}&size=${pageSize}`);
        console.log(response.data.content)
        setTravels(response.data.content);
        setTotalPages(response.data.totalPages);
      }catch (err) {
          setError('Error fetching travels');
          console.error(err);
      } finally {
          setLoading(false);
      }
      
    };
    fetchTravels();
  },[])

  useEffect(() => { //fetch filtered travels with applied filters
    const changeTravelContent = async () => {
      var uri;
      if(filters.cityNames.length === 0 &&
        filters.hotelStars === 0 &&
        (filters.minPrice === undefined || filters.minPrice === 0 || filters.minPrice === null) &&
        (filters.maxPrice === undefined || filters.maxPrice === 0 || filters.maxPrice === null)){
          uri = `http://localhost:8080/travel/pageable/all?page=${currentPage}&size=${pageSize}`
        }else {
          uri = generateUriToRequest(filters);
        }
      console.log(uri);
      try {
        const respone = await axios.get(uri);
        setTravels(respone.data.content);
        setTotalPages(respone.data.totalPages)
        console.log(respone);
      } catch(error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    if(filters){
      changeTravelContent();
    }
  }, [currentPage, filters, pageSize])

  useEffect(() => {
    const fetchOnSizeChange = async () => {
      setCurrentPage(0); //najpierw ustawic page na 0
      //await changeTravelContent(); //pozniej fetchowac nowe dane
    }
    fetchOnSizeChange();
  }, [pageSize])
  
  // Use an effect to fetch images for each travel item when the component mounts
  useEffect(() => {
  const fetchImageById = async (fileDataId) => {
    
    try {
      const response = await axios.get(`http://localhost:8080/image/download/${fileDataId}`, {
        responseType: 'blob',
      });

      const imageBlobUrl = URL.createObjectURL(response.data);
      setTravelImages((prevImages) => ({
        ...prevImages, [fileDataId]: imageBlobUrl
      }));
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  travels.forEach((travel) => {
    if (travel.fileDataId) {
      fetchImageById(travel.fileDataId);
    } else {
      console.log("Error during fetching images");
    }
  });
}, [travels]);

function getPageSizeClass(size) {
  return pageSize === size ? 'activePageSize' : 'change';
}

useEffect(() => {
  window.scroll({top: 0, behavior: 'smooth'});
}, [currentPage])

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="travel-list">
      <div className="pageSizeOptions">
      <span>Wynikow na stronie</span>
      {[5, 10, 15].map(size => (
      <button 
        key={size} 
        className={getPageSizeClass(size)} 
        onClick={() => setPageSize(size)}
      >
      {size}
      </button>
      ))}
    </div>
      {travels.length === 0 ? (
        <div className='empty'>
          <h1>Niestety nie ma wycieczek z podanymi filtrami...</h1>
          <h2>Spróbuj jeszcze raz</h2>
          <img className='sad' src="./empty_travel.png" alt="sad_emoji" />
        </div>
      ) : (
        travels.map(travel => (
        // name, bo nie ma ID, poznie sie cos wymysli
        <TravelCard key={travel.id} travel={travel} travelImages={travelImages} keycloak={keycloak} authenticated= {authenticated} admin={manage}/>
        ))
      )}
      <div className="pagination-controls">
        <button className='btn' id='slider' onClick={() => {
          setCurrentPage(prev => Math.max(prev - 1, 0));
        }} disabled={currentPage === 0}>
          <svg width="3rem" height="3rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 12H18M6 12L11 7M6 12L11 17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className='pagination-controls__page'>Strona {currentPage + 1} z {totalPages}</span>
        <button className='btn' id='slider' onClick={() => {
          setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
        }} disabled={currentPage === totalPages - 1}>
          <svg width="3rem" height="3rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default TravelList;
