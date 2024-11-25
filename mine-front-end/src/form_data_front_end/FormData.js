import React, { useState } from "react";
import { TextField, Button, Box, Grid, CircularProgress, Typography, Alert } from "@mui/material";
import axios from "axios";

const MineInfoForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    operationStartDate: "",
    latitude: "",
    longitude: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage("");
    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:8083/mines", {
        name: formData.name,
        description: formData.description,
        operation_start_date: formData.operationStartDate,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
      });
      setResponseMessage("Data submitted successfully!");
    } catch (error) {
      setErrorMessage("Error submitting data. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <TextField
        label="Mine Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        fullWidth
        multiline
        rows={4}
      />
      <TextField
        label="Operation Start Date"
        type="date"
        name="operationStartDate"
        value={formData.operationStartDate}
        onChange={handleChange}
        required
        fullWidth
        InputLabelProps={{ shrink: true }}
      />

      {/* Latitude and Longitude Fields Side by Side */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Latitude"
            name="latitude"
            type="number"
            value={formData.latitude}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Longitude"
            name="longitude"
            type="number"
            value={formData.longitude}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid>
      </Grid>

      {isSubmitting ? (
        <CircularProgress />
      ) : (
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Submit
        </Button>
      )}

      {responseMessage && <Alert severity="success">{responseMessage}</Alert>}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
    </Box>
  );
};

export default MineInfoForm;
