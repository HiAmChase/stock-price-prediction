import React from "react"
import { useSelector } from "react-redux"

import "./Market.css"

function Market() {
  const watchList = useSelector((state) => state.watchList)
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
            {watchList.map((item) => (
              <tr className="MarketRow" key={item.ticker}>
                <td>{item.ticker.toUpperCase()}</td>
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
