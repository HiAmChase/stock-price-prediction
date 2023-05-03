import React, { useEffect, useState } from "react"
import StockChart from "./StockChart"
import { getStock, getPredictTestData } from "../api/stock"
import "./StockInfo.css"
import { DEFAULT_COLOR, DOWN_COLOR, UP_COLOR, BACKGROUND_COLOR } from "./utils"

function ChartDisplay({ stock = "aapl", predictType }) {
  const [stockData, setStockData] = useState({
    date: "2023-01-01",
    variation: 0,
    percentage: 0,
    price: 0,
    stocks: [],
    volumes: [],
    label: "",
  })
  const [data, setData] = useState({})
  const [charType, setChartType] = useState("candlestick")
  const [stockOptions, setStockOptions] = useState({})
  const [height, setHeight] = useState(0)
  const [predictData, setPredictData] = useState([])

  const fetchData = async (stock) => {
    await getStock(stock).then(({ data }) => {
      setData(data)
    })
    // await getPredictTestData(predictType, stock).then(({ data }) => {
    //   setPredictData(data.predicteds)
    // })
  }

  const getColor = (variation) => {
    return variation < 0 ? "red" : "green"
  }

  const getArrowIcon = (variation) => {
    return variation < 0 ? (
      <i class="fa-solid fa-arrow-down"></i>
    ) : (
      <i class="fa-solid fa-arrow-up"></i>
    )
  }

  useEffect(() => {
    fetchData(stock)
  }, [stock])

  useEffect(() => {
    setHeight(window.innerHeight * 0.6)
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
            name: `${stock.toUpperCase()} Stock Price`,
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
      <div className="Chartdisplay__chart" id="chart">
        <StockChart options={stockOptions} />
      </div>
    </div>
  )
}

export default ChartDisplay
