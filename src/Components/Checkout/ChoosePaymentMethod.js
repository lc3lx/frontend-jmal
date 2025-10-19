import React, { useState } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  createOrder,
  createPayPalOrder,
} from "../../redux/actions/ordersAction";
import "./ChoosePaymentMethod.css";

const ChoosePaymentMethod = ({ productId, productPrice, onClose }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const handlePayment = async () => {
    if (!productId) {
      toast.error("خطأ في بيانات المنتج");
      return;
    }

    setLoading(true);
    try {
      if (paymentMethod === "cash") {
        // Cash order
        await dispatch(createOrder({ productId }));
        toast.success("🎉 تم إنشاء الطلب بنجاح! سيتم التواصل معك قريباً");
        onClose();
        setTimeout(() => {
          window.location.href = "/user/allorders";
        }, 2000);
      } else if (paymentMethod === "paypal") {
        // PayPal order
        const response = await dispatch(createPayPalOrder(productId));
        if (response.data && response.data.approvalUrl) {
          toast.info("جاري تحويلك إلى PayPal...");
          // Redirect to PayPal
          window.location.href = response.data.approvalUrl;
        } else {
          toast.error("فشل في إنشاء طلب PayPal");
          setLoading(false);
        }
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("حدث خطأ أثناء المعالجة");
      setLoading(false);
    }
  };

  return (
    <Modal
      show={true}
      onHide={onClose}
      centered
      className="payment-modal"
      backdrop="static"
    >
      <Modal.Header closeButton className="payment-modal-header">
        <Modal.Title>
          <span className="payment-title-icon">💳</span>
          اختر طريقة الدفع
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="payment-modal-body">
        <Row>
          <Col md={12}>
            <div className="payment-method-container">
              <div
                className={`payment-option ${
                  paymentMethod === "cash" ? "selected" : ""
                }`}
                onClick={() => setPaymentMethod("cash")}
              >
                <div className="payment-option-icon">💵</div>
                <div className="payment-option-content">
                  <h5>الدفع عند الاستلام</h5>
                  <p>ادفع بعد استلام بيانات الحساب</p>
                </div>
                <div className="payment-option-check">
                  {paymentMethod === "cash" && "✓"}
                </div>
              </div>

              <div
                className={`payment-option ${
                  paymentMethod === "paypal" ? "selected" : ""
                }`}
                onClick={() => setPaymentMethod("paypal")}
              >
                <div className="payment-option-icon">💳</div>
                <div className="payment-option-content">
                  <h5>الدفع عبر PayPal</h5>
                  <p>ادفع الآن بشكل آمن عبر PayPal</p>
                </div>
                <div className="payment-option-check">
                  {paymentMethod === "paypal" && "✓"}
                </div>
              </div>

              <div className="payment-total">
                <span className="payment-total-label">السعر الإجمالي:</span>
                <span className="payment-total-amount">
                  {productPrice} ريال
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer className="payment-modal-footer">
        <Button
          variant="secondary"
          onClick={onClose}
          className="payment-cancel-btn"
          disabled={loading}
        >
          إلغاء
        </Button>
        <Button
          variant="primary"
          onClick={handlePayment}
          disabled={loading}
          className="payment-confirm-btn"
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              جاري المعالجة...
            </>
          ) : (
            <>
              <span className="btn-icon">✓</span>
              تأكيد الدفع
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChoosePaymentMethod;
