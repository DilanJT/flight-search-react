import React, { useState } from 'react';
import {
    Box,
    Typography,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Grid,
    Skeleton,
    Alert,
    SelectChangeEvent,
    Paper
} from '@mui/material';
import FlightCard from './FlightCard';
import { Flight } from '../../types/flight.types';

interface FlightListProps {
    flights: Flight[];
    loading: boolean;
    error: string | null;
    onFlightSelect: (flightId: string) => void;
}

type SortOption = 'price' | 'duration' | 'departure';

const FlightList: React.FC<FlightListProps> = ({
    flights,
    loading,
    error,
    onFlightSelect
}) => {
    const [sortBy, setSortBy] = useState<SortOption>('price');

    const handleSortChange = (event: SelectChangeEvent<SortOption>) => {
        setSortBy(event.target.value as SortOption);
    };

    // Sort flights based on selected option
    const getSortedFlights = () => {
        return [...flights].sort((a, b) => {
            switch (sortBy) {
                case 'price':
                    return a.price.amount - b.price.amount;
                case 'duration':
                    // Assuming duration is in format "2h 30m", convert to minutes for comparison
                    const getDurationInMinutes = (duration: string) => {
                        const [hours, minutes] = duration.split('h ');
                        return parseInt(hours) * 60 + parseInt(minutes);
                    };
                    return getDurationInMinutes(a.duration) - getDurationInMinutes(b.duration);
                case 'departure':
                    return new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime();
                default:
                    return 0;
            }
        });
    };

    if (error) {
        return (
            <Alert severity="error" sx={{ mt: 2 }}>
                {error}
            </Alert>
        );
    }

    return (
        <Box sx={{ mt: 4 }}>
            {/* Header section with count and sort */}
            <Paper sx={{ p: 2, mb: 2 }}>
                <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6">
                            {loading ? (
                                <Skeleton width={200} />
                            ) : (
                                `${flights.length} flights found`
                            )}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Sort by</InputLabel>
                            <Select
                                value={sortBy}
                                label="Sort by"
                                onChange={handleSortChange}
                            >
                                <MenuItem value="price">Price (Lowest first)</MenuItem>
                                <MenuItem value="duration">Duration (Shortest first)</MenuItem>
                                <MenuItem value="departure">Departure Time (Earliest first)</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>

            {/* Flight cards list */}
            <Box sx={{ mt: 2 }}>
                {loading ? (
                    // Loading skeletons
                    [...Array(3)].map((_, index) => (
                        <Paper key={index} sx={{ p: 2, mb: 2 }}>
                            <Skeleton variant="rectangular" height={200} />
                        </Paper>
                    ))
                ) : flights.length === 0 ? (
                    // No results message
                    <Alert severity="info">
                        No flights found matching your criteria. Try adjusting your search parameters.
                    </Alert>
                ) : (
                    // Flight cards
                    getSortedFlights().map(flight => (
                        <FlightCard
                            key={flight.id}
                            flight={flight}
                            onSelect={onFlightSelect}
                        />
                    ))
                )}
            </Box>
        </Box>
    );
};

export default FlightList;