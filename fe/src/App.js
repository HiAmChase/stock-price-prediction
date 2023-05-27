import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import {
  getStatisticStock,
  getStockInfo,
  getAllStock,
  getPredictPast,
  postFetchNewData,
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

  const [statistic, setStatistic] = useState({})
  const [predictPast, setPredictPast] = useState({})
  const [fundament, setFundament] = useState({})
  const [stocks, setStocks] = useState([])

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

  const handleGetPredict = async (e) => {
    // Default is 60 days
    await getPredictPast(ticker, "LAST_60_DAYS").then(({ data }) => {
      setPredictPast(data)
    })
  }

  const handleFetchData = async (e) => {
    e.preventDefault()
    await postFetchNewData(ticker).then(({ data }) => {
      if (data.message === "success") {
        dispatch(
          actions.updatePopupInfo({
            show: true,
            content: "Fetch data successfully",
            type: "success",
          })
        )
        fetchAllStocksData()
        fetchStatisticData(ticker)
        fetchFundamentData(ticker)
      }
    })
  }

  useEffect(() => {
    fetchAllStocksData()
  }, [])

  useEffect(() => {
    fetchStatisticData()
    fetchFundamentData()
    // handleGetPredict()
  }, [ticker])

  useEffect(() => {
    setTimeout(() => dispatch(actions.updatePopupInfo({ show: false })), 2000)
  }, [popupInfo.show])

  return (
    <div className="App">
      <div className="App__topPanel">
        <ChartDisplay statistic={statistic} />
      </div>
      <div className="App__bottomPanel">
        <Market />
        <StockTable stocks={stocks} />
        <Fundament data={fundament} handleFetchData={handleFetchData} />
      </div>
      <Popup />
    </div>
  )
}

export default App
