import { Flight, FilterState } from '../types/flight.types';

export const applyFilters = (flights: Flight[], filters: FilterState): Flight[] => {
  return flights.filter(flight => {
    // Price filter
    if (
      flight.price.amount < filters.priceRange.min ||
      flight.price.amount > filters.priceRange.max
    ) {
      return false;
    }

    // Airline filter
    if (
      filters.selectedAirlines.length > 0 &&
      !filters.selectedAirlines.includes(flight.airline)
    ) {
      return false;
    }

    // Stops filter
    if (
      filters.stops.length > 0 &&
      !filters.stops.includes(flight.stops)
    ) {
      return false;
    }

    return true;
  });
};
