import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { parseISO, format, startOfDay } from 'date-fns';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSelectedDate } from '../../store/slices/exchangeRateSlice';
import { selectSelectedDate } from '../../store/slices/exchangeRateSelectors';
import { getMinDate, getMaxDate, isValidDateRange } from '../../utils/dateUtils';
import { styles } from './DatePicker.styles';

const DatePicker = () => {
  const dispatch = useAppDispatch();
  const selectedDate = useAppSelector(selectSelectedDate);

  const dateValue = parseISO(selectedDate);
  const minDate = parseISO(getMinDate());
  const maxDate = parseISO(getMaxDate());

  const handleChange = (newValue: Date | null) => {
    if (newValue) {
      const localDate = startOfDay(newValue);
      const dateStr = format(localDate, 'yyyy-MM-dd');
      if (isValidDateRange(dateStr)) {
        dispatch(setSelectedDate(dateStr));
      }
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiDatePicker
        label="Select Start Date (up to 90 days ago)"
        value={dateValue}
        onChange={handleChange}
        minDate={minDate}
        maxDate={maxDate}
        slotProps={{
          textField: styles.textField,
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
