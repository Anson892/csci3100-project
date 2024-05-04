import React, { useEffect, useRef, useState } from 'react'
import scrolling_circles from '../../Assets/UI/scrolling_circles.svg'
import recommend_title from '../../Assets/UI/recommend_title.svg'
import product_image_test from '../../Assets/Images/product_image_test.png'
import { useNavigate } from 'react-router-dom';
import './HomeRecommendation.css'
import { motion, useScroll, useTransform  } from 'framer-motion'

const ProductItemLeft = ({id}) => {

    const productContainerRef = useRef(null);

    // exit
    const { scrollYProgress: productExitAlpha } = useScroll({
        target: productContainerRef,
        offset: ['start start', '70% start']
    })
    const productOpacity = useTransform(productExitAlpha, [0, 1], [1, 0])

    // enter
    const { scrollYProgress: productEnterAlpha } = useScroll({
        target: productContainerRef,
        offset: ['start end', '60% end']
    })
    const productImageExpand = useTransform(useTransform(productEnterAlpha, [0, 1], [0, 30]), (v) => `${v}vw`)
    const productTextExpand = useTransform(useTransform(productEnterAlpha, [0, 1], [0, 30]), (v) => `${v}vw`)
    
    // Aniamte
    const { scrollYProgress: productAnimAlpha } = useScroll({
        target: productContainerRef,
        offset: ['start end', 'end start']
    })
    const leftLineOffset = useTransform(useTransform(productAnimAlpha, [0, 1], [0, 10]), (v) => `${v}vw`)
    const imageOffset = useTransform(useTransform(productAnimAlpha, [0, 1], [5, -5]), (v) => `${v}vw`)
    const textOffset = useTransform(useTransform(productAnimAlpha, [0, 1], [-5, 5]), (v) => `${v}vw`)
    const rightLineOffset = useTransform(useTransform(productAnimAlpha, [0, 1], [0, -10]), (v) => `${v}vw`)

    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [imageScr, setImageScr] = useState()

    const navigate = useNavigate();
    const handleImageClick = () => {
        navigate({
            pathname: '/product/' + id
        });
        window.scrollTo({ top: (0, 0), behavior: "instant" });
    }

    useEffect(()=> {
        fetch(
            process.env.REACT_APP_BACKEND_URL + '/api/product/'+ id,
            { method: "GET" }
            )
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setName(data.data.name);
                setDescription(data.data.description);
                if(data.data.product_images[0] != undefined)
                    setImageScr(process.env.REACT_APP_BACKEND_URL + '/images/'+ (data.data.product_images[0].path));
                else
                    setImageScr(product_image_test)
            })
            .catch((error) => {
                console.error(error);
            } )
    }, [id])

    return (
        <motion.div 
             className="product-item-left" 
             ref={productContainerRef}
             style={{ opacity: productOpacity }}
        >
            <motion.div
                className="vertical-line-left"
                style={{ y: leftLineOffset }}    
            />
            <motion.img
                onClick={()=>{handleImageClick()}}
                src={ imageScr }
                alt=""
                style={{
                    width: productImageExpand,
                    y: imageOffset,
                }}
            />
            <motion.div
                className="product-text-container"
                style={{
                    width: productTextExpand,
                    y: textOffset,
                }}
            >
                <div className="product-text" >
                    <h1 className="product-name">{name}</h1>
                    <p className="product-description">{description}</p>
                </div>
            </motion.div>
            <motion.div
                className="vertical-line-right"
                style={{
                    y: rightLineOffset,
                }}
            />
        </motion.div>
    )
}

const ProductItemRight = ({id}) => {

    const productContainerRef = useRef(null);

    // exit
    const { scrollYProgress: productExitAlpha } = useScroll({
        target: productContainerRef,
        offset: ['start start', '70% start']
    })
    const productOpacity = useTransform(productExitAlpha, [0, 1], [1, 0])

    // enter
    const { scrollYProgress: productEnterAlpha } = useScroll({
        target: productContainerRef,
        offset: ['start end', '60% end']
    })
    const productImageExpand = useTransform(useTransform(productEnterAlpha, [0, 1], [0, 30]), (v) => `${v}vw`)
    const productTextExpand = useTransform(useTransform(productEnterAlpha, [0, 1], [0, 30]), (v) => `${v}vw`)
    
    // Aniamte
    const { scrollYProgress: productAnimAlpha } = useScroll({
        target: productContainerRef,
        offset: ['start end', 'end start']
    })
    const leftLineOffset = useTransform(useTransform(productAnimAlpha, [0, 1], [0, -10]), (v) => `${v}vw`)
    const imageOffset = useTransform(useTransform(productAnimAlpha, [0, 1], [5, -5]), (v) => `${v}vw`)
    const textOffset = useTransform(useTransform(productAnimAlpha, [0, 1], [-5, 5]), (v) => `${v}vw`)
    const rightLineOffset = useTransform(useTransform(productAnimAlpha, [0, 1], [0, 10]), (v) => `${v}vw`)

    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [imageScr, setImageScr] = useState()

    const navigate = useNavigate();
    const handleImageClick = () => {
        navigate({
            pathname: '/product/' + id
        });
        window.scrollTo({ top: (0, 0), behavior: "instant" });
    }

    useEffect(()=> {
        fetch(
            process.env.REACT_APP_BACKEND_URL + '/api/product/'+ id,
            { method: "GET" }
            )
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setName(data.data.name);
                setDescription(data.data.description);
                if(data.data.product_images[0] != undefined)
                    setImageScr(process.env.REACT_APP_BACKEND_URL + '/images/'+ (data.data.product_images[0].path));
                else
                    setImageScr(product_image_test)
            })
            .catch((error) => {
                console.error(error);
            } )
    }, [id])

    return (
        <motion.div 
             className="product-item-right" 
             ref={productContainerRef}
             style={{ opacity: productOpacity }}
        >
            <motion.div
                className="vertical-line-right"
                style={{ y: rightLineOffset }}    
            />
            <motion.img
                onClick={()=>{handleImageClick()}}
                src={ imageScr }
                alt=""
                style={{
                    width: productImageExpand,
                    y: imageOffset,
                }}
            />
            <motion.div
                className="product-text-container"
                style={{
                    width: productTextExpand,
                    y: textOffset,
                }}
            >
                <div className="product-text" >
                    <h1 className="product-name">{name}</h1>
                    <p className="product-description">{description}</p>
                </div>
            </motion.div>
            <motion.div
                className="vertical-line-left"
                style={{
                    y: leftLineOffset,
                }}
            />
        </motion.div>
    )
}

export const HomeRecommendation = () => {

    const titleContainerRef = useRef(null);
    const { scrollYProgress: titleAlpha } = useScroll({
        target: titleContainerRef,
        offset: ['start end', 'end start']
    })
    const titleOffset = useTransform(useTransform(titleAlpha, [0, 1], [-30, 15]), (v) => `${v}vh`)
    const topCirclesOffset = useTransform(useTransform(titleAlpha, [0, 1], [-25, 15]), (v) => `${v}vh`)
    const bottomCirclesOffset = useTransform(useTransform(titleAlpha, [0, 1], [-25, 25]), (v) => `${v}vh`)

    const [productIds, setProductsIds] = useState()

    useEffect(() => {
        fetch(
            process.env.REACT_APP_BACKEND_URL + '/api/recommend/',
            { method: "GET" }
        )
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setProductsIds(data.map((obj) => {return obj.productId}))
            console.log(data)
            console.log(productIds)
        })
        .catch((error) => {
        })        
    }, [])
            
            return (
                <div className="HomeRecommendation">
            <div className="title-container"  ref={titleContainerRef}>
                <motion.img
                    src={ scrolling_circles }
                    alt=""
                    className='top-scrolling-circles'
                    style={{y: topCirclesOffset}}
                />
                <motion.img 
                    src={ recommend_title }
                    alt=""
                    className="recommend_title"
                    style={{y: titleOffset}}
                />
                <motion.img
                    src={ scrolling_circles }
                    alt=""
                    className='bottom-scrolling-circles'
                    style={{y: bottomCirclesOffset}}
                />
            </div>
            <div className="lower-part-container">
                <div className="products-container">
                    {
                        Array.isArray(productIds) && productIds.length > 0 ?
                            <ProductItemLeft  id={productIds[0]}/>
                        : null
                    }
                    {
                        Array.isArray(productIds) && productIds.length > 1 ?
                            <ProductItemRight  id={productIds[1]}/>
                        : null
                    }
                    {
    
                        Array.isArray(productIds) && productIds.length > 2 ?
                            <ProductItemLeft  id={productIds[2]}/>
                        : null
                    }
                    {
    
                        Array.isArray(productIds) && productIds.length > 3 ?
                            <ProductItemRight  id={productIds[3]}/>
                        : null
                    }
                    {
    
                        Array.isArray(productIds) && productIds.length > 4 ?
                            <ProductItemLeft  id={productIds[4]}/>
                        : null
                    }
                    {
                        Array.isArray(productIds) && productIds.length > 5 ?
                            <ProductItemRight  id={productIds[5]}/>
                        : null
                    }
                </div>
                <div className="vertical-line"/>
            </div>
        </div>
    )
}
