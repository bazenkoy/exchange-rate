import { useMemo, useState } from 'react';
import { Autocomplete, TextField, Box, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setBaseCurrency, addCurrency } from '../../store/slices/exchangeRateSlice';
import {
  selectBaseCurrency,
  selectSelectedCurrencies,
  selectAvailableCurrencies,
} from '../../store/slices/exchangeRateSelectors';
import type { CurrencyOption } from './CurrencySelector.types';
import { styles } from './CurrencySelector.styles';

const CurrencySelector = () => {
  const dispatch = useAppDispatch();
  const baseCurrency = useAppSelector(selectBaseCurrency);
  const selectedCurrencies = useAppSelector(selectSelectedCurrencies);
  const availableCurrencies = useAppSelector(selectAvailableCurrencies);
  const [addCurrencyInput, setAddCurrencyInput] = useState<string>('');
  const addCurrencyDisabled = selectedCurrencies.length >= 7;

  const allCurrencyOptions: CurrencyOption[] = useMemo(
    () =>
      Object.entries(availableCurrencies).map(([code, name]) => ({
        code: code.toLowerCase(),
        name,
        label: `${code.toUpperCase()} - ${name}`,
      })),
    [availableCurrencies],
  );

  const baseCurrencyOptions = useMemo(
    () => allCurrencyOptions.filter((option) => option.code !== baseCurrency.toLowerCase()),
    [allCurrencyOptions, baseCurrency],
  );

  const availableForSelection = useMemo(
    () =>
      allCurrencyOptions.filter(
        (option) => !selectedCurrencies.includes(option.code) && option.code !== baseCurrency.toLowerCase(),
      ),
    [allCurrencyOptions, selectedCurrencies, baseCurrency],
  );

  const currentBaseCurrency = useMemo(
    () => allCurrencyOptions.find((option) => option.code === baseCurrency.toLowerCase()),
    [allCurrencyOptions, baseCurrency],
  );

  const handleBaseCurrencyChange = (_event: React.SyntheticEvent, newValue: CurrencyOption | null) => {
    if (newValue) {
      dispatch(setBaseCurrency(newValue.code));
    }
  };

  const handleAddCurrency = (_event: React.SyntheticEvent, newValue: CurrencyOption | null) => {
    if (newValue && selectedCurrencies.length < 7) {
      dispatch(addCurrency(newValue.code));
      setAddCurrencyInput('');
    }
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.inputsContainer}>
        <Box sx={styles.inputWrapper}>
          <Autocomplete
            value={currentBaseCurrency ?? null}
            onChange={handleBaseCurrencyChange}
            options={baseCurrencyOptions}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => option.code === value.code}
            renderInput={(params) => (
              <TextField {...params} label="Base Currency" placeholder="Search currency..." size="small" />
            )}
            size="small"
          />
        </Box>
        <Box sx={styles.inputWrapper}>
          <Autocomplete
            value={null}
            inputValue={addCurrencyInput}
            onInputChange={(_event, newInputValue) => {
              setAddCurrencyInput(newInputValue);
            }}
            onChange={handleAddCurrency}
            options={availableForSelection}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => option.code === value.code}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Add Currency"
                placeholder="Search to add..."
                size="small"
                disabled={addCurrencyDisabled}
              />
            )}
            size="small"
            disabled={addCurrencyDisabled}
          />
          {addCurrencyDisabled && (
            <Typography variant="caption" color="text.secondary" sx={styles.helperText}>
              Maximum 7 currencies reached
            </Typography>
          )}
        </Box>
      </Box>

      {selectedCurrencies.length <= 3 && (
        <Typography variant="caption" sx={styles.minCurrencyWarning}>
          Minimum 3 currencies required (currently {selectedCurrencies.length})
        </Typography>
      )}
    </Box>
  );
};

export default CurrencySelector;
