import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import {
  getStatisticStock,
  getStockInfo,
  getAllStock,
  postFetchNewData,
  getPredictPast,
  getPredictFuture,
  getStockGrownRate,
} from "./api/stock"

import { actions } from "./redux"

import ChartDisplay from "./components/ChartDisplay"
import Market from "./components/Market"
import Fundament from "./components/Fundament"
import StockTable from "./components/StockTable"
import Popup from "./components/Popup"
import GrownRate from "./components/GrownRate"

import "./App.css"

function App() {
  const dispatch = useDispatch()
  const ticker = useSelector((state) => state.ticker)
  const popupInfo = useSelector((state) => state.popupInfo)

  const [statistic, setStatistic] = useState({})
  const [fundament, setFundament] = useState({})
  const [stocks, setStocks] = useState([])
  const [stocksGrownRate, setStocksGrownRate] = useState([])
  const [predictPast, setPredictPast] = useState([])
  const [stockSearch, setStockSearch] = useState("")
  const [grownRateFilter, setGrownRateFilter] = useState({
    grown_rate_days: "30",
    max_results: "10",
  })
  const [predictType, setPredictType] = useState("LAST_60_DAYS")
  const [predictFuture, setPredictFuture] = useState(0)
  const [loading, setLoading] = useState(true)

  const resetVariable = () => {
    setPredictPast([])
    setPredictFuture(0)
  }

  const handleSetTicker = (ticker) => {
    dispatch(actions.setTicker(ticker))
  }

  const handleSearchStock = async (e) => {
    e.preventDefault()
    await getAllStock({ _txt: stockSearch }).then(({ data }) => {
      setStocks(data)
    })
  }

  const fetchAllStocksData = async () => {
    await getAllStock().then(({ data }) => {
      setStocks(data)
      localStorage.setItem("stocks", JSON.stringify(data))
    })
  }

  const getStocksGrownRateData = async () => {
    await getStockGrownRate(grownRateFilter).then(({ data }) => {
      setStocksGrownRate(data)
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
          ticker: data.ticker,
          price: data.price,
          change: data.change,
          percentage: data.percentage,
          company_name: data.company_name,
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
      .then(() => {
        dispatch(
          actions.updatePopupInfo({
            show: true,
            content: "Fetch data successfully",
            type: "success",
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
    getStocksGrownRateData()
  }, [grownRateFilter])

  useEffect(() => {
    fetchStatisticData()
    fetchFundamentData()
  }, [ticker])

  useEffect(() => {
    resetVariable()
    handleGetPredictPast()
    handleGetPredictFuture()
  }, [ticker, predictType])

  useEffect(() => {
    setTimeout(() => dispatch(actions.updatePopupInfo({ show: false })), 2000)
  }, [popupInfo.show])

  return (
    <div className="App">
      <div className="App__topPanel">
        <ChartDisplay
          loading={loading}
          statistic={statistic}
          predictPast={predictPast}
          stockSearch={stockSearch}
          setStockSearch={setStockSearch}
          predictType={predictType}
          setPredictType={setPredictType}
          handleSearchStock={handleSearchStock}
        />
        <GrownRate
          grownRateFilter={grownRateFilter}
          setGrownRateFilter={setGrownRateFilter}
          stock={stocksGrownRate}
          handleSetTicker={handleSetTicker}
        />
      </div>
      <div className="App__bottomPanel">
        <Market handleSetTicker={handleSetTicker} />
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
