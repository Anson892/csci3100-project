import React from 'react'
import './PromotionEvent.css'
import _01 from '../../Assets/Vectors/01.svg'
import _02 from '../../Assets/Vectors/02.svg'
import _03 from '../../Assets/Vectors/03.svg'
import banner_01 from '../../Assets/Images/banner_01.png'
import banner_02 from '../../Assets/Images/banner_01.png'
import banner_03 from '../../Assets/Images/banner_01.png'
import { useState, useEffect } from 'react'
import { useAnimate } from "framer-motion"

export const PromotionEvent = () => {

    const [startAnimation, setStartAnimation] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [currentBanner, setCurrentBanner] = useState(1);
    const [_01Cursor, set_01Cursor] = useState("default");
    const [_02Cursor, set_02Cursor] = useState("pointer");
    const [_03Cursor, set_03Cursor] = useState("pointer");

    const [scope, animate] = useAnimate();
    useEffect(() => {
        if (currentBanner === 1 && startAnimation) {
            const banner01Animation = async () => {
                setIsAnimating(true);
                set_01Cursor("default");
                set_02Cursor("default");
                set_03Cursor("default");
                await animate([
                    // unblur
                    ["._01", { filter: "blur(0px)" }, { duration: 1, at: 0, ease: [0.32, 0, 0.67, 0] }],
                    ["._02", { filter: "blur(0px)" }, { duration: 1, at: "<", ease: [0.32, 0, 0.67, 0] }],
                    ["._03", { filter: "blur(0px)" }, { duration: 1, at: "<", ease: [0.32, 0, 0.67, 0] }],
                    [".horizontal-line-1", { filter: "blur(0px)" }, { duration: 1, at: "<", ease: [0.32, 0, 0.67, 0] }],
                    [".horizontal-line-2", { filter: "blur(0px)" }, { duration: 1, at: "<", ease: [0.32, 0, 0.67, 0] }],
                    [".horizontal-line-3", { filter: "blur(0px)" }, { duration: 1, at: "<", ease: [0.32, 0, 0.67, 0] }],
                    [".horizontal-line-4", { filter: "blur(0px)" }, { duration: 1, at: "<", ease: [0.32, 0, 0.67, 0] }],

                    // extend line and move left
                    [".horizontal-line-1", { width: "1000px" }, { duration: 0.7, at: "+0.2", ease: [0.33, 1, 0.68, 1] }],
                    [".horizontal-line-2", { width: "1000px" }, { duration: 0.7, at: "<", ease: [0.33, 1, 0.68, 1] }],
                    ["._01", { left: "0px" }, {duration: 0.7, at: "<", ease: [0.33, 1, 0.68, 1] }],
                    
                    // expand
                    [".horizontal-line-2", { top: "448px"}, { duration: 1, at: "+0.2", ease: [0.83, 0, 0.17, 1] }],
                    [".horizontal-line-3", { top: "522px"}, { duration: 1, at: "<", ease: [0.83, 0, 0.17, 1] }],
                    ["._01", { top: "151px", height: "150px"}, { duration: 1, at: "<", ease: [0.83, 0, 0.17, 1] }],
                    ["._02", { top: "457px", height: "60px"}, { duration: 1, at: "<", ease: [0.83, 0, 0.17, 1] }],
                    ["._03", { top: "531px", height: "60px"}, { duration: 1, at: "<", ease: [0.83, 0, 0.17, 1] }],
                    [".banner-01", { top: "39px", height: "374px" }, { duration: 1, at: "<", ease: [0.83, 0, 0.17, 1] }],
                    [".banner-02", { top: "487px", height: "0px" }, { duration: 1, at: "<", ease: [0.83, 0, 0.17, 1] }],
                    [".banner-03", { top: "561px", height: "0px" }, { duration: 1, at: "<", ease: [0.83, 0, 0.17, 1] }],

                    // shorten line and move right
                    [".horizontal-line-3", { width: "750px" }, { duration: 1.5, at: "+0.2", ease: [0.83, 0, 0.17, 1]}],
                    [".horizontal-line-4", { width: "750px" }, { duration: 1.5, at: "<", ease: [0.83, 0, 0.17, 1]}],
                    ["._02", { left: "600px" }, {duration: 1.5, at: "<", ease: [0.83, 0, 0.17, 1]}],
                    ["._03", { left: "600px" }, {duration: 1.5, at: "<", ease: [0.83, 0, 0.17, 1]}],

                    // blur
                    ["._01", { filter: "blur(0px)" }, { duration: 1, at: "+0.2", ease: [0.83, 0, 0.17, 1] }],
                    ["._02", { filter: "blur(3px)" }, { duration: 1, at: "<", ease: [0.83, 0, 0.17, 1] }],
                    ["._03", { filter: "blur(3px)" }, { duration: 1, at: "<", ease: [0.83, 0, 0.17, 1] }],
                    [".horizontal-line-1", { filter: "blur(0px)" }, { duration: 1, at: "<", ease: [0.83, 0, 0.17, 1] }],
                    [".horizontal-line-2", { filter: "blur(0px)" }, { duration: 1, at: "<", ease: [0.83, 0, 0.17, 1] }],
                    [".horizontal-line-3", { filter: "blur(3px)" }, { duration: 1, at: "<", ease: [0.83, 0, 0.17, 1] }],
                    [".horizontal-line-4", { filter: "blur(3px)" }, { duration: 1, at: "<", ease: [0.83, 0, 0.17, 1] }],
                ]);
                set_01Cursor("default");
                set_02Cursor("pointer");
                set_03Cursor("pointer");
                setIsAnimating(false);
            }
            banner01Animation()
        }
        else if (currentBanner === 2 && startAnimation) {
            const banner02Animation = async () => {
                setIsAnimating(true);
                set_01Cursor("default");
                set_02Cursor("default");
                set_03Cursor("default");
                await animate([
                    // unblur
                    ["._01", { filter: "blur(0px)" }, { duration: 1, at: 0, ease: [0.32, 0, 0.67, 0] }],
                    ["._02", { filter: "blur(0px)" }, { duration: 1, at: "<", ease: [0.32, 0, 0.67, 0] }],
                    ["._03", { filter: "blur(0px)" }, { duration: 1, at: "<", ease: [0.32, 0, 0.67, 0] }],
                    [".horizontal-line-1", { filter: "blur(0px)" }, { duration: 1, at: "<", ease: [0.32, 0, 0.67, 0] }],
                    [".horizontal-line-2", { filter: "blur(0px)" }, { duration: 1, at: "<", ease: [0.32, 0, 0.67, 0] }],
                    [".horizontal-line-3", { filter: "blur(0px)" }, { duration: 1, at: "<", ease: [0.32, 0, 0.67, 0] }],
                    [".horizontal-line-4", { filter: "blur(0px)" }, { duration: 1, at: "<", ease: [0.32, 0, 0.67, 0] }],

                    // extend line and move left
                    [".horizontal-line-2", { width: "1000px" }, { duration: 0.7, at: "+0.2", ease: [0.33, 1, 0.68, 1] }],
                    [".horizontal-line-3", { width: "1000px" }, { duration: 0.7, at: "<", ease: [0.33, 1, 0.68, 1] }],
                    ["._02", { left: "0px" }, {duration: 0.7, at: "<", ease: [0.33, 1, 0.68, 1] }],
                    
                    // expand
                    [".horizontal-line-2", { top: "74px"}, { duration: 1, at: "+0.2", ease: [0.83, 0, 0.17, 1] }],
                    [".horizontal-line-3", { top: "522px"}, { duration: 1, at: "<", ease: [0.83, 0, 0.17, 1] }],
                    ["._02", { top: "225px", height: "150px"}, { duration: 1, at: "<", ease: [0.83, 0, 0.17, 1] }],
                    ["._01", { top: "9px", height: "60px"}, { duration: 1, at: "<", ease: [0.83, 0, 0.17, 1] }],
                    ["._03", { top: "531px", height: "60px"}, { duration: 1, at: "<", ease: [0.83, 0, 0.17, 1] }],
                    [".banner-01", { height: "0px" }, { duration: 1, at: "<", ease: [0.83, 0, 0.17, 1] }],
                    [".banner-02", { top: "113px", height: "374px" }, { duration: 1, at: "<", ease: [0.83, 0, 0.17, 1] }],
                    [".banner-03", { top: "561px", height: "0px" }, { duration: 1, at: "<", ease: [0.83, 0, 0.17, 1] }],

                    // shorten line and move right
                    [".horizontal-line-1", { width: "750px" }, { duration: 1.5, at: "+0.2", ease: [0.83, 0, 0.17, 1]}],
                    [".horizontal-line-4", { width: "750px" }, { duration: 1.5, at: "<", ease: [0.83, 0, 0.17, 1]}],
                    ["._01", { left: "600px" }, {duration: 1.5, at: "<", ease: [0.83, 0, 0.17, 1]}],
                    ["._03", { left: "600px" }, {duration: 1.5, at: "<", ease: [0.83, 0, 0.17, 1]}],

                    // blur
                    ["._01", { filter: "blur(3px)" }, { duration: 1, at: "+0.2", ease: [0.83, 0, 0.17, 1] }],
                    ["._02", { filter: "blur(0px)" }, { duration: 1, at: "<", ease: [0.83, 0, 0.17, 1] }],
                    ["._03", { filter: "blur(3px)" }, { duration: 1, at: "<", ease: [0.83, 0, 0.17, 1] }],
                    [".horizontal-line-1", { filter: "blur(3px)" }, { duration: 1, at: "<", ease: [0.83, 0, 0.17, 1] }],
                    [".horizontal-line-2", { filter: "blur(0px)" }, { duration: 1, at: "<", ease: [0.83, 0, 0.17, 1] }],
                    [".horizontal-line-3", { filter: "blur(0px)" }, { duration: 1, at: "<", ease: [0.83, 0, 0.17, 1] }],
                    [".horizontal-line-4", { filter: "blur(3px)" }, { duration: 1, at: "<", ease: [0.83, 0, 0.17, 1] }],
                ]);
                set_01Cursor("pointer");
                set_02Cursor("default");
                set_03Cursor("pointer");
                setIsAnimating(false);
            }
            banner02Animation()
        }
        else if (currentBanner === 3 && startAnimation) {
            const banner03Animation = async () => {
                set_01Cursor("default");
                set_02Cursor("default");
                set_03Cursor("default");
                await animate([
                    // unblur
                    ["._01", { filter: "blur(0px)" }, { duration: 1, at: 0, ease: [0.32, 0, 0.67, 0] }],
                    ["._02", { filter: "blur(0px)" }, { duration: 1, at: "<", ease: [0.32, 0, 0.67, 0] }],
                    ["._03", { filter: "blur(0px)" }, { duration: 1, at: "<", ease: [0.32, 0, 0.67, 0] }],
                    [".horizontal-line-1", { filter: "blur(0px)" }, { duration: 1, at: "<", ease: [0.32, 0, 0.67, 0] }],
                    [".horizontal-line-2", { filter: "blur(0px)" }, { duration: 1, at: "<", ease: [0.32, 0, 0.67, 0] }],
                    [".horizontal-line-3", { filter: "blur(0px)" }, { duration: 1, at: "<", ease: [0.32, 0, 0.67, 0] }],
                    [".horizontal-line-4", { filter: "blur(0px)" }, { duration: 1, at: "<", ease: [0.32, 0, 0.67, 0] }],

                    // extend line and move left
                    [".horizontal-line-3", { width: "1000px" }, { duration: 0.7, at: "+0.2", ease: [0.33, 1, 0.68, 1] }],
                    [".horizontal-line-4", { width: "1000px" }, { duration: 0.7, at: "<", ease: [0.33, 1, 0.68, 1] }],
                    ["._03", { left: "0px" }, {duration: 0.7, at: "<", ease: [0.33, 1, 0.68, 1] }],
                    
                    // expand
                    [".horizontal-line-2", { top: "74px"}, { duration: 1, at: "+0.2", ease: [0.83, 0, 0.17, 1] }],
                    [".horizontal-line-3", { top: "148px"}, { duration: 1, at: "<", ease: [0.83, 0, 0.17, 1] }],
                    ["._03", { top: "225px", height: "150px"}, { duration: 1, at: "<", ease: [0.83, 0, 0.17, 1] }],
                    ["._01", { top: "9px", height: "60px"}, { duration: 1, at: "<", ease: [0.83, 0, 0.17, 1] }],
                    ["._02", { top: "83px", height: "60px"}, { duration: 1, at: "<", ease: [0.83, 0, 0.17, 1] }],
                    [".banner-01", { height: "0px" }, { duration: 1, at: "<", ease: [0.83, 0, 0.17, 1] }],
                    [".banner-02", { top: "113px", height: "0px" }, { duration: 1, at: "<", ease: [0.83, 0, 0.17, 1] }],
                    [".banner-03", { top: "187px", height: "374px" }, { duration: 1, at: "<", ease: [0.83, 0, 0.17, 1] }],

                    // shorten line and move right
                    [".horizontal-line-1", { width: "750px" }, { duration: 1.5, at: "+0.2", ease: [0.83, 0, 0.17, 1]}],
                    [".horizontal-line-2", { width: "750px" }, { duration: 1.5, at: "<", ease: [0.83, 0, 0.17, 1]}],
                    ["._01", { left: "600px" }, {duration: 1.5, at: "<", ease: [0.83, 0, 0.17, 1]}],
                    ["._02", { left: "600px" }, {duration: 1.5, at: "<", ease: [0.83, 0, 0.17, 1]}],

                    // blur
                    ["._01", { filter: "blur(3px)" }, { duration: 1, at: "+0.2", ease: [0.83, 0, 0.17, 1] }],
                    ["._02", { filter: "blur(3px)" }, { duration: 1, at: "<", ease: [0.83, 0, 0.17, 1] }],
                    ["._03", { filter: "blur(0px)" }, { duration: 1, at: "<", ease: [0.83, 0, 0.17, 1] }],
                    [".horizontal-line-1", { filter: "blur(3px)" }, { duration: 1, at: "<", ease: [0.83, 0, 0.17, 1] }],
                    [".horizontal-line-2", { filter: "blur(3px)" }, { duration: 1, at: "<", ease: [0.83, 0, 0.17, 1] }],
                    [".horizontal-line-3", { filter: "blur(0px)" }, { duration: 1, at: "<", ease: [0.83, 0, 0.17, 1] }],
                    [".horizontal-line-4", { filter: "blur(0px)" }, { duration: 1, at: "<", ease: [0.83, 0, 0.17, 1] }],
                ]);
                set_01Cursor("pointer");
                set_02Cursor("pointer");
                set_03Cursor("default");
                setIsAnimating(false);
            }
            banner03Animation()
        }
    }, [currentBanner, startAnimation])

    const handleOnClickBanner1 = () => {
        if (currentBanner !== 1 && !isAnimating) {
            setStartAnimation(true);
            setCurrentBanner(1);
        }
    }

    const handleOnClickBanner2 = () => {
        if (currentBanner !== 2 && !isAnimating) {
            setStartAnimation(true);
            setCurrentBanner(2);
        }
    }

    const handleOnClickBanner3 = () => {
        if (currentBanner !== 3 && !isAnimating) {
            setStartAnimation(true);
            setCurrentBanner(3);
        }
    }

    return (
        <div className="promotion-event">
            <div className="title">
                <div className="reactangle">
                    <h1>Promotion Event</h1>
                </div>
            </div>
            <div className="banner" ref={scope}>
                <div className="horizontal-line-1"/>
                <img className="_01" src={_01} alt="" onClick={handleOnClickBanner1} style={{cursor: _01Cursor}}/>
                <img className="banner-01" src={banner_01} alt="" />
                <div className="horizontal-line-2"/>
                <img className="_02" src={_02} alt="" onClick={handleOnClickBanner2} style={{cursor: _02Cursor}}/>
                <img className="banner-02" src={banner_02} alt="" />
                <div className="horizontal-line-3"/>
                <img className="_03" src={_03} alt="" onClick={handleOnClickBanner3} style={{cursor: _03Cursor}}/>
                <img className="banner-03" src={banner_03} alt="" />
                <div className="horizontal-line-4"/>
            </div>
        </div>
    )
}
