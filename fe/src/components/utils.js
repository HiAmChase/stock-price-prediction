export const getColor = (value) => {
  if (value > 0) {
    return "Value__up"
  }
  if (value < 0) {
    return "Value__down"
  }
  return "Value__unchange"
}

export const BACKGROUND_COLOR = "#222838"
export const DEFAULT_COLOR = "rgb(209, 212, 220)"
export const UP_COLOR = "#26a69a"
export const DOWN_COLOR = "#ff3737"
