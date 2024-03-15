import React from 'react';
import "./TopButton.css"
import scroll_to_top_btn from '../../Assets/UI/scroll_to_top_btn.svg'

const handleTopOnClick = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

export const TopButton = () => {
    return(
    <div className='top-btn'>
        <img onClick={handleTopOnClick} src={ scroll_to_top_btn } alt="" />
    </div>
    )
};