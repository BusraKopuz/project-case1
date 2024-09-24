import React, { useEffect, useState } from 'react';
import FlightService from '../../services/FlightService';
import userImage from '../../assets/image.jpg';
import carImage from '../../assets/RentACar.webp';
import hotelsImage from '../../assets/Hotels.jpg';
import travelImage from '../../assets/TravelPackages.webp';
import './HomePage.css';
import FlightTicketCard from '../../components/FlightTicketCard/FlightTicketCard';

const HomePage = () => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [savedFlight, setSavedFlight] = useState(null);
    const [tripType, setTripType] = useState('round-trip');
    const [searchParams, setSearchParams] = useState({
        city: '',
        to: '',
        departureDate: '',
        returnDate: '',
    });

    const fetchFlights = async () => {
        try {
            setLoading(true);
            const response = await FlightService.getFlightService();
            const flightData = response.data.flights || [];
            return flightData;
        } catch (error) {
            console.error('Uçuş verileri alınırken hata oluştu:', error);
            return [];
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        const flightsData = await fetchFlights();
        let scheduleDate = searchParams.departureDate;
        let destination = searchParams.city;

        const filteredFlights = flightsData.filter(flight =>
            flight.route.destinations.includes(destination) &&
            flight.scheduleDate === scheduleDate
        );

        setData(filteredFlights);
    };

    const handleSaveFlight = (flight) => {
        setSavedFlight(flight);
        localStorage.setItem('saveFlight', JSON.stringify(flight));
        console.log('Uçuş kaydedildi:', flight);
    }

    return (
        <div className='homepage'>
            <header className='header'>
                <div className='logo'>
                    <div className='icon-container'>
                        <i className="fas fa-plane logo-icon"></i>
                    </div>
                    <span>PLANE SCAPE</span>
                </div>
                <div className='nav'>
                    <span className='nav-item'>
                        <i className="fas fa-tag deal-icon"></i> Deals
                    </span>
                    <span className='nav-item'>
                        <i className="fas fa-globe discover-icon"></i> Discover
                    </span>
                    <span className='user-info'>
                        <img src={userImage} alt="Joane Smith" className='user-image' />
                        Joane Smith
                    </span>
                </div>
            </header>

            <main className='main-content'>
                <section className='booking-section'>
                    <div className='booking-header'>
                    <h2>
                        <i className="fas fa-plane"></i> Book Your Flight
                    </h2>
                        <div className='trip-options'>
                            <button
                                className={`round-trip ${tripType === 'round-trip' ? 'active' : ''}`}
                                onClick={() => setTripType('round-trip')}>
                                Round trip
                            </button>
                            <button
                                className={`one-way ${tripType === 'one-way' ? 'active' : ''}`}
                                onClick={() => setTripType('one-way')}>
                                One way
                            </button>
                        </div>
                    </div>

                    <div className='flight-search'>
                            <input
                                type='text'
                                placeholder='City'
                                value={searchParams.city}
                                onChange={(e) => setSearchParams({ ...searchParams, city: e.target.value })}
                            />
                            <input
                                type='text'
                                placeholder='To'
                                value={searchParams.to}
                                onChange={(e) => setSearchParams({ ...searchParams, to: e.target.value })}
                            />

                            <input
                                type='date'
                                value={searchParams.departureDate}
                                onChange={(e) => setSearchParams({ ...searchParams, departureDate: e.target.value })}
                            />


                            {tripType === 'round-trip' && (

                                <input
                                    type='date'
                                    value={searchParams.returnDate}
                                    onChange={(e) => setSearchParams({ ...searchParams, returnDate: e.target.value })}
                                />

                            )}
                    </div>
                    <button className='search-button' onClick={handleSearch}>Show flights</button>

                    <div className='result-container'>
                        <FlightTicketCard className="flight-ticket-card" data={data} onSaveFlight={handleSaveFlight} />

                        {/* Filter Panel */}
                        <div className='filter-panel'>
                            <div className='sort-by'>
                                <label htmlFor='sort'>Sort by:</label>
                                <select id='sort'>
                                    <option value='lowest-price'>Lowest Price</option>
                                    <option value='highest-price'>Highest Price</option>
                                    <option value='earliest'>Earliest</option>
                                    <option value='latest'>Latest</option>
                                </select>
                            </div>

                            <div className='filter-section'>
                                <h3>Arrival Time</h3>
                                <label>
                                    <input type='radio' name='arrival-time' /> 5:00 AM - 11:59 AM
                                </label>
                                <br />
                                <label>
                                    <input type='radio' name='arrival-time' /> 12:00 PM - 5:59 PM
                                </label>
                            </div>

                            <div className='filter-section'>
                                <h3>Stops</h3>
                                <label>
                                    <input type='radio' name='stops' /> Nonstop - $230
                                </label>
                                <br />
                                <label>
                                    <input type='radio' name='stops' /> 1 Stop - $230
                                </label>
                                <br />
                                <label>
                                    <input type='radio' name='stops' /> 2+ Stops - $230
                                </label>
                            </div>

                            <div className='filter-section'>
                                <h3>Airlines Included</h3>
                                <label>
                                    <input type='radio' name='airline' /> Alitalia - $230
                                </label>
                                <br />
                                <label>
                                    <input type='radio' name='airline' /> Lufthansa - $230
                                </label>
                                <br />
                                <label>
                                    <input type='radio' name='airline' /> Air France - $230
                                </label>
                                <br />
                                <label>
                                    <input type='radio' name='airline' /> Brussels Airlines - $230
                                </label>
                                <br />
                                <label>
                                    <input type='radio' name='airline' /> Air Italy - $230
                                </label>
                                <br />
                                <label>
                                    <input type='radio' name='airline' /> Siberia - $230
                                </label>
                            </div>
                        </div>
                    </div>

                </section>

                <aside className='aside-section'>
                    <div className='aside-card'>
                        <img src={carImage} alt="Car Rentals" />
                        <div className='text-container'>
                            <i className="fas fa-car car-icon"></i>
                            <span>Car Rentals</span>
                        </div>
                    </div>

                    <div className='aside-card'>
                        <img src={hotelsImage} alt="Hotel" />
                        <div className='text-container'>
                            <i className="fas fa-bed hotel-icon"></i>
                            <span>Hotels</span>
                        </div>
                    </div>
                    <div className='aside-card'>
                        <img src={travelImage} alt="Travel" />
                        <div className='text-container'>
                            <i className="fas fa-umbrella-beach travel-icon"></i>
                            <span>Travel Packages</span>
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
};

export default HomePage;
