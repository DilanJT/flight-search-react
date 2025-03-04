import { configureStore } from '@reduxjs/toolkit';
import flightReducer from './slices/flightSlice';

export const store = configureStore({
  reducer: {
    flights: flightReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;