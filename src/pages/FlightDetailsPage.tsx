import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Container, Grid } from '@mui/material';
import PriceGraph from '../components/tools/PriceGraph';
import FlightCard from '../components/flight/FlightCard';
import PriceAlert from '../components/tools/PriceAlert';
import { AlertSettings } from '../types/flight.types';

const FlightDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedFlight, priceHistory } = useAppSelector(state => state.flights);

  useEffect(() => {
    if (id) {
      // Fetch flight details and price history
      // dispatch(fetchFlightDetails(id));
      // dispatch(fetchPriceHistory(id));
    }
  }, [id, dispatch]);

  const handleBooking = (flightId: string) => {
    navigate(`/booking/${flightId}`);
  };

  const handleCreateAlert = async (settings: AlertSettings): Promise<void> => {
    try {
      console.log('Create price alert:', settings);
    } catch (error) {
      console.error('Failed to create price alert:', error);
    }
  };

  if (!selectedFlight) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Flight Details */}
        <Grid item xs={12} md={8}>
          <FlightCard
            flight={selectedFlight}
            onSelect={() => handleBooking(selectedFlight.id)}
          />
        </Grid>

        {/* Price Tools */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <PriceGraph
                data={priceHistory}
                currency={selectedFlight.price.currency}
              />
            </Grid>
            <Grid item xs={12}>
              <PriceAlert
                currentPrice={selectedFlight.price.amount}
                currency={selectedFlight.price.currency}
                onCreateAlert={handleCreateAlert}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FlightDetailsPage;