import React from 'react';
import {
    Paper,
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    useTheme,
    Skeleton,
    IconButton,
    Tooltip
} from '@mui/material';
import {
    ChevronLeft,
    ChevronRight,
    Info
} from '@mui/icons-material';

interface DatePrice {
    date: string;
    price: number;
    available: boolean;
}

interface DateGridProps {
    dates: DatePrice[];
    selectedDate: string;
    currency: string;
    loading?: boolean;
    onDateSelect: (date: string) => void;
    onWeekChange: (direction: 'prev' | 'next') => void;
}

const DateGrid: React.FC<DateGridProps> = ({
    dates,
    selectedDate,
    currency,
    loading = false,
    onDateSelect,
    onWeekChange
}) => {
    const theme = useTheme();

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return {
            day: new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date),
            date: new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(date),
            month: new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date)
        };
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
        }).format(price);
    };

    const getBestPrice = () => {
        const availablePrices = dates
            .filter(d => d.available)
            .map(d => d.price);
        return Math.min(...availablePrices);
    };

    const bestPrice = getBestPrice();

    return (
        <Paper sx={{ p: 2 }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2
            }}>
                <Typography variant="h6">
                    Flexible Dates
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Tooltip title="Compare prices across different dates">
                        <Info fontSize="small" color="action" />
                    </Tooltip>
                    <IconButton
                        size="small"
                        onClick={() => onWeekChange('prev')}
                    >
                        <ChevronLeft />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => onWeekChange('next')}
                    >
                        <ChevronRight />
                    </IconButton>
                </Box>
            </Box>

            <Grid container spacing={1}>
                {loading ? (
                    Array.from(new Array(7)).map((_, index) => (
                        <Grid item xs key={index}>
                            <Skeleton
                                variant="rectangular"
                                height={100}
                                sx={{ borderRadius: 1 }}
                            />
                        </Grid>
                    ))
                ) : (
                    dates.map((datePrice) => {
                        const formattedDate = formatDate(datePrice.date);
                        const isSelected = datePrice.date === selectedDate;
                        const isBestPrice = datePrice.available &&
                            datePrice.price === bestPrice;

                        return (
                            <Grid item xs key={datePrice.date}>
                                <Card
                                    sx={{
                                        cursor: datePrice.available ? 'pointer' : 'not-allowed',
                                        opacity: datePrice.available ? 1 : 0.5,
                                        bgcolor: isSelected ? 'primary.main' : 'background.paper',
                                        transition: 'all 0.2s',
                                        '&:hover': datePrice.available ? {
                                            transform: 'translateY(-2px)',
                                            boxShadow: theme.shadows[4]
                                        } : {},
                                    }}
                                    onClick={() => {
                                        if (datePrice.available) {
                                            onDateSelect(datePrice.date);
                                        }
                                    }}
                                >
                                    <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
                                        <Typography
                                            variant="caption"
                                            display="block"
                                            textAlign="center"
                                            color={isSelected ? 'primary.contrastText' : 'text.secondary'}
                                        >
                                            {formattedDate.day}
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            textAlign="center"
                                            color={isSelected ? 'primary.contrastText' : 'text.primary'}
                                        >
                                            {formattedDate.date}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            display="block"
                                            textAlign="center"
                                            color={isSelected ? 'primary.contrastText' : 'text.secondary'}
                                        >
                                            {formattedDate.month}
                                        </Typography>
                                        {datePrice.available ? (
                                            <Typography
                                                variant="body2"
                                                textAlign="center"
                                                color={isSelected ? 'primary.contrastText' :
                                                    isBestPrice ? 'success.main' : 'text.primary'}
                                                sx={{ mt: 1, fontWeight: isBestPrice ? 'bold' : 'normal' }}
                                            >
                                                {formatPrice(datePrice.price)}
                                                {isBestPrice && !isSelected && (
                                                    <Typography
                                                        variant="caption"
                                                        display="block"
                                                        color="success.main"
                                                    >
                                                        Best Price
                                                    </Typography>
                                                )}
                                            </Typography>
                                        ) : (
                                            <Typography
                                                variant="body2"
                                                textAlign="center"
                                                color="error.main"
                                                sx={{ mt: 1 }}
                                            >
                                                Not Available
                                            </Typography>
                                        )}
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })
                )}
            </Grid>
        </Paper>
    );
};

export default DateGrid;