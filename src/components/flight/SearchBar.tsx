import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent
} from '@mui/material';
import { FlightTakeoff, FlightLand } from '@mui/icons-material';
import { SearchParams, FlightClass } from '../../types/flight.types';

interface SearchBarProps {
  onSearch: (searchData: SearchParams) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [formData, setFormData] = useState<SearchParams>({
    origin: '',
    destination: '',
    departureDate: new Date(),
    passengers: 1,
    class: 'Economy'
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(formData);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseInt(value) || 1
    }));
  };

  const handleClassChange = (event: SelectChangeEvent<FlightClass>) => {
    setFormData(prev => ({
      ...prev,
      class: event.target.value as FlightClass
    }));
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              name="origin"
              label="From"
              value={formData.origin}
              onChange={handleTextChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FlightTakeoff />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              name="destination"
              label="To"
              value={formData.destination}
              onChange={handleTextChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FlightLand />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              name="departureDate"
              label="Departure Date"
              type="date"
              value={formData.departureDate.toISOString().split('T')[0]}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                departureDate: new Date(e.target.value)
              }))}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              name="passengers"
              label="Passengers"
              type="number"
              value={formData.passengers}
              onChange={handleNumberChange}
              InputProps={{ inputProps: { min: 1 } }}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel id="flight-class-label">Class</InputLabel>
              <Select<FlightClass>
                labelId="flight-class-label"
                name="class"
                value={formData.class}
                label="Class"
                onChange={handleClassChange}
              >
                <MenuItem value="Economy">Economy</MenuItem>
                <MenuItem value="Business">Business</MenuItem>
                <MenuItem value="First">First</MenuItem>
              </Select>
            </FormControl>
          </Grid>

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