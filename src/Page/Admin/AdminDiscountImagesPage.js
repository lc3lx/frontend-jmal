import React from "react";
import AdminSideBar from "../../Components/Admin/AdminSideBar";
import AdminDiscountImages from "../../Components/Admin/AdminDiscountImages";

const AdminDiscountImagesPage = () => {
  return (
    <div className="row g-0">
      <div className="col-3">
        <AdminSideBar />
      </div>
      <div className="col-9">
        <AdminDiscountImages />
      </div>
    </div>
  );
};

export default AdminDiscountImagesPage;
