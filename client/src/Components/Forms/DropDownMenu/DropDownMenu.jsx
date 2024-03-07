import React, { useEffect } from 'react'
import './DropDownMenu.css'
import drop_down_menu_icon from "../../../Assets/Icons/drop_down_menu_icon.svg"
import { useState } from 'react'
import { useAnimate } from 'framer-motion'

export const DropDownMenu = ({ items, initial, setFucn }) => {
    
    const [currentItem, setCurrentItem] = useState(items[initial]);
    const [currentAnimateItem, setCurrentAnimateItem] = useState(items[initial]);
    const [isOpen, setIsOpen] = useState(false);
    const [onClick, setOnClick] = useState(false);
    
    const[scope, animate] = useAnimate();
    useEffect(() => {
        const h = (6 + 24 + 13 + 24 * items.length + 13).toString() + "px";
        if (isOpen) {
            const openAnimation = async () => {
                await animate([
                    [".container", { height: h }, { duration: 0.8, at: 0, ease: [0.65, 0, 0.35, 1]}],
                    [".drop-down-menu-button", { rotate: 90 }, { duration: 0.8, at: 0, ease: [0.65, 0, 0.35, 1]}]
                ])
            }
            openAnimation();
        }
        else {
            const closeAnimation = async () => {
                await animate([
                    [".container", { height: "40px" }, { duration: 0.8, at: 0, ease: [0.65, 0, 0.35, 1]}],
                    [".drop-down-menu-button", { rotate: 0 }, { duration: 0.8, at: 0, ease: [0.65, 0, 0.35, 1]}]
                ])
            }
            closeAnimation();
        }

        if (onClick) {
            const onClickAnimation = async () => {
                await animate([
                    ["p", { opacity: 0, y: "13px" }, { duration: 0.2, at: 0, ease: [0.32, 0, 0.67, 0]}]
                ]);
                setCurrentAnimateItem(currentItem);
                await animate([
                    ["p", { opacity: 0, y: "-13px" }, { duration: 0 }]
                ]);
                await animate([
                    ["p", { opacity: 1, y: "0px" }, { duration: 0.2 , ease: [0.33, 1, 0.68, 1]}]
                ]);
                setOnClick(false);
            }
            onClickAnimation();
        }
    }, [isOpen, onClick])

    return (
        <div className="drop-down-menu" ref={scope}>
            <div className="container">
                <img 
                    className="drop-down-menu-button"
                    src={ drop_down_menu_icon }
                    alt=""
                    onClick={() => setIsOpen(!isOpen)}
                    />
                <hr></hr>
                <div className="texts-container">
                    <p className="current-item">{currentAnimateItem}</p>
                    {items.map(item => {
                        return <div
                                    className="item-container"
                                    onClick={()=>{
                                        if (currentItem !== item) {
                                            setCurrentItem(item);
                                            setOnClick(true);
                                            setFucn(item);
                                        }
                                    }}>
                                    {item}
                                </div>
                        })}
                </div>
            </div>
        </div>
    )
}
