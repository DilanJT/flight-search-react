import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    useTheme,
    CardHeader,
    IconButton,
    Tooltip as MuiTooltip
} from '@mui/material';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import { InfoOutlined } from '@mui/icons-material';

// Define types for our data structure
interface PriceHistoryPoint {
    date: string;
    price: number;
    lowestPrice: number;
}

interface PriceGraphProps {
    data: PriceHistoryPoint[];
    currency: string;
}

const PriceGraph: React.FC<PriceGraphProps> = ({ data, currency }) => {
    const theme = useTheme();

    // Format price for display
    const formatPrice = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    // Custom tooltip component for the graph
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <Card sx={{ p: 1, bgcolor: 'background.paper' }}>
                    <Typography variant="subtitle2">{label}</Typography>
                    <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" color="primary">
                            Current Price: {formatPrice(payload[0].value)}
                        </Typography>
                        <Typography variant="body2" color="secondary">
                            Lowest Price: {formatPrice(payload[1].value)}
                        </Typography>
                    </Box>
                </Card>
            );
        }
        return null;
    };

    return (
        <Card sx={{ height: 400, p: 2 }}>
            <CardHeader
                title="Price History"
                action={
                    <MuiTooltip title="Compare current prices with historical data">
                        <IconButton size="small">
                            <InfoOutlined />
                        </IconButton>
                    </MuiTooltip>
                }
            />
            <CardContent sx={{ height: 'calc(100% - 76px)' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke={theme.palette.divider}
                        />
                        <XAxis
                            dataKey="date"
                            stroke={theme.palette.text.secondary}
                            tick={{ fill: theme.palette.text.secondary }}
                        />
                        <YAxis
                            stroke={theme.palette.text.secondary}
                            tick={{ fill: theme.palette.text.secondary }}
                            tickFormatter={formatPrice}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="price"
                            name="Current Price"
                            stroke={theme.palette.primary.main}
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 8 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="lowestPrice"
                            name="Lowest Price"
                            stroke={theme.palette.secondary.main}
                            strokeWidth={2}
                            dot={false}
                            strokeDasharray="5 5"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default PriceGraph;