import { format } from 'date-fns';

import exchangeRateReducer, {
  setBaseCurrency,
  setSelectedDate,
  setSelectedCurrencies,
  addCurrency,
  removeCurrency,
  setAvailableCurrencies,
  setRates,
  setLoading,
  setError,
} from './exchangeRateSlice';

describe('exchangeRateSlice', () => {
  const initialState = {
    baseCurrency: 'gbp',
    selectedCurrencies: ['usd', 'eur', 'jpy'],
    selectedDate: format(new Date(), 'yyyy-MM-dd'),
    rates: [],
    availableCurrencies: {},
    loading: false,
    error: null,
  };

  it('should return the initial state', () => {
    expect(exchangeRateReducer(undefined, { type: 'unknown' })).toEqual({
      baseCurrency: 'gbp',
      selectedCurrencies: ['usd', 'eur', 'jpy', 'chf', 'cad', 'aud', 'zar'],
      selectedDate: expect.any(String),
      rates: [],
      availableCurrencies: {},
      loading: false,
      error: null,
    });
  });

  it('should handle setBaseCurrency', () => {
    const action = setBaseCurrency('USD');
    const result = exchangeRateReducer(initialState, action);
    expect(result.baseCurrency).toBe('usd');
    expect(result.rates).toEqual([]);
  });

  it('should handle setSelectedDate', () => {
    const newDate = '2024-03-15';
    const action = setSelectedDate(newDate);
    const result = exchangeRateReducer(initialState, action);
    expect(result.selectedDate).toBe(newDate);
    expect(result.rates).toEqual([]);
  });

  it('should handle setSelectedCurrencies with valid count', () => {
    const newCurrencies = ['usd', 'eur', 'jpy', 'chf'];
    const action = setSelectedCurrencies(newCurrencies);
    const result = exchangeRateReducer(initialState, action);
    expect(result.selectedCurrencies).toEqual(['usd', 'eur', 'jpy', 'chf']);
  });

  it('should handle addCurrency', () => {
    const action = addCurrency('CHF');
    const result = exchangeRateReducer(initialState, action);
    expect(result.selectedCurrencies).toContain('chf');
    expect(result.selectedCurrencies.length).toBe(4);
  });

  it('should not add currency if already exists', () => {
    const action = addCurrency('USD');
    const result = exchangeRateReducer(initialState, action);
    expect(result.selectedCurrencies.length).toBe(3);
  });

  it('should handle removeCurrency', () => {
    const stateWithMoreCurrencies = {
      ...initialState,
      selectedCurrencies: ['usd', 'eur', 'jpy', 'chf'],
    };
    const action = removeCurrency('chf');
    const result = exchangeRateReducer(stateWithMoreCurrencies, action);
    expect(result.selectedCurrencies).not.toContain('chf');
    expect(result.selectedCurrencies.length).toBe(3);
  });

  it('should not remove currency if only 3 remain', () => {
    const action = removeCurrency('eur');
    const result = exchangeRateReducer(initialState, action);
    expect(result.selectedCurrencies.length).toBe(3);
    expect(result.selectedCurrencies).toContain('eur');
  });

  it('should handle setAvailableCurrencies', () => {
    const currencies = { usd: 'US Dollar', eur: 'Euro' };
    const action = setAvailableCurrencies(currencies);
    const result = exchangeRateReducer(initialState, action);
    expect(result.availableCurrencies).toEqual(currencies);
  });

  it('should handle setRates', () => {
    const rates = [{ date: '2024-03-15', rates: { usd: 1.25, eur: 1.15 } }];
    const action = setRates(rates);
    const result = exchangeRateReducer(initialState, action);
    expect(result.rates).toEqual(rates);
  });

  it('should handle setLoading', () => {
    const action = setLoading(true);
    const result = exchangeRateReducer(initialState, action);
    expect(result.loading).toBe(true);
  });

  it('should handle setError', () => {
    const errorMessage = 'Failed to fetch data';
    const action = setError(errorMessage);
    const result = exchangeRateReducer(initialState, action);
    expect(result.error).toBe(errorMessage);
  });
});
