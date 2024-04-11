import React from 'react'
import './TextInput.css'

export const TextInput = ({ type, onChange, children, defaultText, value, maxLength}) => {
    console.log(value, defaultText)
    return (
        <div className="text-input">
            <label>{children}</label>
            <div className="text-input-container">
                <input
                    value={value ? value : defaultText}
                    type={type}
                    onChange={onChange}
                    placeholder={children}
                    maxLength={maxLength}
                />
            </div>
        </div>
    )
}
