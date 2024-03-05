import React from 'react'
import './TextInput.css'

export const TextInput = ({ type, onChange, children}) => {
    return (
        <div className="text-input">
            <label>{children}</label>
            <div className="text-input-container">
                <input
                    type={type}
                    onChange={onChange}
                    placeholder={children}
                />
            </div>
        </div>
    )
}
