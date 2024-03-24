import React, { useEffect } from 'react'
import './FilterPopup.css'
import { DropDownMenu } from '../Forms/DropDownMenu/DropDownMenu'
import { motion, AnimatePresence } from 'framer-motion'

export const FilterPopup = ({ status, setStatus,
                              category, setCategory, 
                              minPrice, setMinPrice,
                              maxPrice, setMaxPrice, 
                              minRating, setMinRating, 
                              maxRating, setMaxRating}) => {

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

    const statusList = ["All", "New", "On Sales", "Available"]
    const categoryList = ["Category1", "Category2", "Category3", "Category4", "Category5", "Category6"]

    return (
        <motion.div {...popupAnim} className="filter-popup">
            <div className="filter-title">Filter Settings</div>
            <div className="sub-title">Status</div>
            <DropDownMenu
                items={statusList}
                initial={Math.max(0, statusList.indexOf(status))}
                setFucn={setStatus}
            />
            <div className="space"></div>
            <div className="sub-title">Category</div>
            <DropDownMenu
                items={categoryList}
                initial={Math.max(0, categoryList.indexOf(category))}
                setFucn={setCategory}
            />
            <div className="space"></div>
            <div className="sub-title">Price</div>
            <div className="inputs-container">
                <input
                    className='left-input'
                    type="number"
                    min="0"
                    value={minPrice}
                    onChange={(e)=>{setMinPrice(e.target.value)}}
                    />
                -
                <input 
                    className='right-input' 
                    type="number" 
                    min="0"
                    value={maxPrice}
                    onChange={(e)=>{setMaxPrice(e.target.value)}}
                    />
            </div>
            <div className="sub-title">Rating</div>
            <div className="inputs-container">
                <input 
                    className='left-input'
                    type="number"
                    min="0"
                    max="5"
                    value={minRating}
                    onChange={(e)=>{setMinRating(e.target.value)}}    
                    />
                -
                <input 
                    className='right-input'
                    type="number"
                    min="0"
                    max="5"
                    value={maxRating}
                    onChange={(e)=>{setMaxRating(e.target.value)}}
                    />
            </div>
        </motion.div>
    )
}
