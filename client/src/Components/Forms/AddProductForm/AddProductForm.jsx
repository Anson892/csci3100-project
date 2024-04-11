import React from 'react'
import './AddProductForm.css'
import { useState } from 'react'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { TextInput } from '../TextInput/TextInput'
import { TextAreaInput } from '../TextAreaInput/TextAreaInput'
import { SubmitButton } from '../SubmitButton/SubmitButton'
import { ImageInput } from '../ImageInput/ImageInput'
import { MultipleImagesInput } from '../MultipleImagesInput/MultipleImagesInput'
import { DropDownMenu } from '../DropDownMenu/DropDownMenu'

export const AddProductForm = () => {

    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState();
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState();
    const [description, setDescription] = useState();
    const [mainImage, setMainImage] = useState();
    const [subImages, setSubImages] = useState([]);

    const [isNameEmpty, setIsNameEmpty] = useState(false);
    const [isCategoryEmpty, setIsCategoryEmpty] = useState(false);
    const [isPriceEmpty, setIsPriceEmpty] = useState(false);
    const [isMainImageEmpty, setIsMainImageEmpty] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = () => {
        name == "" ?
            setIsNameEmpty(true)
        :
            setIsNameEmpty(false)
        category == "" ?
            setIsCategoryEmpty(true)
        :
            setIsCategoryEmpty(false)
        price == "" ?
            setIsPriceEmpty(true)
        :
            setIsPriceEmpty(false)
        mainImage == undefined ?
            setIsMainImageEmpty(true)
        :
            setIsMainImageEmpty(false)

        if (!isNameEmpty && !isPriceEmpty && !isCategoryEmpty) {
            const formData = new FormData();
            const files = [mainImage].concat(subImages.slice(0, 4))
            console.log(files)
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
            const date = new Date;
            navigate({
                pathname: '/admin/product',
                search: '?keyword=%' +
                        '&category=' +
                        '&time=' + date.getTime()
            });
        }
    }

    return (
        <div className="add-product-form">
            <h1>Add Product</h1>
            <TextInput type="text" onChange={(e)=>{setName(e.target.value)}}>Name</TextInput>
            {isNameEmpty?
                <p className="alert-text">* Name is empty.</p>
            :
                null
            }
            <div className="first-input-row">
                <TextInput type="text" onChange={(e)=>{setCategory(e.target.value)}}>Category</TextInput>
                <TextInput type="text" onChange={(e)=>{setQuantity(e.target.value)}}>Quantity</TextInput>
            </div>
            {isCategoryEmpty?
                <p className="alert-text">* Category is empty.</p>
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
