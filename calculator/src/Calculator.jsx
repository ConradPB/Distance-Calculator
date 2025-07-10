import { useState, useEffect, useCallback } from 'react';
import { Container, TextField, Button, Typography, Box, Paper, CircularProgress } from '@mui/material';
import './Calculator.css';

function Calculator() {
  const [location1, setLocation1] = useState({ lat: '', lng: '' });
  const [location2, setLocation2] = useState({ lat: '', lng: '' });
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [reverseAddress1, setReverseAddress1] = useState('');
  const [reverseAddress2, setReverseAddress2] = useState('');
  const [distance, setDistance] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Haversine formula
  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceKm = R * c;
    const distanceMiles = distanceKm * 0.621371;
    return { km: distanceKm.toFixed(2), miles: distanceMiles.toFixed(2) };
  };

  // Geocode address to coordinates
  const geocodeAddress = async (address) => {
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${
          process.env.REACT_APP_OPENCAGE_API_KEY
        }`
      );
      const data = await response.json();
      if (data.results.length === 0) throw new Error(`Address not found: ${address}`);
      return data.results[0].geometry;
    } catch (err) {
      throw new Error(`Failed to geocode address: ${address}`);
    }
  };

  // Reverse geocode coordinates to address
  const reverseGeocode = async (coordinates) => {
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${coordinates.lat}+${coordinates.lng}&key=${
          process.env.REACT_APP_OPENCAGE_API_KEY
        }`
      );
      const data = await response.json();
      if (data.results.length === 0) return 'No address found';
      return data.results[0].formatted;
    } catch (err) {
      return 'Failed to reverse geocode';
    }
  };

 
}

export default Calculator;