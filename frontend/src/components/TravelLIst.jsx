import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TravelCard from './TravelCard';
import '../styles/TravelComponent.css';

function TravelList({keycloak}){
  const [travels, setTravels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [travelImages, setTravelImages] = useState({});

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const fetchTravels = async () => {
      try{
        const response = await axios.get(`http://localhost:8080/travel/pageable/all?page=${currentPage}&size=${pageSize}`);
        console.log(response.data)
        setTravels(response.data.content);
        setTotalPages(response.data.totalPages)
      }catch (err) {
          setError('Error fetching travels');
          console.error(err);
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
    fetchTravels();
  }, [currentPage])

  useEffect(() => {
    fetchTravels();
    setCurrentPage(0)
  }, [pageSize])

  // Function to fetch images based on their IDs
  
  const fetchImageById = async (fileDataId) => {
    try {
      const response = await axios.get(`http://localhost:8080/image/fileSystem/${fileDataId}`, {
        responseType: 'blob',
      });
      
      const imageBlobUrl = URL.createObjectURL(response.data);
      setTravelImages((prevImages) => ({
        ...prevImages,
        [fileDataId]: imageBlobUrl,

      }));
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };


// Use an effect to fetch images for each travel item when the component mounts
useEffect(() => {
  travels.forEach((travel) => {
    if (travel.fileDataId) {
      fetchImageById(travel.fileDataId);
    }
    else{
      console.log("Err")
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
      {travels.map(travel => (
        // name, bo nie ma ID, poznie sie cos wymysli
        <TravelCard key={travel.id} travel={travel} travelImages={travelImages} />
      ))}
      <div className="pagination-controls">
        <button className='btn' id='slider' onClick={() => {
          setCurrentPage(prev => Math.max(prev - 1, 0));
        }} disabled={currentPage === 0}>
          <svg width="3rem" height="3rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 12H18M6 12L11 7M6 12L11 17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <span className='pagination-controls__page'>Strona {currentPage + 1} z {totalPages}</span>
        <button className='btn' id='slider' onClick={() => {
          setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
        }} disabled={currentPage === totalPages - 1}>
          <svg width="3rem" height="3rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
    
  );
}

export default TravelList;
