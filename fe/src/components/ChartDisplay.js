import React, { useEffect, useState } from "react"
import Highcharts from "highcharts/highstock"
import StockChart from "./StockChart"
import { baseUrl } from "../utils"
import axios from "axios"

function ChartDisplay({ stockName }) {
  const [stockData, setStockData] = useState([])
  const [volumeData, setVolumeData] = useState([])

  useEffect(() => {
    axios
      .get(`${baseUrl}/pipe/${stockName}`)
      .then((res) => {
        setStockData(res.data.stocks)
        setVolumeData(res.data.volumes)
      })
      .catch((err) => {
        console.log("error: ", err)
      })
  }, [stockName])

  const stockOptions = {
    title: {
      text: `${stockName.toUpperCase()} Stock Price`,
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
        id: `${stockName}-ohlc`,
        name: `${stockName.toUpperCase()} Stock Price`,
        data: stockData,
      },
      {
        type: "column",
        id: `${stockName}-volume`,
        name: `${stockName.toUpperCase()} Volume`,
        data: volumeData,
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
