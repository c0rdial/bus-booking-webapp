import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingDetails } from '../App';

interface CoachSelectionProps {
  bookingDetails: BookingDetails;
  setBookingDetails: (details: BookingDetails) => void;
}

const CoachSelection = ({ bookingDetails, setBookingDetails }: CoachSelectionProps) => {
  const navigate = useNavigate();
  const [selectedCoach, setSelectedCoach] = useState<string | null>(null);

  const coaches = Array.from({ length: 6 }, (_, i) => ({
    number: `Coach ${i + 1}`,
    id: `coach-${i + 1}`,
    availableSeats: 20,
    price: 10 // Additional price per coach
  }));

  const handleCoachSelect = (coachId: string) => {
    setSelectedCoach(coachId);
    setBookingDetails({
      ...bookingDetails,
      coachNumber: coachId,
      totalAmount: (bookingDetails.totalAmount || 0) + 10 // Add coach price
    });
  };

  const handleProceed = () => {
    if (selectedCoach) {
      navigate('/seat-selection');
    }
  };

  return (
    <div className="container">
      <h1>Select Coach</h1>
      <div className="coach-selection">
        {coaches.map(coach => (
          <div
            key={coach.id}
            className={`coach ${selectedCoach === coach.id ? 'selected' : ''}`}
            onClick={() => handleCoachSelect(coach.id)}
          >
            <h3>{coach.number}</h3>
            <p>Available Seats: {coach.availableSeats}</p>
            <p className="price">+MYR {coach.price}</p>
          </div>
        ))}
      </div>
      <button
        onClick={handleProceed}
        disabled={!selectedCoach}
        style={{ marginTop: '2rem' }}
      >
        Select Seat
      </button>
    </div>
  );
};

export default CoachSelection; 