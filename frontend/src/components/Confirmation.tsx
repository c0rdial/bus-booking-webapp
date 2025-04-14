import { useNavigate } from 'react-router-dom';
import { BookingDetails } from '../App';

interface ConfirmationProps {
  bookingDetails: BookingDetails;
}

const Confirmation = ({ bookingDetails }: ConfirmationProps) => {
  const navigate = useNavigate();

  const handleNewBooking = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <div className="confirmation-content">
        <h1>Booking Confirmed!</h1>
        <div className="confirmation-icon">✓</div>
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
          <div className="summary-item total">
            <span>Total Amount Paid</span>
            <span className="price">MYR {bookingDetails.totalAmount}</span>
          </div>
        </div>
        <p className="confirmation-message">
          Your booking has been confirmed. A confirmation email has been sent to your registered email address.
        </p>
        <button onClick={handleNewBooking} style={{ marginTop: '2rem' }}>
          Make Another Booking
        </button>
      </div>
    </div>
  );
};

export default Confirmation; 