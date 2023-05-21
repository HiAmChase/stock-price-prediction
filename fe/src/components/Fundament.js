import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { getStockInfo } from "../api/stock"
import { actions } from "../redux"

import "./Fundament.css"
import { getColor } from "./utils"

function Fundament() {
  const ticker = useSelector((state) => state.ticker)
  const dispatch = useDispatch()

  const [data, setData] = useState({})

  const fetchData = async (ticker) => {
    await getStockInfo(ticker).then(({ data }) => {
      setData(data)
      dispatch(
        actions.updateStockInfo({
          price: data.price,
          change: data.change,
          percentage: data.percentage,
        })
      )
    })
  }

  useEffect(() => {
    fetchData(ticker)
  }, [ticker])

  return (
    <div className="Fundament">
      <div className="Fundgeneral">
        <h4>{data.company_name}</h4>
        {/* Title */}
        <div>
          {data.industry}
          <i className="fa-solid fa-circle separatedot"></i>
          {data.sector}
          <i className="fa-solid fa-circle separatedot"></i>
          {data.country}
        </div>
        {/* Price */}
        <div>
          <h1>
            {data.price?.toFixed(2)}
            <span className="chg">
              <span className={getColor(data.change)}>
                {data.change >= 0 ? "" : "-"}
                {data.percentage?.toFixed(2)}%
              </span>
            </span>
          </h1>
          <div className="Fund__info">
            <span className="Fund__date">{data.date}</span>
            <span className="Fund__text">
              Prev Close: {data.prev_price?.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Fundament
