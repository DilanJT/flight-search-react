import React from 'react';
import { Flight } from '../../types/flight.types';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Grid,
  Chip
} from '@mui/material';
import { 
  FlightTakeoff, 
  FlightLand, 
  AccessTime 
} from '@mui/icons-material';

interface FlightCardProps {
  flight: Flight;
  onSelect: (flightId: string) => void;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight, onSelect }) => {
  const formatPrice = (price: { amount: number; currency: string }) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: price.currency,
      minimumFractionDigits: 0
    }).format(price.amount);
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          {/* Airline Info */}
          <Grid item xs={12}>
            <Typography variant="h6">
              {flight.airline} - {flight.flightNumber}
            </Typography>
          </Grid>

          {/* Flight Times */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FlightTakeoff color="primary" />
                <Box>
                  <Typography variant="body1">
                    {flight.departureTime}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {flight.origin.city} ({flight.origin.code})
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FlightLand color="primary" />
                <Box>
                  <Typography variant="body1">
                    {flight.arrivalTime}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {flight.destination.city} ({flight.destination.code})
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Duration and Stops */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccessTime />
                <Typography>{flight.duration}</Typography>
              </Box>
              <Chip 
                label={flight.stops === 0 ? 'Non-stop' : `${flight.stops} ${flight.stops === 1 ? 'stop' : 'stops'}`}
                color={flight.stops === 0 ? 'success' : 'default'}
              />
            </Box>
          </Grid>

          {/* Price and Action */}
          <Grid item xs={12} md={4}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'flex-end',
              height: '100%',
              justifyContent: 'space-between'
            }}>
              <Typography variant="h5" color="primary">
                {formatPrice(flight.price)}
              </Typography>
              <Button
                variant="contained"
                onClick={() => onSelect(flight.id)}
                sx={{ mt: 2 }}
              >
                Select Flight
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FlightCard;