import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WatchlistState {
  watchlistIds: number[];
}

const initialState: WatchlistState = {
  watchlistIds: [],
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addWatchlist: (state, action: PayloadAction<number>) => {
      state.watchlistIds.push(action.payload);
    },
    removeFromWatchlist: (state, action: PayloadAction<number>) => {
      state.watchlistIds = state.watchlistIds.filter(
        (id) => id !== action.payload,
      );
    },
  },
});

export const { addWatchlist, removeFromWatchlist } = watchlistSlice.actions;

export default watchlistSlice.reducer;
