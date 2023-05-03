import React, { useState } from "react"
import "./Market.css"

const DEFAULT_DATA = [
  { ticker: "AAPL", price: 10, change: 1.4, percentage: 0.3 },
  { ticker: "AAPL", price: 10, change: 1.4, percentage: 0.3 },
  { ticker: "AAPL", price: 10, change: 1.4, percentage: 0.3 },
]

function Market() {
  const [data, setData] = useState(DEFAULT_DATA)
  return (
    <div className="Market">
      <div>
        <h4 className="Market__title">Watchlist</h4>
      </div>
      <div className="Market__table">
        <table>
          <thead className="Market__header">
            <tr>
              <th>Symbol</th>
              <th>Price</th>
              <th>Change</th>
              <th>Percentage</th>
              <td></td>
            </tr>
          </thead>
          <tbody className="Market__main">
            {data.map((item) => (
              <tr className="MarketRow">
                <td>{item.ticker}</td>
                <td>${item.price.toFixed(2)}</td>
                <td className={item.price > 0 ? "Value__up" : "Value__down"}>
                  {item.price.toFixed(2)}
                </td>
                <td className={item.change > 0 ? "Value__up" : "Value__down"}>
                  {item.percentage.toFixed(2)}%
                </td>
                <td>X</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Market
