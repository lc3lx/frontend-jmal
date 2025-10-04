import React from "react";
import { Container } from "react-bootstrap";
import ProductCard from "../Products/ProductCard";
import CardContainerHook from "../../hook/products/card-container-hook";
import { Link } from "react-router-dom";

const CategoryWithProducts = ({ category, products }) => {
  const [favProd] = CardContainerHook();

  console.log(
    `CategoryWithProducts - Category: ${category?.name}, Products count: ${
      products?.length || 0
    }`
  );

  if (!category) {
    return null;
  }

  return (
    <Container className="category-with-products mb-5">
      <div className="category-header mb-4">
        <div className="category-header-content">
          <div className="category-left">
            {category.image && (
              <div className="category-image-container">
                <img
                  src={category.image}
                  alt={category.name}
                  className="category-image"
                />
              </div>
            )}
            <div className="category-info">
              <div className="category-title-wrapper">
                <i className="fas fa-tags category-title-icon"></i>
                <h2 className="category-title mb-0">{category.name}</h2>
              </div>
              <div className="category-meta">
                <span className="products-count">
                  <i className="fas fa-box"></i>
                  {products.length} منتج
                </span>
              </div>
            </div>
          </div>
          <Link
            to="/products"
            className="btn btn-outline-primary"
            style={{
              borderRadius: "25px",
              padding: "8px 20px",
              fontWeight: "600",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
          >
            عرض الكل
          </Link>
        </div>
        <div className="category-divider mt-3"></div>
      </div>

      {products && products.length > 0 ? (
        <div className="products-grid">
          {products.map((product, index) => (
            <div key={product._id || index} className="product-card-wrapper">
              <ProductCard favProd={favProd} item={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="no-products-section">
          <div className="no-products-icon">
            <i className="fas fa-box-open"></i>
          </div>
          <h4 className="no-products-title">لا توجد منتجات متاحة</h4>
          <p className="no-products-description">
            لا توجد منتجات في تصنيف "{category.name}" حالياً
          </p>
          <div className="no-products-actions">
            <Link
              to="/products"
              className="btn btn-primary"
              style={{
                borderRadius: "25px",
                padding: "10px 25px",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              تصفح جميع المنتجات
            </Link>
          </div>
        </div>
      )}
    </Container>
  );
};

export default CategoryWithProducts;
