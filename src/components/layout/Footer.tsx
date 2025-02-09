import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: 'primary.dark'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="white" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="white">
              Find the best flight deals and book with confidence.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="white" gutterBottom>
              Quick Links
            </Typography>
            <Box>
              <Link href="#" color="inherit" display="block">Search Flights</Link>
              <Link href="#" color="inherit" display="block">Special Deals</Link>
              <Link href="#" color="inherit" display="block">Contact Us</Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="white" gutterBottom>
              Contact Info
            </Typography>
            <Typography variant="body2" color="white">
              Email: support@flightsearch.com
              <br />
              Phone: +1 234 567 8900
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
