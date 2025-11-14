import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../store';

const selectExchangeRateState = (state: RootState) => state.exchangeRate;

export const selectBaseCurrency = createSelector(
  [selectExchangeRateState],
  (exchangeRate) => exchangeRate.baseCurrency
);

export const selectSelectedCurrencies = createSelector(
  [selectExchangeRateState],
  (exchangeRate) => exchangeRate.selectedCurrencies
);

export const selectSelectedDate = createSelector(
  [selectExchangeRateState],
  (exchangeRate) => exchangeRate.selectedDate
);

export const selectRates = createSelector(
  [selectExchangeRateState],
  (exchangeRate) => exchangeRate.rates
);

export const selectAvailableCurrencies = createSelector(
  [selectExchangeRateState],
  (exchangeRate) => exchangeRate.availableCurrencies
);

export const selectLoading = createSelector(
  [selectExchangeRateState],
  (exchangeRate) => exchangeRate.loading
);

export const selectError = createSelector(
  [selectExchangeRateState],
  (exchangeRate) => exchangeRate.error
);

