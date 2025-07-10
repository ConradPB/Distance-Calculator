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

  // Update reverse addresses when coordinates change
  const updateAddresses = useCallback(async () => {
    if (location1.lat && location1.lng && !address1) {
      setLoading(true);
      const address = await reverseGeocode(location1);
      setReverseAddress1(address);
      setLoading(false);
    }
    if (location2.lat && location2.lng && !address2) {
      setLoading(true);
      const address = await reverseGeocode(location2);
      setReverseAddress2(address);
      setLoading(false);
    }
  }, [location1, location2, address1, address2]);

  useEffect(() => {
    updateAddresses();
  }, [updateAddresses]);

  // Calculate distance
  const calculateDistance = async () => {
    setError('');
    setDistance(null);
    setLoading(true);

    try {
      let coordinates1 = location1;
      let coordinates2 = location2;

      if (address1) {
        coordinates1 = await geocodeAddress(address1);
        setLocation1(coordinates1);
      }
      if (address2) {
        coordinates2 = await geocodeAddress(address2);
        setLocation2(coordinates2);
      }

      if (!coordinates1.lat || !coordinates1.lng || !coordinates2.lat || !coordinates2.lng) {
        throw new Error('Please enter valid addresses or coordinates.');
      }

      const result = haversineDistance(
        parseFloat(coordinates1.lat),
        parseFloat(coordinates1.lng),
        parseFloat(coordinates2.lat),
        parseFloat(coordinates2.lng)
      );
      setDistance(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper
        elevation={10}
        sx={{
          p: 4,
          borderRadius: 4,
          background: 'linear-gradient(135deg, #1e3a8a, #7dd3fc)',
          backdropFilter: 'blur(10px)',
          animation: 'fadeIn 1s ease',
        }}
      >
        <Typography
          variant="h3"
          align="center"
          sx={{
            color: '#fff',
            mb: 4,
            fontWeight: 800,
            letterSpacing: '1px',
            textShadow: '2px 2px 6px rgba(0,0,0,0.4)',
          }}
        >
          Distance Calculator
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography variant="h6" sx={{ color: '#e0f7fa', mb: 1, fontWeight: 500 }}>
              Starting Point
            </Typography>
            <TextField
              label="Address"
              value={address1}
              onChange={(e) => {
                setAddress1(e.target.value);
                setReverseAddress1('');
              }}
              fullWidth
              variant="outlined"
              placeholder="e.g., New York, NY"
              sx={{
                mb: 2,
                input: { color: '#fff', fontWeight: 500 },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#e0f7fa' },
                  '&:hover fieldset': { borderColor: '#7dd3fc' },
                  '&.Mui-focused fieldset': { borderColor: '#38bdf8' },
                },
                '& .MuiInputLabel-root': { color: '#e0f7fa' },
                '& .MuiInputLabel-root.Mui-focused': { color: '#38bdf8' },
              }}
            />
            <Typography sx={{ color: '#e0f7fa', mb: 1 }}>
              {reverseAddress1 && !address1 ? `Resolved Address: ${reverseAddress1}` : ''}
            </Typography>
            <TextField
              label="Latitude"
              type="number"
              value={location1.lat}
              onChange={(e) => setLocation1({ ...location1, lat: e.target.value })}
              fullWidth
              variant="outlined"
              placeholder="e.g., 40.7128"
              sx={{
                mb: 2,
                input: { color: '#fff', fontWeight: 500 },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#e0f7fa' },
                  '&:hover fieldset': { borderColor: '#7dd3fc' },
                  '&.Mui-focused fieldset': { borderColor: '#38bdf8' },
                },
                '& .MuiInputLabel-root': { color: '#e0f7fa' },
                '& .MuiInputLabel-root.Mui-focused': { color: '#38bdf8' },
              }}
            />
            <TextField
              label="Longitude"
              type="number"
              value={location1.lng}
              onChange={(e) => setLocation1({ ...location1, lng: e.target.value })}
              fullWidth
              variant="outlined"
              placeholder="e.g., -74.0060"
              sx={{
                input: { color: '#fff', fontWeight: 500 },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#e0f7fa' },
                  '&:hover fieldset': { borderColor: '#7dd3fc' },
                  '&.Mui-focused fieldset': { borderColor: '#38bdf8' },
                },
                '& .MuiInputLabel-root': { color: '#e0f7fa' },
                '& .MuiInputLabel-root.Mui-focused': { color: '#38bdf8' },
              }}
            />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ color: '#e0f7fa', mb: 1, fontWeight: 500 }}>
              Ending Point
            </Typography>
            <TextField
              label="Address"
              value={address2}
              onChange={(e) => {
                setAddress2(e.target.value);
                setReverseAddress2('');
              }}
              fullWidth
              variant="outlined"
              placeholder="e.g., London, UK"
              sx={{
                mb: 2,
                input: { color: '#fff', fontWeight: 500 },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#e0f7fa' },
                  '&:hover fieldset': { borderColor: '#7dd3fc' },
                  '&.Mui-focused fieldset': { borderColor: '#38bdf8' },
                },
                '& .MuiInputLabel-root': { color: '#e0f7fa' },
                '& .MuiInputLabel-root.Mui-focused': { color: '#38bdf8' },
              }}
            />
            <Typography sx={{ color: '#e0f7fa', mb: 1 }}>
              {reverseAddress2 && !address2 ? `Resolved Address: ${reverseAddress2}` : ''}
            </Typography>
            <TextField
              label="Latitude"
              type="number"
              value={location2.lat}
              onChange={(e) => setLocation2({ ...location2, lat: e.target.value })}
              fullWidth
              variant="outlined"
              placeholder="e.g., 51.5074"
              sx={{
                mb: 2,
                input: { color: '#fff', fontWeight: 500 },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#e0f7fa' },
                  '&:hover fieldset': { borderColor: '#7dd3fc' },
                  '&.Mui-focused fieldset': { borderColor: '#38bdf8' },
                },
                '& .MuiInputLabel-root': { color: '#e0f7fa' },
                '& .MuiInputLabel-root.Mui-focused': { color: '#38bdf8' },
              }}
            />
            <TextField
              label="Longitude"
              type="number"
              value={location2.lng}
              onChange={(e) => setLocation2({ ...location2, lng: e.target.value })}
              fullWidth
              variant="outlined"
              placeholder="e.g., -0.1278"
              sx={{
                input: { color: '#fff', fontWeight: 500 },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#e0f7fa' },
                  '&:hover fieldset': { borderColor: '#7dd3fc' },
                  '&.Mui-focused fieldset': { borderColor: '#38bdf8' },
                },
                '& .MuiInputLabel-root': { color: '#e0f7fa' },
                '& .MuiInputLabel-root.Mui-focused': { color: '#38bdf8' },
              }}
            />
          </Box>
          
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default Calculator;