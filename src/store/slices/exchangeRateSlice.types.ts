export interface ExchangeRateData {
  [currency: string]: number;
}

export interface DayRate {
  date: string;
  rates: ExchangeRateData;
}

export interface ExchangeRateState {
  baseCurrency: string;
  selectedCurrencies: string[];
  selectedDate: string;
  rates: DayRate[];
  availableCurrencies: Record<string, string>;
  loading: boolean;
  error: string | null;
}

