import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import CurrencySelector from './CurrencySelector';
import exchangeRateReducer from '../../store/slices/exchangeRateSlice';

const mockAvailableCurrencies = {
  USD: 'US Dollar',
  EUR: 'Euro',
  GBP: 'British Pound',
  JPY: 'Japanese Yen',
  CHF: 'Swiss Franc',
  CAD: 'Canadian Dollar',
  AUD: 'Australian Dollar',
  ZAR: 'South African Rand',
  CNY: 'Chinese Yuan',
  INR: 'Indian Rupee',
};

const createMockStore = (initialState: Partial<ReturnType<typeof exchangeRateReducer>>) => {
  return configureStore({
    reducer: {
      exchangeRate: exchangeRateReducer,
    },
    preloadedState: {
      exchangeRate: {
        baseCurrency: 'gbp',
        selectedCurrencies: ['usd', 'eur'],
        selectedDate: '2024-03-15',
        rates: [],
        availableCurrencies: {},
        loading: false,
        error: null,
        ...initialState,
      },
    },
  });
};

describe('CurrencySelector', () => {
  it('should render base currency and add currency inputs', () => {
    const store = createMockStore({
      availableCurrencies: mockAvailableCurrencies,
      baseCurrency: 'gbp',
      selectedCurrencies: ['usd', 'eur'],
    });

    render(
      <Provider store={store}>
        <CurrencySelector />
      </Provider>
    );

    expect(screen.getByLabelText('Base Currency')).toBeInTheDocument();
    expect(screen.getByLabelText('Add Currency')).toBeInTheDocument();
  });

  it('should display current base currency', () => {
    const store = createMockStore({
      availableCurrencies: mockAvailableCurrencies,
      baseCurrency: 'gbp',
      selectedCurrencies: ['usd', 'eur'],
    });

    render(
      <Provider store={store}>
        <CurrencySelector />
      </Provider>
    );

    const baseCurrencyInput = screen.getByLabelText('Base Currency');
    expect(baseCurrencyInput).toHaveValue('GBP - British Pound');
  });

  it('should render add currency input as enabled when less than 7 currencies', () => {
    const store = createMockStore({
      availableCurrencies: mockAvailableCurrencies,
      baseCurrency: 'gbp',
      selectedCurrencies: ['usd', 'eur'],
    });

    render(
      <Provider store={store}>
        <CurrencySelector />
      </Provider>
    );

    const addCurrencyInput = screen.getByLabelText('Add Currency');
    expect(addCurrencyInput).not.toBeDisabled();
  });

  it('should disable add currency when maximum (7) currencies are selected', () => {
    const store = createMockStore({
      availableCurrencies: mockAvailableCurrencies,
      baseCurrency: 'gbp',
      selectedCurrencies: ['usd', 'eur', 'jpy', 'chf', 'cad', 'aud', 'zar'],
    });

    render(
      <Provider store={store}>
        <CurrencySelector />
      </Provider>
    );

    const addCurrencyInput = screen.getByLabelText('Add Currency');
    expect(addCurrencyInput).toBeDisabled();
    expect(screen.getByText('Maximum 7 currencies reached')).toBeInTheDocument();
  });

  it('should not show minimum currency warning when 3 or more currencies are selected', () => {
    const store = createMockStore({
      availableCurrencies: mockAvailableCurrencies,
      baseCurrency: 'gbp',
      selectedCurrencies: ['usd', 'eur', 'jpy'],
    });

    render(
      <Provider store={store}>
        <CurrencySelector />
      </Provider>
    );

    expect(screen.queryByText(/Minimum 3 currencies required/)).not.toBeInTheDocument();
  });

  it('should not allow adding currency when maximum is reached', () => {
    const store = createMockStore({
      availableCurrencies: mockAvailableCurrencies,
      baseCurrency: 'gbp',
      selectedCurrencies: ['usd', 'eur', 'jpy', 'chf', 'cad', 'aud', 'zar'],
    });

    render(
      <Provider store={store}>
        <CurrencySelector />
      </Provider>
    );

    const addCurrencyInput = screen.getByLabelText('Add Currency');
    expect(addCurrencyInput).toBeDisabled();
  });
});

