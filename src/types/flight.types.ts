export interface Flight {
    id: string;
    airline: string;
    flightNumber: string;
    origin: {
        city: string;
        code: string;
        terminal?: string;
    };
    destination: {
        city: string;
        code: string;
        terminal?: string;
    };
    departureTime: string;
    arrivalTime: string;
    duration: string;
    price: {
        amount: number;
        currency: string;
    };
    stops: number;
    available_seats: number;
    class: FlightClass;
}

export type FlightClass = "Economy" | "Business" | "First";

export interface SearchParams {
    origin: string;
    destination: string;
    departureDate: Date;
    returnDate?: Date;
    passengers: number;
    class: FlightClass;
}
