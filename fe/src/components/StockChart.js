import React from "react"
import HighchartsReact from "highcharts-react-official"
import Highcharts from "highcharts/highstock"

const StockChart = ({ options }) => (
  <HighchartsReact
    highcharts={Highcharts}
    constructorType={"stockChart"}
    options={options}
  />
)

export default StockChart
