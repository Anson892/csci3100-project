import React,{useState} from 'react';
import './ProductInfo.css'
import { Navbar } from '../../Components/Navbar/Navbar';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../../Components/ProductCard/ProductCard';
import ProductImage from '../../Assets/Images/ProductImage.jpg'
import add_icon from '../../Assets/Icons/add-icon.svg'
import minus_icon from '../../Assets/Icons/minus-icon.svg'
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

const CommentContainer = () => {

    return(
        <div>
            
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
                    <button onClick={AddToCart} className='AddToCartButton' >
                        <p> Add To Cart </p>
                    </button>
            </div>
        </div>
    )
}

const Product = () => {
    const [RightContent, setRightContent]=useState(false);
    const InfoButton_clicked = () =>{
        setRightContent(true);
    }
    const CommentButton_clicked = () =>{
        setRightContent(false);
    }


    return(
        <div className='ProductContainer'>
            <div className='ImgContainer'>
            <div className='ImgListContainer'>
                <img src={ProductImage} alt=''></img>
                <img src={ProductImage} alt=''></img>
                <img src={ProductImage} alt=''></img>
                <img src={ProductImage} alt=''></img>
                <img src={ProductImage} alt=''></img>
            </div>
                <img src={ProductImage} alt=''></img>
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
