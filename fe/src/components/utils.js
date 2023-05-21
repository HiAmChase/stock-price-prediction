export const getColor = (value) => {
  if (value > 0) {
    return "Value__up"
  }
  if (value < 0) {
    return "Value__down"
  }
  return "Value__unchange"
}

export const PredictType = {
  PREDICT_WITH_60_DAYS: {
    predictUrlPrefix: "predict_test_data_60",
    titleSuffix: "Stock Price - 60 Days Predictions",
  },
  PREDICT_WITH_30_DAYS: {
    predictUrlPrefix: "predict_test_data_30",
    titleSuffix: "Stock Price - 30 Days Predictions",
  },
}

export const BACKGROUND_COLOR = "#222838"
export const DEFAULT_COLOR = "rgb(209, 212, 220)"
export const UP_COLOR = "#26a69a"
export const DOWN_COLOR = "#ff3737"
