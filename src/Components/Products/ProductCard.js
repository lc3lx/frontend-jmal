import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";

import rate from "../../images/rate.png";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import ProductCardHook from "./../../hook/products/product-card-hook";
import ChoosePaymentMethod from "./../Checkout/ChoosePaymentMethod";
import "./ProductCard.css";

const ProductCard = ({ item, favProd }) => {
  const [, , handelFav, favImg] = ProductCardHook(item, favProd);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if user is logged in
    const user = localStorage.getItem("user");
    if (!user) {
      toast.info("سجل دخول بإيميلك لإكمال عملية الشراء");
      setTimeout(() => {
        window.location.href = "/magic-login";
      }, 1500);
      return;
    }

    // Check stock
    if (!item.stock || item.stock <= 0) {
      toast.error("هذا المنتج غير متوفر حالياً");
      return;
    }

    // Open payment modal
    setShowPaymentModal(true);
  };

  return (
    <>
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
              className="add-to-cart-btn"
              onClick={handleBuyNow}
              disabled={!item.stock || item.stock <= 0}
            >
              <span className="btn-icon">
                {item.stock && item.stock > 0 ? "🛒" : "❌"}
              </span>
              {item.stock && item.stock > 0 ? "اشتري الآن" : "غير متوفر"}
            </Button>
          </div>
        </Card.Body>
        <ToastContainer />
      </Card>

      {showPaymentModal && (
        <ChoosePaymentMethod
          productId={item._id}
          productPrice={item.priceAfterDiscount || item.price}
          onClose={() => setShowPaymentModal(false)}
        />
      )}
    </>
  );
};

export default ProductCard;
