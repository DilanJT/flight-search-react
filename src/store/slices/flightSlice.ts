import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { FlightState, SearchParams, FilterState, Flight } from '../../types/flight.types';
import { flightService } from '../../services/flightService';

const initialState: FlightState = {
  flights: [],
  loading: false,
  error: null,
  searchParams: null,
  filters: {
    priceRange: { min: 0, max: 10000 },
    selectedAirlines: [],
    stops: []
  },
  popularDestinations: [],
  selectedFlight: null,
  priceHistory: []
};

// Async thunks
export const fetchFlights = createAsyncThunk(
  'flights/fetchFlights',
  async (params: SearchParams, { rejectWithValue }) => {
    try {
      const response = await flightService.searchFlights(params);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch flights');
    }
  }
);

export const fetchPopularDestinations = createAsyncThunk(
  'flights/fetchPopularDestinations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await flightService.getPopularDestinations();
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch popular destinations');
    }
  }
);

export const fetchPriceHistory = createAsyncThunk(
  'flights/fetchPriceHistory',
  async (flightId: string, { rejectWithValue }) => {
    try {
      const response = await flightService.getPriceHistory(flightId);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch price history');
    }
  }
);

const flightSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    setSearchParams: (state, action: PayloadAction<SearchParams>) => {
      state.searchParams = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterState>) => {
      state.filters = action.payload;
    },
    setSelectedFlight: (state, action: PayloadAction<Flight | null>) => {
      state.selectedFlight = action.payload;
    },
    clearFlights: (state) => {
      state.flights = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Flights
      .addCase(fetchFlights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.loading = false;
        state.flights = action.payload;
      })
      .addCase(fetchFlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Popular Destinations
      .addCase(fetchPopularDestinations.fulfilled, (state, action) => {
        state.popularDestinations = action.payload;
      })
      // Price History
      .addCase(fetchPriceHistory.fulfilled, (state, action) => {
        state.priceHistory = action.payload;
      });
  }
});

export const {
  setSearchParams,
  setFilters,
  setSelectedFlight,
  clearFlights
} = flightSlice.actions;

export default flightSlice.reducer;