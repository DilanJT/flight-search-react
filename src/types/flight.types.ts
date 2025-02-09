// src/types/flight.types.ts

// Base flight interface
export interface Flight {
    id: string;
    airline: string;
    flightNumber: string;
    origin: Airport;
    destination: Airport;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    price: Price;
    stops: number;
    available_seats: number;
    class: FlightClass;
  }
  
  // Airport interface
  export interface Airport {
    city: string;
    code: string;
    terminal?: string;
    country?: string;
  }
  
  // Price interface
  export interface Price {
    amount: number;
    currency: string;
  }
  
  // Flight class type
  export type FlightClass = 'Economy' | 'Business' | 'First';
  
  // Search parameters interface
  export interface SearchParams {
    origin: string;
    destination: string;
    departureDate: Date;
    returnDate?: Date;
    passengers: number;
    class: FlightClass;
  }
  
  // Filter state interface
  export interface FilterState {
    priceRange: {
      min: number;
      max: number;
    };
    selectedAirlines: string[];
    stops: number[];
    flightClass?: FlightClass[];
    departureTime?: {
      start: string;
      end: string;
    };
  }
  
  // Popular destination interface
  export interface PopularDestination {
    id: string;
    city: string;
    country: string;
    code: string;
    price: Price;
    imageUrl: string;
    deals: {
      count: number;
      lowestDiscount: number;
    };
  }
  
  // Flight state interface for Redux
  export interface FlightState {
    flights: Flight[];
    loading: boolean;
    error: string | null;
    searchParams: SearchParams | null;
    filters: FilterState;
    popularDestinations: PopularDestination[];
    selectedFlight: Flight | null;
    priceHistory: PriceHistoryPoint[];
  }
  
  // Price history point interface
  export interface PriceHistoryPoint {
    date: string;
    price: number;
    lowestPrice: number;
  }
  
  // Alert settings interface
  export interface AlertSettings {
    id?: string;
    targetPrice: number;
    email: string;
    phone?: string;
    emailNotifications: boolean;
    smsNotifications: boolean;
  }
  
  // Sort options type
  export type SortOption = 'price' | 'duration' | 'departure' | 'arrival';
  
  // API response interfaces
  export interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
    timestamp: string;
  }
  
  export interface SearchResponse {
    flights: Flight[];
    meta: {
      total: number;
      filters: FilterState;
      sort: SortOption;
    };
  }