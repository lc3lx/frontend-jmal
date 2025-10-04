import React, { useState } from "react";
import { Carousel, Spinner, Container } from "react-bootstrap";
import useHomepageImages from "../../hook/homepage/use-homepage-images-hook";

const Silder = () => {
  const [index, setIndex] = useState(0);
  const { images, loading, error } = useHomepageImages("slider");

  // إضافة console.log لتتبع البيانات
  console.log("Silder component - images:", images);
  console.log("Silder component - loading:", loading);
  console.log("Silder component - error:", error);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error || !images || images.length === 0) {
    return (
      <div className="error-container">
        <p className="text-muted">لا توجد صور متاحة</p>
      </div>
    );
  }

  return (
    <Container fluid className="px-0">
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        className="homepage-slider"
        indicators={images.length > 1}
        controls={images.length > 1}
      >
        {images.map((item, idx) => (
          <Carousel.Item key={item._id} interval={5000} className="slider-item">
            <div
              className="slider-content"
              style={{
                background:
                  item.backgroundColor ||
                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                minHeight: "400px",
              }}
            >
              <Container>
                <div className="row align-items-center h-100">
                  <div className="col-lg-6">
                    <div className="slider-text-content">
                      <h1 className="slider-title">{item.title}</h1>
                      <p className="slider-description">{item.description}</p>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="slider-image-container">
                      <img
                        className="slider-image"
                        src={item.image}
                        alt={item.title}
                      />
                    </div>
                  </div>
                </div>
              </Container>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default Silder;
