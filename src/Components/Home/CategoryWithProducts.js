import React from "react";
import { Container } from "react-bootstrap";
import ProductCard from "../Products/ProductCard";
import CardContainerHook from "../../hook/products/card-container-hook";
import { Link } from "react-router-dom";
import "./CategoryWithProducts.css";

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
    <Container className="category-with-products">
      <div className="category-section-header">
        <h2 className="category-name">
          <span className="category-icon">📦</span>
          {category.name}
        </h2>
        <Link to="/products" className="view-all-category-link">
          عرض الكل
          <span className="view-all-icon">←</span>
        </Link>
      </div>

      {products && products.length > 0 ? (
        <div className="category-products-grid">
          {products.map((product, index) => (
            <ProductCard
              key={product._id || index}
              favProd={favProd}
              item={product}
            />
          ))}
        </div>
      ) : (
        <div className="category-empty">
          <div className="category-empty-icon">📦</div>
          <h4>لا توجد منتجات متاحة</h4>
          <p>لا توجد منتجات في تصنيف "{category.name}" حالياً</p>
        </div>
      )}
    </Container>
  );
};

export default CategoryWithProducts;
