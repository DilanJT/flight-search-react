import { useState, useEffect } from 'react';
import axios from 'axios';

interface PriceHistoryPoint {
  date: string;
  price: number;
  lowestPrice: number;
}

interface UsePriceHistoryProps {
  flightRoute: {
    origin: string;
    destination: string;
  };
  startDate: Date;
  endDate: Date;
}

export const usePriceHistory = ({ flightRoute, startDate, endDate }: UsePriceHistoryProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [priceHistory, setPriceHistory] = useState<PriceHistoryPoint[]>([]);

  useEffect(() => {
    const fetchPriceHistory = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get('/api/price-history', {
          params: {
            origin: flightRoute.origin,
            destination: flightRoute.destination,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString()
          }
        });

        const processedData = response.data.map((point: any) => ({
          date: new Date(point.date).toLocaleDateString(),
          price: point.price,
          lowestPrice: point.lowestPrice
        }));

        setPriceHistory(processedData);
      } catch (err) {
        setError('Failed to fetch price history data');
        console.error('Price history fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (flightRoute.origin && flightRoute.destination) {
      fetchPriceHistory();
    }
  }, [flightRoute, startDate, endDate]);

  return {
    priceHistory,
    loading,
    error
  };
};
