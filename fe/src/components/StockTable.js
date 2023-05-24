import React from "react"
import { useDispatch } from "react-redux"
import { Tooltip } from "@mui/material"

import { actions } from "../redux"
import { getColor } from "./utils"
import "./StockTable.css"

function StockTable({ stocks }) {
  const dispatch = useDispatch()

  const updateTicker = (ticker) => {
    dispatch(actions.setTicker(ticker))
  }

  return (
    <div className="stock-table">
      <table className="table table-hover">
        <thead className="table-header">
          <tr>
            <th className="table-header-item" scope="col">Symbol</th>
            <th className="table-header-item" scope="col">Country</th>
            <th className="table-header-item" scope="col">Date</th>
            <th className="table-header-item" scope="col">Change</th>
            <th className="table-header-item" scope="col">Percentage</th>
            <th className="table-header-item" scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((item) => {
            return (
              <tr
                key={item.ticker}
                className={getColor(item.change)}
                onClick={() => updateTicker(item.ticker)}
              >
                <Tooltip title={item.company_name}>
                  <td>{item.ticker.toUpperCase()}</td>
                </Tooltip>
                <td>{item.country.toUpperCase()}</td>
                <td>{item.date}</td>
                <td>{item.change?.toFixed(2)}</td>
                <td>
                  {item.change >= 0 ? "" : "-"}
                  {item.percentage?.toFixed(2)}%
                </td>
                <td>{item.price?.toFixed(2)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default StockTable
