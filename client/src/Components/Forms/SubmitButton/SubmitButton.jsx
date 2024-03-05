import React from 'react'
import './SubmitButton.css'

export const SubmitButton = ({ children, onClick}) => {
  return (
    <div className="submit-button" onClick={onClick}>
        <p>{children}</p>
    </div>
  )
}
