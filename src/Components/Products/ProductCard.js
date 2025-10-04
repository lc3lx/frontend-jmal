import React from "react";
import { Card, Button } from "react-bootstrap";

import rate from "../../images/rate.png";
import { Link } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import ProductCardHook from "./../../hook/products/product-card-hook";
import AddToCartSimpleHook from "./../../hook/cart/add-to-cart-simple-hook";

const ProductCard = ({ item, favProd }) => {
  const [, , handelFav, favImg] = ProductCardHook(item, favProd);
  const [addToCartHandel, loading] = AddToCartSimpleHook(item);

  return (
    <Card
      className="product-card"
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "15px",
        border: "none",
        backgroundColor: "#FFFFFF",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
        transition: "all 0.3s ease",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Link to={`/products/${item._id}`} style={{ textDecoration: "none" }}>
        <div className="product-image-container">
          <Card.Img
            className="product-image"
            src={item.imageCover}
            alt={item.title}
          />
          <div className="product-overlay">
            <div className="product-overlay-content">
              <span className="view-product-text">عرض المنتج</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="product-badges">
        <div className="product-favorite-btn">
          <img
            src={favImg}
            alt="Add to favorites"
            onClick={handelFav}
            className="favorite-icon"
          />
        </div>
        {item.priceAfterDiscount >= 1 && (
          <div className="discount-badge">
            <span className="discount-percentage">
              {Math.round(
                ((item.price - item.priceAfterDiscount) / item.price) * 100
              )}
              %
            </span>
          </div>
        )}
      </div>
      <Card.Body className="product-card-body">
        <Card.Title>
          <div className="product-title">{item.title}</div>
        </Card.Title>
        <div className="product-info">
          <div className="product-rating">
            <div className="rating-stars">
              {[...Array(5)].map((_, index) => (
                <img
                  key={index}
                  className="rating-star"
                  src={rate}
                  alt="rating"
                />
              ))}
            </div>
            <span className="rating-value">({item.ratingsAverage || 0})</span>
          </div>
          <div className="product-price-section">
            <div className="product-price">
              {item.priceAfterDiscount >= 1 ? (
                <div className="price-with-discount">
                  <span className="original-price">{item.price} ريال</span>
                  <span className="discounted-price">
                    {item.priceAfterDiscount} ريال
                  </span>
                </div>
              ) : (
                <span className="regular-price">{item.price} ريال</span>
              )}
            </div>
          </div>
        </div>
        <div className="product-add-to-cart">
          <Button
            variant="primary"
            onClick={addToCartHandel}
            disabled={loading}
            className="add-to-cart-btn"
          >
            <span className="btn-icon">🛒</span>
            {loading ? "جاري الإضافة..." : "أضف إلى العربة"}
          </Button>
        </div>
      </Card.Body>
      <ToastContainer />
    </Card>
  );
};

export default ProductCard;
