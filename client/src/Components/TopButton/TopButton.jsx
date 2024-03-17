import React from 'react';
import "./TopButton.css"
import scroll_to_top_btn from '../../Assets/UI/scroll_to_top_btn.svg'

const handleTopOnClick = () => {
    document.body.style.scrollBehavior = "smooth"
    document.documentElement.style.scrollBehavior = "smooth"
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    document.body.style.scrollBehavior = "auto"
    document.documentElement.style.scrollBehavior = "auto"
}

export const TopButton = () => {
    return(
    <div className='top-btn'>
        <img onClick={handleTopOnClick} src={ scroll_to_top_btn } alt="" />
    </div>
    )
};