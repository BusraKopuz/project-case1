import React, { useEffect, useState } from 'react';
import './FlightSearch.css';
import axios from 'axios';

const FlightSearch = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get('https://api.schiphol.nl/public-flights/flights?includedelays=false&page=0&sort=%2BscheduleTime', {
          headers: {
            Accept: "application/json",
            app_id: '0bb7716e',
            app_key: '786d027da17d7a8eeb9b71883e6a2fa8',
            ResourceVersion: "v4"
          }
        });
        setFlights(response.data);
      } catch (error){
        console.error('Uçuş verileri alınırken hata oluştu.', error)
      }
    };

    fetchFlights();
  }, []);
  
  return (
    <div className='flight-search'>
        <header className='search-header'>
            <h1>Flight Search</h1>
            <div className='filters'>
                <button>Times</button>
                <button>Stops</button>
                <button>Airlines</button>
                <button>Airports</button>
                <button>Amenities</button>            
            </div>
        </header>
        <div className='flight-list'>
            {flights.map((flight, index)=> (
              <div key={index} className='flight-card'>
                <div className='flight-info'>
                  <div className='time'>{flight.time}</div>
                  <div className='airline'>{flight.airline}</div>
                  <div className='route'>{flight.route}</div>
                  <div className='duration'>{flight.duration}</div>
                </div>
                <div className='prices'>
                  <div className="price">Main: {flight.main}</div>
                  <div className="price">Comfort: {flight.comfort}</div>
                  <div className="price">Premium: {flight.premium}</div>
                </div>
              </div>
            ))}

        </div>
    </div>
  )
}

export default FlightSearch