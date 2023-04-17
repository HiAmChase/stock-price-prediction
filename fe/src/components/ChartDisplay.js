import React, { useEffect, useState } from "react"
import axios from "axios"
import StockChart from "./StockChart"
import { baseUrl } from "../utils"

function ChartDisplay({ stockName }) {
  const [stock, setStock] = useState("")
  const [stockData, setStockData] = useState([])
  const [volumeData, setVolumeData] = useState([])
  const [predictData, setPredictData] = useState([])

  const getData = (stock) => {
    axios.get(`${baseUrl}/pipe/${stock}`).then((res) => {
      setStockData(res.data.stocks)
      setVolumeData(res.data.volumes)
      setPredictData(res.data.predicted)
      setStock(stock)
    })
  }

  useEffect(() => {
    try {
      getData(stockName)
    } catch (e) {
      getData("aapl")
    }
  }, [stockName])

  const stockOptions = {
    title: {
      text: `${stock.toUpperCase()} Stock Price`,
    },
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
    },
    yAxis: [
      {
        labels: {
          align: "left",
        },
        height: "80%",
      },
      {
        labels: {
          align: "left",
        },
        top: "80%",
        height: "20%",
        offset: 0,
      },
    ],
    series: [
      {
        type: "line",
        id: `${stock}-ohlc`,
        name: `${stock.toUpperCase()} Stock Price`,
        data: stockData,
        color: "#5fabed",
      },
      {
        type: "line",
        id: `${stock}-predict`,
        name: `${stock.toUpperCase()} Price Predicted`,
        data: predictData,
        color: "#f2c750",
      },
      {
        type: "column",
        id: `${stockName}-volume`,
        name: `${stock.toUpperCase()} Volume`,
        data: volumeData,
        yAxis: 1,
        color: "#555",
      },
    ],
  }
  return (
    <div>
      <StockChart options={stockOptions} />
    </div>
  )
}

export default ChartDisplay
