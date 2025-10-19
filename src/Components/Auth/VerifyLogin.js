import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { verifyMagicLink } from "../../redux/actions/authAction";
import "./VerifyLogin.css";

const VerifyLogin = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verify = async () => {
      const token = searchParams.get("token");
      const email = searchParams.get("email");

      if (!token || !email) {
        setError("رابط غير صحيح");
        setVerifying(false);
        return;
      }

      try {
        const response = await dispatch(verifyMagicLink(token, email));

        if (response && response.token) {
          // Save token and user to localStorage
          localStorage.setItem("token", response.token);
          localStorage.setItem("user", JSON.stringify(response.data));

          toast.success("✅ تم تسجيل الدخول بنجاح!");

          // Redirect to home after 1.5 seconds
          setTimeout(() => {
            window.location.href = "/";
          }, 1500);
        } else {
          setError("فشل في تسجيل الدخول");
          setVerifying(false);
        }
      } catch (err) {
        console.error("Verify error:", err);
        setError("رابط تسجيل الدخول غير صحيح أو منتهي الصلاحية");
        setVerifying(false);
      }
    };

    verify();
  }, [searchParams, dispatch, navigate]);

  return (
    <div className="verify-login-container">
      <div className="verify-card">
        {verifying ? (
          <>
            <div className="spinner-container">
              <Spinner
                animation="border"
                variant="danger"
                className="verify-spinner"
              />
            </div>
            <h2 className="verify-title">جاري التحقق...</h2>
            <p className="verify-message">
              الرجاء الانتظار بينما نقوم بتسجيل دخولك
            </p>
          </>
        ) : error ? (
          <>
            <div className="error-icon-container">
              <div className="error-icon">✕</div>
            </div>
            <h2 className="error-title">خطأ في التحقق</h2>
            <p className="error-message">{error}</p>
            <button
              className="back-btn"
              onClick={() => navigate("/magic-login")}
            >
              العودة لتسجيل الدخول
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default VerifyLogin;
