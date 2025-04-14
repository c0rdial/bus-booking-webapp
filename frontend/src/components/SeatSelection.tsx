import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingDetails } from '../App';

interface Seat {
  number: number;
  isOccupied: boolean;
  isSelected: boolean;
}

interface SeatSelectionProps {
  bookingDetails: BookingDetails;
  setBookingDetails: (details: BookingDetails) => void;
}

const SeatSelection = ({ bookingDetails, setBookingDetails }: SeatSelectionProps) => {
  const navigate = useNavigate();
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);

  useEffect(() => {
    // Initialize seats
    const initialSeats = Array.from({ length: 20 }, (_, i) => ({
      number: i + 1,
      isOccupied: Math.random() < 0.2, // 20% chance of being occupied
      isSelected: false
    }));
    setSeats(initialSeats);
  }, []);

  const handleSeatSelect = (seatNumber: number) => {
    const seat = seats.find(s => s.number === seatNumber);
    if (seat && !seat.isOccupied) {
      setSeats(prevSeats =>
        prevSeats.map(s =>
          s.number === seatNumber
            ? { ...s, isSelected: !s.isSelected }
            : { ...s, isSelected: false }
        )
      );
      setSelectedSeat(seat.isSelected ? null : seatNumber);
      setBookingDetails({
        ...bookingDetails,
        seatNumber: seat.isSelected ? undefined : seat.number.toString()
      });
    }
  };

  const handleProceed = () => {
    if (selectedSeat) {
      navigate('/booking-summary');
    }
  };

  return (
    <div className="container">
      <h1>Select Your Seat</h1>
      <div className="seat-selection-info">
        <div className="seat-legend">
          <div className="legend-item">
            <div className="seat available"></div>
            <span>Available</span>
          </div>
          <div className="legend-item">
            <div className="seat occupied"></div>
            <span>Occupied</span>
          </div>
          <div className="legend-item">
            <div className="seat selected"></div>
            <span>Selected</span>
          </div>
        </div>
      </div>
      <div className="seat-grid">
        {seats.map(seat => (
          <div
            key={seat.number}
            className={`seat ${seat.isOccupied ? 'occupied' : ''} ${
              seat.isSelected ? 'selected' : ''
            }`}
            onClick={() => handleSeatSelect(seat.number)}
          >
            {seat.number}
          </div>
        ))}
      </div>
      <button
        onClick={handleProceed}
        disabled={!selectedSeat}
        style={{ marginTop: '2rem' }}
      >
        Proceed to Summary
      </button>
    </div>
  );
};

export default SeatSelection; 