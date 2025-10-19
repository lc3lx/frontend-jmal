import React, { useState } from "react";
import { Row, Col, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { sendMagicLink } from "../../redux/actions/authAction";
import "./MagicLinkLogin.css";

const MagicLinkLogin = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("الرجاء إدخال بريد إلكتروني صحيح");
      return;
    }

    setLoading(true);
    try {
      const response = await dispatch(sendMagicLink(email));

      if (response && response.status === "Success") {
        setEmailSent(true);
        toast.success("✅ تم إرسال رابط تسجيل الدخول إلى بريدك الإلكتروني");
      } else {
        toast.error("حدث خطأ، حاول مرة أخرى");
      }
    } catch (error) {
      console.error("Magic link error:", error);
      toast.error("حدث خطأ، حاول مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="magic-link-login-container">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          {!emailSent ? (
            <div className="magic-link-card">
              <div className="magic-link-header">
                <h1 className="magic-link-title">
                  <span className="title-icon">🎬</span>
                  مرحباً بك
                </h1>
                <p className="magic-link-subtitle">
                  أدخل بريدك الإلكتروني وسنرسل لك رابط تسجيل الدخول
                </p>
              </div>

              <form onSubmit={handleSubmit} className="magic-link-form">
                <div className="form-group">
                  <label className="form-label">
                    <span className="label-icon">📧</span>
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    className="magic-input"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="magic-submit-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      جاري الإرسال...
                    </>
                  ) : (
                    <>
                      <span className="btn-icon">✉️</span>
                      إرسال رابط تسجيل الدخول
                    </>
                  )}
                </Button>
              </form>

              <div className="magic-link-footer">
                <div className="feature-item">
                  <span className="feature-icon">⚡</span>
                  <span>سريع وآمن</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🔒</span>
                  <span>لا حاجة لكلمة مرور</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">✓</span>
                  <span>تسجيل دخول بضغطة واحدة</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="magic-link-card success-card">
              <div className="success-icon-container">
                <div className="success-icon">✓</div>
              </div>
              <h2 className="success-title">تم إرسال الرابط!</h2>
              <p className="success-message">
                تفقد بريدك الإلكتروني واضغط على الرابط لتسجيل الدخول
              </p>
              <div className="email-preview">{email}</div>
              <div className="success-note">
                <p>⏱️ الرابط صالح لمدة 30 دقيقة</p>
                <p>📬 تحقق من صندوق الوارد أو Spam</p>
              </div>
              <Button
                className="resend-btn"
                onClick={() => {
                  setEmailSent(false);
                  setEmail("");
                }}
              >
                إرسال رابط آخر
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default MagicLinkLogin;
