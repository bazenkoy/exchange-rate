# Exchange Rate Tracker

React application that allows users to view exchange rates for a selected base currency against other currencies over the last 7 days from a selected date. Users can explore historical exchange rate data up to 90 days in the past.

## Features

- **Date Selection**: Select any date up to 90 days in the past to view exchange rates
- **Base Currency Selection**: Change the base currency from the default GBP to any available currency
- **Currency Management**:
  - Add currencies to compare (minimum 3, maximum 7)
  - Remove currencies from the comparison table
  - View exchange rates for the last 7 days from the selected date

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd exchange-rate
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
  Create a `.env` file in the root directory with the following variables:

  ```env
  VITE_CURRENCIES_API_URL=https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json
  VITE_RATE_API_BASE_URL=https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api
  ```

## Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in the terminal).

## Testing

Run the test suite:

```bash
npm test
```

### Linting

Check code for linting errors:

```bash
npm run lint
```

### Formatting

Format code with Prettier:

```bash
npm run format
```

## Project Structure

```
exchange-rate/
├── src/
│   ├── components/          # React components
│   │   ├── DatePicker.tsx
│   │   ├── CurrencySelector.tsx
│   │   └── ExchangeRateTable.tsx
│   ├── store/               # Redux store configuration
│   │   ├── store.ts
│   │   ├── hooks.ts
│   │   └── slices/
│   │       └── exchangeRateSlice.ts
│   ├── services/            # API services
│   │   └── currencyApi.ts
│   ├── utils/               # Utility functions
│   │   └── dateUtils.ts
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   └── setupTests.ts        # Test setup
├── public/                  # Static assets
├── package.json
├── tsconfig.json
├── vite.config.ts
├── jest.config.js
├── eslint.config.js
└── README.md
```

## API

The application uses the [currency-api](https://github.com/fawazahmed0/currency-api) service:

- **Available Currencies**: `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json`
- **Exchange Rates**: `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@{date}/v1/currencies/{currency}.json`

Example:

```
https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-02/v1/currencies/gbp.json
```
