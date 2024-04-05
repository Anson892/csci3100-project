import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
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

export const AdminProduct = () => {

    const { dispatch } = useContext(AuthContext)
    const logout = () => {
        localStorage.removeItem('userAuth')
        dispatch({type:'LOGOUT'})
    }

    const [dataSource, setDataSource] = useState(
        Array(10).fill({
            username: "ethan_smith",
            firstName: "Ethan", 
            lastName: "Smith",
            phoneNumber: "12345678",
            address: "Room 3, 26 Floor, Random Building, Random Street, Random Town, Random City, Random Country "
        })
    )

    const fetchMoreData = () => {
        setTimeout(() => {
            setDataSource(dataSource.concat(
                Array(10).fill({
                    username: "ethan_smith",
                    firstName: "Ethan", 
                    lastName: "Smith",
                    phoneNumber: "12345678",
                    address: "Room 3, 26 Floor, Random Building, Random Street, Random Town, Random City, Random Country "
                })
            ))
        }, 1500);
    }

    const [hasMore, setHasMore] = useState(true)

    const [isShowAddProductForm, setIsShowAddProductForm] = useState(false)
    const [isShowEditProductForm, setIsShowEditProductForm] = useState(false)
    const [editProductId, setEditProductId] = useState(-1)

    const navigate = useNavigate();
    const handleUser = () => {
        navigate({
            pathname: '/admin/user'
        })
    }

    const handleEditProduct = (productId) => {
        setIsShowEditProductForm(true);
        setIsShowAddProductForm(false);
        setEditProductId(productId);
    }

    const handleDeleteProduct = (productId) => {
        return
    }

    const handleClose = () => {
        setIsShowEditProductForm(false);
        setIsShowAddProductForm(false);
    }

    const [keyword, setKeyword] = useState("")
    const [status, setStatus] = useState("All")
    const [category, setCategory] = useState("Category1")
    
    return (
        <div className="admin-user">
            <div className="left-panel">
                <img className="logo" src={logo} alt="" />
                <ul>
                    <li onClick={handleUser} style={{cursor: 'pointer'}}>User</li>
                    <li>Product</li>
                </ul>
                <SubmitButton onClick={logout}>Logout</SubmitButton>
            </div>
            <div className="right-panel">
                <div className="search-bar">
                    <img src={search_icon_gray} alt="" />
                    <input onChange={(e)=>{setKeyword(e.target.value)}} type="text"/>
                </div>
                <div className="filter">
                    <select onChange={(e)=>{setStatus(e.target.status)} }name="status">
                        <option value="All">All</option>
                        <option value="New">New</option>
                        <option value="On Sales">On Sales</option>
                        <option value="Availble">Available</option>
                    </select>
                    <select onChange={(e)=>{setCategory(e.target.value)}} name="category">
                        <option value="Category1">Category1</option>
                        <option value="Category2">Category2</option>
                        <option value="Category3">Category3</option>
                        <option value="Category4">Category4</option>
                        <option value="Category5">Category5</option>
                        <option value="Category6">Category6</option>
                    </select>
                </div>
                <SubmitButton onClick={()=>{
                    setIsShowAddProductForm(true);
                    setIsShowEditProductForm(false)
                }}>
                    Add Product
                </SubmitButton>
                <div className="user-table">
                    <InfiniteScroll
                        dataLength={dataSource.length}
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
                                    <th>Catergory</th>
                                    <th>Price</th>
                                    <th>Discount</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataSource.map((item, index)=>{
                                    return (
                                        <tr>
                                            <th>{item.main_iamge}</th>
                                            <th>{item.name}</th>
                                            <th>{item.quantity}</th>
                                            <th>{item.catergory}</th>
                                            <th>{item.price}</th>
                                            <th>{item.discount}</th>
                                            <th><img
                                                onClick={()=>{handleEditProduct(item.id)}}
                                                className='remove-button'
                                                src={edit_icon}
                                                alt=""
                                            /></th>
                                            <th><img
                                                onClick={handleDeleteProduct(item.id)}
                                                className='remove-button'
                                                src={remove_icon}
                                                alt=""
                                            /></th>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </InfiniteScroll>
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
                    <EditProductForm productId={editProductId}/>
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
