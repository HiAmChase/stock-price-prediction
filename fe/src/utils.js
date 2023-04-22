export const baseUrl = "http://localhost:5000"

export const PredictType = {
  PREDICT_WITH_60_DAYS: {
    predictTestData: `${baseUrl}/predict_test_data_60`,
    titleSuffix: `Stock Price - 60 Days Predictions`,
  },
  PREDICT_WITH_30_DAYS: {
    predictTestData: `${baseUrl}/predict_test_data_30`,
    titleSuffix: `Stock Price - 30 Days Predictions`,
  },
}
