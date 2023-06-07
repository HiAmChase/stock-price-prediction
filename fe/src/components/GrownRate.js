import React from "react"
import { getColor } from "./utils"
import "./GrownRate.css"

function GrownRate({
  stock,
  handleSetTicker,
  grownRateFilter,
  setGrownRateFilter,
}) {
  return (
    <div className="GrownRate">
      <div className="GrownRate__title_header">
        <h4 className="GrownRate__title">Top Highest Grown Rate</h4>
        <div className="GrownRate__group">
          <div className="GrownRate__dropdown">
            <select
              className="Menu__dropdown"
              value={grownRateFilter.max_results}
              onChange={(e) =>
                setGrownRateFilter({
                  ...grownRateFilter,
                  max_results: e.target.value,
                })
              }
            >
              <option value="10">10 items</option>
              <option value="20">20 items</option>
              <option value="30">30 items</option>
            </select>
          </div>
          <div className="GrownRate__dropdown">
            <select
              className="Menu__dropdown"
              value={grownRateFilter.grown_rate_days}
              onChange={(e) =>
                setGrownRateFilter({
                  ...grownRateFilter,
                  grown_rate_days: e.target.value,
                })
              }
            >
              <option value="30">In 1 month</option>
              <option value="60">In 2 months</option>
              <option value="180">In 6 months</option>
              <option value="360">In 12 months</option>
            </select>
          </div>
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
                <td className={`text-center ${getColor(item.percentage)}`}>
                  {item.prev_n_days_price?.toFixed(2)}
                </td>
                <td className={`text-center ${getColor(item.percentage)}`}>
                  {item.price?.toFixed(2)}
                </td>
                <td className={`text-center ${getColor(item.percentage)}`}>
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
