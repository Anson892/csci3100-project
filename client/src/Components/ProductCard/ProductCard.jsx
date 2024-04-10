import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import ProductIcon from "../../Assets/Images/ProductIcon.jpg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

export const ProductCard = ({ id }) => {
  const cardAnim = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        delay: 1.5,
        duration: 0.5,
        ease: [0.65, 0, 0.35, 1],
      },
    },
    whileHover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: [0.65, 0, 0.35, 1],
      },
    },
  };
  const url1 = "http://localhost:8080/api/product/" + id;

  const [FetchedProductName, SetFetchedProductName] = useState([]);
  const [FetchedProductPrice, SetFetchedProductPrice] = useState([]);
  const [FetchedProductDiscount, SetFetchedProductDiscount] = useState([]);
  const [FetchedProductstock, SetFetchedProductstock] = useState(0);
  const [photo0, setPhoto0] = useState("-1");

  useEffect(() => {
    if (id != -1) {
      fetch(url1, { method: "GET" })
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          SetFetchedProductName(response.data.name);
          SetFetchedProductPrice(response.data.price);
          SetFetchedProductDiscount(response.data.discount);
          SetFetchedProductstock(response.data.stock);
          if (response.data.product_images[0] != undefined)
            setPhoto0(
              "http://localhost:8080/images/" +
                response.data.product_images[0].path
            );
        });
    }
  }, [id]);

  return (
    <div>
      {id != -1 ? (
        [
          <motion.div {...cardAnim} className="ProductCardContainer">
            <Link
              to={"/product/" + id}
              onClick={() => {
                window.scrollTo({ top: (0, 0), behavior: "instant" });
              }}
            >
              <div>
                {photo0 != -1 ? (
                  <img src={photo0} alt="" />
                ) : (
                  <img src={ProductIcon} alt="" />
                )}
              </div>
            </Link>
            <div className="ProductInfoContainer">
              <div className="ProductInfoCard">
                <p className="ProductNameCard">{FetchedProductName}</p>
                <div className="ProductPriceCard">
                  <p className="CardPriceText">
                    ${FetchedProductPrice * FetchedProductDiscount}
                  </p>
                  {FetchedProductDiscount < 1 ? (
                    <p className="CardDiscountText">${FetchedProductPrice} </p>
                  ) : ( <p></p>)}
                </div>
              </div>
              {FetchedProductstock == 0 ? (
                <div className="ProductTagCard">
                  {" "}
                  <p className="out-of-stock"> Out of Stock</p>{" "}
                </div>
              ) : (
                [
                  FetchedProductDiscount < 1 ? (
                    <div className="ProductTagCard">
                      {" "}
                      <p className="on-sale"> On Sale</p>{" "}
                    </div>
                  ) : (
                    <div> </div>
                  ),
                ]
              )}
            </div>
          </motion.div>,
        ]
      ) : (
        <div></div>
      )}
    </div>
  );
};
