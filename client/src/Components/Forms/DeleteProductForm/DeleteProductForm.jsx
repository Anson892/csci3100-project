import React from 'react'
import './DeleteProductForm.css'
import { useState } from 'react'
import { TextInput } from '../TextInput/TextInput'
import { SubmitButton } from '../SumbitButton/SubmitButton'


export const DeleteProductForm = () => {

    const [productId, setProductId] = useState();

    const handleSubmit = () => {
        return
    }

    return (
        <div className="delete-product-form">
            <h1>Delete Product</h1>
            <TextInput type="text" onChange={(e)=>{setProductId(e.target.value)}}>Proudct ID</TextInput>
            <div className="form-button">
                <SubmitButton onClick={handleSubmit}>Delete Product</SubmitButton>
            </div>
        </div>
    )
}
