import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Button,
  Box,
  Slider,
  Alert,
  IconButton,
  InputAdornment,
  Collapse,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Notifications,
  Edit,
  Delete,
  Email,
  Phone,
  Save,
  Cancel
} from '@mui/icons-material';

interface PriceAlertProps {
  currentPrice: number;
  currency: string;
  onCreateAlert: (settings: AlertSettings) => Promise<void>;
  onDeleteAlert?: (alertId: string) => Promise<void>;
  existingAlert?: AlertSettings;
}

interface AlertSettings {
  id?: string;
  targetPrice: number;
  email: string;
  phone?: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
}

const PriceAlert: React.FC<PriceAlertProps> = ({
  currentPrice,
  currency,
  onCreateAlert,
  onDeleteAlert,
  existingAlert
}) => {
  const [alertSettings, setAlertSettings] = useState<AlertSettings>(
    existingAlert || {
      targetPrice: currentPrice * 0.9, // Default to 10% below current price
      email: '',
      phone: '',
      emailNotifications: true,
      smsNotifications: false
    }
  );
  const [editing, setEditing] = useState(!existingAlert);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    setAlertSettings(prev => ({
      ...prev,
      targetPrice: newValue as number
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await onCreateAlert(alertSettings);
      setSuccess('Price alert created successfully!');
      if (!existingAlert) {
        setEditing(false);
      }
    } catch (err) {
      setError('Failed to create price alert. Please try again.');
    }
  };

  const handleDelete = async () => {
    if (!existingAlert?.id || !onDeleteAlert) return;

    try {
      await onDeleteAlert(existingAlert.id);
      setSuccess('Price alert deleted successfully!');
    } catch (err) {
      setError('Failed to delete price alert. Please try again.');
    }
  };

  return (
    <Card>
      <CardHeader
        avatar={<Notifications color="primary" />}
        title="Price Alert"
        subheader="Get notified when prices drop"
        action={
          existingAlert && (
            <IconButton 
              onClick={() => setEditing(!editing)}
              color={editing ? 'secondary' : 'default'}
            >
              {editing ? <Cancel /> : <Edit />}
            </IconButton>
          )
        }
      />
      <CardContent>
        {(error || success) && (
          <Collapse in={!!(error || success)}>
            <Alert 
              severity={error ? 'error' : 'success'} 
              sx={{ mb: 2 }}
              onClose={() => {
                setError(null);
                setSuccess(null);
              }}
            >
              {error || success}
            </Alert>
          </Collapse>
        )}

        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>
              Current Price: {formatPrice(currentPrice)}
            </Typography>
            <Typography gutterBottom>
              Alert me when price drops to:
            </Typography>
            <Box sx={{ px: 2 }}>
              <Slider
                value={alertSettings.targetPrice}
                onChange={handleSliderChange}
                min={currentPrice * 0.5}
                max={currentPrice}
                step={currentPrice * 0.01}
                valueLabelDisplay="auto"
                valueLabelFormat={formatPrice}
                disabled={!editing}
              />
            </Box>
            <Typography variant="body2" color="text.secondary" align="center">
              {formatPrice(alertSettings.targetPrice)}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={alertSettings.email}
              onChange={(e) => setAlertSettings(prev => ({
                ...prev,
                email: e.target.value
              }))}
              disabled={!editing}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Phone (optional)"
              type="tel"
              value={alertSettings.phone}
              onChange={(e) => setAlertSettings(prev => ({
                ...prev,
                phone: e.target.value
              }))}
              disabled={!editing}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={alertSettings.emailNotifications}
                  onChange={(e) => setAlertSettings(prev => ({
                    ...prev,
                    emailNotifications: e.target.checked
                  }))}
                  disabled={!editing}
                />
              }
              label="Email Notifications"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={alertSettings.smsNotifications}
                  onChange={(e) => setAlertSettings(prev => ({
                    ...prev,
                    smsNotifications: e.target.checked
                  }))}
                  disabled={!editing}
                />
              }
              label="SMS Notifications"
            />
          </Box>

          {editing && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<Save />}
                fullWidth
              >
                {existingAlert ? 'Update Alert' : 'Create Alert'}
              </Button>
              {existingAlert && (
                <Button
                  color="error"
                  variant="outlined"
                  startIcon={<Delete />}
                  onClick={handleDelete}
                  fullWidth
                >
                  Delete Alert
                </Button>
              )}
            </Box>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default PriceAlert;