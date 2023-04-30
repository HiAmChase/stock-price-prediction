import React, { useRef, useState } from "react"
import ChartDisplay from "./ChartDisplay"
import { PredictType } from "../utils"
import Select from "react-select"

function MainScreen() {
  const options = [
    { value: "jack", label: "Jack" },
    { value: "john", label: "John" },
    { value: "mike", label: "Mike" },
  ]
  const [stock, setStock] = useState("")
  const [selectedOption, setSelectedOption] = useState(null)

  const handleChange = (selectedOption) => {
    console.log("handleChange", selectedOption.value)
  }

  return (
    <div>
      <div className="mt-3" style={{ width: "500px", margin: "auto" }}>
        <Select onChange={handleChange} options={options} />
      </div>
      <ChartDisplay
        stockName={stock}
        predictType={PredictType.PREDICT_WITH_60_DAYS}
      />
    </div>
  )
}

export default MainScreen
