import React from "react"

import "./Favorite.css"

function Favorite({ isFavorite = false, handleFavorite }) {
  return (
    <span
      className={`${isFavorite ? "favorite" : "not-favorite"} star`}
      onClick={handleFavorite}
    >
      &#9733;
    </span>
  )
}

export default Favorite
