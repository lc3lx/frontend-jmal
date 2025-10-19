import React from "react";

import HeroSection from "./../../Components/Home/HeroSection";
import StatsSection from "./../../Components/Home/StatsSection";
import FeaturesSection from "./../../Components/Home/FeaturesSection";
import ReviewsSection from "./../../Components/Home/ReviewsSection";
import Silder from "./../../Components/Home/Silder";
import DiscountSection from "./../../Components/Home/DiscountSection";
import CategoryWithProducts from "./../../Components/Home/CategoryWithProducts";
import MarketingSection from "../../Components/Home/MarketingSection";

import useHomepageProducts from "./../../hook/products/use-homepage-products-hook";
import "./../../Components/Home/HomePage.css";

const HomePage = () => {
  // Get products for homepage - automatically gets first 3 categories with 3 products each
  const { categories, products, loading, error } = useHomepageProducts();

  console.log("HomePage - Categories:", categories);
  console.log("HomePage - Products:", products);
  console.log("HomePage - Loading:", loading);
  console.log("HomePage - Error:", error);
  return (
    <div className="font homepage-container" style={{ minHeight: "670px" }}>
      <div className="slider-container">
        <Silder />
      </div>

      <DiscountSection />

      {/* Loading indicator */}
      {loading && (
        <div className="container py-3 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">جاري التحميل...</span>
          </div>
          <p className="mt-2">جاري تحميل المنتجات...</p>
        </div>
      )}

      <div className="products-section">
        {categories && categories.length > 0
          ? categories.map((category, index) => {
              const categoryData = products[category._id];
              const categoryProducts = categoryData
                ? categoryData.products
                : [];

              console.log(
                `Category ${index + 1}:`,
                category.name,
                "Products:",
                categoryProducts.length
              );

              return (
                <CategoryWithProducts
                  key={category._id}
                  category={category}
                  products={categoryProducts}
                />
              );
            })
          : !loading && (
              <div className="container py-5 text-center">
                <h4 className="text-muted">لا توجد تصنيفات متاحة</h4>
              </div>
            )}
      </div>

      {/* Error messages */}
      {error && (
        <div className="container py-3">
          <div className="alert alert-warning">
            <strong>تحذير:</strong> حدث خطأ في تحميل المنتجات: {error}
          </div>
        </div>
      )}

      {/* Reviews Section */}
      <ReviewsSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Stats Section */}
      <StatsSection />

      {/* <MarketingSection /> */}
    </div>
  );
};

export default HomePage;
