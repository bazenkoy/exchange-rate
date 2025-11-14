import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchAvailableCurrencies, fetchExchangeRatesForPeriod } from '../../services/currencyApi';

export const fetchAvailableCurrenciesThunk = createAsyncThunk(
  'exchangeRate/fetchAvailableCurrencies',
  async (_, { rejectWithValue }) => {
    try {
      const currencies = await fetchAvailableCurrencies();
      return currencies;
    } catch (error) {
      return rejectWithValue('Failed to load available currencies');
    }
  }
);

interface FetchExchangeRatesParams {
  date: string;
  baseCurrency: string;
  selectedCurrencies: string[];
}

export const fetchExchangeRatesThunk = createAsyncThunk(
  'exchangeRate/fetchExchangeRates',
  async ({ date, baseCurrency, selectedCurrencies }: FetchExchangeRatesParams, { rejectWithValue }) => {
    try {
      const rates = await fetchExchangeRatesForPeriod(date, baseCurrency, selectedCurrencies);
      return rates;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch exchange rates');
    }
  }
);

