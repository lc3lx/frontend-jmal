import HomePage from "./Page/Home/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBarLogin from "./Components/Uitily/NavBarLogin";
import Footer from "./Components/Uitily/Footer";
import LoginPage from "./Page/Auth/LoginPage";
import RegisterPage from "./Page/Auth/RegisterPage";
import AllCategoryPage from "./Page/Category/AllCategoryPage";
import ShopProductsPage from "./Page/Products/ShopProductsPage";
import ProductDetalisPage from "./Page/Products/ProductDetalisPage";
import AdminAllProductsPage from "./Page/Admin/AdminAllProductsPage";
import AdminAllOrdersPage from "./Page/Admin/AdminAllOrdersPage";
import AdminOrderDetalisPage from "./Page/Admin/AdminOrderDetalisPage";
import AdminAddCategoryPage from "./Page/Admin/AdminAddCategoryPage";
import AdminAddSubCategoryPage from "./Page/Admin/AdminAddSubCategoryPage";
import AdminAddProductsPage from "./Page/Admin/AdminAddProductsPage";
import UserAllOrdersPage from "./Page/User/UserAllOrdersPage";
import UserProfilePage from "./Page/User/UserProfilePage";
import AdminEditProductsPage from "./Page/Admin/AdminEditProductsPage";
import ForgetPasswordPage from "./Page/Auth/ForgetPasswordPage";
import VerifyPasswordPage from "./Page/Auth/VerifyPasswordPage";
import RsetPasswordPage from "./Page/Auth/ResetPasswordPage";
import AdminAddCouponPage from "./Page/Admin/AdminAddCouponPage";
import AdminEditCouponPage from "./Page/Admin/AdminEditCouponPage";
import AdminSliderImagesPage from "./Page/Admin/AdminSliderImagesPage";
import AdminDiscountImagesPage from "./Page/Admin/AdminDiscountImagesPage";
import AdminAddSliderImagePage from "./Page/Admin/AdminAddSliderImagePage";
import AdminAddDiscountImagePage from "./Page/Admin/AdminAddDiscountImagePage";
import ProtectedRouteHook from "./hook/auth/protected-route-hook";
import ProtectedRoute from "./Components/Uitily/ProtectedRoute";
import ProductsByCategory from "./Page/Products/ProductsByCategory";
function App() {
  const [isUser, isAdmin] = ProtectedRouteHook();

  return (
    <div className="font">
      <BrowserRouter>
        <NavBarLogin />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/allcategory" element={<AllCategoryPage />} />
          <Route path="/products" element={<ShopProductsPage />} />
          <Route path="/products/:id" element={<ProductDetalisPage />} />
          <Route
            path="/user/forget-password"
            element={<ForgetPasswordPage />}
          />
          <Route path="/user/verify-code" element={<VerifyPasswordPage />} />
          <Route path="/user/reset-password" element={<RsetPasswordPage />} />
          <Route
            path="/products/category/:id"
            element={<ProductsByCategory />}
          />

          <Route element={<ProtectedRoute auth={isAdmin} />}>
            <Route path="/admin/allorders" element={<AdminAllOrdersPage />} />
            <Route
              path="/admin/allproducts"
              element={<AdminAllProductsPage />}
            />
            <Route
              path="/admin/orders/:id"
              element={<AdminOrderDetalisPage />}
            />
            <Route
              path="/admin/addcategory"
              element={<AdminAddCategoryPage />}
            />
            <Route
              path="/admin/addsubcategory"
              element={<AdminAddSubCategoryPage />}
            />
            <Route
              path="/admin/addproduct"
              element={<AdminAddProductsPage />}
            />
            <Route path="/admin/addcoupon" element={<AdminAddCouponPage />} />
            <Route
              path="/admin/editcoupon/:id"
              element={<AdminEditCouponPage />}
            />
            <Route
              path="/admin/editproduct/:id"
              element={<AdminEditProductsPage />}
            />
            <Route
              path="/admin/slider-images"
              element={<AdminSliderImagesPage />}
            />
            <Route
              path="/admin/discount-images"
              element={<AdminDiscountImagesPage />}
            />
            <Route
              path="/admin/add-slider-image"
              element={<AdminAddSliderImagePage />}
            />
            <Route
              path="/admin/add-discount-image"
              element={<AdminAddDiscountImagePage />}
            />
          </Route>

          <Route element={<ProtectedRoute auth={isUser} />}>
            <Route path="/user/allorders" element={<UserAllOrdersPage />} />
            <Route path="/user/profile" element={<UserProfilePage />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
