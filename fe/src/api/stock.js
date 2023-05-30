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

const getPredictPast = (stock, predictType) => {
  return instance.post(`/predict_past/stock/${stock}`, {
    predict_type: predictType,
  })
}

const getPredictFuture = (stock, predictType) => {
  return instance.post(`/predict_future/stock/${stock}`, {
    predict_type: predictType,
  })
}

export {
  getStockInfo,
  getAllStock,
  getStatisticStock,
  getPredictPast,
  postFetchNewData,
  getPredictFuture,
}
