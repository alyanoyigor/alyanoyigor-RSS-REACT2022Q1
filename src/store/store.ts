import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from './appSlice';

export const store = configureStore({
  reducer: {
    appState: appReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
