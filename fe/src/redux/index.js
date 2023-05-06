import { configureStore, createSlice } from "@reduxjs/toolkit"

const stockSlice = createSlice({
  name: "stock",
  initialState: {
    ticker: "aapl",
    watchList: [
      { ticker: "aapl", price: 10, change: 1.4, percentage: 0.3 },
      { ticker: "cat", price: 10, change: 1.4, percentage: 0.3 },
    ],
  },
  reducers: {
    setTicker(state, action) {
      // payload = ticker
      state.ticker = action.payload
    },

    addToWatchList(state, action) {},

    removeFromWatchList(state, action) {
      // payload = ticker
      const newWatchList = [...state.watchList].filter(
        (item) => item.ticker !== action.payload
      )
      state.watchList = newWatchList
    },
  },
})

const store = configureStore({
  reducer: stockSlice.reducer,
})

export const actions = stockSlice.actions
export default store
