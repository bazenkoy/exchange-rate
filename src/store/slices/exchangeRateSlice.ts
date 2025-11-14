import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { format } from 'date-fns';

import { fetchAvailableCurrenciesThunk, fetchExchangeRatesThunk } from './exchangeRateThunks';
import type { ExchangeRateState, DayRate } from './exchangeRateSlice.types';

export type { ExchangeRateData, DayRate } from './exchangeRateSlice.types';

const initialState: ExchangeRateState = {
  baseCurrency: 'gbp',
  selectedCurrencies: ['usd', 'eur', 'jpy', 'chf', 'cad', 'aud', 'zar'],
  selectedDate: format(new Date(), 'yyyy-MM-dd'),
  rates: [],
  availableCurrencies: {},
  loading: true,
  error: null,
};

const exchangeRateSlice = createSlice({
  name: 'exchangeRate',
  initialState,
  reducers: {
    setBaseCurrency: (state, action: PayloadAction<string>) => {
      state.baseCurrency = action.payload.toLowerCase();
      state.rates = [];
    },
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
      state.rates = [];
    },
    setSelectedCurrencies: (state, action: PayloadAction<string[]>) => {
      if (action.payload.length >= 3 && action.payload.length <= 7) {
        state.selectedCurrencies = action.payload.map((c) => c.toLowerCase());
      }
    },
    addCurrency: (state, action: PayloadAction<string>) => {
      const currency = action.payload.toLowerCase();
      if (!state.selectedCurrencies.includes(currency) && state.selectedCurrencies.length < 7) {
        state.selectedCurrencies.push(currency);
      }
    },
    removeCurrency: (state, action: PayloadAction<string>) => {
      const currency = action.payload.toLowerCase();
      if (state.selectedCurrencies.length > 3 && state.selectedCurrencies.includes(currency)) {
        state.selectedCurrencies = state.selectedCurrencies.filter((c) => c !== currency);
      }
    },
    setAvailableCurrencies: (state, action: PayloadAction<Record<string, string>>) => {
      state.availableCurrencies = action.payload;
    },
    setRates: (state, action: PayloadAction<DayRate[]>) => {
      state.rates = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    const handleAsyncThunk = (
      thunk: typeof fetchAvailableCurrenciesThunk | typeof fetchExchangeRatesThunk,
      onFulfilled: (state: ExchangeRateState, payload: unknown) => void
    ) => {
      builder
        .addCase(thunk.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(thunk.fulfilled, (state, action) => {
          onFulfilled(state, action.payload);
          state.loading = false;
          state.error = null;
        })
        .addCase(thunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    };

    handleAsyncThunk(fetchAvailableCurrenciesThunk, (state, payload) => {
      state.availableCurrencies = payload as Record<string, string>;
    });

    handleAsyncThunk(fetchExchangeRatesThunk, (state, payload) => {
      state.rates = payload as DayRate[];
    });
  },
});

export const {
  setBaseCurrency,
  setSelectedDate,
  setSelectedCurrencies,
  addCurrency,
  removeCurrency,
  setAvailableCurrencies,
  setRates,
  setLoading,
  setError,
} = exchangeRateSlice.actions;

export default exchangeRateSlice.reducer;
