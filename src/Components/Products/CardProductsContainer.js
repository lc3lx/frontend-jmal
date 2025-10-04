import React from "react";
import { Container, Row } from "react-bootstrap";
import ProductCard from "./ProductCard";
import CardContainerHook from "./../../hook/products/card-container-hook";

const CardProductsContainer = ({ title, btntitle, pathText, products }) => {
  const [favProd] = CardContainerHook();

  console.log(
    `CardProductsContainer - Title: ${title}, Products count: ${
      products?.length || 0
    }`
  );

  return (
    <Container className="card-products-container mb-5">
      {title && <div className="category-title">{title}</div>}

      {products && products.length > 0 ? (
        products.map((item, index) => (
          <div
            key={item._id || index}
            className="col-lg-4 col-md-6 col-sm-12 mb-3"
          >
            <div className="product-card">
              <ProductCard favProd={favProd} item={item} />
            </div>
          </div>
        ))
      ) : products && products.length === 0 ? (
        <div className="col-12 text-center py-4">
          <p className="text-muted">لا توجد منتجات في هذه الفئة</p>
        </div>
      ) : (
        <div className="col-12 text-center py-4">
          <p className="text-muted">جاري تحميل المنتجات...</p>
        </div>
      )}
    </Container>
  );
};

export default CardProductsContainer;
