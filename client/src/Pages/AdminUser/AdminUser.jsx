import React, { useState, useEffect, useContext } from 'react'
import './AdminUser.css'
import logo from '../../Assets/logo.svg'
import InfiniteScroll from 'react-infinite-scroll-component'
import remove_icon from '../../Assets/Icons/remove_icon.svg'
import close_icon from '../../Assets/Icons/close_icon.svg'
import {SubmitButton} from '../../Components/Forms/SubmitButton/SubmitButton'
import { AddUserForm } from '../../Components/Forms/AddUserForm/AddUserForm'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext';

export const AdminUser = () => {

    const { dispatch } = useContext(AuthContext)
    const logout = () => {
        localStorage.removeItem('userAuth')
        dispatch({type:'LOGOUT'})
        navigate({
            pathname: '/'
        })
    }

    const [isShowAddUserForm, setIsShowAddUserForm] = useState(false)

    const navigate = useNavigate();
    const handleProduct = (username) => {
        const date = new Date;
        navigate({
            pathname: '/admin/product',
            search: '?keyword=%' +
                    '&category=%' +
                    '&time=' + date.getTime()
        });
    }

    const handleDeleteUser = (username) => {
        fetch("http://localhost:8080/api/users/" + username, {
            method: 'DELETE',
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if (data.message != undefined) {
                alert(data.message);
                reloadUsers();
            }
            else if (data.error != undefined) {
                alert(data.error);
            }
        })
    }

    const [users, setUsers] = useState([]);
   
    const reloadUsers = () => {
        fetch("http://localhost:8080/api/users/", {
            method: "GET"
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            setUsers(data)
        })
        .catch((error) => {
            console.error(error);
        })
    }

    useEffect(() => {
        reloadUsers();
    }, [])
    
    return (
        <div className="admin-user">
            <div className="left-panel">
                <img className="logo" src={logo} alt="" />
                <ul>
                    <li>User</li>
                    <li onClick={handleProduct} style={{cursor: 'pointer'}}>Product</li>
                </ul>
                <SubmitButton onClick={logout}>Logout</SubmitButton>
            </div>
            <div className="right-panel">
                <SubmitButton onClick={()=>{setIsShowAddUserForm(true)}}>Add User</SubmitButton>
                <div className="user-table">
                    <table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>UserType</th>
                                <th>Username</th>
                                <th>CreatedAt</th>
                                <th>UpdatedAt</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((item, index)=>{
                                return (
                                    <tr>
                                        <th>{item.id}</th>
                                        <th>{item.userType}</th>
                                        <th>{item.username}</th>
                                        <th>{item.createdAt}</th>
                                        <th>{item.updatedAt}</th>
                                        <th><img
                                            onClick={()=>{handleDeleteUser(item.username)}}
                                            className='remove-button'
                                            src={remove_icon}
                                            alt=""
                                        /></th>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
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
                    <AddUserForm reloadFunc={reloadUsers}/>
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
