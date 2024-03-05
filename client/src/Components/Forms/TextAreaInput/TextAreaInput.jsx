import React from 'react'
import './TextAreaInput.css'

export const TextAreaInput = ({ onChange, children}) => {
    return (
        <div className="text-area-input">
            <label>{children}</label>
            <div className="text-area-input-container">
                <textarea
                    onChange={onChange}
                    placeholder={children}
                />
            </div>
        </div>
    )
}
