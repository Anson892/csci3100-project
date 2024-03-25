import React,{useState} from 'react';
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
    const text = percent.toString();
    const [Width,SetWidth] =useState(text+"%");
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

const CommentContainer = () => {
    const Star = ({requirement}) => {
        return(
            <div>
            { StarNum > requirement  ?  <StarFilled/> : <StarEmpty/>}
            </div>
        )
    }

    const [Count1, setCount1] = useState(8)
    const [Count2, setCount2] = useState(1)
    const [Count3, setCount3] = useState(4)
    const [Count4, setCount4] = useState(2)
    const [Count5, setCount5] = useState(1)

    const [dataSource, setDataSource] =useState(Array.from({length:12}))

    const fetchMoreData = () =>{
        setTimeout(() => {
            setDataSource(dataSource.concat(Array.from({length:8})))
        }, 500);
    }

    const [hasMore, setHasMore] = useState(true);

    
    const [CommentContent, setCommentContent] = useState ("Lorem ipsum dolor sit amet consectetur. Vitae sapien facilisi enim diam quis ultricies turpis. Fames mus adipiscing neque tempor ridiculus. Dolor natoque  elementum mi penatibus scelerisque. Scelerisque augue cras")

    const total = Count1+Count2+Count3+Count4+Count5;

    const [StarNum, setStarNum]=useState(((Count5+Count4*2+Count3*3+Count2*4+Count1*5)/total).toFixed(1));
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

const InfoContainer = () => {
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
        <div className='InfoContainer'>
            <div className='ProductTag'>
                <p>ON SALE</p>
            </div>
            <p className='ProductName'> ProductName</p>
            <p className='ProductIDText'>ProductID#1111</p>
            <div className='PriceContainer'>
                <p className='PriceText'>$30 </p>
                <p className='DiscountText'>$50 </p>
            </div>
            <p className='ProductDetail'>
                Lorem ipsum dolor sit amet consectetur. Risus sed lacinia aliquet pulvinar nascetur netus molestie nisi. Duis habitant cursus arcu turpis. Viverra enim malesuada eget dictumst lacus sed enim volutpat ante. At quis velit neque enim elementum nullam purus ipsum risus. Sit nunc orci dictumst habitasse. Quis potenti senectus lacus nisl massa sit orci potenti vulputate. Aliquet lobortis sit diam dui duis id lectus sed pellentesque.
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

const Product = () => {
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
                { RightContent ?  <InfoContainer/> : <CommentContainer/>}
                </div>
            </div>
        </div>
    )

}

const Hori = () => {
    return(
        <div>
            <hr className='horizon'></hr>
            <hr className='horizon'></hr>
            <hr className='horizon'></hr>
            <hr className='horizon'></hr>
            <hr className='horizon'></hr>
            <hr className='horizon'></hr>
            <hr className='horizon'></hr>
            <hr className='horizon'></hr>
            <hr className='horizon'></hr>
        </div>
    )
}

export const ProductInfo = () => {
    const { productId } = useParams();
    return (
        <div>
            <Navbar/>
            <div className='MainContainer'>
            <Product/>
            <Hori/>
            <Recommendation/>
            </div>
        </div>
    )
}
