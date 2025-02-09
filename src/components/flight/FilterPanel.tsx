import React from 'react';
import {
  Paper,
  Typography,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
  Box,
  Button,
  Chip,
  IconButton,
  Collapse,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  FilterList,
  ExpandMore,
  ExpandLess,
  RestartAlt
} from '@mui/icons-material';

interface PriceRange {
  min: number;
  max: number;
}

interface FilterPanelProps {
  priceRange: PriceRange;
  selectedAirlines: string[];
  stops: number[];
  airlines: string[];
  currency: string;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
}

interface FilterState {
  priceRange: PriceRange;
  selectedAirlines: string[];
  stops: number[];
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  priceRange,
  selectedAirlines,
  stops,
  airlines,
  currency,
  onFilterChange,
  onReset
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [expanded, setExpanded] = React.useState(!isMobile);
  const [localFilters, setLocalFilters] = React.useState<FilterState>({
    priceRange,
    selectedAirlines,
    stops
  });

  // Format price for display
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Handle price range change
  const handlePriceChange = (_: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setLocalFilters(prev => ({
        ...prev,
        priceRange: {
          min: newValue[0],
          max: newValue[1]
        }
      }));
    }
  };

  // Handle airline selection
  const handleAirlineChange = (airline: string) => {
    setLocalFilters(prev => ({
      ...prev,
      selectedAirlines: prev.selectedAirlines.includes(airline)
        ? prev.selectedAirlines.filter(a => a !== airline)
        : [...prev.selectedAirlines, airline]
    }));
  };

  // Handle stops selection
  const handleStopsChange = (stop: number) => {
    setLocalFilters(prev => ({
      ...prev,
      stops: prev.stops.includes(stop)
        ? prev.stops.filter(s => s !== stop)
        : [...prev.stops, stop]
    }));
  };

  // Apply filters
  const applyFilters = () => {
    onFilterChange(localFilters);
  };

  // Reset filters
  const handleReset = () => {
    setLocalFilters({
      priceRange: { min: priceRange.min, max: priceRange.max },
      selectedAirlines: [],
      stops: []
    });
    onReset();
  };

  // Get active filter count
  const getActiveFilterCount = (): number => {
    return (
      (localFilters.selectedAirlines.length > 0 ? 1 : 0) +
      (localFilters.stops.length > 0 ? 1 : 0) +
      ((localFilters.priceRange.min !== priceRange.min || 
        localFilters.priceRange.max !== priceRange.max) ? 1 : 0)
    );
  };

  return (
    <Paper 
      elevation={3}
      sx={{ 
        p: 2,
        mb: 2,
        position: 'sticky',
        top: 16
      }}
    >
      {/* Header */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterList />
          <Typography variant="h6">Filters</Typography>
          {getActiveFilterCount() > 0 && (
            <Chip 
              label={getActiveFilterCount()} 
              color="primary" 
              size="small" 
            />
          )}
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton 
            size="small" 
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
          {getActiveFilterCount() > 0 && (
            <IconButton 
              size="small" 
              onClick={handleReset}
              color="error"
            >
              <RestartAlt />
            </IconButton>
          )}
        </Box>
      </Box>

      <Collapse in={expanded}>
        {/* Price Range Filter */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Price Range
          </Typography>
          <Slider
            value={[localFilters.priceRange.min, localFilters.priceRange.max]}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            valueLabelFormat={formatPrice}
            min={priceRange.min}
            max={priceRange.max}
            sx={{ mt: 2 }}
          />
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            mt: 1 
          }}>
            <Typography variant="body2" color="text.secondary">
              {formatPrice(localFilters.priceRange.min)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {formatPrice(localFilters.priceRange.max)}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Airlines Filter */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Airlines
          </Typography>
          <FormGroup>
            {airlines.map(airline => (
              <FormControlLabel
                key={airline}
                control={
                  <Checkbox
                    checked={localFilters.selectedAirlines.includes(airline)}
                    onChange={() => handleAirlineChange(airline)}
                    size="small"
                  />
                }
                label={
                  <Typography variant="body2">
                    {airline}
                  </Typography>
                }
              />
            ))}
          </FormGroup>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Stops Filter */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Stops
          </Typography>
          <FormGroup>
            {[0, 1, 2].map(stop => (
              <FormControlLabel
                key={stop}
                control={
                  <Checkbox
                    checked={localFilters.stops.includes(stop)}
                    onChange={() => handleStopsChange(stop)}
                    size="small"
                  />
                }
                label={
                  <Typography variant="body2">
                    {stop === 0 ? 'Non-stop' : 
                     stop === 1 ? '1 Stop' : 
                     `${stop} Stops`}
                  </Typography>
                }
              />
            ))}
          </FormGroup>
        </Box>

        {/* Apply Filters Button */}
        <Button
          variant="contained"
          fullWidth
          onClick={applyFilters}
          disabled={getActiveFilterCount() === 0}
        >
          Apply Filters
        </Button>
      </Collapse>
    </Paper>
  );
};

export default FilterPanel;