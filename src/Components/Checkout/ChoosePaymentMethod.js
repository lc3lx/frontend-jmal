import React, { useState } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createOrder, createPayPalOrder } from "../../redux/actions/ordersAction";

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
        toast.success("تم إنشاء الطلب بنجاح! سيتم التواصل معك قريباً");
        setTimeout(() => {
          window.location.href = "/user/allorders";
        }, 2000);
      } else if (paymentMethod === "paypal") {
        // PayPal order
        const response = await dispatch(createPayPalOrder(productId));
        if (response.data && response.data.approvalUrl) {
          // Redirect to PayPal
          window.location.href = response.data.approvalUrl;
        } else {
          toast.error("فشل في إنشاء طلب PayPal");
        }
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("حدث خطأ أثناء المعالجة");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>اختر طريقة الدفع</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={12}>
            <div className="payment-method-container">
              <div
                className={`payment-option ${
                  paymentMethod === "cash" ? "selected" : ""
                }`}
                onClick={() => setPaymentMethod("cash")}
                style={{
                  border: "2px solid #ddd",
                  borderRadius: "10px",
                  padding: "20px",
                  marginBottom: "15px",
                  cursor: "pointer",
                  backgroundColor:
                    paymentMethod === "cash" ? "#f8f9fa" : "white",
                  transition: "all 0.3s",
                }}
              >
                <h5>💵 الدفع عند الاستلام</h5>
                <p style={{ margin: 0, color: "#666" }}>
                  ادفع بعد استلام بيانات الحساب
                </p>
              </div>

              <div
                className={`payment-option ${
                  paymentMethod === "paypal" ? "selected" : ""
                }`}
                onClick={() => setPaymentMethod("paypal")}
                style={{
                  border: "2px solid #ddd",
                  borderRadius: "10px",
                  padding: "20px",
                  cursor: "pointer",
                  backgroundColor:
                    paymentMethod === "paypal" ? "#f8f9fa" : "white",
                  transition: "all 0.3s",
                }}
              >
                <h5>💳 الدفع عبر PayPal</h5>
                <p style={{ margin: 0, color: "#666" }}>
                  ادفع الآن بشكل آمن عبر PayPal
                </p>
              </div>

              <div
                style={{
                  marginTop: "20px",
                  padding: "15px",
                  backgroundColor: "#e7f3ff",
                  borderRadius: "8px",
                }}
              >
                <p style={{ margin: 0, fontSize: "14px" }}>
                  <strong>السعر الإجمالي:</strong> {productPrice} ريال
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          إلغاء
        </Button>
        <Button
          variant="primary"
          onClick={handlePayment}
          disabled={loading}
          style={{
            backgroundColor: "#272727",
            border: "none",
          }}
        >
          {loading ? "جاري المعالجة..." : "تأكيد الدفع"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChoosePaymentMethod;

