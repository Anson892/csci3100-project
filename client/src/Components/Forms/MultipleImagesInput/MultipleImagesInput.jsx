import React, { useState } from "react";
import "./MultipleImagesInput.css";

export const MultipleImagesInput = ({ images, children, ...props }) => {
  return (
    <div>
      <label>{children} (Max. 5 images) </label>
      <div className="multiple-images-input-container">
        <div className="images-container">
          {images.map((item) => {
            return <img src={URL.createObjectURL(item)} alt="" />;
          })}
        </div>
        <input
          className="images-input"
          id="images-input"
          type="file"
          multiple="multiple"
          {...props}
        />
        <label for="images-input" className="images-upload-btn">
          Upload {children}
        </label>
      </div>

    </div>
  );
};
