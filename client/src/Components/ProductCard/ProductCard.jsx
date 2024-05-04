import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import ProductIcon from "../../Assets/Images/ProductIcon.jpg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import star_filled from '../../Assets/Icons/star_filled.svg'
import star_empty from '../../Assets/Icons/star_empty.svg'

const Star = ({progress}) => {
  return (
    <div className="CardStar" percent={Math.min(1.0, progress)}>
      <img src={star_empty} />
      <img src={star_filled} style={{clipPath: `inset(0 ${100 - progress * 100}% 0 0)`}}/>
    </div>
  )
}

const RatingStars = ({rating}) => {
  return (
    <div className="RatingStars">
      <div className="Rating">{rating.toFixed(1)}</div>
      <div className="Stars">
        <Star progress={rating}/>
        <Star progress={rating-1}/>
        <Star progress={rating-2}/>
        <Star progress={rating-3}/>
        <Star progress={rating-4}/>
      </div>
    </div>
  )
};

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
  const url1 = process.env.REACT_APP_BACKEND_URL + "/api/product/" + id;

  const [FetchedProductName, SetFetchedProductName] = useState([]);
  const [FetchedProductPrice, SetFetchedProductPrice] = useState([]);
  const [FetchedProductDiscount, SetFetchedProductDiscount] = useState([]);
  const [FetchedProductstock, SetFetchedProductstock] = useState(0);
  const [FetchedProductRating, SetFetchedProductRating] = useState(0);
  const [photo0, setPhoto0] = useState("-1");

  const fetchRating = async () => {
      const respose = await fetch(process.env.REACT_APP_BACKEND_URL + "/api/comment/id/" + id, { method: "GET" });
      const data = await respose.json();

      SetFetchedProductRating(+data.average);
  }

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
              process.env.REACT_APP_BACKEND_URL + "/images/" +
                response.data.product_images[0].path
            );
        });
      fetchRating(); 
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
                    ${(FetchedProductPrice * FetchedProductDiscount).toFixed(1)}
                  </p>
                  {FetchedProductDiscount < 1 ? (
                    <p className="CardDiscountText">${(+FetchedProductPrice).toFixed(1)} </p>
                  ) : ( <p></p>)}
                </div>
                <RatingStars rating={FetchedProductRating}/>
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
