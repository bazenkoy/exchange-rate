import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import ExchangeRateTable from './ExchangeRateTable';
import exchangeRateReducer from '../../store/slices/exchangeRateSlice';
import type { DayRate } from '../../store/slices/exchangeRateSlice.types';

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

describe('ExchangeRateTable', () => {
  const mockRates: DayRate[] = [
    {
      date: '2024-03-15',
      rates: { usd: 1.25, eur: 1.15, jpy: 150.5 },
    },
    {
      date: '2024-03-14',
      rates: { usd: 1.24, eur: 1.14, jpy: 150.0 },
    },
  ];

  it('should render loading state', () => {
    const store = createMockStore({ loading: true });
    render(
      <Provider store={store}>
        <ExchangeRateTable />
      </Provider>
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should render error message', () => {
    const errorMessage = 'Failed to fetch rates';
    const store = createMockStore({ error: errorMessage, loading: false });
    render(
      <Provider store={store}>
        <ExchangeRateTable />
      </Provider>
    );
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('should render empty state message', () => {
    const store = createMockStore({ rates: [], loading: false, error: null });
    render(
      <Provider store={store}>
        <ExchangeRateTable />
      </Provider>
    );
    expect(screen.getByText(/No exchange rate data available/)).toBeInTheDocument();
  });

  it('should render exchange rates table', () => {
    const store = createMockStore({
      rates: mockRates,
      baseCurrency: 'gbp',
      selectedCurrencies: ['usd', 'eur', 'jpy'],
      loading: false,
      error: null,
    });
    render(
      <Provider store={store}>
        <ExchangeRateTable />
      </Provider>
    );

    expect(screen.getByText(/Exchange Rates for GBP/)).toBeInTheDocument();
    expect(screen.getByText('Mar 15, 2024')).toBeInTheDocument();
    expect(screen.getByText('1.2500')).toBeInTheDocument();
    expect(screen.getByText('1.1500')).toBeInTheDocument();
  });

  it('should display N/A for missing rates', () => {
    const incompleteRates: DayRate[] = [
      {
        date: '2024-03-15',
        rates: { usd: 1.25 },
      },
    ];

    const store = createMockStore({
      rates: incompleteRates,
      baseCurrency: 'gbp',
      selectedCurrencies: ['usd', 'eur'],
      loading: false,
      error: null,
    });

    render(
      <Provider store={store}>
        <ExchangeRateTable />
      </Provider>
    );

    const cells = screen.getAllByText('N/A');
    expect(cells.length).toBeGreaterThan(0);
  });
});
