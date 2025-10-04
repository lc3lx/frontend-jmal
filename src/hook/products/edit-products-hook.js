import React, { useState, useEffect } from "react";
import { getOneCategory } from "../../redux/actions/subcategoryAction";
import {
  createProduct,
  getOneProduct,
} from "../../redux/actions/productsAction";
import notify from "./../../hook/useNotifaction";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from "../../redux/actions/categoryAction";
import { getAllBrand } from "./../../redux/actions/brandAction";
import { updateProducts } from "./../../redux/actions/productsAction";
import baseUrl from "./../../Api/baseURL";

const AdminEditProductsHook = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const run = async () => {
      await dispatch(getOneProduct(id));
      await dispatch(getAllCategory());
      await dispatch(getAllBrand());
    };
    run();
  }, []);

  //get one product details
  const item = useSelector((state) => state.allproducts.oneProduct);
  //get last catgeory state from redux
  const category = useSelector((state) => state.allCategory.category);
  //get last brand state from redux
  const brand = useSelector((state) => state.allBrand.brand);

  //get last sub cat state from redux
  const subCat = useSelector((state) => state.subCategory.subcategory);

  const onSelect = (selectedList) => {
    setSeletedSubID(selectedList);
  };
  const onRemove = (selectedList) => {
    setSeletedSubID(selectedList);
  };

  const [options, setOptions] = useState([]);

  //values images products
  const [images, setImages] = useState({});
  //values state
  const [prodName, setProdName] = useState("");
  const [prodDescription, setProdDescription] = useState("");
  const [priceBefore, setPriceBefore] = useState("السعر قبل الخصم");
  const [priceAftr, setPriceAftr] = useState("السعر بعد الخصم");
  const [qty, setQty] = useState("الكمية المتاحة");
  const [CatID, setCatID] = useState("0");
  const [BrandID, SetBrandID] = useState("0");
  const [subCatID, setSubCatID] = useState([]);
  const [seletedSubID, setSeletedSubID] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (item && item.data) {
      console.log("Product data loaded:", item.data);
      // Convert images array to object for MultiImageInput
      const imagesArray = item.data.images || [];
      const imagesObject = {};
      imagesArray.forEach((img, index) => {
        imagesObject[index] = img;
      });
      console.log("Setting images object:", imagesObject);
      setImages(imagesObject);
      setProdName(item.data.title || "");
      setProdDescription(item.data.description || "");
      setPriceBefore(item.data.price || "");
      setQty(item.data.quantity || "");
      setCatID(item.data.category || "0");
      SetBrandID(item.data.brand || "0");
      setColors(item.data.availableColors || []);
      setLoading(false);
    } else if (item && item.error) {
      console.error("Error loading product:", item.error);
      notify("خطأ في تحميل بيانات المنتج", "error");
      setLoading(false);
    } else {
      // Ensure images is always an object
      console.log("Setting empty images object");
      setImages({});
      setLoading(false);
    }
  }, [item]);

  //to change name state
  const onChangeProdName = (event) => {
    event.persist();
    setProdName(event.target.value);
  };
  //to change name state
  const onChangeDesName = (event) => {
    event.persist();
    setProdDescription(event.target.value);
  };
  //to change name state
  const onChangePriceBefor = (event) => {
    event.persist();
    setPriceBefore(event.target.value);
  };
  //to change name state
  const onChangePriceAfter = (event) => {
    event.persist();
    setPriceAftr(event.target.value);
  }; //to change name state
  const onChangeQty = (event) => {
    event.persist();
    setQty(event.target.value);
  };
  const onChangeColor = (event) => {
    event.persist();
    setShowColor(!showColor);
  };

  //to show hide color picker
  const [showColor, setShowColor] = useState(false);
  //to store all pick color
  const [colors, setColors] = useState([]);
  //when choose new color
  const handelChangeComplete = (color) => {
    setColors([...colors, color.hex]);
    setShowColor(!showColor);
  };
  const removeColor = (color) => {
    const newColor = colors.filter((e) => e !== color);
    setColors(newColor);
  };

  //when selet category store id
  const onSeletCategory = async (e) => {
    setCatID(e.target.value);
  };
  useEffect(() => {
    if (CatID != 0) {
      const run = async () => {
        await dispatch(getOneCategory(CatID));
      };
      run();
    }
  }, [CatID]);

  useEffect(() => {
    if (subCat) {
      setOptions(subCat.data);
    }
  }, [subCat]);

  //when selet brand store id
  const onSeletBrand = (e) => {
    SetBrandID(e.target.value);
  };

  //to convert base 64 to file
  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  //convert url to file
  const convertURLtoFile = async (url) => {
    const response = await fetch(url, { mode: "cors" });
    const data = await response.blob();
    const ext = url.split(".").pop();
    const filename = url.split("/").pop();
    const metadata = { type: `image/${ext}` };
    return new File([data], Math.random(), metadata);
  };

  //to save data
  const handelSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (CatID === 0 || CatID === "0") {
      notify("من فضلك اختر التصنيف", "warn");
      return;
    }
    if (prodName === "" || prodName === "اسم المنتج") {
      notify("من فضلك أدخل اسم المنتج", "warn");
      return;
    }
    if (prodDescription === "" || prodDescription === "وصف المنتج") {
      notify("من فضلك أدخل وصف المنتج", "warn");
      return;
    }
    if (!images || Object.keys(images).length <= 0) {
      notify("من فضلك أضف صورة واحدة على الأقل", "warn");
      return;
    }
    if (priceBefore <= 0 || priceBefore === "السعر قبل الخصم") {
      notify("من فضلك أدخل السعر", "warn");
      return;
    }
    if (qty <= 0 || qty === "الكمية المتاحة") {
      notify("من فضلك أدخل الكمية", "warn");
      return;
    }
    console.log("Processing images...", images);

    // Process cover image
    let imgCover;
    try {
      const firstImageKey = Object.keys(images)[0];
      const firstImage = images[firstImageKey];
      if (firstImage && firstImage.length <= 1000) {
        imgCover = await convertURLtoFile(firstImage);
      } else if (firstImage) {
        imgCover = dataURLtoFile(firstImage, Math.random() + ".png");
      } else {
        notify("من فضلك أضف صورة غلاف", "warn");
        return;
      }
    } catch (error) {
      console.error("Error processing cover image:", error);
      notify("خطأ في معالجة صورة الغلاف", "error");
      return;
    }

    // Process additional images
    let itemImages = [];
    try {
      const imageKeys = Object.keys(images);
      for (let i = 0; i < imageKeys.length; i++) {
        const index = imageKeys[i];
        const image = images[index];
        if (image && image.length <= 1000) {
          const convertedImage = await convertURLtoFile(image);
          itemImages.push(convertedImage);
        } else if (image) {
          itemImages.push(dataURLtoFile(image, Math.random() + ".png"));
        }
      }
    } catch (error) {
      console.error("Error processing additional images:", error);
      notify("خطأ في معالجة الصور الإضافية", "error");
      return;
    }

    const formData = new FormData();
    formData.append("title", prodName);
    formData.append("description", prodDescription);
    formData.append("quantity", qty);
    formData.append("price", priceBefore);

    formData.append("category", CatID);
    formData.append("brand", BrandID);

    setTimeout(() => {
      formData.append("imageCover", imgCover);
      itemImages.map((item) => formData.append("images", item));
    }, 1000);

    setTimeout(() => {
      console.log(imgCover);
      console.log(itemImages);
    }, 1000);

    colors.map((color) => formData.append("availableColors", color));
    seletedSubID.map((item) => formData.append("subcategory", item._id));
    setTimeout(async () => {
      try {
        setLoading(true);
        await dispatch(updateProducts(id, formData));
        setLoading(false);
      } catch (error) {
        console.error("Error updating product:", error);
        setLoading(false);
        notify("حدث خطأ في تحديث المنتج", "error");
      }
    }, 1000);
  };

  //get create meesage
  const product = useSelector((state) => state.allproducts.updateProducts);

  useEffect(() => {
    if (loading === false) {
      if (product) {
        console.log("Update product response:", product);
        if (product.status === 200) {
          notify("تم التعديل بنجاح", "success");
          // Reset form after successful update
          setTimeout(() => {
            setColors([]);
            setImages({});
            setProdName("");
            setProdDescription("");
            setPriceBefore("السعر قبل الخصم");
            setPriceAftr("السعر بعد الخصم");
            setQty("الكمية المتاحة");
            SetBrandID(0);
            setSeletedSubID([]);
            setLoading(true);
          }, 1500);
        } else {
          notify("هناك مشكلة في التحديث", "error");
        }
      }
    }
  }, [loading, product]);

  return [
    CatID,
    BrandID,
    onChangeDesName,
    onChangeQty,
    onChangeColor,
    onChangePriceAfter,
    onChangePriceBefor,
    onChangeProdName,
    showColor,
    category,
    brand,
    priceAftr,
    images,
    setImages,
    onSelect,
    onRemove,
    options,
    handelChangeComplete,
    removeColor,
    onSeletCategory,
    handelSubmit,
    onSeletBrand,
    colors,
    priceBefore,
    qty,
    prodDescription,
    prodName,
  ];
};

export default AdminEditProductsHook;
