import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { Tooltip } from "@mui/material"

import { actions } from "../redux"
import { getColor } from "./utils"
import "./StockTable.css"

function StockTable({ stocks }) {
  const dispatch = useDispatch()

  const [filter, setFilter] = useState("")
  const [orderOptions, setOrderOptions] = useState("asc")

  let orderStocks = stocks

  const sortByDesc = () => {
    orderStocks = orderStocks.sort(
      (a, b) => parseFloat(b[filter]) - parseFloat(a[filter])
    )
  }

  const sortByAsc = () => {
    orderStocks = orderStocks.sort(
      (a, b) => parseFloat(a[filter]) - parseFloat(b[filter])
    )
  }

  switch (filter) {
    case "change":
    case "percentage":
    case "price":
      if (orderOptions === "desc") {
        sortByDesc()
      } else {
        sortByAsc()
      }
  }

  const updateTicker = (ticker) => {
    dispatch(actions.setTicker(ticker))
  }

  return (
    <div className="stock-table">
      <table className="table table-hover">
        <thead className="table-header">
          <tr>
            <th className="table-header-item" scope="col">
              Symbol
            </th>
            <th className="table-header-item" scope="col">
              Country
            </th>
            <th className="table-header-item" scope="col">
              Date
            </th>
            <th className="table-header-item" scope="col">
              <div className="order-header">
                Change
                <div className="order-button-group">
                  <i
                    onClick={() => {
                      setFilter("change")
                      setOrderOptions("desc")
                    }}
                    class="fa-solid fa-caret-up button-up"
                  ></i>
                  <i
                    onClick={() => {
                      setFilter("change")
                      setOrderOptions("asc")
                    }}
                    class="fa-sharp fa-solid fa-caret-down button-down"
                  ></i>
                </div>
              </div>
            </th>
            <th className="table-header-item" scope="col">
              <div className="order-header">
                Percentage
                <div className="order-button-group">
                  <i
                    onClick={() => {
                      setFilter("percentage")
                      setOrderOptions("desc")
                    }}
                    class="fa-solid fa-caret-up button-up"
                  ></i>
                  <i
                    onClick={() => {
                      setFilter("percentage")
                      setOrderOptions("asc")
                    }}
                    class="fa-sharp fa-solid fa-caret-down button-down"
                  ></i>
                </div>
              </div>
            </th>
            <th className="table-header-item" scope="col">
              <div className="order-header">
                Price
                <div className="order-button-group">
                  <i
                    onClick={() => {
                      setFilter("price")
                      setOrderOptions("desc")
                    }}
                    class="fa-solid fa-caret-up button-up"
                  ></i>
                  <i
                    onClick={() => {
                      setFilter("price")
                      setOrderOptions("asc")
                    }}
                    class="fa-sharp fa-solid fa-caret-down button-down"
                  ></i>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {orderStocks.map((item) => {
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
                <td>{item.percentage?.toFixed(2)}%</td>
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
