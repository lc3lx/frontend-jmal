import { useState, useEffect } from "react";
import { createProduct } from "../../redux/actions/productsAction";
import notify from "./../../hook/useNotifaction";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from "../../redux/actions/categoryAction";

const AdminAddProductsHook = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);
  //get last catgeory state from redux
  const category = useSelector((state) => state.allCategory.category);

  //values images products
  const [images, setImages] = useState({});
  //values state
  const [prodName, setProdName] = useState("");
  const [price, setPrice] = useState("");

  const [CatID, setCatID] = useState("0");

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

  // Remove image handler (not needed as MultiImageInput handles it internally)
  const onRemove = (index) => {
    const newImages = { ...images };
    delete newImages[index];
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

    // Validation
    if (!CatID || CatID === "0" || CatID === "") {
      notify("من فضلك اختر التصنيف", "warn");
      return;
    }

    if (!prodName || prodName.trim() === "") {
      notify("من فضلك أدخل اسم المنتج", "warn");
      return;
    }

    if (!images || Object.keys(images).length === 0) {
      notify("من فضلك اختر صورة للمنتج", "warn");
      return;
    }

    if (!description || description.trim().length < 20) {
      notify("الوصف يجب أن يكون 20 حرف على الأقل", "warn");
      return;
    }

    if (!duration || duration === "") {
      notify("من فضلك اختر مدة الاشتراك", "warn");
      return;
    }

    if (!stock || stock < 0) {
      notify("من فضلك أدخل المخزون المتاح", "warn");
      return;
    }

    if (!price || price <= 0) {
      notify("من فضلك أدخل السعر", "warn");
      return;
    }

    try {
      //convert base 64 image to file
      // images is an object like { 0: 'data:image/...' }
      const firstImageKey = Object.keys(images)[0];
      const imgCover = dataURLtoFile(
        images[firstImageKey],
        Math.random() + ".png"
      );

      const formData = new FormData();
      formData.append("title", prodName);
      formData.append("description", description);
      formData.append("duration", duration);
      formData.append("stock", stock);
      formData.append("price", price);
      formData.append("category", CatID);
      formData.append("imageCover", imgCover);

      console.log("Submitting product...", {
        title: prodName,
        description: description.substring(0, 30) + "...",
        duration,
        stock,
        price,
        category: CatID,
      });

      setLoading(true);
      await dispatch(createProduct(formData));
      setLoading(false);
    } catch (error) {
      console.error("Error submitting product:", error);
      notify("حدث خطأ أثناء إضافة المنتج", "error");
      setLoading(false);
    }
  };

  //get create meesage
  const product = useSelector((state) => state.allproducts.products);

  useEffect(() => {
    if (loading === false) {
      if (product) {
        console.log("Product response:", product);
        if (product.status === 201) {
          notify("تم إضافة المنتج بنجاح", "success");
          // Reset form
          setImages({});
          setProdName("");
          setPrice("");
          setCatID("0");
          const descEl = document.getElementById("description");
          const durationEl = document.getElementById("duration");
          const stockEl = document.getElementById("stock");
          if (descEl) descEl.value = "";
          if (durationEl) durationEl.value = "";
          if (stockEl) stockEl.value = "";
        } else {
          notify("فشل في إضافة المنتج. حاول مرة أخرى", "error");
        }
      }
      setTimeout(() => setLoading(true), 1500);
    }
  }, [loading, product]);

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
