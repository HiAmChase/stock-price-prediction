import React from "react"
import { useSelector, useDispatch } from "react-redux"

import { actions } from "../redux"
import "./Market.css"
import { Tooltip } from "@mui/material"
import { getColor } from "./utils"

function Market({ handleSetTicker }) {
  const watchList = useSelector((state) => state.watchList)
  const dataCached = JSON.parse(localStorage.getItem("stocks")) || []
  const dispatch = useDispatch()

  let stocksInWatchList = []
  dataCached.forEach((item) => {
    if (watchList.includes(item.ticker)) {
      stocksInWatchList = [...stocksInWatchList, item]
    }
  })

  const handleRemoveFromWatchList = (ticker) => {
    dispatch(actions.removeFromWatchList(ticker))
    dispatch(
      actions.updatePopupInfo({
        show: true,
        content: `${ticker.toUpperCase()} was removed from watchlist`,
        type: "success",
      })
    )
  }

  return (
    <div className="Market">
      <div>
        <h4 className="Market__title">Watchlist</h4>
      </div>
      <div className="Market__table">
        <table>
          <thead className="Market__header">
            <tr>
              <th className="text-center">Symbol</th>
              <th className="text-center">Price</th>
              <th className="text-center">Change</th>
              <th className="text-center">Percentage</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="Market__main">
            {stocksInWatchList.map((item) => (
              <tr
                className="MarketRow"
                key={item.ticker}
                onClick={() => handleSetTicker(item.ticker)}
              >
                <td className="text-center">{item.ticker.toUpperCase()}</td>
                <td className="text-center">{item.price?.toFixed(2)}</td>
                <td className={`text-center ${getColor(item.change)}`}>
                  {item.change?.toFixed(2)}
                </td>
                <td className={`text-center ${getColor(item.change)}`}>
                  {item.percentage?.toFixed(2)}%
                </td>
                <Tooltip title="Remove from Favorite">
                  <td onClick={() => handleRemoveFromWatchList(item.ticker)}>
                    <i className="fa-solid fa-xmark"></i>
                  </td>
                </Tooltip>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Market
