import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';

const MineInfoForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    operationStartDate: '',
    latitude: '',
    longitude: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleLocationChange = (latitude, longitude) => {
    setFormData((prev) => ({
      ...prev,
      latitude: parseFloat(latitude) || '',
      longitude: parseFloat(longitude) || ''
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:8083/mines', {
        name: formData.name,
        description: formData.description,
        operation_start_date: formData.operationStartDate,
        latitude: formData.latitude,
        longitude: formData.longitude
      });

      console.log(response);
      setResponseMessage('Data submitted successfully!');
      Alert.alert('Success', 'Data submitted successfully!');
    } catch (error) {
      console.error(error);
      setResponseMessage('Error submitting data. Please try again.');
      Alert.alert('Error', 'Error submitting data. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submit Mine Information</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Mine Name"
        value={formData.name}
        onChangeText={(text) => handleChange('name', text)}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description"
        value={formData.description}
        onChangeText={(text) => handleChange('description', text)}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Operation Start Date (YYYY-MM-DD)"
        value={formData.operationStartDate}
        onChangeText={(text) => handleChange('operationStartDate', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Latitude"
        keyboardType="numeric"
        value={formData.latitude.toString()}
        onChangeText={(text) => handleLocationChange(text, formData.longitude)}
      />

      <TextInput
        style={styles.input}
        placeholder="Longitude"
        keyboardType="numeric"
        value={formData.longitude.toString()}
        onChangeText={(text) => handleLocationChange(formData.latitude, text)}
      />

      <TouchableOpacity
        style={[styles.button, isSubmitting && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        <Text style={styles.buttonText}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Text>
      </TouchableOpacity>

      {responseMessage ? <Text style={styles.responseMessage}>{responseMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff'
  },
  textArea: {
    height: 100
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center'
  },
  buttonDisabled: {
    backgroundColor: '#cccccc'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  responseMessage: {
    marginTop: 20,
    fontSize: 16,
    color: 'green'
  }
});

export default MineInfoForm;
