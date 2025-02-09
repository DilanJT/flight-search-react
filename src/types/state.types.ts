import { Flight } from "./flight.types";
import { SearchFilters, SortOptions } from "./response.types";

export interface RootState {
    flights: FlightState;
    ui: UIState;
}

export interface FlightState {
    searchResults: Flight[];
    loading: boolean;
    error: string | null;
    filters: SearchFilters;
    sortBy: SortOptions;
    selectedFlight: Flight | null;
    popularDestinations: PopularDestination[];
}

export interface UIState {
    darkMode: boolean;
    sidebarOpen: boolean;
    activeFilters: boolean;
    alerts: Alert[];
}

export interface PopularDestination {
    city: string;
    country: string;
    code: string;
    price: {
        amount: number;
        currency: string;
    };
    imageUrl: string;
    deals: FlightDeal[];
}

export interface FlightDeal {
    id: string;
    title: string;
    description: string;
    validUntil: string;
    discount: number;
}

export interface Alert {
    id: string;
    type: "success" | "error" | "warning" | "info";
    message: string;
    duration?: number;
}
