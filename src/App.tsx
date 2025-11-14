import { useEffect } from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';

import { useAppDispatch } from './store/hooks';
import { fetchAvailableCurrenciesThunk } from './store/slices/exchangeRateThunks';
import DatePicker from './components/DatePicker';
import CurrencySelector from './components/CurrencySelector';
import ExchangeRateTable from './components/ExchangeRateTable';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAvailableCurrenciesThunk());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Exchange Rate Tracker
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
        View exchange rates for the last 7 days from your selected date
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <DatePicker />
        </Paper>

        <Paper elevation={2} sx={{ p: 2 }}>
          <CurrencySelector />
        </Paper>

        <ExchangeRateTable />
      </Box>
    </Container>
  );
};

export default App;
