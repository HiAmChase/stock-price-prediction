import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import {
  getStatisticStock,
  getStockInfo,
  getAllStock,
  postFetchNewData,
  getPredictPast,
  getPredictFuture,
} from "./api/stock"

import { actions } from "./redux"

import ChartDisplay from "./components/ChartDisplay"
import Market from "./components/Market"
import Fundament from "./components/Fundament"
import StockTable from "./components/StockTable"
import Popup from "./components/Popup"

import "./App.css"

function App() {
  const dispatch = useDispatch()
  const ticker = useSelector((state) => state.ticker)
  const popupInfo = useSelector((state) => state.popupInfo)
  const predictType = useSelector((state) => state.predictType)

  const [statistic, setStatistic] = useState({})
  const [fundament, setFundament] = useState({})
  const [stocks, setStocks] = useState([])
  const [predictPast, setPredictPast] = useState([])
  const [predictFuture, setPredictFuture] = useState(0)

  const resetVariable = () => {
    setPredictPast([])
    setPredictFuture(0)
  }

  const fetchAllStocksData = async () => {
    await getAllStock().then(({ data }) => {
      setStocks(data)
    })
  }

  const fetchStatisticData = async () => {
    await getStatisticStock(ticker).then(({ data }) => {
      setStatistic(data)
    })
  }

  const fetchFundamentData = async () => {
    await getStockInfo(ticker).then(({ data }) => {
      setFundament(data)
      dispatch(
        actions.updateStockInfo({
          price: data.price,
          change: data.change,
          percentage: data.percentage,
        })
      )
    })
  }

  const handleGetPredictPast = async () => {
    await getPredictPast(ticker, predictType).then(({ data }) => {
      setPredictPast(data.predict_past)
    })
  }

  const handleGetPredictFuture = async () => {
    await getPredictFuture(ticker, predictType).then(({ data }) => {
      setPredictFuture(data.predict_future)
    })
  }

  const handleFetchData = async (e) => {
    e.preventDefault()
    resetVariable()
    await postFetchNewData(ticker)
      .then(({ data }) => {
        dispatch(
          actions.updatePopupInfo({
            show: true,
            content: "Fetch data successfully",
            type: "success",
          })
        )
        dispatch(
          actions.updateTickerInWatchList({
            ticker: ticker,
            price: data.price,
            change: data.change,
            percentage: data.percentage,
          })
        )
        fetchAllStocksData()
        fetchStatisticData()
        fetchFundamentData()
        handleGetPredictPast()
        handleGetPredictFuture()
      })
      .catch(() => {
        dispatch(
          actions.updatePopupInfo({
            show: true,
            content: "An error occurred while retrieving data",
            type: "error",
          })
        )
      })
  }

  useEffect(() => {
    fetchAllStocksData()
  }, [])

  useEffect(() => {
    resetVariable()
    handleGetPredictPast()
    handleGetPredictFuture()
  }, [predictType])

  useEffect(() => {
    resetVariable()
    fetchStatisticData()
    fetchFundamentData()
    handleGetPredictPast()
    handleGetPredictFuture()
  }, [ticker])

  useEffect(() => {
    setTimeout(() => dispatch(actions.updatePopupInfo({ show: false })), 2000)
  }, [popupInfo.show])

  return (
    <div className="App">
      <div className="App__topPanel">
        <ChartDisplay statistic={statistic} predictPast={predictPast} />
      </div>
      <div className="App__bottomPanel">
        <Market />
        <StockTable stocks={stocks} />
        <Fundament
          data={fundament}
          handleFetchData={handleFetchData}
          predictFuture={predictFuture}
        />
      </div>
      <Popup />
    </div>
  )
}

export default App
