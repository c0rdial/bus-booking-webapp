import React, { useState } from 'react';

interface HomeScreenProps {
  onNext: (formData: FormData) => void;
}

interface FormData {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  pax: number;
}

function HomeScreen({ onNext }: HomeScreenProps) {
  const [formData, setFormData] = useState<FormData>({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    pax: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'pax' ? parseInt(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <div className="home-screen">
      <h1>Book Your Train</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="origin"
          placeholder="Origin"
          value={formData.origin}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={formData.destination}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="departureDate"
          value={formData.departureDate}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="returnDate"
          value={formData.returnDate}
          onChange={handleChange}
        />
        <input
          type="number"
          name="pax"
          placeholder="Number of Passengers"
          value={formData.pax}
          onChange={handleChange}
          min="1"
          required
        />
        <p>All prices are in MYR (Malaysian Ringgit).</p>
        <button type="submit">Next</button>
      </form>
    </div>
  );
}

export default HomeScreen;
