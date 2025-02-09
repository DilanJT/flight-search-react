import React, { useState } from 'react';
import {
  Container,
  Grid,
  Box,
  useTheme,
  useMediaQuery,
  Drawer,
  Fab
} from '@mui/material';
import { FilterList } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchFlights, setFilters } from '../store/slices/flightSlice';
import { SearchParams, FilterState } from '../types/flight.types';

import SearchBar from '../components/flight/SearchBar';
import FlightList from '../components/flight/FlightList';
import FilterPanel from '../components/flight/FilterPanel';
import DateGrid from '../components/tools/DateGrid';
import PopularDestinations from '../components/flight/PopularDestinations';

const FlightSearchPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useAppDispatch();

  // Local state
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  // Redux state
  const {
    flights,
    loading,
    error,
    filters,
    popularDestinations
  } = useAppSelector((state) => state.flights);

  // Handle search submission
  const handleSearch = async (params: SearchParams) => {
    await dispatch(fetchFlights(params)).unwrap();
  };

  // Handle filter changes
  const handleFilterChange = (newFilters: FilterState) => {
    dispatch(setFilters(newFilters));
  };

  // Handle flight selection
  const handleFlightSelect = (flightId: string) => {
    // Implement flight selection logic
    console.log('Selected flight:', flightId);
  };

  // Filter panel for mobile view
  const renderMobileFilterPanel = () => (
    <Drawer
      anchor="left"
      open={mobileFilterOpen}
      onClose={() => setMobileFilterOpen(false)}
    >
      <Box sx={{ width: 300, p: 2 }}>
        <FilterPanel
          priceRange={filters.priceRange}
          selectedAirlines={filters.selectedAirlines}
          stops={filters.stops}
          airlines={['Emirates', 'Qatar Airways', 'Etihad']}
          currency="USD"
          onFilterChange={handleFilterChange}
          onReset={() => handleFilterChange({
            priceRange: { min: 0, max: 10000 },
            selectedAirlines: [],
            stops: []
          })}
        />
      </Box>
    </Drawer>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <SearchBar onSearch={handleSearch} />

      <DateGrid
        dates={[]}
        selectedDate={selectedDate}
        currency="USD"
        onDateSelect={setSelectedDate}
        onWeekChange={() => {}}
      />

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {!isMobile && (
          <Grid item xs={12} md={3}>
            <FilterPanel
              priceRange={filters.priceRange}
              selectedAirlines={filters.selectedAirlines}
              stops={filters.stops}
              airlines={['Emirates', 'Qatar Airways', 'Etihad']}
              currency="USD"
              onFilterChange={handleFilterChange}
              onReset={() => handleFilterChange({
                priceRange: { min: 0, max: 10000 },
                selectedAirlines: [],
                stops: []
              })}
            />
          </Grid>
        )}

        <Grid item xs={12} md={isMobile ? 12 : 9}>
          <FlightList
            flights={flights}
            loading={loading}
            error={error}
            onFlightSelect={handleFlightSelect}
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <PopularDestinations
          destinations={popularDestinations}
          onDestinationClick={() => {}}
        />
      </Box>

      {isMobile && (
        <Fab
          color="primary"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          onClick={() => setMobileFilterOpen(true)}
        >
          <FilterList />
        </Fab>
      )}

      {isMobile && renderMobileFilterPanel()}
    </Container>
  );
};

export default FlightSearchPage;