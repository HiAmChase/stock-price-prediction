import instance from "./config"

const getAllStock = () => {
  return instance.get("/stock")
}

const getStockInfo = (stock) => {
  return instance.get(`/stock/${stock}`)
}

const postFetchNewData = (stock) => {
  return instance.post(`/stock/${stock}`)
}

const getStatisticStock = (stock) => {
  return instance.get(`/statistic/stock/${stock}`)
}

const getPredictTestData = (predictType, stock) => {
  return instance.get(`/${predictType.predictUrlPrefix}/${stock}`)
}

export {
  getStockInfo,
  getPredictTestData,
  getAllStock,
  getStatisticStock,
  postFetchNewData,
}
