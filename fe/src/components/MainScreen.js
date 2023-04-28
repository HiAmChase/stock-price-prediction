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
  const inputRef = useRef(null)
  const [selectedOption, setSelectedOption] = useState(null)

  const handleClick = () => {
    setStock(inputRef.current.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setStock(e.target.value)
    }
  }

  const handleChange = (selectedOption) => {
    console.log("handleChange", selectedOption.value)
  }

  return (
    <div>
      <Select onChange={handleChange} options={options} />
      <div
        class="input-group rounded"
        style={{ width: "500px", margin: "auto" }}
      >
        <input
          type="search"
          class="form-control rounded"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
          ref={inputRef}
          onKeyDown={handleKeyDown}
        />
        <span
          class="input-group-text border-0"
          id="search-addon"
          onClick={handleClick}
        >
          <i class="fas fa-search"></i>
        </span>
      </div>
      {/* <ChartDisplay
        stockName={stock || "aapl"}
        predictType={PredictType.PREDICT_WITH_60_DAYS}
      />
      <ChartDisplay
        stockName={stock || "aapl"}
        predictType={PredictType.PREDICT_WITH_30_DAYS}
      /> */}
    </div>
  )
}

export default MainScreen
