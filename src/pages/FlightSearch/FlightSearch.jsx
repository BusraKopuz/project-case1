import React, { useEffect, useState } from 'react';
import './FlightSearch.css';

const FlightSearch = () => {

  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState(JSON.parse(localStorage.getItem('saveFlight')));

  useEffect(() => {
    console.log("flights", flights);
  }, [])

  if (loading) {
    return <div>Loading...</div>; // Yükleniyor durumu
  }

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
        {!!flights ? (
          <div className='flight-card'>
          <div className='flight-info'>
            <div className='time'>{new Date(flights.scheduleDateTime).toLocaleString()}</div>
            <div className='airline'>{flights.prefixIATA}</div>
            <div className='route'>{flights.route.destinations.join(' - ')}</div>
            <div className='duration'>{flights.duration}</div>
          </div>
          <div className='prices'>
            <div className="price">Main: {flights.main}</div>
            <div className="price">Comfort: {flights.comfort}</div>
            <div className="price">Premium: {flights.premium}</div>
          </div>
        </div>
        ) : (
          <p>Mevcut uçuş yok</p>
        )}
      </div>
    </div>
  );
}

export default FlightSearch;
