import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Skeleton,
  useTheme
} from '@mui/material';
import { TrendingUp, Flight } from '@mui/icons-material';

interface Destination {
  id: string;
  city: string;
  country: string;
  price: {
    amount: number;
    currency: string;
  };
  imageUrl: string;
  deals: {
    count: number;
    lowestDiscount: number;
  };
}

interface PopularDestinationsProps {
  destinations: Destination[];
  loading?: boolean;
  onDestinationClick: (destination: Destination) => void;
}

const PopularDestinations: React.FC<PopularDestinationsProps> = ({
  destinations,
  loading = false,
  onDestinationClick
}) => {
  const theme = useTheme();

  const formatPrice = (price: { amount: number; currency: string }) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: price.currency,
      minimumFractionDigits: 0
    }).format(price.amount);
  };

  // Loading skeleton component
  const DestinationSkeleton = () => (
    <Card sx={{ height: '100%' }}>
      <Skeleton variant="rectangular" height={200} />
      <CardContent>
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="80%" />
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ mt: 4, mb: 6 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3 
      }}>
        <Typography variant="h5" component="h2">
          Popular Destinations from Colombo
        </Typography>
        <Button 
          startIcon={<TrendingUp />}
          color="primary"
        >
          View All Destinations
        </Button>
      </Box>

      <Grid container spacing={3}>
        {loading
          ? Array.from(new Array(4)).map((_, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <DestinationSkeleton />
              </Grid>
            ))
          : destinations.map((destination) => (
              <Grid item key={destination.id} xs={12} sm={6} md={3}>
                <Card 
                  sx={{ 
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[4]
                    }
                  }}
                  onClick={() => onDestinationClick(destination)}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={destination.imageUrl}
                    alt={destination.city}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {destination.city}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      gutterBottom
                    >
                      {destination.country}
                    </Typography>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mt: 2
                    }}>
                      <Typography 
                        variant="h6" 
                        color="primary.main"
                      >
                        {formatPrice(destination.price)}
                      </Typography>
                      
                      {destination.deals.count > 0 && (
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          gap: 0.5
                        }}>
                          <Flight color="secondary" fontSize="small" />
                          <Typography 
                            variant="body2" 
                            color="secondary"
                          >
                            {destination.deals.count} deals
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    {destination.deals.lowestDiscount > 0 && (
                      <Typography 
                        variant="body2" 
                        color="success.main"
                        sx={{ mt: 1 }}
                      >
                        Up to {destination.deals.lowestDiscount}% off
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

export default PopularDestinations;