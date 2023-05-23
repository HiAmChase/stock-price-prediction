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

import "./App.css"

function App() {
  const dispatch = useDispatch()
  const ticker = useSelector((state) => state.ticker)

  const [statistic, setStatistic] = useState({})
  const [predictPast, setPredictPast] = useState({})
  const [fundament, setFundament] = useState({})
  const [stocks, setStocks] = useState([])

  const fetchStocksData = async () => {
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
      console.log(data)
      setPredictPast(data)
    })
  }

  const handleFetchData = async (e) => {
    e.preventDefault()
    await postFetchNewData(ticker).then(({ data }) => {
      if (data.message === "success") {
        fetchStatisticData(ticker)
        fetchFundamentData(ticker)
      }
    })
  }

  useEffect(() => {
    fetchStocksData()
  }, [])

  useEffect(() => {
    fetchStatisticData()
    fetchFundamentData()
    handleGetPredict()
  }, [ticker])

  return (
    <div className="App">
      <div className="App__topPanel">
        <ChartDisplay statistic={statistic} predictPast={predictPast} />
      </div>
      <div className="App__bottomPanel">
        <Market />
        <StockTable stocks={stocks} />
        <Fundament data={fundament} handleFetchData={handleFetchData} />
      </div>
    </div>
  )
}

export default App
