import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  Grid,
  InputAdornment,
  Typography
} from '@mui/material';
import { FlightTakeoff, FlightLand } from '@mui/icons-material';

// First, define our props interface
interface SearchBarProps {
    onSearch: (searchData: SearchFormData) => void;
}
  
// Define the shape of our form data
interface SearchFormData {
    origin: string;
    destination: string;
    departureDate: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    // State management using useState hook
    const [formData, setFormData] = useState<SearchFormData>({
      origin: '',
      destination: '',
      departureDate: ''
    });
  
    // Event handler for form submission
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      onSearch(formData);
    };
  
    // Event handler for input changes
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    return (
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3,
          mb: 4,
          backgroundColor: 'background.paper'
        }}
      >
        {/* Title Section */}
        <Typography variant="h5" gutterBottom>
          Search Flights
        </Typography>
  
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Origin Input */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                name="origin"
                label="From"
                value={formData.origin}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FlightTakeoff />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
  
            {/* Destination Input */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                name="destination"
                label="To"
                value={formData.destination}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FlightLand />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
  
            {/* Date Input */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                name="departureDate"
                label="Departure Date"
                type="date"
                value={formData.departureDate}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
  
            {/* Submit Button */}
            <Grid item xs={12}>
              <Button 
                type="submit"
                variant="contained"
                fullWidth
                size="large"
              >
                Search Flights
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    );
  };
  
  export default SearchBar;