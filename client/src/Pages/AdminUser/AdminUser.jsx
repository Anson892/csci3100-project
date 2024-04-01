import React, { useState } from 'react'
import './AdminUser.css'
import logo from '../../Assets/logo.svg'
import InfiniteScroll from 'react-infinite-scroll-component'
import remove_icon from '../../Assets/Icons/remove_icon.svg'
import close_icon from '../../Assets/Icons/close_icon.svg'
import {SubmitButton} from '../../Components/Forms/SubmitButton/SubmitButton'
import { AddUserForm } from '../../Components/Forms/AddUserForm/AddUserForm'
import { useNavigate } from 'react-router-dom'

export const AdminUser = () => {

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

    const [isShowAddUserForm, setIsShowAddUserForm] = useState(false)

    const navigate = useNavigate();
    const handleProduct = (username) => {
        navigate({
            pathname: '/admin/product'
        })
    }

    const handleDeleteUser = (username) => {
        return
    }

    
    return (
        <div className="admin-user">
            <div className="left-panel">
                <img className="logo" src={logo} alt="" />
                <ul>
                    <li>User</li>
                    <li onClick={handleProduct} style={{cursor: 'pointer'}}>Product</li>
                </ul>
                <SubmitButton>Logout</SubmitButton>
            </div>
            <div className="right-panel">
                <SubmitButton onClick={()=>{setIsShowAddUserForm(true)}}>Add User</SubmitButton>
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
                                    <th>Username</th>
                                    <th>FirstName</th>
                                    <th>LastName</th>
                                    <th>PhoneNumber</th>
                                    <th>Address</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataSource.map((item, index)=>{
                                    return (
                                        <tr>
                                            <th>{item.username}</th>
                                            <th>{item.firstName}</th>
                                            <th>{item.lastName}</th>
                                            <th>{item.phoneNumber}</th>
                                            <th>{item.address}</th>
                                            <th><img
                                                onClick={handleDeleteUser(item.username)}
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
            {isShowAddUserForm ?
            (
                <div className="add-user-form-container">
                    <img
                        onClick={()=>{setIsShowAddUserForm(false)}} 
                        className="close-button"
                        src={close_icon}
                        alt=""
                    />
                    <AddUserForm/>
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
