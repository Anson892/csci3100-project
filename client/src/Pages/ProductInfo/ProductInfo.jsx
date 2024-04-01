import React,{useEffect, useState} from 'react';
import './ProductInfo.css'
import { Navbar } from '../../Components/Navbar/Navbar';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../../Components/ProductCard/ProductCard';
import ProductImage from '../../Assets/Images/ProductImage.jpg'
import ProductImage1 from '../../Assets/Images/ProductImage1.jpg'
import ProductImage2 from '../../Assets/Images/ProductImage2.jpg'
import ProductImage3 from '../../Assets/Images/ProductImage3.jpg'
import ProductImage4 from '../../Assets/Images/ProductImage4.jpg'
import add_icon from '../../Assets/Icons/add-icon.svg'
import minus_icon from '../../Assets/Icons/minus-icon.svg'
import star_filled from '../../Assets/Icons/star_filled.svg'
import star_empty from '../../Assets/Icons/star_empty.svg'
import small_star_filled from '../../Assets/Icons/small_star_filled.svg'
import small_star_empty from '../../Assets/Icons/small_star_empty.svg'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';



const Recommendation = () => {
    return (
            <div className='RecommendationContainer'>
                <p className='RecommendationText'>Recommendation</p>
                <div><ProductCard/></div>
                <div><ProductCard/></div>
                <div><ProductCard/></div>
                <div><ProductCard/></div>
                <div><ProductCard/></div>
            </div>
    )
}

const StarFilled = () => {
    return (
        <div>
            <img src={star_filled} alt=''></img>
        </div>
    )
}

const StarEmpty = () => {
    return (
        <div>
            <img src={star_empty} alt=''></img>
        </div>
    )
}

const SmallStarEmpty = () => {
    return (
        <div>
            <img src={small_star_empty} alt=''></img>
        </div>
    )
}

const SmallStarFilled = () => {
    return (
        <div>
            <img src={small_star_filled} alt=''></img>
        </div>
    )
}

const StarProgressBar = ({number,count,percent}) => {
    percent = percent.toFixed(0)
    console.log(typeof(percent), percent)
    const [Width,SetWidth] = useState(0);
    console.log(typeof(Width), Width)

    useEffect(()=>{
        SetWidth(percent+'%')
    }, [percent])


    return(
        <div className='CommentProgressBarContainer'>
            <p className='CommentProgressBarFirstText'>{number} STAR </p>
            <div className='CommentProgressBarMax'>
                <div className='CommentProgressBar'style={{width: Width}} role="progressbar"></div>
            </div>
            <p className='CommentProgressBarSecondText'>{count}</p>
        </div>
    )
}

const SmallStar = ({smallStarCount,requirement}) => {
    return(
        <div>
        { smallStarCount > requirement  ?  <SmallStarFilled/> : <SmallStarEmpty/>}
        </div>
    )
}

function formatFloat (source, position){
    return Math.round(source*Math.pow(10, position))/Math.pow(10,position);
}

const CommentBox = ({userID,text,stars})=>{

    return(
        <div className='Comment'>
            <p className='SmallCommentText'>{text}</p>
            <div className='SmallCommentStarContainer'>
                <SmallStar smallStarCount = {stars} requirement='0'/>
                <SmallStar smallStarCount = {stars} requirement='1'/>
                <SmallStar smallStarCount = {stars} requirement='2'/>
                <SmallStar smallStarCount = {stars} requirement='3'/>
                <SmallStar smallStarCount = {stars} requirement='4'/>
            </div>
            <p className='SmallCommentUserId'>{userID}</p>
        </div>
    )
}

const CommentContainer = ({id}) => {
    const { productId } = useParams();
    const url2 = 'http://localhost:8080/api/comment/id/'+ productId;
    const [Count1, setCount1] = useState(0)
    const [Count2, setCount2] = useState(0)
    const [Count3, setCount3] = useState(0)
    const [Count4, setCount4] = useState(0)
    const [Count5, setCount5] = useState(0)


    fetch(url2,{method : 'GET'})
        .then((res) => {
            return res.json();
        })
        .then( (response) => {
            setCount1(+response.five_star);
            setCount2(+response.four_star);
            setCount3(+response.three_star);
            setCount4(+response.two_star);
            setCount5(+response.one_star);
        })
        

    const Star = ({requirement}) => {
        return(
            <div>
            { StarNum > requirement  ?  <StarFilled/> : <StarEmpty/>}
            </div>
        )
    }

    const [dataSource, setDataSource] =useState(Array.from({length:12}))

    const fetchMoreData = () =>{
        setTimeout(() => {
            setDataSource(dataSource.concat(Array.from({length:8})))
        }, 500);
    }

    const [hasMore, setHasMore] = useState(true);

    const [CommentContent, setCommentContent] = useState ("Lorem ipsum dolor sit amet consectetur. Vitae sapien facilisi enim diam quis ultricies turpis. Fames mus adipiscing neque tempor ridiculus. Dolor natoque  elementum mi penatibus scelerisque. Scelerisque augue cras")

    const total = Count1+Count2+Count3+Count4+Count5;
    const StarNum = ((Count5+Count4*2+Count3*3+Count2*4+Count1*5)/total).toFixed(1);

    return(
        <div className='CommentContainer'>
            <p className='StarText'>{StarNum}</p>
            <div className='StarContainer'>
                <Star requirement = '0'/>
                <Star requirement = '1'/>
                <Star requirement = '2'/>
                <Star requirement = '3'/>
                <Star requirement = '4'/>
            </div>
            <div className='CommentSummaryContainer'>
                <StarProgressBar number = '5' count = {Count1} percent = {Count1/total*100}/>
                <StarProgressBar number = '4' count = {Count2} percent = {Count2/total*100}/>
                <StarProgressBar number = '3' count = {Count3} percent = {Count3/total*100}/>
                <StarProgressBar number = '2' count = {Count4} percent = {Count4/total*100}/>
                <StarProgressBar number = '1' count = {Count5} percent = {Count5/total*100}/>
            </div>
            <p className='CommentNumber'>{total} COMMENTS</p>
            <InfiniteScroll
            className='CommentListContainer'
            dataLength={dataSource.length} 
            next={fetchMoreData} 
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            height = {279}
            >
                {dataSource.map((item,index)=>{
                    return (
                        <div><CommentBox userID="#11" text = "This is a Comment" stars = '3'/></div>
                    )
                })}
            </InfiniteScroll>
        </div> 
    )
}

const InfoContainer = ({name,price,discount,stock,description,id}) => {
    const AddToCart = () => {
        alert( "Added! ");
    }
    const [count, setCount]=useState(0);
    const decrement = () => {
        if( count > 0)
        setCount(count-1);
    };
    const increment = () => {
        setCount(count+1);
    };

    return(
        <div className='InfoContainer'  >
                { (stock == 0 )
                    ? (<div className='ProductTag1'> <p> Out of Stock</p> </div> )
                    : (<div className='ProductTag'> <p> On Sale</p> </div>)
                }
            <div><p className='ProductName'>{name}</p></div>
            <div className='PriceContainer'>
            <p className='ProductIDText'>ProductID#{id}</p>
                <div>
                <p className='PriceText'>${price}</p>
                { (discount<1)
                    ? (<p className='DiscountText'>${price*discount} </p> )
                    : (<div> </div> )
                }
                </div>
            </div>
            <p className='ProductDetail'>
                {description}
            </p>
            <div className='ProductAmountContainer'>

                <button>
                    <img className = 'ProductAmountContainer_add' src = {add_icon} alt="add" onClick={increment}/>
                </button>
                <button>
                    <img className = 'ProductAmountContainer_minus' src = {minus_icon} alt="minus" onClick={decrement}/>
                </button>
                    <p className='ProductAmountText'>{count}</p>
            </div>
            <div>
                <Link to ={'/shopping-cart'}>
                    <button onClick={AddToCart} className='AddToCartButton' >
                        <p> Add To Cart </p>
                    </button>
                </Link>
            </div>
        </div>
    )
}

const Product = ({name,price,discount,stock,description,id}) => {
    const [RightContent, setRightContent]=useState(true);
    const InfoButton_clicked = () =>{
        setRightContent(true);
    }

    const CommentButton_clicked = () =>{
        setRightContent(false);
    }
    const [ProductImageSelected, setProductImageSelected]=useState(ProductImage);
    const photo_clicked = ( ) => {
        setProductImageSelected(ProductImage);
    };
    const photo_clicked1 = ( ) => {
        setProductImageSelected(ProductImage1);
    };
    const photo_clicked2 = ( ) => {
        setProductImageSelected(ProductImage2);
    };
    const photo_clicked3 = ( ) => {
        setProductImageSelected(ProductImage3);
    };
    const photo_clicked4 = ( ) => {
        setProductImageSelected(ProductImage4);
    };

    return(
        <div className='ProductContainer'>
            <div className='ImgContainer'>
            <div className='ImgListContainer'>
                <button onClick={photo_clicked} ><img src={ProductImage} alt=''></img> </button>
                <button onClick={photo_clicked1} ><img src={ProductImage1} alt=''></img> </button>
                <button onClick={photo_clicked2} ><img src={ProductImage2} alt=''></img> </button>
                <button onClick={photo_clicked3} ><img src={ProductImage3} alt=''></img> </button>
                <button onClick={photo_clicked4} ><img src={ProductImage4} alt=''></img> </button>
            </div>
                <img src={ProductImageSelected} alt=''></img>
            </div>
            <div className='RightContainer'>
                <button onClick= {InfoButton_clicked} className='InfoButton'>
                    <p> Info </p>
                </button>
                <button onClick= {CommentButton_clicked} className='CommentButton'>
                    <p> Comment </p>
                </button>
                <div>
                { RightContent ?  <InfoContainer name={name} price={price} discount={discount} stock={stock} description={description} id = {id}></InfoContainer> : <CommentContainer id = {id} ></CommentContainer>}
                </div>
            </div>
        </div>
    )

}

export const ProductInfo = () => {
    const { productId } = useParams();
    const [FetchedProductName,SetFetchedProductName] =useState([])
    const [FetchedProductPrice,SetFetchedProductPrice] =useState([])
    const [FetchedProductDiscount,SetFetchedProductDiscount] =useState([])
    const [FetchedProductstock,SetFetchedProductstock] =useState([])
    const [FetchedProductdescription,SetFetchedProductdescription] =useState([])
    const url1 = 'http://localhost:8080/api/product/'+ productId;

    fetch(url1,{method : 'GET'})
        .then((res) => {
            return res.json();
        })
        .then( (response) => {
            SetFetchedProductName(response.data.name);
            SetFetchedProductPrice(response.data.price);
            SetFetchedProductDiscount(response.data.discount);
            SetFetchedProductstock(response.data.stock);
            SetFetchedProductdescription(response.data.description);
        })
        
        // console.log(FetchedProductName);
        // console.log(FetchedProductPrice);
        // console.log(FetchedProductDiscount);
        // console.log(FetchedProductstock);
        // console.log(FetchedProductdescription);

    return (
        <div>
            <Navbar/>
            <div className='MainContainer'>
            <Product
                name = {FetchedProductName}
                price = {FetchedProductPrice}
                discount = {FetchedProductDiscount}
                stock = {FetchedProductstock}
                description = {FetchedProductdescription}
                id = {productId}
            ></Product>
            <div className="horizon"></div>
            <Recommendation/>
            </div>
            <data></data>
        </div>
    )
}
