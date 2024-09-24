import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FlightTicketCard from './components/FlightTicketCard/FlightTicketCard.jsx';
import FlightSearch from './pages/FlightSearch/FlightSearch.jsx';
import LoadingPage from './pages/LoadingPage/LoadingPage.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import { useState } from 'react';


function App() {
  const [savedFlights, setSavedFlights] = useState([]); // Kaydedilen uçuşları tutmak için durum

  // Uçuş kaydetme fonksiyonu
  const handleSaveFlight = (flight) => {
    setSavedFlights(prevFlights => [...prevFlights, flight]); // Kaydedilen uçuşları güncelle
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/flight-search" element={<FlightSearch  searchParams={{}} savedFlights={savedFlights} />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path='flight-ticket' element={<FlightTicketCard onSaveFlight={handleSaveFlight}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
