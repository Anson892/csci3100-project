import React from 'react'
import './AdminPanel.css'
import { useState } from 'react'
import logo from '../../Assets/logo.svg'
import { useNavigate } from 'react-router-dom'
import { SubmitButton } from '../../Components/Forms/SumbitButton/SubmitButton'
import { AddUserForm } from '../../Components/Forms/AddUserForm/AddUserForm'
import { DeleteUserForm } from '../../Components/Forms/DeleteUserForm/DeleteUserForm'
import { AddProductForm } from '../../Components/Forms/AddProductForm/AddProductForm'
import { DeleteProductForm } from '../../Components/Forms/DeleteProductForm/DeleteProductForm'
import { EditProductForm } from '../../Components/Forms/EditProductForm/EditProductForm'

export const AdminPanel = () => {

    const [currentForm, setCurrentForm] = useState();

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate({pathname: '/'})
    }

    const renderCurrentForm = () => {
        switch (currentForm) {
            case "addUser":
                return <AddUserForm/>
            case "deleteUser":
                return <DeleteUserForm/>
            case "addProduct":
                return <AddProductForm/>
            case "deleteProduct":
                return <DeleteProductForm/>
            case "editProduct":
                return <EditProductForm/>
            default:
                return null
        }
    }

    return (
        <div className="admin-panel">
            <div className="function-list">
                <div className="header">
                    <img src= { logo } alt="" />
                </div>
                <ul>
                    <li onClick={() => setCurrentForm("addUser")}>Add User</li>
                    <li onClick={() => setCurrentForm("deleteUser")}>Delete User</li>
                    <li onClick={() => setCurrentForm("addProduct")}>Add Product</li>
                    <li onClick={() => setCurrentForm("deleteProduct")}>Delete Product</li>
                    <li onClick={() => setCurrentForm("editProduct")}>Edit Product</li>
                </ul>
            </div>
            <div className="main-window">
                {renderCurrentForm()}
            </div>
            <div className="logout-button">
                <SubmitButton onClick={handleLogout}>Logout</SubmitButton>
            </div>
            
        </div>
    )
}
