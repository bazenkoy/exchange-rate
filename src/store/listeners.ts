import { isAnyOf } from '@reduxjs/toolkit';
import type { TypedStartListening, ListenerEffectAPI } from '@reduxjs/toolkit';

import { setBaseCurrency, setSelectedDate, addCurrency, removeCurrency } from './slices/exchangeRateSlice';
import { fetchAvailableCurrenciesThunk, fetchExchangeRatesThunk } from './slices/exchangeRateThunks';
import type { RootState, AppDispatch } from './store';

export const setupListeners = (startListening: TypedStartListening<RootState, AppDispatch>) => {
  const fetchRatesIfReady = (listenerApi: ListenerEffectAPI<RootState, AppDispatch, unknown>) => {
    const state = listenerApi.getState();
    const { exchangeRate } = state;

    if (
      exchangeRate.baseCurrency &&
      exchangeRate.selectedCurrencies.length > 0 &&
      Object.keys(exchangeRate.availableCurrencies).length > 0
    ) {
      listenerApi.dispatch(
        fetchExchangeRatesThunk({
          date: exchangeRate.selectedDate,
          baseCurrency: exchangeRate.baseCurrency,
          selectedCurrencies: exchangeRate.selectedCurrencies,
        })
      );
    }
  };

  startListening({
    matcher: isAnyOf(setBaseCurrency, setSelectedDate, addCurrency, removeCurrency),
    effect: async (_action, listenerApi) => {
      fetchRatesIfReady(listenerApi);
    },
  });

  startListening({
    actionCreator: fetchAvailableCurrenciesThunk.fulfilled,
    effect: async (_action, listenerApi) => {
      fetchRatesIfReady(listenerApi);
    },
  });
};

