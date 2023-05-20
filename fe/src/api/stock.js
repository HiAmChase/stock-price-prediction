import instance from "./config"

const getAllStock = () => {
  return instance.get("/stock")
}

const getStock = (stock) => {
  return instance.get(`/stock/${stock}`)
}

const getPredictTestData = (predictType, stock) => {
  return instance.get(`/${predictType.predictUrlPrefix}/${stock}`)
}

export { getStock, getPredictTestData, getAllStock }
