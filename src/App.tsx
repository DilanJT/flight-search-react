import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { store } from './store';
import { theme } from './theme';

import FlightSearchPage from './pages/FlightSearchPage';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './components/layout/layout';
import FlightDetailsPage from './pages/FlightDetailsPage';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Navigate to="/flights" replace />} />
                <Route path="/flights" element={<FlightSearchPage />} />
                <Route path="/flights/:id" element={<FlightDetailsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;