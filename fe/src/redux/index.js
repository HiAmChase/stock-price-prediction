import { configureStore, createSlice } from "@reduxjs/toolkit"

const stockSlice = createSlice({
  name: "stock",
  initialState: {
    ticker: "aapl",
    predictType: "LAST_60_DAYS",
    watchList: JSON.parse(localStorage.getItem("watchList")) || [],
    stockInfo: {},
    popupInfo: { show: false, content: "", type: "" },
  },
  reducers: {
    setTicker(state, action) {
      // payload = ticker
      state.ticker = action.payload
    },

    setPredictType(state, action) {
      // payload = predictType
      state.predictType = action.payload
    },

    addToWatchList(state, action) {
      // payload = ticker
      const index = state.watchList.findIndex((item) => item === action.payload)
      if (index === -1) {
        state.watchList = [...state.watchList, action.payload]
      }
      localStorage.setItem("watchList", JSON.stringify(state.watchList))
    },

    removeFromWatchList(state, action) {
      // payload = ticker
      const newWatchList = [...state.watchList].filter(
        (item) => item !== action.payload
      )
      state.watchList = newWatchList
      localStorage.setItem("watchList", JSON.stringify(state.watchList))
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
