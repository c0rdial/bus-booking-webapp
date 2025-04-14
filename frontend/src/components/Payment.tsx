import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingDetails } from '../App';

interface PaymentProps {
  bookingDetails: BookingDetails;
}

const Payment = ({ bookingDetails }: PaymentProps) => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would process the payment here
    navigate('/confirmation');
  };

  const handleBack = () => {
    navigate('/booking-summary');
  };

  return (
    <div className="container">
      <h1>Payment Details</h1>
      <div className="payment-summary">
        <div className="summary-item">
          <span>Total Amount</span>
          <span className="price">MYR {bookingDetails.totalAmount}</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-group">
          <label htmlFor="name">Cardholder Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter cardholder name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 9012 3456"
            required
            maxLength={19}
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="MM/YY"
              required
              maxLength={5}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="123"
              required
              maxLength={3}
            />
          </div>
        </div>
        <div className="button-group" style={{ marginTop: '2rem' }}>
          <button type="button" onClick={handleBack}>
            Back
          </button>
          <button type="submit">Confirm Payment</button>
        </div>
      </form>
    </div>
  );
};

export default Payment; 