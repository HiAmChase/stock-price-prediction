import React, { useRef, useState } from "react"
import ChartDisplay from "./ChartDisplay"
import PredictStock from "./PredictStock"

function MainScreen() {
  const [stock, setStock] = useState("")
  const inputRef = useRef(null)

  const handleClick = () => {
    setStock(inputRef.current.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setStock(e.target.value)
    }
  }

  return (
    <div>
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
      <ChartDisplay stockName={stock || "aapl"} />
      <PredictStock stockName={stock || "aapl"} />
    </div>
  )
}

export default MainScreen
