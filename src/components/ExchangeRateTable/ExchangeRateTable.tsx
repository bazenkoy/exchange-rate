import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { removeCurrency } from '../../store/slices/exchangeRateSlice';
import {
  selectRates,
  selectBaseCurrency,
  selectSelectedCurrencies,
  selectAvailableCurrencies,
  selectLoading,
  selectError,
} from '../../store/slices/exchangeRateSelectors';
import { formatDateForDisplay } from '../../utils/dateUtils';
import { styles } from './ExchangeRateTable.styles';

const ExchangeRateTable = () => {
  const dispatch = useAppDispatch();
  const rates = useAppSelector(selectRates);
  const baseCurrency = useAppSelector(selectBaseCurrency);
  const selectedCurrencies = useAppSelector(selectSelectedCurrencies);
  const availableCurrencies = useAppSelector(selectAvailableCurrencies);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const canDelete = selectedCurrencies.length > 3;

  if (loading) {
    return (
      <Box sx={styles.loadingBox}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  if (rates.length === 0) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        No exchange rate data available. Please select a date and ensure currencies are selected.
      </Alert>
    );
  }

  return (
    <Box sx={styles.tableContainer}>
      <TableContainer component={Paper}>
        <Box sx={styles.headerBox}>
          <Typography variant="h6" component="div">
            Exchange Rates for {baseCurrency.toUpperCase()} (Last 7 Days)
          </Typography>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              {selectedCurrencies.map((currency) => (
                <TableCell
                  key={currency}
                  align="right"
                  sx={{
                    ...styles.currencyHeaderCell.base,
                    ...(canDelete ? styles.currencyHeaderCell.canDelete : styles.currencyHeaderCell.default),
                  }}
                >
                  <Box sx={styles.currencyHeaderContent.base}>
                    <Typography component="span" className="currency-label" sx={styles.currencyLabel.base}>
                      {currency.toUpperCase()}
                    </Typography>
                    {canDelete && (
                      <IconButton
                        size="small"
                        className="delete-button"
                        sx={styles.deleteButton.base}
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(removeCurrency(currency));
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {availableCurrencies[currency.toLowerCase()] || currency.toUpperCase()}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rates.map((dayRate) => (
              <TableRow key={dayRate.date} hover>
                <TableCell component="th" scope="row">
                  {formatDateForDisplay(dayRate.date)}
                </TableCell>
                {selectedCurrencies.map((currency) => {
                  const rate = dayRate.rates[currency.toLowerCase()];
                  return (
                    <TableCell key={currency} align="right">
                      {rate !== undefined ? rate.toFixed(4) : 'N/A'}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ExchangeRateTable;
