import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOneProduct,
  getProductLike,
  getProductYouLike,
} from "../../redux/actions/productsAction";
import mobile from "../../images/mobile.png";
import { getOneCategory } from "../../redux/actions/categoryAction";
import { getOneBrand } from "../../redux/actions/brandAction";
const ViewProductsDetalisHook = (prodID) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (prodID) {
      // Reset previous data when switching products
      dispatch({ type: "GET_PRODUCT_DETALIS", payload: { data: null } });
      dispatch({ type: "GET_ONE_CATEGORY", payload: { data: null } });
      dispatch({ type: "GET_ONE_BRAND", payload: { data: null } });
      dispatch(getOneProduct(prodID));
    }
  }, [prodID, dispatch]);

  const oneProducts = useSelector((state) => state.allproducts.oneProduct);
  const oneCategory = useSelector((state) => state.allCategory.oneCategory);
  const oneBrand = useSelector((state) => state.allBrand.oneBrand);
  const productLike = useSelector((state) => state.allproducts.productLike);

  useEffect(() => {
    if (oneProducts && oneProducts.data) {
      const item = oneProducts.data;

      // Check if category exists and is valid
      if (
        item.category &&
        item.category !== "undefined" &&
        item.category !== null
      ) {
        const categoryId =
          typeof item.category === "string" ? item.category : item.category._id;

        // Validate categoryId before making API calls
        if (categoryId && categoryId !== "undefined" && categoryId.length > 0) {
          dispatch(getOneCategory(categoryId));
          dispatch(getProductLike(categoryId));
        }
      }

      // Check if brand exists and is valid
      if (item.brand && item.brand !== "undefined" && item.brand !== null) {
        const brandId =
          typeof item.brand === "string" ? item.brand : item.brand._id;

        // Validate brandId before making API calls
        if (brandId && brandId !== "undefined" && brandId.length > 0) {
          dispatch(getOneBrand(brandId));
        }
      }
    }
  }, [oneProducts, dispatch]);

  //to show products item
  let item = {};
  if (oneProducts && oneProducts.data) {
    item = oneProducts.data;
  } else {
    item = {};
  }

  //to view images gallery
  let images = [];
  if (item && item.images && Array.isArray(item.images))
    images = item.images.map((img) => {
      return { original: img };
    });
  else {
    images = [{ original: `${mobile}` }];
  }

  //to show category item
  let cat = [];
  if (oneCategory && oneCategory.data) cat = oneCategory.data;
  else cat = [];

  //to show brand item
  let brand = [];
  if (oneBrand && oneBrand.data) brand = oneBrand.data;
  else brand = [];

  let prod = [];
  if (productLike && productLike.data) prod = productLike.data;
  else prod = [];
  return [item, images, cat, brand, prod];
};

export default ViewProductsDetalisHook;
