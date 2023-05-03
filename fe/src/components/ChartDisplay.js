import React, { useEffect, useState } from "react"
import StockChart from "./StockChart"
import { getStock, getPredictTestData } from "../api/stock"
import "./ChartDisplay.css"
import { DEFAULT_COLOR, DOWN_COLOR, UP_COLOR, BACKGROUND_COLOR } from "./utils"

function ChartDisplay({ stock = "aapl", predictType }) {
  const [data, setData] = useState({})
  const [charType, setChartType] = useState("candlestick")
  const [ticker, setTicker] = useState("aapl")
  const [stockOptions, setStockOptions] = useState({})
  const [height, setHeight] = useState(0)

  const fetchData = async (ticker) => {
    await getStock(ticker).then(({ data }) => {
      setData(data)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchData(ticker)
    setTicker("")
  }

  useEffect(() => {
    setHeight(window.innerHeight * 0.6)
    fetchData(ticker)
  }, [])

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
        rangeSelector: {
          buttons: [],
        },
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
                value={ticker}
                className="Tickerinput"
                type="text"
                onChange={(e) => setTicker(e.target.value.toLowerCase())}
              />
            </div>
            <button type="submit" style={{ display: "none" }}>
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="Chartdisplay__chart" id="chart">
        <StockChart options={stockOptions} />
      </div>
    </div>
  )
}

export default ChartDisplay
