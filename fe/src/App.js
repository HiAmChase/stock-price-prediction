import React from "react"
import ChartDisplay from "./components/ChartDisplay"
import Market from "./components/Market"
import Fundament from "./components/Fundament"
import "./App.css"

function App() {
  return (
    <div className="App">
      <div className="App__topPanel">
        <ChartDisplay />
      </div>
      <div className="App__bottomPanel">
        <Market />
        <div className="temp"></div>
        <Fundament />
      </div>
    </div>
  )
}

export default App
