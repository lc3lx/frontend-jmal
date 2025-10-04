import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CategoryHeader from "../../Components/Category/CategoryHeader";
import CardProductsContainer from "../../Components/Products/CardProductsContainer";
import ProductDetalis from "../../Components/Products/ProductDetalis";
import RateContainer from "../../Components/Rate/RateContainer";
import ViewProductsDetalisHook from "./../../hook/products/view-products-detalis-hook";
const ProductDetalisPage = () => {
  const { id } = useParams();
  const [item, , , , prod] = ViewProductsDetalisHook(id);

  let items = [];
  let rateAvg = 0;
  let rateQty = 0;

  try {
    if (prod) items = prod.slice(0, 4);
  } catch (e) {}

  try {
    if (item) {
      rateAvg = item.ratingsAverage;
      rateQty = item.ratingsQuantity;
    }
  } catch (e) {}
  return (
    <div style={{ minHeight: "670px" }}>
      <CategoryHeader />
      <Container>
        <ProductDetalis />
        <RateContainer rateAvg={rateAvg} rateQty={rateQty} />
        <CardProductsContainer products={items} title="منتجات قد تعجبك" />
      </Container>
    </div>
  );
};

export default ProductDetalisPage;
