import { configureStore, createSlice } from "@reduxjs/toolkit"

const stockSlice = createSlice({
  name: "stock",
  initialState: {
    ticker: "aapl",
    watchList: [],
    stockInfo: {},
    popupInfo: { show: false, content: "", type: "" },
  },
  reducers: {
    setTicker(state, action) {
      // payload = ticker
      state.ticker = action.payload
    },

    addToWatchList(state, action) {
      // payload = stock object
      const index = state.watchList.findIndex(
        (item) => item.ticker === action.payload.ticker
      )

      if (index !== -1) {
        state.watchList[index] = action.payload
      } else {
        state.watchList = [...state.watchList, action.payload]
      }
    },

    removeFromWatchList(state, action) {
      // payload = ticker
      const newWatchList = [...state.watchList].filter(
        (item) => item.ticker !== action.payload
      )
      state.watchList = newWatchList
    },

    updateStockInfo(state, action) {
      // payload = stock object
      state.stockInfo = action.payload
    },

    updatePopupInfo(state, action) {
      // payload = popup object
      state.popupInfo = action.payload
    },
  },
})

const store = configureStore({
  reducer: stockSlice.reducer,
})

export const actions = stockSlice.actions
export default store
