import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingDetails } from '../App';
import { malaysianCities, City } from '../data/malaysianCities';

interface HomeProps {
  bookingDetails: BookingDetails;
  setBookingDetails: (details: BookingDetails) => void;
}

const Home = ({ bookingDetails, setBookingDetails }: HomeProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(bookingDetails);
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);

  const filteredOriginCities = useMemo(() => {
    return malaysianCities.filter(city => 
      city.name.toLowerCase().includes(formData.origin.toLowerCase()) ||
      city.code.toLowerCase().includes(formData.origin.toLowerCase())
    );
  }, [formData.origin]);

  const filteredDestinationCities = useMemo(() => {
    return malaysianCities.filter(city => 
      city.name.toLowerCase().includes(formData.destination.toLowerCase()) ||
      city.code.toLowerCase().includes(formData.destination.toLowerCase())
    );
  }, [formData.destination]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingDetails(formData);
    navigate('/train-info');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'passengers' ? parseInt(value) : value
    }));
  };

  const handleCitySelect = (city: City, type: 'origin' | 'destination') => {
    setFormData(prev => ({
      ...prev,
      [type]: `${city.name} (${city.code})`
    }));
    if (type === 'origin') {
      setShowOriginSuggestions(false);
    } else {
      setShowDestinationSuggestions(false);
    }
  };

  return (
    <div className="container">
      <h1>Malaysian Train Booking</h1>
      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-group">
          <label htmlFor="origin">Origin</label>
          <div className="autocomplete-container">
            <input
              type="text"
              id="origin"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              onFocus={() => setShowOriginSuggestions(true)}
              placeholder="Enter origin city"
              required
            />
            {showOriginSuggestions && filteredOriginCities.length > 0 && (
              <div className="suggestions">
                {filteredOriginCities.map(city => (
                  <div
                    key={city.code}
                    className="suggestion-item"
                    onClick={() => handleCitySelect(city, 'origin')}
                  >
                    <span className="city-name">{city.name}</span>
                    <span className="city-state">{city.state}</span>
                    <span className="city-code">{city.code}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="destination">Destination</label>
          <div className="autocomplete-container">
            <input
              type="text"
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              onFocus={() => setShowDestinationSuggestions(true)}
              placeholder="Enter destination city"
              required
            />
            {showDestinationSuggestions && filteredDestinationCities.length > 0 && (
              <div className="suggestions">
                {filteredDestinationCities.map(city => (
                  <div
                    key={city.code}
                    className="suggestion-item"
                    onClick={() => handleCitySelect(city, 'destination')}
                  >
                    <span className="city-name">{city.name}</span>
                    <span className="city-state">{city.state}</span>
                    <span className="city-code">{city.code}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="departureDate">Departure Date</label>
            <input
              type="date"
              id="departureDate"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="returnDate">Return Date (Optional)</label>
            <input
              type="date"
              id="returnDate"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              min={formData.departureDate || new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="passengers">Number of Passengers</label>
          <select
            id="passengers"
            name="passengers"
            value={formData.passengers}
            onChange={handleChange}
            required
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'Passenger' : 'Passengers'}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="search-button">
          Search Trains
        </button>
      </form>
    </div>
  );
};

export default Home; 