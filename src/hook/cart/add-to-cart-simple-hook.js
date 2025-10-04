import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import notify from "../../hook/useNotifaction";
import { addProductToCart } from "./../../redux/actions/cartAction";

const AddToCartSimpleHook = (item) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // Add product to cart (simple version without color selection)
  const addToCartHandel = async () => {
    if (!item || !item._id) {
      notify("خطأ في بيانات المنتج", "error");
      return;
    }

    setLoading(true);
    try {
      await dispatch(
        addProductToCart({
          productId: item._id,
          color: "", // No color selection for simple add to cart
        })
      );
    } catch (error) {
      console.log("Error adding to cart:", error);
    }
    setLoading(false);
  };

  const res = useSelector((state) => state.cartReducer.addToCart);

  useEffect(() => {
    if (loading === false && res) {
      if (res && res.status === 200) {
        notify("تمت إضافة المنتج إلى عربة التسوق بنجاح", "success");
      } else if (res && res.status === 401) {
        notify("قم بتسجيل الدخول أولاً", "warn");
      } else if (res && res.status >= 400) {
        notify("حدث خطأ في إضافة المنتج", "error");
      }
    }
  }, [loading, res]);

  return [addToCartHandel, loading];
};

export default AddToCartSimpleHook;
