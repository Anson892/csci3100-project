import React from 'react'
import './TextAreaInput.css'

export const TextAreaInput = ({ onChange, children, defaultText}) => {
    return (
        <div className="text-area-input">
            <label>{children}</label>
            <div className="text-area-input-container">
                <textarea
                    value={defaultText}
                    onChange={onChange}
                    placeholder={children}
                />
            </div>
        </div>
    )
}
