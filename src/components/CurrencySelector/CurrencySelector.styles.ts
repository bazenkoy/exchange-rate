export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },

  inputsContainer: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    gap: 2,
  },

  inputWrapper: {
    flex: 1,
    minWidth: { xs: '100%', sm: 250 },
  },

  helperText: {
    mt: 0.5,
    display: 'block',
    transition: 'opacity 0.3s',
  },

  minCurrencyWarning: {
    display: 'block',
    textAlign: 'center',
    transition: 'opacity 0.3s',
    color: 'text.secondary',
  },
};
