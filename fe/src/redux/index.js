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
      state.ticker = action.payload
    },
  },
})

const store = configureStore({
  reducer: stockSlice.reducer,
})

export const actions = stockSlice.actions
export default store
