import React, { useEffect, useState } from "react"
import StockChart from "./StockChart"
import { getStock, getPredictTestData } from "../api/stock"
import "./StockInfo.css"

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
  const [predictData, setPredictData] = useState([])

  const fetchData = async (stock) => {
    await getStock(stock).then(({ data }) => {
      setStockData(data)
    })
    await getPredictTestData(predictType, stock).then(({ data }) => {
      setPredictData(data.predicteds)
    })
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
        data: stockData.stocks,
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
        data: stockData.volumes,
        yAxis: 1,
        color: "#555",
      },
    ],
  }
  return (
    <div>
      <div className="stock-info">
        <h4>{stockData.label}</h4>
        <div className="stock-price">
          <h2 className="price">${stockData.price}</h2>
          <div className="stock-box">
            <p
              style={{
                color: `${getColor(stockData.variation)}`,
              }}
            >
              {getArrowIcon(stockData.variation)} {stockData.percentage}%
            </p>
          </div>
          <p
            style={{
              color: `${getColor(stockData.variation)}`,
            }}
            className="variation"
          >
            {stockData.variation}
          </p>
          <p
            style={{
              color: `${getColor(stockData.variation)}`,
            }}
          >
            1 day
          </p>
        </div>
        <span>2023-03-30</span>
      </div>
      <StockChart options={stockOptions} />
    </div>
  )
}

export default ChartDisplay
