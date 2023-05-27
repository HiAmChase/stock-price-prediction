import React from "react"
import { useSelector, useDispatch } from "react-redux"

import { actions } from "../redux/index"

import "./Popup.css"

function Popup() {
  const dispatch = useDispatch()
  const popupInfo = useSelector((state) => state.popupInfo)

  const handleClosePopup = (e) => {
    e.preventDefault()
    dispatch(actions.updatePopupInfo({ show: false }))
  }

  const getPopupClass = () => {
    if (popupInfo.type === "success") {
      return "success"
    }
    return ""
  }

  return popupInfo.show ? (
    <div className="popup">
      <div className={`popup-icon ${getPopupClass()}`}>
        <i className="fa-regular fa-circle-check"></i>
      </div>
      <p className="popup-content">{popupInfo.content}</p>
      <button className="close-btn" onClick={handleClosePopup}>
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  ) : (
    ""
  )
}

export default Popup
