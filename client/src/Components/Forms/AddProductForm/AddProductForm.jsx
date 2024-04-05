import React from 'react'
import './AddProductForm.css'
import { useState } from 'react'
import { TextInput } from '../TextInput/TextInput'
import { TextAreaInput } from '../TextAreaInput/TextAreaInput'
import { SubmitButton } from '../SubmitButton/SubmitButton'
import { ImageInput } from '../ImageInput/ImageInput'
import { MultipleImagesInput } from '../MultipleImagesInput/MultipleImagesInput'
import { DropDownMenu } from '../DropDownMenu/DropDownMenu'

export const AddProductForm = () => {

    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState();
    const [category, setCategory] = useState("Category1");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState();
    const [description, setDescription] = useState();
    const [mainImage, setMainImage] = useState();
    const [subImages, setSubImages] = useState([]);

    const [isNameEmpty, setIsNameEmpty] = useState(false);
    const [isPriceEmpty, setIsPriceEmpty] = useState(false);
    const [isMainImageEmpty, setIsMainImageEmpty] = useState(false);

    const handleSubmit = () => {
        name == "" ?
            setIsNameEmpty(true)
        :
            setIsNameEmpty(false)
        price == "" ?
            setIsPriceEmpty(true)
        :
            setIsPriceEmpty(false)
        mainImage == undefined ?
            setIsMainImageEmpty(true)
        :
            setIsMainImageEmpty(false)

        if (!isNameEmpty && !isPriceEmpty && !isMainImageEmpty) {
            const formData = new FormData();
            const files = [mainImage].concat(subImages.slice(0, 4))
            for (let file of files) {
                formData.append('files', file);
            }
            formData.append('name', name);
            formData.append('stock', Number(quantity) ? Number(quantity) : 0);
            formData.append('category', category);
            formData.append('price', price);
            formData.append('discount', Number(discount) ? Number(discount) : 1);
            formData.append('description', description);
            fetch("http://localhost:8080/api/product/", {
                method: "POST",
                body: formData,
            })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.error != undefined) {
                    alert(data.error)
                }
                else if (data.message != undefined) {
                    alert(data.message)
                }
            })
            .catch((error) => {
                console.error(error);
            })
        }
    }

    return (
        <div className="add-product-form">
            <h1>Add Product</h1>
            <p>Category</p>
            <DropDownMenu
                items={["Category1", "Category2", "Category3", "Category4", "Category5"]}
                initial={0}
                setFucn={setCategory}
                menuHeight={"40px"}
            />
            <div className="first-input-row">
                <TextInput type="text" onChange={(e)=>{setName(e.target.value)}}>Name</TextInput>
                <TextInput type="text" onChange={(e)=>{setQuantity(e.target.value)}}>Quantity</TextInput>
            </div>
            {isNameEmpty?
                <p className="alert-text">* Name is empty.</p>
            :
                null
            }
            <div className="second-input-row">
                <TextInput type="text" onChange={(e)=>{setPrice(e.target.value)}}>Original Price</TextInput>
                <TextInput type="text" onChange={(e)=>{setDiscount(e.target.value)}}>Discount(0 to 1)</TextInput>
            </div>
            {isPriceEmpty?
                <p className="alert-text">* Price is empty.</p>
            :
                null
            }
            <ImageInput
                image={mainImage}
                setImage={setMainImage}
            >
                Main Image
            </ImageInput>
            {isMainImageEmpty?
                <p className="alert-text">* Main Image is empty.</p>
            :
                null
            }
            <MultipleImagesInput
                images={subImages}
                setImages={setSubImages}
            >
                Sub Images
            </MultipleImagesInput>
                
            <TextAreaInput onChange={(e)=>{setDescription(e.target.value)}}>Description</TextAreaInput>
            <div className="form-button">
                <SubmitButton onClick={handleSubmit}>Add Product</SubmitButton>
            </div>
        </div>
    )
}
