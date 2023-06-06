import React from "react"
import "./GrownRate.css"

function GrownRate({ stock, handleSetTicker }) {
  return (
    <div className="GrownRate">
      <div className="GrownRate__title_header">
        <h4 className="GrownRate__title">Highest Grown Rate</h4>
        <div className="GrownRate__dropdown">
          <select className="Menu__dropdown">
            <option value="30">1 month</option>
            <option value="60">2 months</option>
            <option value="180">6 months</option>
            <option value="360">12 months</option>
          </select>
        </div>
      </div>
      <div className="GrownRate__table">
        <table>
          <thead className="GrownRate__header">
            <tr>
              <th className="text-center">Symbol</th>
              <th className="text-center">From</th>
              <th className="text-center">To</th>
              <th className="text-center">Percentage</th>
            </tr>
          </thead>
          <tbody className="Market__main">
            {stock.map((item) => (
              <tr
                className="GrownRateRow"
                key={item.ticker}
                onClick={() => handleSetTicker(item.ticker)}
              >
                <td className="text-center">{item.ticker.toUpperCase()}</td>
                <td className="text-center Value__up">
                  {item.prev_n_days_price?.toFixed(2)}
                </td>
                <td className="Value__up text-center">
                  {item.price?.toFixed(2)}
                </td>
                <td className="text-center Value__up">
                  {item.percentage?.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default GrownRate
