import React from "react";
import { Container, Spinner } from "react-bootstrap";
import useHomepageImages from "../../hook/homepage/use-homepage-images-hook";
import "./DiscountSection.css";

const DiscountSection = () => {
  const { images, loading, error } = useHomepageImages("discount");

  // إضافة console.log لتتبع البيانات
  console.log("DiscountSection component - images:", images);
  console.log("DiscountSection component - loading:", loading);
  console.log("DiscountSection component - error:", error);

  if (loading) {
    return (
      <Container>
        <div
          className="d-flex justify-content-center align-items-center my-3"
          style={{ height: "200px" }}
        >
          <Spinner animation="border" variant="primary" />
        </div>
      </Container>
    );
  }

  if (error || !images || images.length === 0) {
    return null;
  }

  return (
    <Container className="my-5">
      <div className="discount-section-wrapper">
        {images.map((item, index) => (
          <div
            key={item._id}
            className="discount-image-card"
            style={{
              marginBottom: "20px",
            }}
          >
            <div
              className="discount-image-container"
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                height: "180px",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 35px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(0, 0, 0, 0.1)";
              }}
            >
              <img
                className="discount-image"
                src={item.image}
                alt="عرض خاص"
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default DiscountSection;
