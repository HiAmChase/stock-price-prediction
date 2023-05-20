import React, { useState, useEffect } from "react"

import "./Fundament.css"

function NumberFormat({ n, type }) {
  const [num, setNum] = useState("-")

  useEffect(() => {
    if (type === "pct") {
      setNum(`${(n * 100).toFixed(2)}%`)
    }
  }, [n])

  return <span className={n > 0 ? `Value__up` : `Value__down`}>{num}</span>
}

function Fundament() {
  return (
    <div className="Fundament">
      <div className="Fundgeneral">
        <h4>Company Name</h4>
        {/* Title */}
        <div>
          Industry
          <i className="fa-solid fa-circle separatedot"></i>
          Sector
          <i className="fa-solid fa-circle separatedot"></i>
          Country
        </div>
        {/* Price */}
        <div>
          <h1>
            34.45
            <span className="chg">
              <NumberFormat n={0.2} type="pct" />
            </span>
          </h1>
          <div className="Fund__info">
            <span className="Fund__date">2023-04-02</span>
            <span className="Fund__text">Prev Close: {(0.3).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Fundament
