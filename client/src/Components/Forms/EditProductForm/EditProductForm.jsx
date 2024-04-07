import React, { useEffect } from 'react'
import './EditProductForm.css'
import { useState } from 'react'
import { TextInput } from '../TextInput/TextInput'
import { TextAreaInput } from '../TextAreaInput/TextAreaInput'
import { SubmitButton } from '../SubmitButton/SubmitButton'
import { DropDownMenu } from '../DropDownMenu/DropDownMenu'

export const EditProductForm = ({ productId, reloadFunc }) => {

    const [id, setId] = useState(productId);
    const [name, setName] = useState();
    const [quantity, setQuantity] = useState();
    const [category, setCategory] = useState("Category1");
    const [price, setPrice] = useState();
    const [discount, setDiscount] = useState();
    const [description, setDescription] = useState();

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
            setPrice(data.data.price);
            setDiscount(data.data.discount);
            setDescription(data.data.description);
        })
    }, [])

    const handleSubmit = (reloadFunc) => {
            const formData = new FormData();
            formData.append('id', id);
            formData.append('name', name);
            formData.append('stock', Number(quantity) ? Number(quantity) : 0);
            formData.append('category', category);
            formData.append('price', price);
            formData.append('discount', Number(discount) ? Number(discount) : 1);
            formData.append('description', description);
            fetch("http://localhost:8080/api/product/update", {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    "id": id,
                    "name": name,
                    "stock": Number(quantity) ? Number(quantity) : 0,
                    "category": category,
                    "price": price,
                    'discount': Number(discount) ? Number(discount) : 1,
                    "description": description
                })
            })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
            })
            .catch((error) => {
                console.error(error);
            })
            reloadFunc();
    }

    return (
        <div className="edit-product-form">
            <h1>Edit Product</h1>
            <p>Category</p>
            <DropDownMenu
                items={["Category1", "Category2", "Category3", "Category4", "Category5"]}
                initial={0}
                setFucn={setCategory}
                menuHeight={"40px"}
            />
            <div className="first-input-row">
                <TextInput type="text" onChange={(e)=>{setName(e.target.value)}} defaultText={name}>Name</TextInput>
                <TextInput type="text" onChange={(e)=>{setQuantity(e.target.value)}} defaultText={quantity}>Quantity</TextInput>
            </div>
            <div className="second-input-row">
                <TextInput type="text" onChange={(e)=>{setPrice(e.target.value)}} defaultText={price}>Price</TextInput>
                <TextInput type="text" onChange={(e)=>{setDiscount(e.target.value)}} defaultText={discount}>Discount</TextInput>
            </div>
            <TextAreaInput onChange={(e)=>{setDescription(e.target.value)}} defaultText={description}>Description</TextAreaInput>
            <div className="form-button">
                <SubmitButton onClick={() => {handleSubmit(reloadFunc)}}>Edit Product</SubmitButton>
            </div>
        </div>
    )
}
