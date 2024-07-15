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
  },
});

export const { addWatchlist } = watchlistSlice.actions;

export default watchlistSlice.reducer;
