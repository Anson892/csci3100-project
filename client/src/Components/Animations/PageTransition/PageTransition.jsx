import React, {useState, useEffect} from 'react'
import './PageTransition.css'
import { motion, useAnimate, usePresence } from 'framer-motion'

export const PageTransition = ({ children }) => {

    const [scope, animate] = useAnimate();
    const [isPresent, safeToRemove] = usePresence();

    useEffect(() => {
        if (isPresent) {
            const enterAnimation = async() => {
                await animate([
                    [".upper-overlay", {height: "0vh"}, {duration: 2, at: 0.1, ease: [0.16, 1, 0.3, 1]}],
                    [".lower-overlay", {height: "0vh"}, {duration: 2, at: "<", ease: [0.16, 1, 0.3, 1]}],
                    [".black-filter", { opacity: 0}, {duration: 1.5, at: 0, ease: [0.32, 0, 0.67, 0]}],
                    [".page-container", { opacity: 1}, {duration: 2, at: 0, ease: [0.32, 0, 0.67, 0]}],
                ]);
                document.getElementById("black-filter").style.display = "none";
            }
            enterAnimation();
        }
        else {
            const exitAnimation = async() => {
                await animate([
                    [".black-filter", { display: "block"}, {duration: 0, at: 0, ease: [0.32, 0, 0.67, 0]}],
                    [".upper-overlay", {height: "50vh"}, {duration: 1, at: 0, ease: [0.87, 0, 0.13, 1]}],
                    [".lower-overlay", {height: "50vh"}, {duration: 1, at: "<", ease: [0.87, 0, 0.13, 1]}],
                    [".page-container", { top: "55vh"}, {duration: 0.90, at: 0.1, ease: [0.32, 0, 0.67, 0]}],
                    [".black-filter", { opacity: 0.85}, {duration: 0.65, at: 0, ease: [0.32, 0, 0.67, 0]}],
                ]);
                safeToRemove();
            }
            exitAnimation();
        }
    }, [isPresent])

    return (
        <div className="page-transition" ref={scope}>
            <div className="upper-overlay"/>
            <div className="lower-overlay"/>
            <div className="black-filter" id="black-filter"></div>
            <div className="page-container">
                {children}
            </div>
        </div>
    )
}
