import React, { useState, useEffect } from "react";
import { createProduct } from "../../redux/actions/productsAction";
import notify from "./../../hook/useNotifaction";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from "../../redux/actions/categoryAction";

const AdminAddProductsHook = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory());
  }, []);
  //get last catgeory state from redux
  const category = useSelector((state) => state.allCategory.category);

  //values images products
  const [images, setImages] = useState([]);
  //values state
  const [prodName, setProdName] = useState("");
  const [price, setPrice] = useState("");

  const [CatID, setCatID] = useState("");

  const [loading, setLoading] = useState(true);

  //to change name state
  const onChangeProdName = (event) => {
    event.persist();
    setProdName(event.target.value);
  };
  //to change price
  const onChangePrice = (event) => {
    event.persist();
    setPrice(event.target.value);
  };

  // Remove image handler
  const onRemove = (index) => {
    const newImages = images.filter((img, i) => i !== index);
    setImages(newImages);
  };

  //when select category store id
  const onSeletCategory = (e) => {
    setCatID(e.target.value);
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

  //to save data
  const handelSubmit = async (e) => {
    e.preventDefault();

    const description = document.getElementById("description").value;
    const duration = document.getElementById("duration").value;
    const stock = document.getElementById("stock").value;

    if (
      CatID === 0 ||
      prodName === "" ||
      images.length <= 0 ||
      !price ||
      price <= 0 ||
      !description ||
      description.length < 20 ||
      !duration ||
      !stock ||
      stock < 0
    ) {
      notify("من فضلك اكمل جميع البيانات المطلوبة", "warn");
      return;
    }

    //convert base 64 image to file
    const imgCover = dataURLtoFile(images[0], Math.random() + ".png");

    const formData = new FormData();
    formData.append("title", prodName);
    formData.append("description", description);
    formData.append("duration", duration);
    formData.append("stock", stock);
    formData.append("price", price);
    formData.append("category", CatID);
    formData.append("imageCover", imgCover);

    setLoading(true);
    await dispatch(createProduct(formData));
    setLoading(false);
  };

  //get create meesage
  const product = useSelector((state) => state.allproducts.products);

  useEffect(() => {
    if (loading === false) {
      setImages([]);
      setProdName("");
      setPrice("");
      document.getElementById("description").value = "";
      document.getElementById("duration").value = "";
      document.getElementById("stock").value = "";

      setTimeout(() => setLoading(true), 1500);

      if (product) {
        if (product.status === 201) {
          notify("تم الاضافة بنجاح", "success");
        } else {
          notify("هناك مشكله", "error");
        }
      }
    }
  }, [loading]);

  return [
    onChangePrice,
    onChangeProdName,
    category,
    price,
    images,
    setImages,
    onRemove,
    onSeletCategory,
    handelSubmit,
    prodName,
  ];
};

export default AdminAddProductsHook;
