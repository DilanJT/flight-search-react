import { Flight } from "./flight.types";

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
      filters: SearchFilters;
      sort: SortOptions;
    };
  }
  
  export interface SearchFilters {
    airlines: string[];
    priceRange: {
      min: number;
      max: number;
    };
    stops: number[];
  }
  
  export type SortOptions = 'price' | 'duration' | 'departure' | 'arrival';