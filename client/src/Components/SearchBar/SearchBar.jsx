import React, { useState } from 'react';
import "./SearchBar.css";
import search_icon from "../../Assets/Icons/search_icon.svg";
import filter_icon from "../../Assets/Icons/filter_icon.svg";
import { useNavigate } from 'react-router-dom';

export const SearchBar = () => {
    const [keywords, setKeywords] = useState();

    const navigate = useNavigate();
    const handleSearch = () => {
        if (keywords != undefined && keywords !== "") {
            navigate({
                pathname: '/search',
                search: '?keywords=' + keywords
            });
        }
    }

    const handelOnKeyDown = (e) => {
        if (e.key == 'Enter') {
            handleSearch();
            console.log('1');
        }
    }

    return (
        <div className="search-bar">
            <img className="filter-icon" src={filter_icon} alt="" />
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
    )
}
