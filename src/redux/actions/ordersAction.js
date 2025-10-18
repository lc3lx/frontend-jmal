import {
  GET_ALL_ORDER,
  UPDATE_ORDER_DELIVER,
  GET_ONE_ORDER,
  UPDATE_ORDER_PAY,
  CREATE_ORDER_CASH,
} from "../type";

import { useGetDataToken } from "../../hooks/useGetData";
import { useInsUpdateData } from "../../hooks/useUpdateData";
import { useInsertData } from "../../hooks/useInsertData";

export const getAllOrders = (page, limit) => async (dispatch) => {
  try {
    console.log("Fetching orders page:", page, "limit:", limit);
    const response = await useGetDataToken(
      `/api/v1/orders?limit=${limit}&page=${page}`
    );
    console.log("Orders response:", response);
    dispatch({
      type: GET_ALL_ORDER,
      payload: response,
    });
  } catch (e) {
    console.error("Error fetching orders:", e);
    dispatch({
      type: GET_ALL_ORDER,
      payload: e.response,
    });
  }
};

export const getOneOrders = (id) => async (dispatch) => {
  try {
    const response = await useGetDataToken(`/api/v1/orders/${id}`);

    dispatch({
      type: GET_ONE_ORDER,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ONE_ORDER,
      payload: e.response,
    });
  }
};

export const changeOrderPay = (id) => async (dispatch) => {
  try {
    const response = await useInsUpdateData(`/api/v1/orders/${id}/pay`);

    dispatch({
      type: UPDATE_ORDER_PAY,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: UPDATE_ORDER_PAY,
      payload: e.response,
    });
  }
};

export const changeOrderDeliver = (id) => async (dispatch) => {
  try {
    const response = await useInsUpdateData(`/api/v1/orders/${id}/deliver`);

    dispatch({
      type: UPDATE_ORDER_DELIVER,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: UPDATE_ORDER_DELIVER,
      payload: e.response,
    });
  }
};

// Create new order
export const createOrder = (body) => async (dispatch) => {
  try {
    const response = await useInsertData(`/api/v1/orders`, body);

    dispatch({
      type: CREATE_ORDER_CASH,
      payload: response,
    });
    
    return response;
  } catch (e) {
    dispatch({
      type: CREATE_ORDER_CASH,
      payload: e.response,
    });
    throw e;
  }
};

// Create PayPal order
export const createPayPalOrder = (productId) => async (dispatch) => {
  try {
    const response = await useInsertData(`/api/v1/orders/paypal/create`, {
      productId,
    });
    return response;
  } catch (e) {
    console.error("PayPal order creation error:", e);
    throw e;
  }
};

// Capture PayPal order
export const capturePayPalOrder = (orderId) => async (dispatch) => {
  try {
    const response = await useInsertData(
      `/api/v1/orders/paypal/capture/${orderId}`,
      {}
    );
    return response;
  } catch (e) {
    console.error("PayPal order capture error:", e);
    throw e;
  }
};
