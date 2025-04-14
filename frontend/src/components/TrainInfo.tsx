import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingDetails } from '../App';

interface Train {
  id: string;
  number: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
}

interface TrainInfoProps {
  bookingDetails: BookingDetails;
  setBookingDetails: (details: BookingDetails) => void;
}

const TrainInfo = ({ bookingDetails, setBookingDetails }: TrainInfoProps) => {
  const navigate = useNavigate();
  const [selectedTrain, setSelectedTrain] = useState<string | null>(null);

  // Mock train data - in a real app, this would come from an API
  const trains: Train[] = [
    {
      id: '1',
      number: 'T123',
      departureTime: '08:00 AM',
      arrivalTime: '12:00 PM',
      duration: '4h 0m',
      price: 50
    },
    {
      id: '2',
      number: 'T456',
      departureTime: '10:00 AM',
      arrivalTime: '02:00 PM',
      duration: '4h 0m',
      price: 45
    },
    {
      id: '3',
      number: 'T789',
      departureTime: '02:00 PM',
      arrivalTime: '06:00 PM',
      duration: '4h 0m',
      price: 55
    }
  ];

  const handleTrainSelect = (train: Train) => {
    setSelectedTrain(train.id);
    setBookingDetails({
      ...bookingDetails,
      trainNumber: train.number,
      departureTime: train.departureTime,
      arrivalTime: train.arrivalTime,
      totalAmount: train.price * bookingDetails.passengers
    });
  };

  const handleProceed = () => {
    if (selectedTrain) {
      navigate('/coach-selection');
    }
  };

  return (
    <div className="container">
      <h1>Available Trains</h1>
      <div className="trains-list">
        {trains.map(train => (
          <div
            key={train.id}
            className={`train-card ${selectedTrain === train.id ? 'selected' : ''}`}
            onClick={() => handleTrainSelect(train)}
          >
            <div className="train-header">
              <h2>Train {train.number}</h2>
              <span className="price">MYR {train.price}</span>
            </div>
            <div className="train-details">
              <div className="time-details">
                <div>
                  <span className="label">Departure</span>
                  <span className="time">{train.departureTime}</span>
                </div>
                <div>
                  <span className="label">Arrival</span>
                  <span className="time">{train.arrivalTime}</span>
                </div>
                <div>
                  <span className="label">Duration</span>
                  <span className="time">{train.duration}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleProceed}
        disabled={!selectedTrain}
        style={{ marginTop: '2rem' }}
      >
        Select Coach
      </button>
    </div>
  );
};

export default TrainInfo; 