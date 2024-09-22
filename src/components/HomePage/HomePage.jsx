import React, { useState } from 'react';
import './HomePage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import LoadingPage from '../LoadingPage/LoadingPage';
import carImage from '../../assets/car.jpg';
import hotelsImage from'../../assets/hotels.jpg';
import travelImage from '../../assets/travel.jpeg';

const HomePage = () => {
    const [flights, setFlights] = useState([]);
    const [searchParams, setSearchParams] = useState({
        city: "",
        to: "",
        departureDate: "",
        returnDate: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate ();


    const fetchFlights = async () => {
        setLoading(true); 
        try {
            const response = await axios.get('https://api.schiphol.nl/public-flights/flights?includedelays=false&page=0&sort=%2BscheduleTime', {
                headers: {
                    Accept: "application/json",
                    app_id: '0bb7716e',
                    app_key: '786d027da17d7a8eeb9b71883e6a2fa8',
                    ResourceVersion: "v4"
                },
                params: {
                    city: searchParams.city,
                    to: searchParams.to,
                    departureDate: searchParams.departureDate,
                    returnDate: searchParams.returnDate,

                }
            })
            setFlights(response.data);
            navigate('/flight-search');
        } catch (error) {
            console.error('Uçuş verileri alınırken hata oluştu', error)
        } finally {
            setLoading(false); 
        }
    };

    const handleSearch = () => {
        fetchFlights();
    }


    if (loading) {
        return <LoadingPage />;
    }


    const handleSaveFlight = (flight) => {
        let savedFlights = JSON.parse(localStorage.getItem('savedFlights')) || [];
        savedFlights.push(flight);
        localStorage.setItem('savedFlights', JSON.stringify(savedFlights));
        alert("Uçuş başarıyla kaydedildi!");
    };


  return (
    <div className='homepage'>
        <header className='header'>
            <div className='logo'>PLANE SCAPE</div>
            <div className='nav'>
                <span>Deals</span>
                <span>Discover</span>
                <span>Joane Smith</span>
            </div>
        </header>

        <main className='main-content'>
            <section className='booking-section'>
                <div className='booking-header'>
                    <h2>Book Your Flight</h2>
                    <div className='trip-options'>
                        <button className='round-trip'>Round trip</button>
                        <button className='one-way'>One way</button>
                    </div>
                </div>

                <div className='flight-search'>
                    <input
                        type='text' 
                        placeholder='city'
                        value={searchParams.city}
                        onChange={(e)=> setSearchParams({...searchParams, city: e.target.value})}
                    />
                    <input 
                        type="text" 
                        placeholder='to'
                        value={searchParams.to}
                        onChange={(e)=> setSearchParams({...searchParams, to: e.target.value})} 
                    />
                    <input 
                        type="date"
                        value={searchParams.departureDate}
                        onChange={(e) => setSearchParams({...searchParams, departureDate: e.target.value})} 
                    />
                    <input 
                        type="date"
                        value={searchParams.returnDate}
                        onChange={(e)=> setSearchParams({...searchParams, returnDate: e.target.value})} 
                    />
                </div>
                <button className='search-button' onClick={handleSearch}>Show flights</button>

                <div className='flight-info'>
                    <div className='flight-cards'>
                        {flights.length > 0 ? (
                            flights.map((flight, index)=> (
                                <div className='flight-card' key={index}>
                                    <h3>{flight.destination}</h3>
                                    <p>Departure: {flight.departure}</p>
                                    <p>Arrival: {flight.arrival}</p>
                                    <p>Price: {flight.price}</p>
                                    <button className='book-button' onClick={()=> handleSaveFlight(flight)}>Book Flight</button>
                                </div>
                            ))
                         ) : (
                            <p>Mevcut uçuş yok</p>
                        )}
                       
                    </div>

                    <div className='sort-section'>
                        <label> Sort by:</label>
                        <select>
                            <option>Lowest Price</option>
                        </select>
                        <div className='arrival-time'>
                            <label>Arrival Time</label>
                            <div>
                                <input type="radio" id='early' name='arrival' />
                                <label htmlFor="early">5:00 AM - 11:59 AM</label>
                            </div>
                            <div>
                                <input type="radio" id="late" name="arrival" />
                                <label htmlFor="late">12:00 PM - 5:59 PM</label>
                            </div>
                        </div>

                        <div className='stops'>
                            <label>Stops</label>
                            <div>
                                <input type="radio" id="nonstop" name="stops" />
                                <label htmlFor="nonstop">Nonstop</label>
                                <span>$230</span>
                            </div>
                            <div>
                                <input type="radio" id="1stop" name="stops"  />
                                <label htmlFor="1stop">1 Stop</label>
                                <span>$230</span>
                            </div>
                            <div>
                                <input type="radio" id="2plusstops" name="stops" />
                                <label htmlFor="2plusstops">2+ Stops</label>
                                <span>$230</span>
                            </div>
                        </div>

                        <div className='airlines'>
                            <label>Airlines Included</label>
                            <div>
                                <input type="radio" id="alitalia" name="airlines"  />
                                <label htmlFor="alitalia">Alitalia</label>
                                <span>$230</span>
                            </div>
                            <div>
                                <input type="radio" id="lufthansa" name="airlines"  />
                                <label htmlFor="lufthansa">Lufthansa</label>
                                <span>$230</span>
                            </div>
                            <div>
                                <input type="radio" id="airfrance" name="airlines"  />
                                <label htmlFor="airfrance">Air France</label>
                                <span>$230</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <aside className='aside-section'>
                <div className='aside-card'>
                    <img src={carImage} alt="Car Rentals" />
                    <span>Car Rentals</span>
                </div>
                <div className='aside-card'>
                    <img src={hotelsImage} alt="Hotel" />
                    <span>Hotels</span>
                </div>
                <div className='aside-card'>
                    <img src={travelImage} alt="Travel" />
                    <span>Travel Packages</span>
                </div>
            </aside>
        </main>
    </div>
  )
}

export default HomePage