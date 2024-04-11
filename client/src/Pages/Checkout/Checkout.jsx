import React, { useContext, useEffect } from "react";
import { useState } from "react";
import "./Checkout.css";
import { Link } from "react-router-dom";
import { TextInput } from "../../Components/Forms/TextInput/TextInput";
import { SubmitButton } from "../../Components/Forms/SubmitButton/SubmitButton";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { usePaymentInputs } from "react-payment-inputs";

export const Checkout = () => {
  const navigate = useNavigate();
  const [Address, setAddress] = useState("");
  const [isAddressEmpty, setIsAddressEmpty] = useState(false);
  const [Receiver, setReceiver] = useState("");
  const [isReceiverEmpty, setIsReceiverEmpty] = useState(false);
  const [CardNum, setCardNum] = useState("");
  const [isCardNumLength, setIsCardNumLength] = useState(false);
  const [ExpireDate, setExpireDate] = useState("");
  const [isExpireDateInvalid, setIsExpireDateInvalid] = useState(false);
  const [CVC, setCVC] = useState("");
  const [isCVCInvalid, setIsCVCInvalid] = useState(false);
  const [PostalCode, setPostalCode] = useState("");
  const [isPostalCodeInvalid, setIsPostalCodeInvalid] = useState(false);
  const [orderId, setorderId] = useState(localStorage.getItem("orderId")); // !!!!!! To be set by global or useparams !!!!!!
  const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps } =
    usePaymentInputs();

  const { userAuth } = useContext(AuthContext);

  //fetch user info
  useEffect(() => {
    fetch("http://localhost:8080/api/info/checkout/" + userAuth.id, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setReceiver(data.Receiver);
        setAddress(data.Address);
      });
  }, []);

  const handelchangeaddress = (e) => {
    e.preventDefault();
    setAddress(e.target.value);
  };

  const handleChangeCardNumber = (e) => {
    setCardNum(
      e.target.value
        .replace(/[^\dA-Z]/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
    );
  };
  const handleChangeExpiryDate = (e) => {
    setExpireDate(e.target.value);
  };
  const handleChangeCVC = (e) => {
    setCVC(e.target.value);
  };

  const handlechangereceiver = (e) => {
    e.preventDefault();
    setReceiver(e.target.value);
  };

  const handleChangePostalCode = (e) => {
    setPostalCode(      
      e.target.value
      .replace(/[^\dA-Z]/g, "")
      .trim()
    );
  };

  const clearCart = async () => {
    const url = "http://localhost:8080/api/cart/clear/";
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userAuth.id,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        console.log(JSON.stringify(response.message));
      });
  };

  const handleSubmit = () => {
    if (Address == "") {
      setIsAddressEmpty(true);
    }
    else {
      setIsAddressEmpty(false);
    }

    if (Receiver == "") {
      setIsReceiverEmpty(true);
    }
    else {
      setIsReceiverEmpty(false);
    }

    if (CardNum.length != 19) {
      setIsCardNumLength(true);
    }
    else {
      setIsCardNumLength(false);
    }

    if (Number(PostalCode.length) != 5) {
      setIsPostalCodeInvalid(true);
    }
    else {
      setIsPostalCodeInvalid(false);
    }

    if (
      !(meta.isTouched && meta.error) &&
      !isAddressEmpty &&
      !isReceiverEmpty &&
      !isCardNumLength &&
      !isPostalCodeInvalid
    ) {
      const CheckoutUrl = "http://localhost:8080/api/order/placeorder";
      fetch(CheckoutUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderId,
          paymentMethod: "Credit Card",
          receiver: Receiver,
          address: Address,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          console.log(JSON.stringify(response));
          alert(JSON.stringify(response.message));
        });

      alert("Ordered!");

      // clear local storage
      localStorage.removeItem("orderId");
      // clear cart
      clearCart();

      navigate({
        pathname: "/shopping-cart",
      });
    } else {
      console.log(Number(CardNum.length));
    }
  };

  const handleCancelorder = () => {
    const cancelurl = "http://localhost:8080/api/order/delete/" + orderId;
    fetch(cancelurl, {
      method: "DELETE",
    })
      .then((res) => {
        return res.json;
      })
      .then((response) => {
        console.log(JSON.stringify(response.message));
      });

    {
      window.scrollTo({ top: (0, 0), behavior: "instant" });
    }
  };

  return (
    <div>
      <Link to={"/shopping-cart"} onClick={handleCancelorder}>
        <p className="CancelOrderText">《Cancel Order</p>
      </Link>
      <div className="DeliveryContainer">
        <p className="DeliveryText">Delivery</p>
        <div className="DeliverAddressContainer">
          <TextInput
            type="text"
            defaultText={Address}
            onChange={handelchangeaddress}
          >
            Deliver Address
          </TextInput>
          {isAddressEmpty?
                <p className="alert-text">* Address is empty.</p>
            :
                null
            }
          <TextInput
            type="text"
            defaultText={Receiver}
            onChange={handlechangereceiver}
          >
            Receiver Name
          </TextInput>
          {isReceiverEmpty?
                <p className="alert-text">* Receiver Name is empty.</p>
            :
                null
            }
          <TextInput
            type="text"
            onChange={handleChangePostalCode}
            defaultText={PostalCode}
            maxLength="5"
          >
            Postal Code
          </TextInput>
          {isPostalCodeInvalid?
                <p className="alert-text">* Postal code is invalid.</p>
            :
                null
            }
        </div>
      </div>
      <div className="CreditCardContainer">
        <p className="CreditCardText">Credit Card</p>
        <TextInput
          type="text"
          onChange={handleChangeCardNumber}
          value={CardNum}
          maxLength="19"
        >
          Card Number
        </TextInput>
        {isCardNumLength?
                <p className="alert-text">* Card Number is invalid.</p>
            :
                null
            }
        <div className="text-input">
          <label>Expiration Date</label>
          <div className="text-input-container">
            <input
              {...getExpiryDateProps({ onChange: handleChangeExpiryDate })}
              value={ExpireDate}
              type="text"
              placeholder="MM/YY"
            />
          </div>
        </div>
        <div className="text-input">
          <label>CVC</label>
          <div className="text-input-container">
            <input
              {...getCVCProps({ onChange: handleChangeCVC })}
              value={CVC}
              type="text"
              maxLength="3"
            />
          </div>
        </div>
          
        <SubmitButton
          onClick={handleSubmit}
          children="Place Order"
        ></SubmitButton>
        {meta.isTouched && meta.error &&  <p className="alert-text">*{meta.error}</p>}
      </div>
    </div>
  );
};
