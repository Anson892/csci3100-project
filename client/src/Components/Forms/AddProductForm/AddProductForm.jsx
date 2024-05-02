import React from "react";
import "./AddProductForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput } from "../TextInput/TextInput";
import { TextAreaInput } from "../TextAreaInput/TextAreaInput";
import { SubmitButton } from "../SubmitButton/SubmitButton";
import { MultipleImagesInput } from "../MultipleImagesInput/MultipleImagesInput";

export const AddProductForm = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const [exceedLimit, setExceedLimit] = useState(false);
  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [isCategoryEmpty, setIsCategoryEmpty] = useState(false);
  const [isPriceEmpty, setIsPriceEmpty] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    /* Input validation for submitting add product form  */
    name == "" ? setIsNameEmpty(true) : setIsNameEmpty(false);
    category == "" ? setIsCategoryEmpty(true) : setIsCategoryEmpty(false);
    !price ? setIsPriceEmpty(true) : setIsPriceEmpty(false);

    /* Submit form if all inputs are valid */
    if (!name == "" && !category == "" && price) {
      // Create form data to send to the server
      const formData = new FormData();
      for (let file of images) {
        formData.append("files", file);
      }
      formData.append("name", name);
      formData.append("stock", Number(quantity) ? Number(quantity) : 0);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("discount", Number(discount) ? Number(discount) : 1);
      formData.append("description", description);

      // Send form data to the server
      fetch("http://localhost:8080/api/product/", {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          // Display message if there is an error or success
          if (data.error != undefined) {
            alert(data.error);
          } else if (data.message != undefined) {
            alert(data.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      const date = new Date();

      // Redirect to the admin panel product page
      navigate({
        pathname: "/admin/product",
        search: "?keyword=%" + "&category=" + "&time=" + date.getTime(),
      });
    }
  };

  return (
    <div className="add-product-form">
      <h1>Add Product</h1>
      <TextInput
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
      >
        Name
      </TextInput>
      {isNameEmpty ? <p className="alert-text">* Name is empty.</p> : null}
      <div className="first-input-row">
        <TextInput
          type="text"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          Category
        </TextInput>
        <TextInput
          type="number"
          onChange={(e) => {
            // Quantity validation: > 0 and integer
            if (e.target.value < 0) {
              e.target.value = 0;
            } else if (!Number.isInteger(Number(e.target.value))) {
              e.target.value = Math.floor(Number(e.target.value));
            }
            setQuantity(e.target.value);
          }}
        >
          Quantity
        </TextInput>
      </div>
      {isCategoryEmpty ? (
        <p className="alert-text">* Category is empty.</p>
      ) : null}
      <div className="second-input-row">
        <TextInput
          type="number"
          onChange={(e) => {
            // Price validation: > 0 and integer
            if (e.target.value < 0) {
              e.target.value = 0;
            } else if (!Number.isInteger(Number(e.target.value))) {
              e.target.value = Math.floor(Number(e.target.value));
            }
            setPrice(e.target.value);
          }}
        >
          Original Price
        </TextInput>
        <TextInput
          type="number"
          onChange={(e) => {
            // Discount validation: 0 to 1
            if (e.target.value < 0) {
              e.target.value = 0;
            } else if (e.target.value > 1) {
              e.target.value = 1;
            }
            setDiscount(e.target.value);
          }}
          step={0.1}
        >
          Discount(0 to 1)
        </TextInput>
      </div>
      {isPriceEmpty ? <p className="alert-text">* Price is empty.</p> : null}
      <MultipleImagesInput
        images={images}
        onChange={(e) => {
          // Image validation: <= 5 images
          if (e.target.files.length <= 5) {
            setImages([...e.target.files]);
            setExceedLimit(false);
          } else {
            setExceedLimit(true);
          }
        }}
      >
        Images
      </MultipleImagesInput>
      {exceedLimit ? (
        <p className="alert-text">* You can only upload up to 5 images.</p>
      ) : null}

      <TextAreaInput
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      >
        Description
      </TextAreaInput>
      <div className="form-button">
        <SubmitButton onClick={handleSubmit}>Add Product</SubmitButton>
      </div>
    </div>
  );
};
