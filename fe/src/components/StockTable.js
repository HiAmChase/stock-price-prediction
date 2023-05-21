import React, { useEffect, useState } from "react"

import { getAllStock } from "../api/stock"
import { getColor } from "./utils"
import "./StockTable.css"

function StockTable() {
  const [stocks, setStocks] = useState([])
  const fetchData = async () => {
    await getAllStock().then(({ data }) => {
      console.log(data)
      setStocks(data)
    })
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="stock-table">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Ticker</th>
            <th scope="col">Date</th>
            <th scope="col">Change</th>
            <th scope="col">Percentage</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((item) => {
            return (
              <tr key={item.ticker} className={getColor(item.change)}>
                <td>{item.ticker.toUpperCase()}</td>
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
