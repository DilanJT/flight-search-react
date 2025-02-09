export const formatPrice = (amount: number, currency: string): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  export const formatDuration = (duration: string): string => {
    const [hours, minutes] = duration.split('h ');
    return `${hours.padStart(2, '0')}h ${minutes.padStart(2, '0')}m`;
  };
  
  export const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  