import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import CssBaseline from '@mui/material/CssBaseline';

import { store } from './store/store';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ScopedCssBaseline>
        <CssBaseline />
        <App />
      </ScopedCssBaseline>
    </Provider>
  </StrictMode>
);
