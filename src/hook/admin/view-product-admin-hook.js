import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/productsAction";
import { getAllProductsPage } from "./../../redux/actions/productsAction";

const ViewProductAdminHook = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Loading products on mount");
    dispatch(getAllProducts(8));
  }, []);

  const onPress = async (page) => {
    console.log("Loading products page:", page);
    await dispatch(getAllProductsPage(page, 8));
  };
  let items = [];
  let pagination = [];
  const allProducts = useSelector((state) => state.allproducts.allProducts);

  console.log("All products state:", allProducts);

  try {
    if (allProducts && allProducts.data) {
      items = allProducts.data;
      console.log("Products loaded:", items.length);
    } else {
      items = [];
      console.log("No products data");
    }

    if (allProducts && allProducts.paginationResult) {
      pagination = allProducts.paginationResult.numberOfPages;
      console.log("Pagination:", pagination);
    } else {
      pagination = [];
      console.log("No pagination data");
    }
  } catch (e) {
    console.error("Error in ViewProductAdminHook:", e);
  }
  return [items, pagination, onPress];
};

export default ViewProductAdminHook;
