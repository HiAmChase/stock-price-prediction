import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import { DEFAULT_COLOR, DOWN_COLOR, UP_COLOR, BACKGROUND_COLOR } from "./utils"
import { getStatisticStock } from "../api/stock"
import { actions } from "../redux"

import Favorite from "./Favorite"
import StockChart from "./StockChart"

import "./ChartDisplay.css"

function ChartDisplay({ sstock = "aapl", predictType }) {
  const ticker = useSelector((state) => state.ticker)
  const watchList = useSelector((state) => state.watchList)
  const dispatch = useDispatch()

  const [stock, setStock] = useState(ticker)
  const [isFavorite, setIsFavorite] = useState(false)
  const [data, setData] = useState({})
  const [charType, setChartType] = useState("candlestick")
  const [stockOptions, setStockOptions] = useState({})
  const [height, setHeight] = useState(0)

  const fetchData = async (ticker) => {
    await getStatisticStock(ticker).then(({ data }) => {
      setData(data)
    })
  }

  const checkIsFavorite = () => {
    const item = watchList.find((item) => item.ticker === ticker)
    if (item !== undefined) {
      return setIsFavorite(true)
    }
    return setIsFavorite(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(actions.setTicker(stock))
  }

  const handleFavorite = (e) => {
    e.preventDefault()
    if (isFavorite === false) {
      setIsFavorite(true)
      dispatch(
        actions.addToWatchList({
          ticker: ticker,
          price: data.price,
          change: data.change,
          percentage: data.percentage,
        })
      )
    } else {
      dispatch(actions.removeFromWatchList(ticker))
      setIsFavorite(false)
    }
  }

  useEffect(() => {
    setHeight(window.innerHeight * 0.6)
  }, [])

  useEffect(() => {
    checkIsFavorite()
    fetchData(ticker)
  }, [ticker])

  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      let yAxis
      yAxis = [
        {
          height: "85%",
          labels: { style: { color: DEFAULT_COLOR }, align: "right", x: -3 },
        },
        {
          top: "85%",
          height: "15%",
          labels: { align: "right", style: { color: DEFAULT_COLOR }, x: -3 },
          offset: 0,
        },
      ]
      setStockOptions({
        yAxis: yAxis,
        xAxis: [{ labels: { style: { color: DEFAULT_COLOR } } }],
        navigation: {
          bindings: {
            rect: {
              annotationsOptions: {
                shapeOptions: {
                  fill: "rgba(255, 0, 0, 0.8)",
                },
              },
            },
          },
          annotationsOptions: {
            typeOptions: {
              line: {
                stroke: "rgba(255, 0, 0, 1)",
                strokeWidth: 10,
              },
            },
          },
          backgroundColor: BACKGROUND_COLOR,
        },
        series: [
          {
            data: data.stocks,
            type: charType,
            name: `${ticker.toUpperCase()} Stock Price`,
            id: "main-series",
          },
          {
            type: "column",
            name: "Volumn",
            data: data.volumes,
            color: "white",
            yAxis: 1,
          },
        ],
        plotOptions: {
          candlestick: {
            color: DOWN_COLOR,
            lineColor: DOWN_COLOR,
            upColor: UP_COLOR,
            upLineColor: UP_COLOR,
          },
          ohlc: {
            color: DOWN_COLOR,
            lineColor: DOWN_COLOR,
            upColor: UP_COLOR,
            upLineColor: UP_COLOR,
          },
          line: {
            color: UP_COLOR,
            lineWidth: 1,
          },
        },
        chart: {
          height: `${height}px`,
          backgroundColor: BACKGROUND_COLOR,
        },
      })
    }
  }, [data, charType])

  return (
    <div className="Chartdisplay">
      <div className="Chartdisplay__menu">
        {/* Stock input */}
        {/* TODO: Update to drop down */}
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                value={stock}
                className="Tickerinput"
                type="text"
                onChange={(e) => setStock(e.target.value.toLowerCase())}
              />
            </div>
            <button type="submit" style={{ display: "none" }}>
              Submit
            </button>
          </form>
        </div>
        {/* Chart Type */}
        <div>
          <select
            className="Menu__dropdown"
            value={charType}
            onChange={(e) => setChartType(e.target.value)}
          >
            <option value="candlestick">Candlestick</option>
            <option value="ohlc">OHLC</option>
            <option value="line">Line</option>
          </select>
        </div>
        <div>
          <Favorite isFavorite={isFavorite} handleFavorite={handleFavorite} />
        </div>
      </div>
      <div className="Chartdisplay__chart" id="chart">
        <StockChart options={stockOptions} />
      </div>
    </div>
  )
}

export default ChartDisplay
