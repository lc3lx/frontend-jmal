import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getHomepageImages,
  getActiveSliderImages,
  getActiveDiscountImages,
} from "../../redux/actions/homepageImageAction";
import notify from "../useNotifaction";

const useHomepageImages = (type = "all") => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { homepageImages, sliderImages, discountImages } = useSelector(
    (state) => state.homepageImages
  );

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null);

        if (type === "slider") {
          await dispatch(getActiveSliderImages());
        } else if (type === "discount") {
          await dispatch(getActiveDiscountImages());
        } else {
          await dispatch(getHomepageImages());
        }
      } catch (err) {
        setError(err.message);
        notify("حدث خطأ في تحميل الصور", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [dispatch, type]);

  // إضافة useEffect لمراقبة تغييرات البيانات في الـ store
  useEffect(() => {
    if (type === "slider" && sliderImages) {
      console.log("Slider images updated:", sliderImages);
    }
  }, [sliderImages, type]);

  // إضافة listener لتحديث البيانات عند إضافة صورة جديدة
  useEffect(() => {
    const handleStorageChange = () => {
      console.log("Homepage images update triggered");
      if (type === "slider") {
        dispatch(getActiveSliderImages());
      } else if (type === "discount") {
        dispatch(getActiveDiscountImages());
      } else {
        dispatch(getHomepageImages());
      }
    };

    const handleFocus = () => {
      // إعادة تحميل البيانات عند التركيز على النافذة
      handleStorageChange();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("focus", handleFocus);

    // إضافة custom event listener للتحديث المحلي
    window.addEventListener("homepageImagesUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("homepageImagesUpdated", handleStorageChange);
    };
  }, [dispatch, type]);

  const getImages = () => {
    if (type === "slider") {
      console.log("Getting slider images:", sliderImages);
      return sliderImages;
    }
    if (type === "discount") {
      console.log("Getting discount images:", discountImages);
      return discountImages;
    }
    console.log("Getting homepage images:", homepageImages);
    return homepageImages;
  };

  return {
    images: getImages(),
    loading,
    error,
  };
};

export default useHomepageImages;
