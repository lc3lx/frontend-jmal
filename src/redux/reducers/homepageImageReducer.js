import {
  GET_HOMEPAGE_IMAGES,
  GET_SLIDER_IMAGES,
  GET_DISCOUNT_IMAGES,
} from "../types/homepageImageTypes";

const initialState = {
  homepageImages: [],
  sliderImages: [],
  discountImages: [],
};

const homepageImageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HOMEPAGE_IMAGES:
      return {
        ...state,
        homepageImages: action.payload,
      };
    case GET_SLIDER_IMAGES:
      return {
        ...state,
        sliderImages: action.payload,
      };
    case GET_DISCOUNT_IMAGES:
      return {
        ...state,
        discountImages: action.payload,
      };
    default:
      return state;
  }
};

export default homepageImageReducer;
