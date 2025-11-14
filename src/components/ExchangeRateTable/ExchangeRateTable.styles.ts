export const styles = {
  tableContainer: {
    mt: 3,
  },

  headerBox: {
    p: 2,
    borderBottom: 1,
    borderColor: 'divider',
  },

  loadingBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },

  currencyHeaderCell: {
    base: {
      transition: 'all 0.3s',
    },
    canDelete: {
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'action.hover',
      },
    },
    default: {
      cursor: 'default',
    },
  },

  currencyHeaderContent: {
    base: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 0.5,
      transition: 'color 0.3s',
    },
  },

  currencyLabel: {
    base: {
      transition: 'all 0.3s',
      color: 'inherit',
      fontWeight: 400,
    },
  },

  deleteButton: {
    base: {
      padding: 0.25,
      color: 'action.disabled',
      transition: 'all 0.3s',
      '&:hover': {
        color: 'error.main',
        transform: 'scale(1.1)',
      },
    },
  },
};
