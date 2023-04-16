import React, { useEffect, useState } from "react"
import Highcharts from "highcharts/highstock"
import StockChart from "./StockChart"
import { fetchData, baseUrl } from "../utils"

function ChartDisplay() {
  const [stockData, setStockData] = useState([])

  useEffect(() => {
    const getStockData = async () => {
      const url = `${baseUrl}/pipe`
      const response = await fetchData(url)
      setStockData(response.res)
    }

    getStockData()
  }, [])

  const stockOptions = {
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
        id: "aapl-ohlc",
        name: "AAPL Stock Price",
        data: stockData,
      },
      {
        type: "column",
        id: "aapl-volume",
        name: "AAPL Volume",
        data: stockData,
        yAxis: 1,
      },
    ],
  }
  return (
    <div>
      <StockChart options={stockOptions} highcharts={Highcharts} />
    </div>
  )
}

export default ChartDisplay
