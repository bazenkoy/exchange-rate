import { formatDateForDisplay, getMaxDate, getMinDate, isValidDateRange } from './dateUtils';

describe('dateUtils', () => {
  describe('formatDateForDisplay', () => {
    it('should format a valid date string correctly', () => {
      const result = formatDateForDisplay('2024-03-15');
      expect(result).toBe('Mar 15, 2024');
    });

    it('should return the original string for invalid date', () => {
      const result = formatDateForDisplay('invalid-date');
      expect(result).toBe('invalid-date');
    });
  });

  describe('getMaxDate', () => {
    it("should return today's date in YYYY-MM-DD format", () => {
      const result = getMaxDate();
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      const date = new Date(result);
      expect(date.getTime()).toBeLessThanOrEqual(Date.now());
    });
  });

  describe('getMinDate', () => {
    it('should return a date 90 days ago in YYYY-MM-DD format', () => {
      const result = getMinDate();
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      const date = new Date(result);
      const expectedMinDate = new Date();
      expectedMinDate.setDate(expectedMinDate.getDate() - 90);
      expect(date.getTime()).toBeLessThanOrEqual(expectedMinDate.getTime() + 86400000);
    });
  });

  describe('isValidDateRange', () => {
    it('should return true for a date within the valid range', () => {
      const today = new Date();
      const dateStr = today.toISOString().split('T')[0];
      expect(isValidDateRange(dateStr)).toBe(true);
    });

    it('should return false for an invalid date string', () => {
      expect(isValidDateRange('invalid-date')).toBe(false);
    });

    it('should return false for a date more than 90 days ago', () => {
      const oldDate = new Date();
      oldDate.setDate(oldDate.getDate() - 91);
      const dateStr = oldDate.toISOString().split('T')[0];
      expect(isValidDateRange(dateStr)).toBe(false);
    });

    it('should return false for a future date', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);
      const dateStr = futureDate.toISOString().split('T')[0];
      expect(isValidDateRange(dateStr)).toBe(false);
    });
  });
});
