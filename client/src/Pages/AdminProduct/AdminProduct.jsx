import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import './AdminProduct.css'
import logo from '../../Assets/logo.svg'
import InfiniteScroll from 'react-infinite-scroll-component'
import edit_icon from '../../Assets/Icons/edit_icon.svg'
import remove_icon from '../../Assets/Icons/remove_icon.svg'
import close_icon from '../../Assets/Icons/close_icon.svg'
import search_icon_gray from '../../Assets/Icons/search_icon_gray.svg'
import {SubmitButton} from '../../Components/Forms/SubmitButton/SubmitButton'
import { AddProductForm } from '../../Components/Forms/AddProductForm/AddProductForm'
import { EditProductForm } from '../../Components/Forms/EditProductForm/EditProductForm'
import { AuthContext } from '../../Context/AuthContext';

const ProductInfo = ({ id, handleEditProduct, handleDeleteProduct }) => {

    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState("");
    const [imageScr, setImageScr] = useState("");
    
    useEffect(() => {
        fetch('http://localhost:8080/api/product/'+ id, {
            method: "GET"
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setName(data.data.name);
            setQuantity(data.data.stock);
            setCategory(data.data.category);
            setPrice("$" + String(data.data.price));
            setDiscount(String(data.data.discount * 100) + "%");
            if (data.data.product_images.length > 0) {
                setImageScr('http://localhost:8080/images/' + data.data.product_images[0].path);
            }
        })
    }, [id])

    return (
        <tr>
            <th><img className='main-image' src={imageScr} alt="" /></th>
            <th>{name}</th>
            <th>{quantity}</th>
            <th>{category}</th>
            <th>{price}</th>
            <th>{discount}</th>
            <th><img
                onClick={()=>{handleEditProduct(id)}}
                className='remove-button'
                src={edit_icon}
                alt=""
            /></th>
            <th><img
                onClick={()=>{handleDeleteProduct(id)}}
                className='remove-button'
                src={remove_icon}
                alt=""
            /></th>
        </tr>
    )
}

export const AdminProduct = () => {

    const { dispatch } = useContext(AuthContext)

    const handleLogout = () => {
        localStorage.removeItem('userAuth')
        dispatch({type:'LOGOUT'})
        navigate({
            pathname: '/'
        })
        window.scrollTo({ top: (0, 0), behavior: "instant" });
    }

    const [productIds, setProductIds] = useState();

    const [hasMore, setHasMore] = useState(true)

    const [isShowAddProductForm, setIsShowAddProductForm] = useState(false)
    const [isShowEditProductForm, setIsShowEditProductForm] = useState(false)
    const [editProductId, setEditProductId] = useState(-1)
    const [pointer, setPointer] = useState(0)
    const [categoryList, setCategoryList] = useState([]);

    const navigate = useNavigate();
    const handleUser = () => {
        navigate({
            pathname: '/admin/user'
        })
    }

    const handleSearch = () => {
        const date = new Date;
        navigate({
            pathname: '/admin/product',
            search: '?keyword=' + keyword +
                    '&category=' + category +
                    '&time=' + date.getTime()
        });
    }

    const handleEditProduct = (productId) => {
        setIsShowEditProductForm(true);
        setIsShowAddProductForm(false);
        setEditProductId(productId);
    }

    const handleDeleteProduct = (productId) => {
        setIsShowEditProductForm(false);
        setIsShowAddProductForm(false);
        fetch("http://localhost:8080/api/product/" + productId, {
            method: "DELETE"
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            if (data.message != undefined) {
                alert(data.message);
                handleSearch();
            }
            else if (data.error != undefined) {
                alert(data.error);
            }
        })
        .catch((error) => {
            console.error(error);
        })
    }

    const handleClose = () => {
        setIsShowEditProductForm(false);
        setIsShowAddProductForm(false);
    }

    // Search parameters
    const [searchParams, setSearchParams]= useSearchParams();
    const keywordParam = searchParams.get('keyword');
    const categoryParam = searchParams.get('category');
    const [keyword, setKeyword] = useState(keywordParam != "%" ? keywordParam : "")
    const [category, setCategory] = useState(categoryParam)

    // Initialize search
    const initSearch = async () => {
        setPointer(0);
        await fetch("http://localhost:8080/api/product/search",{
            method : 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "searchpointer": pointer,
                "name": keywordParam,
                "category": categoryParam,
                "orderby": 'price',
                "order": 'DESC',
                "minprice": 1,
                "maxprice": 1000000,
                "minrating": 0,
                "maxrating": 5
            })
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setProductIds(data)
            setPointer(pointer + 1)
            if (data.length < 15) setHasMore(false)
        })
        .catch((error) => {
            console.error(error);
        })
    }
    
    // Fetch more data
    const fetchMoreData = () => {
        setTimeout(() => {
            fetch("http://localhost:8080/api/product/search" ,{
                method : 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "searchpointer": pointer,
                    "name": keywordParam == "" ? "%" : keywordParam,
                    "category": categoryParam,
                    "orderby": 'price',
                    "order": 'DESC',
                    "minprice": 1,
                    "maxprice": 1000000,
                    "minrating": 0,
                    "maxrating": 5
                })
            })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setProductIds(productIds.concat(data));    
                setPointer(pointer + 1)  
                if (data.length < 5) setHasMore(false)
            })
        }, 500);
    }

    // Init category list
    const initCategoryList = () => {
        fetch("http://localhost:8080/api/product/category")
        .then((res) => res.json())
        .then((data) => {
            setCategoryList(data);
        })
        .catch((err) => console.log(err));
    }

    // When Start
    useEffect(() => {
        initSearch();
        initCategoryList();
    }, [])

    return (
        <div className="admin-user">
            <div className="left-panel">
                <img className="logo" src={logo} alt="" />
                <ul>
                    <li onClick={handleUser} style={{cursor: 'pointer'}}>User</li>
                    <li>Product</li>
                </ul>
                <SubmitButton onClick={handleLogout}>Logout</SubmitButton>
            </div>
            <div className="right-panel">
                <div className="search-bar">
                    <img onClick={()=>{handleSearch()}} src={search_icon_gray} alt="" />
                    <input onChange={(e)=>{setKeyword(e.target.value)}} type="text" value={keyword}/>
                </div>
                <div className="filter">
                    <select onChange={(e)=>{setCategory(e.target.value)}} name="category" value={category}>
                        <option value="%">All</option>
                        {categoryList.map((item, index) => {
                                return <option value={item}>{item}</option>
                            })
                        }
                    </select>
                </div>
                <SubmitButton onClick={()=>{
                    setIsShowAddProductForm(true);
                    setIsShowEditProductForm(false)
                }}>
                    Add Product
                </SubmitButton>
                <div className="user-table">
                    {productIds != undefined?
                        (
                            <InfiniteScroll
                                dataLength={productIds.length}
                                next={fetchMoreData}
                                hasMore={hasMore}
                                loader={<div className='loader'>Loading ...</div>}
                                endMessage={<div className='end-message'>- End -</div>}
                            >
                                <table>
                                    <thead>
                                        <tr>
                                            <th>MainImage</th>
                                            <th>Name</th>
                                            <th>Quantity</th>
                                            <th>Category</th>
                                            <th>Price</th>
                                            <th>Discount</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productIds.map((item, index)=>{
                                            return (
                                                <ProductInfo
                                                id={item}
                                                handleEditProduct={handleEditProduct}
                                                handleDeleteProduct={handleDeleteProduct}
                                                />
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </InfiniteScroll>
                        )
                        :
                        (
                            null
                        )
                    }
                </div>
            </div>
            {isShowAddProductForm ?
            (
                <div className="add-product-form-container">
                    <img
                        onClick={()=>{handleClose()}} 
                        className="close-button"
                        src={close_icon}
                        alt=""
                    />
                    <AddProductForm/>
                </div>
            )
            :
            (
                null
            )
            }
            {isShowEditProductForm ?
            (
                <div className="edit-product-form-container">
                    <img
                        onClick={()=>{handleClose()}} 
                        className="close-button"
                        src={close_icon}
                        alt=""
                    />
                    <EditProductForm productId={editProductId} reloadFunc={handleSearch}/>
                </div>
            )
            :
            (
                null
            )
            }
        </div>
    )
}
