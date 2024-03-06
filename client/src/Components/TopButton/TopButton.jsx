import React from 'react';
import "./TopButton.css"

const top = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

export const TopButton = () => {
    return(
    <div>
    <button onClick={top} className='topbutton'> 
        <p>Top</p>
    </button>
    </div>
    )
};