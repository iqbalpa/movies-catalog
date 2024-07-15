import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import watchlistReducer from './watchlistSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    watchlist: watchlistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
