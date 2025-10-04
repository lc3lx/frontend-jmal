import React from "react";
import { Row } from "react-bootstrap";
import AdminAllProductsCard from "./AdminAllProductsCard";

const AdminAllProducts = ({ products }) => {
  console.log("AdminAllProducts - Products:", products);

  return (
    <div>
      <div className="admin-content-text">ادارة جميع المنتجات</div>
      <Row className="justify-content-start">
        {products && products.length > 0 ? (
          products.map((item, index) => (
            <AdminAllProductsCard key={item._id || index} item={item} />
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <h4 className="text-muted">لا يوجد منتجات حتى الآن</h4>
            <p className="text-muted">جاري تحميل المنتجات...</p>
          </div>
        )}
      </Row>
    </div>
  );
};

export default AdminAllProducts;
