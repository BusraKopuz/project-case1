import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FlightTicketCard.css';

const FlightTicketCard = (props) => {
    const navigate = useNavigate();

    // Uçuş kaydetme işlemi (yönlendirme)
    const handleSaveFlight = (flight) => {
        props.onSaveFlight(flight);
        navigate('/flight-search');
    };

    return (
        <div className='flight-info'>
            <div className='flight-cards'>
                {props.data?.length > 0 ? (
                    props.data?.map((flight, index) => (
                        <div className='flight-card' key={index}>
                            {/* Uçuş Detayları */}
                            <div className='flight-details'>
                                <h3>{flight.route.destinations[0]} - {flight.route.destinations[1]}</h3>
                                <p>Departure: {new Date(flight.scheduleDateTime).toLocaleString()}</p>
                                <div className='flight-duration-info'> {/* Yeni sınıf adı burada */}
                                    <span className='flight-icon'><i className="fas fa-plane"></i></span>
                                    <p className='duration'>2h 25m (Nonstop)</p>
                                </div>
                                <p>Flight Number: {flight.flightName}</p>
                                <p>Airline: {flight.prefixIATA}</p>
                                <p className='estimated-arrival' >Arrival: {new Date(flight.estimatedLandingTime).toLocaleString()}</p>
                                <button className='book-button' onClick={() => handleSaveFlight(flight)}>Book Flight</button>
                                <a href='#' className='check-details'>Check the details</a>
                            </div>

                            {/* Fiyat */}
                            <div className='price-container'>
                                <p className='price'>Price: ${flight.price}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Mevcut uçuş yok</p>
                )}
            </div>
        </div>
    );
};

export default FlightTicketCard;