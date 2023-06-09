import React from "react"

import "./Favorite.css"
import { Tooltip } from "@mui/material"

function Favorite({ isFavorite = false, handleFavorite }) {
  const tooltipTitle = () => {
    return isFavorite ? "Remove from Favorite" : "Add to Favorite"
  }
  return (
    <Tooltip title={tooltipTitle()}>
      <span
        className={`${isFavorite ? "favorite" : "not-favorite"} star`}
        onClick={handleFavorite}
      >
        &#9733;
      </span>
    </Tooltip>
  )
}

export default Favorite
