import React, { useEffect, useState } from "react"
import Select from "react-select"

import ChartDisplay from "./ChartDisplay"
import { PredictType } from "../utils"
import { getAllStock } from "../api/stock"

function MainScreen() {
  const [stocks, setStocks] = useState([])
  const [stock, setStock] = useState(undefined)

  useEffect(() => {
    getAllStock().then(({ data }) => {
      setStocks(data)
    })
  }, [])

  const handleChange = (selectedValue) => {
    setStock(selectedValue.value)
  }

  return (
    <div>
      <div className="mt-3 mb-3" style={{ width: "500px", margin: "auto" }}>
        <Select onChange={handleChange} options={stocks} />
      </div>
      <ChartDisplay
        stock={stock}
        predictType={PredictType.PREDICT_WITH_60_DAYS}
      />
    </div>
  )
}

export default MainScreen
