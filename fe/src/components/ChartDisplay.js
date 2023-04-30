import React, { useEffect, useState } from "react"
import StockChart from "./StockChart"
import { getStock, getPredictTestData } from "../api/stock"

function ChartDisplay({ stock = "aapl", predictType }) {
  const [stockData, setStockData] = useState([])
  const [volumeData, setVolumeData] = useState([])
  const [predictData, setPredictData] = useState([])

  const fetchData = async (stock) => {
    await getStock(stock).then(({ data }) => {
      setStockData(data.stocks)
      setVolumeData(data.volumes)
    })
    await getPredictTestData(predictType, stock).then(({ data }) => {
      setPredictData(data.predicteds)
    })
  }

  useEffect(() => {
    fetchData(stock)
  }, [stock])

  const stockOptions = {
    title: {
      text: `${stock?.toUpperCase()} ${predictType.titleSuffix}`,
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
        name: `${stock?.toUpperCase()} Stock Price`,
        data: stockData,
        color: "#5fabed",
      },
      {
        type: "line",
        id: `${stock}-predict`,
        name: `${stock?.toUpperCase()} Price Predicted`,
        data: predictData,
        color: "#f2c750",
      },
      {
        type: "column",
        id: `${stock}-volume`,
        name: `${stock?.toUpperCase()} Volume`,
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
