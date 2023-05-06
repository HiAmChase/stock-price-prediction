import { configureStore, createSlice } from "@reduxjs/toolkit"

const stockSlice = createSlice({
  name: "stock",
  initialState: { ticker: "aapl", watchList: [] },
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
