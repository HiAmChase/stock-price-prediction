import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { getStatisticStock } from "./api/stock"

import ChartDisplay from "./components/ChartDisplay"
import Market from "./components/Market"
import Fundament from "./components/Fundament"
import StockTable from "./components/StockTable"

import "./App.css"

function App() {
  const ticker = useSelector((state) => state.ticker)

  const [statistic, setStatistic] = useState({})

  const fetchStatisticData = async (ticker) => {
    await getStatisticStock(ticker).then(({ data }) => {
      setStatistic(data)
    })
  }

  useEffect(() => {
    fetchStatisticData(ticker)
  }, [ticker])

  return (
    <div className="App">
      <div className="App__topPanel">
        <ChartDisplay data={statistic} />
      </div>
      <div className="App__bottomPanel">
        <Market />
        <StockTable />
        <Fundament />
      </div>
    </div>
  )
}

export default App
