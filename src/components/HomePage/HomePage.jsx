import React, { useEffect, useState } from 'react';
import './HomePage.css';
import LoadingPage from '../LoadingPage/LoadingPage';
import carImage from '../../assets/car.jpg';
import hotelsImage from '../../assets/hotels.jpg';
import travelImage from '../../assets/travel.jpeg';
import FlightService from '../../services/FlightService';

const HomePage = () => {
    const [flights, setFlights] = useState([]);
    const [searchParams, setSearchParams] = useState({
        city: "",
        to: "",
        departureDate: "",
        returnDate: "",
    });
    const [loading, setLoading] = useState(false);

    const fetchFlights = () => {
        setLoading(true);
        FlightService.getFlightService()
            .then(response => {
                const flightData = response.data.flights || []; // Uçuş verilerini al
                setFlights(flightData);
            })
            .catch(error => {
                console.error('Uçuş verileri alınırken hata oluştu:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        // fetchFlights(); 
    }, []);

    const handleSearch = () => {
        setLoading(true);
        FlightService.getFlightService()
            .then(response => {
                const flightData = response.data.flights || [];
                console.log("Tüm Uçuş Verileri:", flightData); // Tüm verileri yazdır
    
                const filteredFlights = flightData.filter(flight => {
                    const departureDateMatch = flight.scheduleDate === searchParams.departureDate;
                    const destinationMatch = flight.route.destinations.some(destination =>
                        destination.toLowerCase() === searchParams.to.toLowerCase()
                    );
    
                    console.log(`Uçuş: ${flight.flightName}, Tarih Eşleşmesi: ${departureDateMatch}, Varış Eşleşmesi: ${destinationMatch}`); // Her uçuş için eşleşmeleri yazdır
    
                    return departureDateMatch && destinationMatch;
                });
    
                console.log("Filtrelenmiş Uçuşlar:", filteredFlights); // Filtrelenmiş uçuşları yazdır
                setFlights(filteredFlights);
            })
            .catch(error => {
                console.error('Uçuş verileri alınırken hata oluştu:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    
        
    const handleSaveFlight = (flight) => {
        const savedFlights = JSON.parse(localStorage.getItem('savedFlights')) || [];
        savedFlights.push(flight);
        localStorage.setItem('savedFlights', JSON.stringify(savedFlights));
        alert("Uçuş başarıyla kaydedildi!");
    };

    if (loading) {
        return <LoadingPage />;
    }

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
                            placeholder='City'
                            value={searchParams.city}
                            onChange={(e) => setSearchParams({ ...searchParams, city: e.target.value })}
                        />
                        <input 
                            type="text" 
                            placeholder='To'
                            value={searchParams.to}
                            onChange={(e) => setSearchParams({ ...searchParams, to: e.target.value })} 
                        />
                        <input 
                            type="date"
                            value={searchParams.departureDate}
                            onChange={(e) => setSearchParams({ ...searchParams, departureDate: e.target.value })} 
                        />
                        <input 
                            type="date"
                            value={searchParams.returnDate}
                            onChange={(e) => setSearchParams({ ...searchParams, returnDate: e.target.value })} 
                        />
                    </div>
                    <button className='search-button' onClick={handleSearch}>Show flights</button>

                    <div className='flight-info'>
                        <div className='flight-cards'>
                            {flights.length > 0 ? (
                                flights.map((flight, index) => (
                                    <div className='flight-card' key={index}>
                                        <h3>{flight.route.destinations[0]}</h3> {/* İlk varış noktası */}
                                        <p>Departure: {new Date(flight.scheduleDateTime).toLocaleString()}</p> {/* Tarih ve saat */}
                                        <p>Flight Number: {flight.flightName}</p> {/* Uçuş numarası */}
                                        <p>Airline: {flight.prefixIATA}</p> {/* Havayolu kodu */}
                                        <p>Estimated Arrival: {new Date(flight.estimatedLandingTime).toLocaleString()}</p> {/* Tahmini varış zamanı */}
                                        <button className='book-button' onClick={() => handleSaveFlight(flight)}>Book Flight</button>
                                    </div>
                                ))
                            ) : (
                                <p>Mevcut uçuş yok</p>
                            )}
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
    );
}

export default HomePage;
