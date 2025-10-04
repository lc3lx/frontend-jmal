import { CREATE_SUB_CATEGORY, GET_SUB_CATEGORY, GET_ERROR } from "../type";
import { useGetData } from "../../hooks/useGetData";
import { useInsertData } from "../../hooks/useInsertData";

//gcreate sub category with pagination
export const createSubCategory = (data) => async (dispatch) => {
  try {
    const response = await useInsertData("/api/v1/subcategories", data);
    dispatch({
      type: CREATE_SUB_CATEGORY,
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

//get sub category depend in cat id
export const getOneCategory = (id) => async (dispatch) => {
  try {
    // Validate and extract id
    let categoryId = id;
    if (typeof id === "object" && id !== null) {
      categoryId = id._id || id.id || id;
    }

    // Ensure we have a valid string id
    if (!categoryId || categoryId === "undefined" || categoryId === null) {
      dispatch({
        type: GET_SUB_CATEGORY,
        payload: { data: [] },
        loading: false,
      });
      return;
    }

    const response = await useGetData(
      `/api/v1/categories/${categoryId}/subcategories`
    );

    dispatch({
      type: GET_SUB_CATEGORY,
      payload: response,
      loading: false,
    });
  } catch (e) {
    console.error("Error fetching subcategories:", e);
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};
