import React, { useEffect, useState } from "react";
import "./ProductInfo.css";
import { Navbar } from "../../Components/Navbar/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { ProductCard } from "../../Components/ProductCard/ProductCard";
import ProductImage from "../../Assets/Images/ProductIcon.jpg";
import add_icon from "../../Assets/Icons/add-icon.svg";
import minus_icon from "../../Assets/Icons/minus-icon.svg";
import star_filled from "../../Assets/Icons/star_filled.svg";
import star_empty from "../../Assets/Icons/star_empty.svg";
import small_star_filled from "../../Assets/Icons/small_star_filled.svg";
import small_star_empty from "../../Assets/Icons/small_star_empty.svg";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, Navigate } from "react-router-dom";
import { useContext, createContext } from "react";
import { CartContext } from "../../Context/CartContext";

const Recommendation = () => {
  const [recommend0_id, setrecommend0_id] = useState(-1);
  const [recommend1_id, setrecommend1_id] = useState(-1);
  const [recommend2_id, setrecommend2_id] = useState(-1);
  const [recommend3_id, setrecommend3_id] = useState(-1);
  const [recommend4_id, setrecommend4_id] = useState(-1);
  const { productId } = useParams();

  useEffect(() => {
    const url4 = "http://localhost:8080/api/recommend/product/" + productId;
    fetch(url4, { method: "GET" })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        var text = JSON.stringify(response);
        var array1 = JSON.parse(text);
        if (array1[0] != undefined) setrecommend0_id(array1[0].productId);
        if (array1[1] != undefined) setrecommend1_id(array1[1].productId);
        if (array1[2] != undefined) setrecommend2_id(array1[2].productId);
        if (array1[3] != undefined) setrecommend3_id(array1[3].productId);
        if (array1[4] != undefined) setrecommend4_id(array1[4].productId);
      });
  }, []);

  // useEffect (()=>{
  //     console.log(recommend0_id);
  //     console.log(recommend1_id);
  //     console.log(recommend2_id);
  //     console.log(recommend3_id);
  //     console.log(recommend4_id);
  // },[ recommend0_id ])

  return (
    <div className="RecommendationContainer">
      <div className="RecommendationText">Recommendation</div>
      <div className="RecommendationItems">
        <ProductCard id={recommend0_id} />
        <ProductCard id={recommend1_id} />
        <ProductCard id={recommend2_id} />
        <ProductCard id={recommend3_id} />
        <ProductCard id={recommend4_id} />
      </div>
    </div>
  );
};

const StarFilled = () => {
  return (
    <div>
      <img src={star_filled} alt=""></img>
    </div>
  );
};

const StarEmpty = () => {
  return (
    <div>
      <img src={star_empty} alt=""></img>
    </div>
  );
};

const SmallStarEmpty = () => {
  return (
    <div>
      <img src={small_star_empty} alt=""></img>
    </div>
  );
};

const SmallStarFilled = () => {
  return (
    <div>
      <img src={small_star_filled} alt=""></img>
    </div>
  );
};

const StarProgressBar = ({ number, count, percent }) => {
  percent = percent.toFixed(0);
  const [Width, SetWidth] = useState(0);

  useEffect(() => {
    SetWidth(percent + "%");
  }, [percent]);

  return (
    <div className="CommentProgressBarContainer">
      <p className="CommentProgressBarFirstText">{number} STAR </p>
      <div className="CommentProgressBarMax">
        <div
          className="CommentProgressBar"
          style={{ width: Width }}
          role="progressbar"
        ></div>
      </div>
      <p className="CommentProgressBarSecondText">{count}</p>
    </div>
  );
};

const SmallStar = ({ smallStarCount, requirement }) => {
  return (
    <div>
      {smallStarCount > requirement ? <SmallStarFilled /> : <SmallStarEmpty />}
    </div>
  );
};

function formatFloat(source, position) {
  return Math.round(source * Math.pow(10, position)) / Math.pow(10, position);
}

const CommentBox = ({ username, star, content, index }) => {
  return (
    <div className="Comment">
      <p className="SmallCommentText">{content}</p>
      <div className="SmallCommentStarContainer">
        <SmallStar smallStarCount={star} requirement="0" />
        <SmallStar smallStarCount={star} requirement="1" />
        <SmallStar smallStarCount={star} requirement="2" />
        <SmallStar smallStarCount={star} requirement="3" />
        <SmallStar smallStarCount={star} requirement="4" />
      </div>
      <p className="SmallCommentUserId">{username}</p>
    </div>
  );
};

const CommentContainer = ({ id }) => {
  const { productId } = useParams();
  const url2 = "http://localhost:8080/api/comment/id/" + productId;
  const [Count1, setCount1] = useState(0);
  const [Count2, setCount2] = useState(0);
  const [Count3, setCount3] = useState(0);
  const [Count4, setCount4] = useState(0);
  const [Count5, setCount5] = useState(0);
  const [rating, setRating] = useState(0);

  fetch(url2, { method: "GET" })
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      setCount1(+response.five_star);
      setCount2(+response.four_star);
      setCount3(+response.three_star);
      setCount4(+response.two_star);
      setCount5(+response.one_star);
      setRating(+response.average);
    });

  const Star = ({ progress }) => {
    return (
      <div className="CardStar" percent={Math.min(1.0, progress)}>
        <img src={star_empty} />
        <img
          src={star_filled}
          style={{ clipPath: `inset(0 ${100 - progress * 100}% 0 0)` }}
        />
      </div>
    );
  };

  const [itemsjs, setItemsJS] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pointer, setpointer] = useState(0);

  useEffect(() => {
    const url3 = "http://localhost:8080/api/comment/list";
    fetch(url3, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        commentpointer: pointer,
        id: productId,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        var text = JSON.stringify(response);
        var array1 = JSON.parse(text);
        setItemsJS(array1);
        setpointer(pointer + 1);
        if (array1.length < 3) setHasMore(false);
      });
  }, []);

  const fetchMoreData = () => {
    setTimeout(() => {
      const url3 = "http://localhost:8080/api/comment/list";
      fetch(url3, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commentpointer: pointer,
          id: productId,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          var text = JSON.stringify(response);
          var array1 = JSON.parse(text);
          setItemsJS(itemsjs.concat(array1));
          setpointer(pointer + 1);
          if (array1.length == 0) setHasMore(false);
        });
    }, 500);
  };

  const total = Count1 + Count2 + Count3 + Count4 + Count5;
  let StarNum = (
    0 +
    (Count5 + Count4 * 2 + Count3 * 3 + Count2 * 4 + Count1 * 5) / total
  );
  if (total == 0) StarNum = 0;
  return (
    <div className="CommentContainer">
      <div className="StarRatingSummary">
        <div className="StarText">{StarNum.toFixed(1)}</div>
          <div className="Stars">
            <Star progress={rating} />
            <Star progress={rating - 1} />
            <Star progress={rating - 2} />
            <Star progress={rating - 3} />
            <Star progress={rating - 4} />
          </div>
      </div>
      <div className="CommentSummaryContainer">
        <StarProgressBar
          number="5"
          count={Count1}
          percent={(Count1 / total) * 100}
        />
        <StarProgressBar
          number="4"
          count={Count2}
          percent={(Count2 / total) * 100}
        />
        <StarProgressBar
          number="3"
          count={Count3}
          percent={(Count3 / total) * 100}
        />
        <StarProgressBar
          number="2"
          count={Count4}
          percent={(Count4 / total) * 100}
        />
        <StarProgressBar
          number="1"
          count={Count5}
          percent={(Count5 / total) * 100}
        />
      </div>
      <p className="CommentNumber">{total} COMMENTS</p>
      <InfiniteScroll
        className="CommentListContainer"
        dataLength={itemsjs.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<h4>End of Comment</h4>}
        height={279}
      >
        {itemsjs.map((itemsjs, index) => (
          <div key={itemsjs.id}>
            <CommentBox
              username={itemsjs.user ? itemsjs.user.username : "Deleted User"}
              star={itemsjs.rating}
              content={itemsjs.content}
              index={index}
            />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

const InfoContainer = ({ name, price, discount, stock, description, id }) => {
  const [UserAuth, SetAuth] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");
  const {addToCart} = useContext(CartContext);
  const navigate = useNavigate();
  useEffect(() => {
    const UserAuth = JSON.parse(localStorage.getItem("userAuth"));
    if (UserAuth) {
      SetAuth(UserAuth);
    }
  }, []);
  const userid = UserAuth.id;
  const handleAddToCart = async () => {
    if (stock == 0) {
      alert("Out of Stock");
      return;
    }
    if (userid == undefined) {
      navigate("/login");
      return;
    }
    await addToCart({userid, id, count});
  }
  const [count, setCount] = useState(1);
  const decrement = () => {
    if (count > 1) setCount(count - 1);
  };
  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div className="InfoContainer">
      <div className="product-status">
        {stock == 0 ? (
          <div className="out-of-stock">
            {" "}
            <p> Out of Stock</p>{" "}
          </div>
        ) : (
          [
            discount < 1 ? (
              <div className="on-sale">
                {" "}
                <p> On Sale</p>{" "}
              </div>
            ) : (
              <div> </div>
            ),
          ]
        )}
      </div>
      <div className="ProductNameID">
        <p className="ProductName">{name}</p>
        <p className="ProductIDText">ProductID#{id}</p>
      </div>
      <div className="PriceContainer">
        <div className="PriceText">${(price * discount).toFixed(1)}</div>
        {discount < 1 ? (
          <div className="DiscountText">${(+price).toFixed(1)} </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="ProductDetail">{description}</div>
      <div className="ProductAmountContainer">
        <button>
          <img
            className="ProductAmountContainer_add"
            src={add_icon}
            alt="add"
            onClick={increment}
          />
        </button>
        <button>
          <img
            className="ProductAmountContainer_minus"
            src={minus_icon}
            alt="minus"
            onClick={decrement}
          />
        </button>
        <p className="ProductAmountText">{count}</p>
      </div>
      <div className="add-to-cart">
        <button onClick={handleAddToCart} className="AddToCartButton">
          <p> Add To Cart </p>
        </button>
    {error ? <p className="add-to-cart-error">*{error}</p> : null}
        {/* {redirect && <Navigate to="/shopping-cart" />} */}
      </div>
    </div>
  );
};

const Product = ({ name, price, discount, stock, description, id }) => {
  const [RightContent, setRightContent] = useState(true);
  const InfoButton_clicked = () => {
    setRightContent(true);
  };
  const CommentButton_clicked = () => {
    setRightContent(false);
  };
  const [photo0, setPhoto0] = useState(ProductImage);
  const [photo1, setPhoto1] = useState("-1");
  const [photo2, setPhoto2] = useState("-1");
  const [photo3, setPhoto3] = useState("-1");
  const [photo4, setPhoto4] = useState("-1");

  const photo_clicked = () => {
    setProductImageSelected(photo0);
  };
  const photo_clicked1 = () => {
    setProductImageSelected(photo1);
  };
  const photo_clicked2 = () => {
    setProductImageSelected(photo2);
  };
  const photo_clicked3 = () => {
    setProductImageSelected(photo3);
  };
  const photo_clicked4 = () => {
    setProductImageSelected(photo4);
  };

  let k;
  const { productId } = useParams();
  const [ProductImageSelected, setProductImageSelected] = useState(photo0);
  useEffect(() => {
    const url1 = "http://localhost:8080/api/product/" + productId;
    k = fetch(url1, { method: "GET" })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        if (response.data.product_images[0] != undefined)
          setPhoto0(
            "http://localhost:8080/images/" +
              response.data.product_images[0].path
          );
        if (response.data.product_images[1] != undefined)
          setPhoto1(
            "http://localhost:8080/images/" +
              response.data.product_images[1].path
          );
        if (response.data.product_images[2] != undefined)
          setPhoto2(
            "http://localhost:8080/images/" +
              response.data.product_images[2].path
          );
        if (response.data.product_images[3] != undefined)
          setPhoto3(
            "http://localhost:8080/images/" +
              response.data.product_images[3].path
          );
        if (response.data.product_images[4] != undefined)
          setPhoto4(
            "http://localhost:8080/images/" +
              response.data.product_images[4].path
          );
        if (response.data.product_images[0] != undefined)
          setProductImageSelected(
            "http://localhost:8080/images/" +
              response.data.product_images[0].path
          );
      });
  }, []);

  return (
    <div className="ProductContainer">
      <div className="ImgContainer">
        <div className="ImgListContainer">
          {photo0 != "-1" ? (
            <button onClick={photo_clicked}>
              <img src={photo0} alt=""></img>{" "}
            </button>
          ) : (
            <div></div>
          )}
          {photo1 != "-1" ? (
            <button onClick={photo_clicked1}>
              <img src={photo1} alt=""></img>{" "}
            </button>
          ) : (
            <div></div>
          )}
          {photo2 != "-1" ? (
            <button onClick={photo_clicked2}>
              <img src={photo2} alt=""></img>{" "}
            </button>
          ) : (
            <div></div>
          )}
          {photo3 != "-1" ? (
            <button onClick={photo_clicked3}>
              <img src={photo3} alt=""></img>{" "}
            </button>
          ) : (
            <div></div>
          )}
          {photo4 != "-1" ? (
            <button onClick={photo_clicked4}>
              <img src={photo4} alt=""></img>{" "}
            </button>
          ) : (
            <div></div>
          )}
        </div>
        <img src={ProductImageSelected} alt=""></img>
      </div>
      <div className="RightContainer">
        <button onClick={InfoButton_clicked} className="InfoButton">
          <p> Info </p>
        </button>
        <button onClick={CommentButton_clicked} className="CommentButton">
          <p> Comment </p>
        </button>
        {RightContent ? (
          <InfoContainer
            name={name}
            price={price}
            discount={discount}
            stock={stock}
            description={description}
            id={id}
          ></InfoContainer>
        ) : (
          <CommentContainer id={id}></CommentContainer>
        )}
      </div>
    </div>
  );
};

export const ProductInfo = () => {
  const { productId } = useParams();
  const [FetchedProductName, SetFetchedProductName] = useState([]);
  const [FetchedProductPrice, SetFetchedProductPrice] = useState([]);
  const [FetchedProductDiscount, SetFetchedProductDiscount] = useState([]);
  const [FetchedProductstock, SetFetchedProductstock] = useState([]);
  const [FetchedProductdescription, SetFetchedProductdescription] = useState(
    []
  );
  const url1 = "http://localhost:8080/api/product/" + productId;

  fetch(url1, { method: "GET" })
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      SetFetchedProductName(response.data.name);
      SetFetchedProductPrice(response.data.price);
      SetFetchedProductDiscount(response.data.discount);
      SetFetchedProductstock(response.data.stock);
      SetFetchedProductdescription(response.data.description);
    });

  // console.log(FetchedProductName);
  // console.log(FetchedProductPrice);
  // console.log(FetchedProductDiscount);
  // console.log(FetchedProductstock);
  // console.log(FetchedProductdescription);

  return (
    <div>
      <Navbar />
      <div className="MainContainer">
        <Product
          name={FetchedProductName}
          price={FetchedProductPrice}
          discount={FetchedProductDiscount}
          stock={FetchedProductstock}
          description={FetchedProductdescription}
          id={productId}
        ></Product>
        <div className="horizon"></div>
        <Recommendation />
      </div>
      <data></data>
    </div>
  );
};
