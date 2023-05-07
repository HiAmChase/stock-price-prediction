import { configureStore, createSlice } from "@reduxjs/toolkit"

const stockSlice = createSlice({
  name: "stock",
  initialState: {
    ticker: "aapl",
    watchList: [],
  },
  reducers: {
    setTicker(state, action) {
      // payload = ticker
      state.ticker = action.payload
    },

    addToWatchList(state, action) {
      // payload = stock object
      state.watchList = [...state.watchList, action.payload]
    },

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
