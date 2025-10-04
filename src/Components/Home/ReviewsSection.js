import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";
import ViewAllReviewsHook from "../../hook/reviews/view-all-reviews-hook";

const ReviewsSection = () => {
  const [reviews, loading] = ViewAllReviewsHook(7);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <StarFill key={i} className="text-warning me-1" size={16} />
        ) : (
          <Star key={i} className="text-muted me-1" size={16} />
        )
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <div className="reviews-section">
      <Container className="py-5">
        <Row className="mb-4">
          <Col className="text-center">
            <h2 className="fw-bold text-primary mb-3">آراء عملائنا</h2>
            <p className="text-muted">اكتشف ما يقوله عملاؤنا عن تجربتهم معنا</p>
          </Col>
        </Row>

        <Row className="g-4">
          {reviews.map((review, index) => (
            <Col key={review._id} xs={12} md={6} lg={4}>
              <Card className="h-100 shadow-sm border-0 review-card">
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: "40px",
                        height: "40px",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      {review.user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <div>
                      <h6 className="mb-1 fw-bold">
                        {review.user?.name || "مجهول"}
                      </h6>
                      <div className="d-flex align-items-center">
                        {renderStars(review.ratings)}
                        <span className="text-muted small ms-2">
                          ({review.ratings})
                        </span>
                      </div>
                    </div>
                  </div>

                  <p
                    className="text-muted flex-grow-1 mb-3"
                    style={{ fontSize: "14px", lineHeight: "1.6" }}
                  >
                    {review.title || "تقييم ممتاز"}
                  </p>

                  <div className="mt-auto">
                    <small className="text-muted">
                      {new Date(review.createdAt).toLocaleDateString("ar-SA")}
                    </small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row className="mt-4">
          <Col className="text-center">
            <div className="bg-light rounded p-4">
              <h5 className="text-primary mb-2">
                انضم إلى آلاف العملاء الراضين
              </h5>
              <p className="text-muted mb-0">
                شاركنا تجربتك وساعد الآخرين في اتخاذ قرارهم
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ReviewsSection;
