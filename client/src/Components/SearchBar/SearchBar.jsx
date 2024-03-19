import React, { useState } from 'react';
import "./SearchBar.css";
import search_icon from "../../Assets/Icons/search_icon.svg";
import filter_icon from "../../Assets/Icons/filter_icon.svg";
import { useNavigate } from 'react-router-dom';
import { FilterPopup } from '../FilterPopup/FilterPopup'
import { AnimatePresence } from 'framer-motion';


export const SearchBar = () => {
    const [keywords, setKeywords] = useState("");
    const [category, setCategory] = useState("All");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000000);
    const [minRating, setMinRating] = useState(1);
    const [maxRating, setMaxRating] = useState(5);
    const [isOpenFilterPanel, setIsOpenFilterPanel] = useState(false);

    const navigate = useNavigate();
    const handleSearch = () => {
        navigate({
            pathname: '/search',
            search: '?keywords=' + keywords +
                    '&category=' + category +
                    '&min_price=' + minPrice +
                    '&max_price=' + maxPrice +
                    '&min_rating=' + minRating +
                    '&max_rating=' + maxRating
        });
    }

    const handelOnKeyDown = (e) => {
        if (e.key == 'Enter') {
            handleSearch();
        }
    }

    const handleOnClickFilter = () => {
        setIsOpenFilterPanel(!isOpenFilterPanel);
    }

    return (
        <div className="search-bar">
            <div className="search-bar-container">
                <img 
                    className="filter-icon"
                    src={filter_icon}
                    alt=""
                    onClick={handleOnClickFilter}/>
                <input
                    type="text"
                    placeholder='Type the key words ...'
                    onChange={(e)=>{setKeywords(e.target.value)}}
                    onKeyDown={handelOnKeyDown}
                    />
                <img
                    className="search-icon"
                    src={search_icon} alt=""
                    onClick={handleSearch}
                    />
            </div>
            <AnimatePresence>
                {isOpenFilterPanel ?
                    <FilterPopup
                    isOpen={isOpenFilterPanel}
                    category={category} setCategory={setCategory}
                    minPrice={minPrice} setMinPrice={setMinPrice}
                    maxPrice={maxPrice} setMaxPrice={setMaxPrice}
                    minRating={minRating} setMinRating={setMinRating}
                    maxRating={maxRating} setMaxRating={setMaxRating}
                    />
                    :
                    null
                }
            </AnimatePresence>
        </div>
    )
}
