import React from "react";
import AdminSideBar from "../../Components/Admin/AdminSideBar";
import AdminSliderImages from "../../Components/Admin/AdminSliderImages";

const AdminSliderImagesPage = () => {
  return (
    <div className="row g-0">
      <div className="col-3">
        <AdminSideBar />
      </div>
      <div className="col-9">
        <AdminSliderImages />
      </div>
    </div>
  );
};

export default AdminSliderImagesPage;
