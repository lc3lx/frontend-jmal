import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CategoryHeader from "../../Components/Category/CategoryHeader";
import CardProductsContainer from "../../Components/Products/CardProductsContainer";
import ProductDetalis from "../../Components/Products/ProductDetalis";
import ViewProductsDetalisHook from "./../../hook/products/view-products-detalis-hook";

const ProductDetalisPage = () => {
  const { id } = useParams();
  const [item, , , , prod] = ViewProductsDetalisHook(id);

  let items = [];

  try {
    if (prod) items = prod.slice(0, 4);
  } catch (e) {}

  return (
    <div style={{ minHeight: "670px" }}>
      <CategoryHeader />
      <Container>
        <ProductDetalis />
        <CardProductsContainer products={items} title="منتجات قد تعجبك" />
      </Container>
    </div>
  );
};

export default ProductDetalisPage;
