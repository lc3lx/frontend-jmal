import React, { useState } from "react";
import { Row, Col, Button, Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import notify from "../../hook/useNotifaction";
import baseUrl from "../../Api/baseURL";
import "./AdminDashboard.css";

const AdminAddDiscountImage = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      notify("الرجاء اختيار صورة", "warn");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("type", "discount");
      formData.append("title", "Discount Image");
      formData.append("description", "Discount offer");
      formData.append("image", image);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const response = await baseUrl.post(
        "/api/v1/homepage-images",
        formData,
        config
      );

      if (response.status === 201) {
        notify("تم إضافة صورة الخصم بنجاح", "success");
        setImage(null);
        setPreview(null);
        // Reset file input
        document.getElementById("discount-image-input").value = "";
      } else {
        notify("فشل في إضافة الصورة", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      notify("حدث خطأ أثناء رفع الصورة", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-add-product-container">
      <Row className="justify-content-start">
        <div className="admin-content-text pb-4">إضافة صورة عرض خاص</div>
        <Col sm="10" md="8" lg="6">
          <div className="product-form-card">
            <div className="form-section">
              <label className="form-label">صورة العرض *</label>
              <input
                type="file"
                id="discount-image-input"
                className="modern-input"
                accept="image/*"
                onChange={handleImageChange}
              />
              <small className="form-hint">
                اختر صورة عالية الجودة لعرضها في قسم العروض الخاصة
              </small>
            </div>

            {preview && (
              <div className="form-section">
                <label className="form-label">معاينة الصورة</label>
                <div
                  style={{
                    borderRadius: "10px",
                    overflow: "hidden",
                    border: "2px solid #e0e0e0",
                  }}
                >
                  <img
                    src={preview}
                    alt="معاينة"
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                  />
                </div>
              </div>
            )}

            <div className="form-actions">
              <Button
                onClick={handleSubmit}
                disabled={loading || !image}
                className="modern-btn-save"
              >
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      style={{ marginLeft: "10px" }}
                    />
                    جاري الرفع...
                  </>
                ) : (
                  <>
                    <i className="fas fa-upload"></i> رفع الصورة
                  </>
                )}
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
};

export default AdminAddDiscountImage;
