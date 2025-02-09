
import axios, { AxiosInstance } from 'axios';
import * as cheerio from 'cheerio';
import {
  SearchParams,
  Flight,
  PopularDestination,
  PriceHistoryPoint,
  ApiResponse,
  SearchResponse
} from '../types/flight.types';

class FlightService {
  private api: AxiosInstance;
  private scraperApi: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:3000',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    this.scraperApi = axios.create({
      baseURL: import.meta.env.VITE_APP_SCRAPER_URL || 'http://localhost:3001',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      response => response,
      error => this.handleApiError(error)
    );
  }

  // Error handling
  private handleApiError(error: any): Promise<never> {
    let errorMessage = 'An unexpected error occurred';

    if (error.response) {
      // Server responded with error
      errorMessage = error.response.data.message || errorMessage;
    } else if (error.request) {
      // No response received
      errorMessage = 'No response from server';
    }

    return Promise.reject(new Error(errorMessage));
  }

  // Search flights using web scraping
  async searchFlights(params: SearchParams): Promise<ApiResponse<Flight[]>> {
    try {
      // First try the API
      try {
        const apiResponse = await this.api.post<ApiResponse<Flight[]>>('/flights/search', params);
        return apiResponse.data;
      } catch {
        // If API fails, fall back to scraping
        return await this.scrapeFlights(params);
      }
    } catch (error) {
      throw new Error('Failed to fetch flights');
    }
  }

  // Scrape flights from various sources
  private async scrapeFlights(params: SearchParams): Promise<ApiResponse<Flight[]>> {
    const flights: Flight[] = [];

    // Scrape from multiple sources
    await Promise.all([
      this.scrapeSource1(params),
      this.scrapeSource2(params)
    ]).then(results => {
      results.forEach(result => {
        if (result) {
          flights.push(...result);
        }
      });
    });

    return {
      data: flights,
      status: 200,
      message: 'Flights fetched successfully',
      timestamp: new Date().toISOString()
    };
  }

  // Scrape from source 1 (e.g., specific airline website)
  private async scrapeSource1(params: SearchParams): Promise<Flight[]> {
    try {
      const response = await this.scraperApi.post('/scrape/source1', params);
      const html = response.data;
      const $ = cheerio.load(html);
      const flights: Flight[] = [];

      // Example scraping logic
      $('.flight-item').each((_, element) => {
        const flight: Flight = {
          id: $(element).attr('data-flight-id') || '',
          airline: $(element).find('.airline-name').text(),
          flightNumber: $(element).find('.flight-number').text(),
          origin: {
            city: $(element).find('.origin-city').text(),
            code: $(element).find('.origin-code').text()
          },
          destination: {
            city: $(element).find('.destination-city').text(),
            code: $(element).find('.destination-code').text()
          },
          departureTime: $(element).find('.departure-time').text(),
          arrivalTime: $(element).find('.arrival-time').text(),
          duration: $(element).find('.duration').text(),
          price: {
            amount: parseFloat($(element).find('.price').text().replace(/[^0-9.]/g, '')),
            currency: 'USD'
          },
          stops: parseInt($(element).find('.stops').text(), 10),
          available_seats: parseInt($(element).find('.seats').text(), 10),
          class: 'Economy'
        };

        flights.push(flight);
      });

      return flights;
    } catch (error) {
      console.error('Error scraping source 1:', error);
      return [];
    }
  }

  // Scrape from source 2 (e.g., another airline website)
  private async scrapeSource2(params: SearchParams): Promise<Flight[]> {
    // Similar implementation as source1 but for different website structure
    return [];
  }

  // Get popular destinations
  async getPopularDestinations(): Promise<ApiResponse<PopularDestination[]>> {
    const response = await this.api.get<ApiResponse<PopularDestination[]>>('/destinations/popular');
    return response.data;
  }

  // Get price history
  async getPriceHistory(flightId: string): Promise<ApiResponse<PriceHistoryPoint[]>> {
    const response = await this.api.get<ApiResponse<PriceHistoryPoint[]>>(`/flights/${flightId}/prices`);
    return response.data;
  }

  // Create price alert
  async createPriceAlert(flightId: string, settings: any): Promise<ApiResponse<any>> {
    const response = await this.api.post<ApiResponse<any>>(`/flights/${flightId}/alerts`, settings);
    return response.data;
  }
}

export const flightService = new FlightService();