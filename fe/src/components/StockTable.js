import React from "react"
import { useDispatch } from "react-redux"

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
        <thead>
          <tr>
            <th scope="col">Symbol</th>
            <th scope="col">Country</th>
            <th scope="col">Date</th>
            <th scope="col">Change</th>
            <th scope="col">Percentage</th>
            <th scope="col">Price</th>
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
                <td>{item.ticker.toUpperCase()}</td>
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
