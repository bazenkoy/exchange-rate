import { format, subDays, parseISO } from 'date-fns';
import axios from 'axios';

import type { ExchangeRateData, DayRate } from '../store/slices/exchangeRateSlice.types';

const CURRENCIES_API_URL = import.meta.env.VITE_CURRENCIES_API_URL;
const RATE_API_BASE_URL = import.meta.env.VITE_RATE_API_BASE_URL;

export const fetchAvailableCurrencies = async (): Promise<Record<string, string>> => {
  try {
    const response = await axios.get<Record<string, string>>(CURRENCIES_API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch available currencies');
  }
};

export const fetchExchangeRate = async (date: string, currency: string): Promise<ExchangeRateData> => {
  const url = `${RATE_API_BASE_URL}@${date}/v1/currencies/${currency.toLowerCase()}.json`;
  try {
    const response = await axios.get<Record<string, ExchangeRateData>>(url);
    return response.data[currency.toLowerCase()] || {};
  } catch (error) {
    throw new Error(`Failed to fetch exchange rate for ${currency} on ${date}`);
  }
};

export const fetchExchangeRatesForPeriod = async (
  startDate: string,
  baseCurrency: string,
  targetCurrencies: string[]
): Promise<DayRate[]> => {
  const start = parseISO(startDate);
  const rates: DayRate[] = [];

  for (let i = 0; i < 7; i++) {
    const date = subDays(start, i);
    const dateStr = format(date, 'yyyy-MM-dd');

    try {
      const allRates = await fetchExchangeRate(dateStr, baseCurrency);
      const filteredRates: ExchangeRateData = {};

      targetCurrencies.forEach((currency) => {
        const currencyLower = currency.toLowerCase();
        if (allRates[currencyLower] !== undefined) {
          filteredRates[currencyLower] = allRates[currencyLower];
        }
      });

      rates.push({
        date: dateStr,
        rates: filteredRates,
      });
    } catch (error) {
      console.error(`Error fetching rates for ${dateStr}:`, error);
    }
  }

  return rates.reverse();
};
