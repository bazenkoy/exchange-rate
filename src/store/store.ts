import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import type { TypedStartListening } from '@reduxjs/toolkit';

import exchangeRateReducer from './slices/exchangeRateSlice';
import { setupListeners } from './listeners';

const listenerMiddleware = createListenerMiddleware();

type AppStartListening = TypedStartListening<RootState, AppDispatch>;

const startAppListening = listenerMiddleware.startListening as AppStartListening;

setupListeners(startAppListening);

export const store = configureStore({
  reducer: {
    exchangeRate: exchangeRateReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
