export const fetchData = async (url) => {
  try {
    const response = await fetch(url)
    const json = await response.json()
    return json
  } catch (error) {
    console.log("Error: ", error)
  }
}

export const baseUrl = "http://localhost:5000"
