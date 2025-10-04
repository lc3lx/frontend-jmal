import React from "react";
import { Container, Spinner, Row, Col } from "react-bootstrap";
import useHomepageImages from "../../hook/homepage/use-homepage-images-hook";

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
      {images.map((item, index) => (
        <div
          key={item._id}
          className="discount-section"
          style={{
            background:
              item.backgroundColor ||
              "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
            borderRadius: "15px",
            overflow: "hidden",
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Row className="align-items-center">
            <Col lg={8}>
              <div className="discount-content p-4">
                <h2 className="discount-title">{item.title}</h2>
                <p className="discount-description">{item.description}</p>
                <div className="discount-badge">
                  <span className="badge-text">خصم خاص</span>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="discount-image-container text-center p-4">
                <img
                  className="discount-image"
                  src={item.image}
                  alt={item.title}
                />
              </div>
            </Col>
          </Row>
        </div>
      ))}
    </Container>
  );
};

export default DiscountSection;
