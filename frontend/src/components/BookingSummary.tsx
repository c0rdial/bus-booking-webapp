import { useNavigate } from 'react-router-dom';
import { BookingDetails } from '../App';

interface BookingSummaryProps {
  bookingDetails: BookingDetails;
}

const BookingSummary = ({ bookingDetails }: BookingSummaryProps) => {
  const navigate = useNavigate();

  const handleProceed = () => {
    navigate('/payment');
  };

  const handleBack = () => {
    navigate('/seat-selection');
  };

  return (
    <div className="container">
      <h1>Booking Summary</h1>
      <div className="booking-summary">
        <div className="summary-item">
          <span>Train Number</span>
          <span>{bookingDetails.trainNumber}</span>
        </div>
        <div className="summary-item">
          <span>Coach Number</span>
          <span>{bookingDetails.coachNumber}</span>
        </div>
        <div className="summary-item">
          <span>Seat Number</span>
          <span>{bookingDetails.seatNumber}</span>
        </div>
        <div className="summary-item">
          <span>Departure Time</span>
          <span>{bookingDetails.departureTime}</span>
        </div>
        <div className="summary-item">
          <span>Arrival Time</span>
          <span>{bookingDetails.arrivalTime}</span>
        </div>
        <div className="summary-item">
          <span>Number of Passengers</span>
          <span>{bookingDetails.passengers}</span>
        </div>
        <div className="summary-item total">
          <span>Total Amount</span>
          <span className="price">MYR {bookingDetails.totalAmount}</span>
        </div>
      </div>
      <div className="button-group" style={{ marginTop: '2rem' }}>
        <button onClick={handleBack} style={{ marginRight: '1rem' }}>
          Back
        </button>
        <button onClick={handleProceed}>Proceed to Payment</button>
      </div>
    </div>
  );
};

export default BookingSummary; 