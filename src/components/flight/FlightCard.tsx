import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Divider,
  Grid,
  useTheme
} from '@mui/material';
import {
  FlightTakeoff,
  FlightLand,
  AccessTime,
  Airlines
} from '@mui/icons-material';

interface FlightCardProps {
  flight: {
    id: string;
    airline: string;
    flightNumber: string;
    departureTime: string;
    arrivalTime: string;
    origin: {
      city: string;
      code: string;
    };
    destination: {
      city: string;
      code: string;
    };
    duration: string;
    price: {
      amount: number;
      currency: string;
    };
    stops: number;
  };
  onSelect: (flightId: string) => void;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight, onSelect }) => {
  const theme = useTheme();

  // Format price with currency
  const formatPrice = (price: { amount: number; currency: string }) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: price.currency
    }).format(price.amount);
  };

  // Get stop label
  const getStopLabel = (stops: number) => {
    if (stops === 0) return 'Direct';
    return `${stops} ${stops === 1 ? 'Stop' : 'Stops'}`;
  };

  return (
    <Card 
      sx={{ 
        mb: 2,
        '&:hover': {
          boxShadow: theme.shadows[4],
          transform: 'translateY(-2px)',
          transition: 'all 0.3s'
        }
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          {/* Airline Info */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Airlines sx={{ mr: 1 }} />
              <Typography variant="h6">
                {flight.airline} - {flight.flightNumber}
              </Typography>
            </Box>
          </Grid>

          {/* Flight Times */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FlightTakeoff sx={{ mr: 1, color: 'primary.main' }} />
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    {flight.departureTime}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {flight.origin.city} ({flight.origin.code})
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FlightLand sx={{ mr: 1, color: 'primary.main' }} />
                <Box>
                  <Typography variant="body1" fontWeight="bold">
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
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccessTime sx={{ mr: 1 }} />
                <Typography variant="body1">
                  {flight.duration}
                </Typography>
              </Box>
              <Chip 
                label={getStopLabel(flight.stops)}
                color={flight.stops === 0 ? 'success' : 'default'}
                size="small"
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
              <Typography variant="h5" color="primary" fontWeight="bold">
                {formatPrice(flight.price)}
              </Typography>
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => onSelect(flight.id)}
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