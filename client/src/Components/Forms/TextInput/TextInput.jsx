import React from 'react'
import './TextInput.css'

export const TextInput = ({ type, onChange, children, defaultText}) => {
    return (
        <div className="text-input">
            <label>{children}</label>
            <div className="text-input-container">
                <input
                    value={defaultText}
                    type={type}
                    onChange={onChange}
                    placeholder={children}
                />
            </div>
        </div>
    )
}
