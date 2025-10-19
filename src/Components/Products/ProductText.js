import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ViewProductsDetalisHook from "./../../hook/products/view-products-detalis-hook";
import { ToastContainer, toast } from "react-toastify";
import ChoosePaymentMethod from "../Checkout/ChoosePaymentMethod";

const ProductText = () => {
  const { id } = useParams();
  const [item, images, cat, brand] = ViewProductsDetalisHook(id);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleBuyNow = () => {
    if (!item || !item._id) {
      toast.error("خطأ في بيانات المنتج");
      return;
    }

    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      toast.info("سجل دخول بإيميلك لإكمال عملية الشراء");
      setTimeout(() => {
        window.location.href = "/magic-login";
      }, 1500);
      return;
    }

    // Check stock
    if (item.stock <= 0) {
      toast.error("المنتج غير متوفر حالياً");
      return;
    }

    setShowPaymentModal(true);
  };

  return (
    <div>
      <Row className="mt-2">
        <div className="cat-text">{cat?.name || "فئة"} :</div>
      </Row>
      <Row>
        <Col md="8">
          <div className="cat-title d-inline">
            {item?.title || "عنوان المنتج"}
            <div className="cat-rate d-inline mx-3">
              {item?.ratingsAverage || 0}
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md="8" className="mt-4">
          <div className="cat-text d-inline">الماركة :</div>
          <div className="barnd-text d-inline mx-1">
            {brand?.name || "ماركة"}{" "}
          </div>
        </Col>
      </Row>
      <Row>
        <Col md="8" className="mt-1 d-flex">
          <div className="cat-text d-inline">
            المخزون المتاح : {item?.stock || 0}{" "}
          </div>
        </Col>
      </Row>

      <Row className="mt-4">
        <div className="cat-text">المواصفات :</div>
      </Row>
      <Row className="mt-2">
        <Col md="10">
          <div className="product-description d-inline">
            {item?.description || "لا يوجد وصف للمنتج"}
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md="12">
          {item?.priceAfterDiscount >= 1 ? (
            <div className="product-price d-inline px-3 py-3 border">
              <span style={{ textDecorationLine: "line-through" }}>
                {" "}
                {item?.price || 0}
              </span>{" "}
              {item?.priceAfterDiscount || 0} ريال
            </div>
          ) : (
            <div className="product-price d-inline px-3 py-3 border">
              <span> {item?.price || 0}</span> ريال{" "}
            </div>
          )}
          <Button
            onClick={handleBuyNow}
            disabled={!item || item.stock <= 0}
            className="product-cart-add px-3 py-3 d-inline mx-3"
            style={{
              backgroundColor: item?.stock <= 0 ? "#999" : "#272727",
              color: "#fff",
              border: "none",
              cursor: item?.stock <= 0 ? "not-allowed" : "pointer",
            }}
          >
            {item?.stock <= 0 ? "غير متوفر" : "اشتري الآن"}
          </Button>
        </Col>
      </Row>
      {showPaymentModal && (
        <ChoosePaymentMethod
          productId={item._id}
          productPrice={item.priceAfterDiscount || item.price}
          onClose={() => setShowPaymentModal(false)}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default ProductText;
