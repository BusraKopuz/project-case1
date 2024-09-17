import React from 'react';
import './FlightSearch.css';

const FlightSearch = () => {

  const flights = [
    {
      time: "7:40 AM – 9:12 AM",
      airline: "Delta Air Lines",
      duration: "1h 32m",
      flightNo: "DL 1443",
      main: "$156",
      comfort: "$204",
      premium: "$386",
      route: "SFO to LAX"
    },
    {
      time: "7:00 AM – 8:52 AM",
      airline: "American Airlines",
      duration: "1h 52m",
      flightNo: "AA 166",
      main: "$182",
      premium: "$400",
      route: "SFO to LAX"
    },
    {
      time: "8:15 AM – 9:50 AM",
      airline: "Southwest Airlines",
      duration: "1h 35m",
      flightNo: "WN 2234",
      main: "$225",
      comfort: "$253",
      route: "SFO to LAX"
    },
    {
      time: "8:00 AM – 9:46 AM",
      airline: "United",
      duration: "1h 46m",
      flightNo: "UA 613",
      main: "$183",
      comfort: "$449",
      premium: "$407",
      route: "SFO to LAX"
    },
  ];
  
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