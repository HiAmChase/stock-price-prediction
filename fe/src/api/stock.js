import instance from "./config"

const getAllStock = () => {
  return instance.get("/stock")
}

const getStatisticStock = (stock) => {
  return instance.get(`/statistic/stock/${stock}`)
}

const getPredictTestData = (predictType, stock) => {
  return instance.get(`/${predictType.predictUrlPrefix}/${stock}`)
}

export { getStatisticStock, getPredictTestData, getAllStock }
