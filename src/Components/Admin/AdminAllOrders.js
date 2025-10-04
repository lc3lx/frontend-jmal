import React from "react";
import { Row } from "react-bootstrap";
import AdminAllOrdersItem from "./AdminAllOrdersItem";
import useUserGetAllOrder from "./../../hook/user/user-get-all-order-hook";
import Pagination from "../Uitily/Pagination";

const AdminAllOrders = () => {
  const [userName, results, paginate, orderData, onPress] =
    useUserGetAllOrder();

  console.log("AdminAllOrders - Order data:", orderData);
  console.log("AdminAllOrders - Pagination:", paginate);

  return (
    <div>
      <div className="admin-content-text">ادارة جميع الطلبات</div>
      <Row className="justify-content-start">
        {orderData && orderData.length >= 1 ? (
          orderData.map((orderItem, index) => {
            return (
              <AdminAllOrdersItem
                key={orderItem._id || index}
                orderItem={orderItem}
              />
            );
          })
        ) : (
          <div className="col-12 text-center py-5">
            <h6 className="text-muted">لا يوجد طلبات حتى الآن</h6>
            <p className="text-muted">جاري تحميل الطلبات...</p>
          </div>
        )}

        {paginate && paginate.numberOfPages >= 2 ? (
          <Pagination
            onPress={onPress}
            pageCount={paginate.numberOfPages ? paginate.numberOfPages : 0}
          />
        ) : null}
      </Row>
    </div>
  );
};

export default AdminAllOrders;
