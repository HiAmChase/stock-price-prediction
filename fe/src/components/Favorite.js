import React from "react"
import "./Favorite.css"

function Favorite({ isFavorite = false }) {
  return (
    <span className={`${isFavorite ? "favorite" : "not-favorite"} star`}>
      &#9733;
    </span>
  )
}

export default Favorite
