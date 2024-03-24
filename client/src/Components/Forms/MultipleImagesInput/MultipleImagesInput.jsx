import React, { useState } from 'react'
import './MultipleImagesInput.css'

export const MultipleImagesInput = ({ images, setImages, children }) => {

    return (
        <div>
            <label>{children}</label>
            <div className="multiple-images-input-container">
                <div className="images-container">
                    {
                        images.map((item) => {
                            return (
                                <img
                                    src={URL.createObjectURL(item)}
                                    alt=""
                                />
                            )
                        })
                    }
                </div>
                <input 
                    className="images-input"
                    id="images-input"
                    type="file"
                    multiple="multiple"
                    onChange={(e)=> {setImages([...e.target.files]);}}
                />
                <label for="images-input" className="images-upload-btn">Upload {children}</label>
            </div>
        </div>
    )
}
