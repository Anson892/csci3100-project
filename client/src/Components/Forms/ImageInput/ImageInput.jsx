import React, { useState } from 'react'
import './ImageInput.css'

export const ImageInput = ({ image, setImage, children }) => {

    return (
        <div>
            <label>{children}</label>
            <div className="image-input-container">
                { image != null ?
                    <img src={URL.createObjectURL(image)} alt=""/>
                    :
                    null
                }
                <input 
                    className="image-input"
                    id="image-input"
                    type="file"
                    multiple="multiple"
                    onChange={(e)=> {setImage(e.target.files[0]);}}
                />
                <label for="image-input" className="image-upload-btn">Upload {children}</label>
            </div>
        </div>
    )
}
