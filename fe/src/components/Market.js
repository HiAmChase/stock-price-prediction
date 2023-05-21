import React from "react"
import { useSelector, useDispatch } from "react-redux"

import { actions } from "../redux"
import "./Market.css"
import { Tooltip } from "@mui/material"
import { getColor } from "./utils"

function Market() {
  const watchList = useSelector((state) => state.watchList)
  const dispatch = useDispatch()

  const handleRemoveFromWatchList = (ticker) => {
    dispatch(actions.removeFromWatchList(ticker))
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
            {watchList.map((item) => (
              <tr className="MarketRow" key={item.ticker}>
                <td>{item.ticker.toUpperCase()}</td>
                <td>${item.price?.toFixed(2)}</td>
                <td className={`text-center ${getColor(item.change)}`}>
                  {item.change?.toFixed(2)}
                </td>
                <td className={`text-center ${getColor(item.change)}`}>
                  {item.change >= 0 ? "" : "-"}
                  {item.percentage?.toFixed(2)}%
                </td>
                <Tooltip title="Remove from Favorite">
                  <td onClick={() => handleRemoveFromWatchList(item.ticker)}>
                    <i class="fa-solid fa-xmark"></i>
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
