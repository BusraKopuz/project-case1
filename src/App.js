import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage.jsx';
import FlightSearch from './components/FlightSearch/FlightSearch.jsx';
import LoadingPage from './components/LoadingPage/LoadingPage.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/flight-search" element={<FlightSearch />} />
        <Route path="/loading" element={<LoadingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
