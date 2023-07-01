import React from "react"
import { Tooltip } from "@mui/material"
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
        <div className="GrownRate__tooltip">
          <Tooltip title="The data will be updated automatically at 00:00am">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-info-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
            </svg>
          </Tooltip>
        </div>
        <h4 className="GrownRate__title">Top Highest Growth Rate</h4>
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
              <Tooltip title={item.company_name}>
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
              </Tooltip>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default GrownRate
