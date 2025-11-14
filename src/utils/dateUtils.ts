import { format, subDays, parseISO, isValid } from 'date-fns';

export const formatDateForDisplay = (dateStr: string): string => {
  const date = parseISO(dateStr);
  if (!isValid(date)) {
    return dateStr;
  }
  return format(date, 'MMM dd, yyyy');
};

export const getMaxDate = (): string => {
  return format(new Date(), 'yyyy-MM-dd');
};

export const getMinDate = (): string => {
  const minDate = subDays(new Date(), 90);
  return format(minDate, 'yyyy-MM-dd');
};

export const isValidDateRange = (dateStr: string): boolean => {
  const date = parseISO(dateStr);
  if (!isValid(date)) {
    return false;
  }
  const maxDate = parseISO(getMaxDate());
  const minDate = parseISO(getMinDate());
  return date >= minDate && date <= maxDate;
};
