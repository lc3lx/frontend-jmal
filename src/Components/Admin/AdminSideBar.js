import React from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

const AdminSideBar = () => {
  return (
    <div className="admin-sidebar">
      <div className="d-flex flex-column">
        <div className="admin-text-side">لوحة التحكم</div>

        <Link to="/admin/allorders" className="admin-side-text">
          📋 إدارة الطلبات
        </Link>

        <Link to="/admin/allproducts" className="admin-side-text">
          📦 إدارة المنتجات
        </Link>

        <Link to="/admin/addproduct" className="admin-side-text">
          ➕ إضافة منتج
        </Link>

        <Link to="/admin/addcategory" className="admin-side-text">
          🏷️ إضافة تصنيف
        </Link>

        <Link to="/admin/addcoupon" className="admin-side-text">
          🎟️ إضافة كوبون
        </Link>

        <Link to="/admin/slider-images" className="admin-side-text">
          🖼️ صور السلايدر
        </Link>

        <Link to="/admin/discount-images" className="admin-side-text">
          💰 صور الخصومات
        </Link>
      </div>
    </div>
  );
};

export default AdminSideBar;
