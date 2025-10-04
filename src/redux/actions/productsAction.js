import { useInsertDataWithImage } from "../../hooks/useInsertData";
import {
  DELETE_PRODUCTS,
  GET_ALL_PRODUCTS_CATEGORY,
  GET_ALL_PRODUCTS_BRAND,
  UPDATE_PRODUCTS,
  CREATE_PRODUCTS,
  GET_PRODUCT_LIKE,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_DETALIS,
  GET_ERROR,
} from "../type";
import { useGetData } from "./../../hooks/useGetData";
import useDeleteData from "./../../hooks/useDeleteData";
import { useInUpdateDataWithImage } from "../../hooks/useUpdateData";

//create products with pagination
export const createProduct = (formatData) => async (dispatch) => {
  try {
    const response = await useInsertDataWithImage(
      "/api/v1/products",
      formatData
    );
    dispatch({
      type: CREATE_PRODUCTS,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error  " + e,
    });
  }
};

//get all products with pagination
export const getAllProducts = (limit) => async (dispatch) => {
  try {
    console.log("Fetching products with limit:", limit);
    const response = await useGetData(`/api/v1/products?limit=${limit}`);
    console.log("Products response:", response);
    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: response,
      loading: false,
    });
  } catch (e) {
    console.error("Error fetching products:", e);
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

//get all products by category
export const getAllProductsByCategory =
  (page, limit, categoryID) => async (dispatch) => {
    try {
      const response = await useGetData(
        `/api/v1/products?limit=${limit}&category=${categoryID}&page=${page}`
      );
      dispatch({
        type: GET_ALL_PRODUCTS_CATEGORY,
        payload: response,
        loading: true,
      });
    } catch (e) {
      dispatch({
        type: GET_ALL_PRODUCTS_CATEGORY,
        payload: e.response,
      });
    }
  };

//get all products by brand
export const getAllProductsByBrand =
  (page, limit, brandID) => async (dispatch) => {
    try {
      const response = await useGetData(
        `/api/v1/products?limit=${limit}&brand=${brandID}&page=${page}`
      );
      dispatch({
        type: GET_ALL_PRODUCTS_BRAND,
        payload: response,
        loading: true,
      });
    } catch (e) {
      dispatch({
        type: GET_ALL_PRODUCTS_BRAND,
        payload: e.response,
      });
    }
  };

//get all products with pagination with pages number
export const getAllProductsPage = (page, limit) => async (dispatch) => {
  try {
    console.log("Fetching products page:", page, "limit:", limit);
    const response = await useGetData(
      `/api/v1/products?page=${page}&limit=${limit}`
    );
    console.log("Products page response:", response);
    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: response,
      loading: false,
    });
  } catch (e) {
    console.error("Error fetching products page:", e);
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

//get all products with query string
export const getAllProductsSearch = (queryString) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/products?${queryString}`);
    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

//get one product with id
export const getOneProduct = (id) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/products/${id}`);
    dispatch({
      type: GET_PRODUCT_DETALIS,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

//get one product with id
export const getProductLike = (id) => async (dispatch) => {
  try {
    // Validate id before making API call
    if (!id || id === "undefined" || id === null || id.length === 0) {
      dispatch({
        type: GET_PRODUCT_LIKE,
        payload: { data: [] },
        loading: false,
      });
      return;
    }

    const response = await useGetData(`/api/v1/products?category=${id}`);
    dispatch({
      type: GET_PRODUCT_LIKE,
      payload: response,
      loading: true,
    });
  } catch (e) {
    console.log("Error fetching similar products:", e);
    dispatch({
      type: GET_PRODUCT_LIKE,
      payload: { data: [] },
      loading: false,
    });
  }
};

//delete prooduct with id
export const deleteProducts = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/products/${id}`);

    dispatch({
      type: DELETE_PRODUCTS,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

//update prooduct with id
export const updateProducts = (id, data) => async (dispatch) => {
  try {
    console.log("Updating product with ID:", id);
    const response = await useInUpdateDataWithImage(
      `/api/v1/products/${id}`,
      data
    );
    console.log("Update response:", response);
    dispatch({
      type: UPDATE_PRODUCTS,
      payload: response,
      loading: false,
    });
  } catch (e) {
    console.error("Error updating product:", e);
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};
