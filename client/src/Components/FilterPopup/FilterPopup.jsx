import React, { useEffect, useState } from "react";
import "./FilterPopup.css";
import { DropDownMenu } from "../Forms/DropDownMenu/DropDownMenu";
import { motion, AnimatePresence } from "framer-motion";

export const FilterPopup = ({
  category,
  setCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  minRating,
  setMinRating,
  maxRating,
  setMaxRating,
}) => {
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
        duration: 0.5,
        ease: [0.83, 0, 0.17, 1],
      },
    },
    exit: {
      scale: 0,
      opacity: 0,
      originX: 0,
      originY: 0,
      transition: {
        duration: 0.5,
        ease: [0.83, 0, 0.17, 1],
      },
    },
  };

  // get category
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      await fetch(process.env.REACT_APP_BACKEND_URL + "/api/product/category")
        .then((res) => res.json())
        .then((data) => {
          data.unshift("All");
          setCategoryList(data);
        })
        .catch((err) => console.log(err));
    };
    getCategory();
  }, []);

  console.log(categoryList.indexOf(category));

  return (
    <motion.div {...popupAnim} className="filter-popup">
      <div className="filter-title">Filter Settings</div>
      <div className="sub-title">Category</div>
      <div className="cateory-menu">
        <DropDownMenu
          items={categoryList}
          initial={categoryList.indexOf(category)}
          setFucn={setCategory}
        />
      </div>
      <div className="space"></div>
      <div className="sub-title">Price</div>
      <div className="inputs-container">
        <input
          className="left-input"
          type="number"
          min="0"
          value={minPrice}
          onChange={(e) => {
            setMinPrice(e.target.value);
          }}
        />
        -
        <input
          className="right-input"
          type="number"
          min="0"
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(e.target.value);
          }}
        />
      </div>
      <div className="sub-title">Rating</div>
      <div className="inputs-container">
        <input
          className="left-input"
          type="number"
          min="0"
          max="5"
          value={minRating}
          onChange={(e) => {
            setMinRating(e.target.value);
          }}
        />
        -
        <input
          className="right-input"
          type="number"
          min="0"
          max="5"
          value={maxRating}
          onChange={(e) => {
            setMaxRating(e.target.value);
          }}
        />
      </div>
    </motion.div>
  );
};
