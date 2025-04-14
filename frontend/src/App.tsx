import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

// Components
import Home from './components/Home';
import TrainInfo from './components/TrainInfo';
import CoachSelection from './components/CoachSelection';
import SeatSelection from './components/SeatSelection';
import BookingSummary from './components/BookingSummary';
import Payment from './components/Payment';
import Confirmation from './components/Confirmation';

// Types
export interface BookingDetails {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  passengers: number;
  trainNumber?: string;
  coachNumber?: string;
  seatNumber?: string;
  departureTime?: string;
  arrivalTime?: string;
  totalAmount?: number;
}

function App() {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
  });

  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={<Home bookingDetails={bookingDetails} setBookingDetails={setBookingDetails} />} />
          <Route path="/train-info" element={<TrainInfo bookingDetails={bookingDetails} setBookingDetails={setBookingDetails} />} />
          <Route path="/coach-selection" element={<CoachSelection bookingDetails={bookingDetails} setBookingDetails={setBookingDetails} />} />
          <Route path="/seat-selection" element={<SeatSelection bookingDetails={bookingDetails} setBookingDetails={setBookingDetails} />} />
          <Route path="/booking-summary" element={<BookingSummary bookingDetails={bookingDetails} />} />
          <Route path="/payment" element={<Payment bookingDetails={bookingDetails} />} />
          <Route path="/confirmation" element={<Confirmation bookingDetails={bookingDetails} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;