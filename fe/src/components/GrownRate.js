import React from "react"
import "./GrownRate.css"
import { Tooltip } from "@mui/material"

function GrownRate({ stock }) {
  return (
    <div className="GrownRate">
      <div>
        <Tooltip title="Show top 10 stocks highest grown rate in 2 months">
          <i className="fa-solid fa-info title-tooltip"></i>
        </Tooltip>
        <h4 className="GrownRate__title">Top 10 Highest Grown Rate</h4>
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
              <tr className="GrownRateRow" key={item.ticker}>
                <td>{item.ticker.toUpperCase()}</td>
                <td className="text-center Value__up">
                  {item.prev_n_days_price?.toFixed(2)}
                </td>
                <td className="Value__up">{item.price?.toFixed(2)}</td>
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
