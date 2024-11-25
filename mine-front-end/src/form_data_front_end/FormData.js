import React, { useState } from 'react';
import axios from 'axios';


const MineInfoForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    operationStartDate: '',
    latitude: null,
    longitude: null
  });

  const handleLocationChange = (latitude, longitude) => {
    setFormData((prev) => ({
      ...prev,
      latitude: parseFloat(latitude), // Convert string to float if needed
      longitude: parseFloat(longitude)
    }));
  };
  
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace `/api/mines` with your backend endpoint
      const response = await axios.post('http://localhost:8083/mines', {
        name: formData.name,
        description: formData.description,
        operation_start_date: formData.operationStartDate,
        latitude: formData.latitude,
        longitude: formData.longitude
      });

      console.log(response);
      setResponseMessage('Data submitted successfully!');
    } catch (error) {
      console.error(error);
      setResponseMessage('Error submitting data. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mine-info-form">
      <h2>Submit Mine Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Mine Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="operationStartDate">Operation Start Date:</label>
          <input
            type="date"
            id="operationStartDate"
            name="operationStartDate"
            value={formData.operationStartDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
      <div>
        <label htmlFor="latitude">Latitude:</label>
        <input
  type="number"
  placeholder="Latitude"
  value={formData.latitude || ''}
  onChange={(e) => handleLocationChange(e.target.value, formData.longitude)}
/>

        <label htmlFor="longitude">Longitude:</label>


<input
  type="number"
  placeholder="Longitude"
  value={formData.longitude || ''}
  onChange={(e) => handleLocationChange(formData.latitude, e.target.value)}
/>


      </div>
    </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default MineInfoForm;
