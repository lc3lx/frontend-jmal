import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import brandReducer from "./brandReducer";
import subcategoryReducer from "./subcategoryReducer";
import productsReducer from "./productsReducer";
import authReducer from "./authReducer";
import couponReducer from "./couponReducer";
import orderReducer from "./orderReducer";
import homepageImageReducer from "./homepageImageReducer";

export default combineReducers({
  allCategory: categoryReducer,
  allBrand: brandReducer,
  subCategory: subcategoryReducer,
  allproducts: productsReducer,
  authReducer: authReducer,
  couponReducer: couponReducer,
  orderReducer: orderReducer,
  homepageImages: homepageImageReducer,
});
