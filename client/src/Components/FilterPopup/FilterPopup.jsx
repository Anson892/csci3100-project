import React, { useEffect } from 'react'
import './FilterPopup.css'
import { DropDownMenu } from '../Forms/DropDownMenu/DropDownMenu'
import { motion, AnimatePresence } from 'framer-motion'

export const FilterPopup = ({ setCategory, 
                              setMinPrice,
                              setMaxPrice, 
                              setMinRating, 
                              setMaxRating}) => {

    const popupAnim = {
        initial: {
            scale: 0,
            opacity: 0,
            originX: 0,
            originY: 0,
        },
        animate: {
            scale: 1,
            opacity: 1,
            originX: 0,
            originY: 0,
            transition: {
                duration: 0.3,
            }
        },
        exit: {
            scale: 0,
            opacity: 0,
            originX: 0,
            originY: 0,
            transition: {
                duration: 0.3,
            }
        }
    }

    return (
        <motion.div {...popupAnim} className="filter-popup">
            <div className="title">Filter Settings</div>
            <hr />
            <div className="sub-title">Category</div>
            <DropDownMenu
                items={["All", "New", "Sales", "Chair", "Desk", "Category3", "Category4"]}
                initial={0}
                setFucn={setCategory}
            />
            <div className="space"></div>
            <hr />
            <div className="sub-title">Price</div>
            <div className="inputs-container">
                <input
                    className='left-input'
                    type="number"
                    min="0"
                    onChange={(e)=>{setMinPrice(e.target.value)}}
                    />
                -
                <input 
                    className='right-input' 
                    type="number" 
                    min="0"
                    onChange={(e)=>{setMaxPrice(e.target.value)}}
                    />
            </div>
            <hr />
            <div className="sub-title">Rating</div>
            <div className="inputs-container">
                <input 
                    className='left-input'
                    type="number"
                    min="0"
                    max="5"
                    onChange={(e)=>{setMinRating(e.target.value)}}    
                    />
                -
                <input 
                    className='right-input'
                    type="number"
                    min="0"
                    max="5"
                    onChange={(e)=>{setMaxRating(e.target.value)}}
                    />
            </div>
        </motion.div>
    )
}
