import React, { useEffect, useState } from 'react';
import './FlightSearch.css';
import FlightService from '../../services/FlightService'; // FlightService'den uçuş verilerini al

const FlightSearch = ({ searchParams, savedFlights }) => {
  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      try {
        const response = await FlightService.getFlightService();
        const flightData = response.data.flights || [];
        
        // Kaydedilen uçuşları filtrele
        const filteredFlights = flightData.filter(flight =>
          savedFlights.some(savedFlight => savedFlight.flightName === flight.flightName)
        );

        setFlights(filteredFlights); // Filtrelenmiş uçuşları ayarla
      } catch (error) {
        console.error('Uçuş verileri alınırken hata oluştu.', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [searchParams, savedFlights]); // searchParams veya savedFlights değiştiğinde tekrar fetch et

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
        {flights.length > 0 || savedFlights.length > 0 ? (
          flights.map((flight, index) => ( 
            <div key={index} className='flight-card'>
              <div className='flight-info'>
                <div className='time'>{new Date(flight.scheduleDateTime).toLocaleString()}</div>
                <div className='airline'>{flight.prefixIATA}</div>
                <div className='route'>{flight.route.destinations.join(' - ')}</div>
                <div className='duration'>{flight.duration}</div>
              </div>
              <div className='prices'>
                <div className="price">Main: {flight.main}</div>
                <div className="price">Comfort: {flight.comfort}</div>
                <div className="price">Premium: {flight.premium}</div>
              </div>
            </div>
          ))
        ) : (
          <p>Mevcut uçuş yok</p>
        )}
      </div>
    </div>
  );
}

export default FlightSearch;
