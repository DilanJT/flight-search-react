export const validateSearchParams = (origin: string, destination: string): string | null => {
    if (!origin || !destination) {
      return 'Please enter both origin and destination';
    }
    if (origin === destination) {
      return 'Origin and destination cannot be the same';
    }
    return null;
  };
  
  export const validateDate = (date: Date): string | null => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date < today) {
      return 'Date cannot be in the past';
    }
    return null;
  };