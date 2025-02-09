import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchFlights, setFilters } from '../store/slices/flightSlice';
import { Flight, SearchParams, FilterState } from '../types/flight.types';
import { applyFilters } from '../utils/filters';

export const useFlightSearch = () => {
  const dispatch = useAppDispatch();
  const {
    flights,
    loading,
    error,
    filters,
    searchParams
  } = useAppSelector(state => state.flights);

  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);

  useEffect(() => {
    setFilteredFlights(applyFilters(flights, filters));
  }, [flights, filters]);

  const searchFlights = async (params: SearchParams) => {
    try {
      await dispatch(fetchFlights(params)).unwrap();
    } catch (error) {
      console.error('Failed to fetch flights:', error);
    }
  };

  const updateFilters = (newFilters: FilterState) => {
    dispatch(setFilters(newFilters));
  };

  return {
    flights: filteredFlights,
    loading,
    error,
    filters,
    searchParams,
    searchFlights,
    updateFilters
  };
};
