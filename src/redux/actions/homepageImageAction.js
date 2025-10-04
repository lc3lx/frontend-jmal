import {
  GET_HOMEPAGE_IMAGES,
  GET_SLIDER_IMAGES,
  GET_DISCOUNT_IMAGES,
} from "../types/homepageImageTypes";
import { useGetData } from "../../hooks/useGetData";

export const getHomepageImages = () => async (dispatch) => {
  try {
    const response = await useGetData("/api/v1/homepage-images");
    dispatch({
      type: GET_HOMEPAGE_IMAGES,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error fetching homepage images:", error);
  }
};

export const getActiveSliderImages = () => async (dispatch) => {
  try {
    console.log("Fetching slider images...");
    const response = await useGetData("/api/v1/homepage-images/slider/active");
    console.log("Slider images response:", response);
    dispatch({
      type: GET_SLIDER_IMAGES,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error fetching slider images:", error);
  }
};

export const getActiveDiscountImages = () => async (dispatch) => {
  try {
    const response = await useGetData(
      "/api/v1/homepage-images/discount/active"
    );
    dispatch({
      type: GET_DISCOUNT_IMAGES,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error fetching discount images:", error);
  }
};
