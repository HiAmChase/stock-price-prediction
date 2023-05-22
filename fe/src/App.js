import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import { getStatisticStock, getStockInfo, getAllStock } from "./api/stock"
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
  const [fundament, setFundament] = useState({})
  const [stocks, setStocks] = useState([])

  const fetchStocksData = async () => {
    await getAllStock().then(({ data }) => {
      setStocks(data)
    })
  }

  useEffect(() => {
    fetchStocksData()
  }, [])

  useEffect(() => {
    const fetchStatisticData = async (ticker) => {
      await getStatisticStock(ticker).then(({ data }) => {
        setStatistic(data)
      })
    }

    const fetchFundamentData = async (ticker) => {
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

    fetchStatisticData(ticker)
    fetchFundamentData(ticker)
  }, [ticker])

  return (
    <div className="App">
      <div className="App__topPanel">
        <ChartDisplay data={statistic} />
      </div>
      <div className="App__bottomPanel">
        <Market />
        <StockTable stocks={stocks} />
        <Fundament data={fundament} />
      </div>
    </div>
  )
}

export default App
