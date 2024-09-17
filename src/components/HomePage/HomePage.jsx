import React from 'react';
import './HomePage.css';
import axios from 'axios';
import carImage from '../../assets/car.jpg';
import hotelsImage from'../../assets/hotels.jpg';
import travelImage from '../../assets/travel.jpeg';

const HomePage = () => {

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
                    <input type='text' placeholder='city' />
                    <input type="text" placeholder='to' />
                    <input type="date" />
                    <input type="date" />
                </div>
                <button className='search-button'>Show flights</button>

                <div className='flight-info'>
                    <div className='flight-cards'>
                        <div className='flight-card'>
                            <h3>Milano</h3>
                            <p>departure</p>
                            <p>arrical</p>
                            <p>price</p>
                            <button className='book-button'>Book Flight</button>
                        </div>
                    </div>

                    <div className='sort-section'>
                        <label> sort by:</label>
                        <select>
                            <option>Lowest Price</option>
                            <option>Arrival Time</option>
                            <option>Stops</option>
                        </select>
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