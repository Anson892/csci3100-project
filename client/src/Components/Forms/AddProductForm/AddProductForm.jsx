import React from 'react'
import './AddProductForm.css'
import { useState } from 'react'
import { TextInput } from '../TextInput/TextInput'
import { TextAreaInput } from '../TextAreaInput/TextAreaInput'
import { SubmitButton } from '../SubmitButton/SubmitButton'


export const AddProductForm = () => {

    const [name, setName] = useState();
    const [quantity, setQuantity] = useState();
    const [originalPrice, setOriginalPrice] = useState();
    const [discountPrice, setDiscountPrice] = useState();
    const [description, setDescription] = useState();

    const handleSubmit = () => {
        return
    }

    return (
        <div className="add-product-form">
            <h1>Add Product</h1>
            <div className="first-input-row">
                <TextInput type="text" onChange={(e)=>{setName(e.target.value)}}>Name</TextInput>
                <TextInput type="text" onChange={(e)=>{setQuantity(e.target.value)}}>Quantity</TextInput>
            </div>
            <div className="second-input-row">
                <TextInput type="text" onChange={(e)=>{setOriginalPrice(e.target.value)}}>Original Price</TextInput>
                <TextInput type="text" onChange={(e)=>{setDiscountPrice(e.target.value)}}>Discount Price</TextInput>
            </div>
            <TextAreaInput onChange={(e)=>{setDescription(e.target.value)}}>Description</TextAreaInput>
            <div className="form-button">
                <SubmitButton onClick={handleSubmit}>Add Product</SubmitButton>
            </div>
        </div>
    )
}
