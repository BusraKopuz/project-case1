import React, { useEffect, useState } from 'react';
import './HomePage.css';
import LoadingPage from '../LoadingPage/LoadingPage';
import userImage from '../../assets/image.jpg';
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
    const [tripType, setTripType] = useState('round-trip'); // Gidiş-dönüş veya tek yön seçeneği

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
        console.log("Butona tıklandı!");
        console.log("Parametreler", searchParams);

        setLoading(true);
        FlightService.getFlightService()
            .then(response => {
                console.log("API Yanıtı:", response.data);
                const flightData = response.data.flights || [];
                console.log("Tüm Uçuş Verileri:", flightData);
    
                // Tarih aralığını tanımla
                const startDate = new Date(searchParams.departureDate);
                const endDate = new Date(searchParams.returnDate || searchParams.departureDate);

                console.log("Filtreleme için Tarih Aralığı:", startDate, " - ", endDate);

                // Kalkış ve varış ülkelerini tanımla
                const departureCountry = searchParams.city;
                const arrivalCountry = searchParams.to;

                console.log("Kalkış Ülkesi:", departureCountry);
                console.log("Varış Ülkesi:", arrivalCountry);

                // Tarih aralığında ve ülkelerde kalan uçuşları filtrele
                const filteredFlights = flightData.filter(flight => {
                    const scheduleDate = new Date(flight.scheduleDate);
                    const destination = flight.route.destinations[0];

                    console.log("Kontrol Edilen Uçuş:", flight);
                    console.log("Schedule Date:", scheduleDate);
                    console.log("Departure Country:", departureCountry);
                    console.log("Arrival Country:", arrivalCountry);
                    console.log("Destination:", destination);
                
                    const inDateRange = scheduleDate >= startDate && scheduleDate <= endDate;
                    const matchesDeparture = flight.prefixIATA.toLowerCase() === departureCountry.toLowerCase();
                    const matchesDestination = destination.toLowerCase() === arrivalCountry.toLowerCase();

                    console.log("Filtreleme Sonucu:", {
                        scheduleDate,
                        inDateRange,
                        matchesDeparture,
                        matchesDestination,
                    });

                    return inDateRange && matchesDeparture && matchesDestination;
                });

                console.log("Filtrelenmiş Uçuşlar:", filteredFlights);
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
                <div className='logo'>
                    <div className='icon-container'>
                        <i className="fas fa-plane logo-icon"></i>
                    </div>
                    <span>PLANE SCAPE</span>
                </div>
                <div className='nav'>
                    <span>Deals</span>
                    <span>Discover</span>
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

                    <div className='flight-info'>
                        <div className='flight-cards'>
                            {flights.length > 0 ? (
                                flights.map((flight, index) => (
                                    <div className='flight-card' key={index}>
                                        <h3>{flight.route.destinations[0]}</h3>
                                        <p>Departure: {new Date(flight.scheduleDateTime).toLocaleString()}</p>
                                        <p>Flight Number: {flight.flightName}</p>
                                        <p>Airline: {flight.prefixIATA}</p>
                                        <p>Estimated Arrival: {new Date(flight.estimatedLandingTime).toLocaleString()}</p>
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
}

export default HomePage;

