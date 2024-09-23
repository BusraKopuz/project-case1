import React, { useEffect, useState } from 'react';
import './FlightSearch.css';
import FlightService from '../../services/FlightService'; // FlightService'den uçuş verilerini al

const FlightSearch = ({ searchParams }) => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      try {
        const response = await FlightService.getFlightService();
        const flightData = response.data.flights || [];
        filterFlights(flightData);
      } catch (error) {
        console.error('Uçuş verileri alınırken hata oluştu.', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [searchParams]); // searchParams değiştiğinde tekrar fetch et

  const filterFlights = (flightData) => {
    const startDate = new Date(searchParams.departureDate);
    const endDate = new Date(searchParams.returnDate || searchParams.departureDate);
    const departureCountry = searchParams.city;
    const arrivalCountry = searchParams.to;

    const filteredFlights = flightData.filter(flight => {
      const scheduleDate = new Date(flight.scheduleDate);
      const destination = flight.route.destinations[0];

      const inDateRange = scheduleDate >= startDate && scheduleDate <= endDate;
      const matchesDeparture = flight.prefixIATA.toLowerCase() === departureCountry.toLowerCase();
      const matchesDestination = destination.toLowerCase() === arrivalCountry.toLowerCase();

      return inDateRange && matchesDeparture && matchesDestination;
    });

    setFlights(filteredFlights);
  };

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
        {flights.length > 0 ? (
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
