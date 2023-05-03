import React from "react"
import ChartDisplay from "./components/ChartDisplay"
import Market from "./components/Market"
import "./App.css"

function App() {
  return (
    <div className="App">
      <div className="App__leftPanel">
        <ChartDisplay />
      </div>
      <div className="App__rightPanel">
        <Market />
      </div>
    </div>
  )
}

export default App
