import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useInsertDataWithImage as insertDataWithImage } from "../../hooks/useInsertData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import notify from "../../hook/useNotifaction";
import avatar from "../../images/avatar.png";

const AddDiscountImageHook = () => {
  const [img, setImg] = useState(avatar);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPress, setIsPress] = useState(false);

  //to change title state
  const onChangeTitle = (event) => {
    event.persist();
    setTitle(event.target.value);
  };

  //to change description state
  const onChangeDescription = (event) => {
    event.persist();
    setDescription(event.target.value);
  };

  //to change background color state
  const onChangeBackgroundColor = (event) => {
    event.persist();
    setBackgroundColor(event.target.value);
  };

  //when image change save it
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0]);
      setImg(URL.createObjectURL(event.target.files[0]));
      setSelectedFile(event.target.files[0]);
    }
  };

  //save data in database
  const handelSubmit = async (event) => {
    event.preventDefault();

    // Frontend validation
    if (!title || title.length < 3) {
      notify("العنوان يجب أن يكون 3 أحرف على الأقل", "error");
      return;
    }

    if (!description || description.length < 5) {
      notify("الوصف يجب أن يكون 5 أحرف على الأقل", "error");
      return;
    }

    if (selectedFile === null) {
      notify("من فضلك اختر صورة", "warn");
      return;
    }

    const formData = new FormData();
    formData.append("type", "discount");
    formData.append("title", title);
    formData.append("description", description);
    formData.append("backgroundColor", backgroundColor);
    formData.append("image", selectedFile);
    formData.append("order", 0);
    formData.append("isActive", true);

    setLoading(true);
    setIsPress(true);

    try {
      console.log("Sending form data:", formData);
      const response = await insertDataWithImage(
        "/api/v1/homepage-images",
        formData
      );
      console.log("Response:", response);
      setLoading(false);

      if (response.status === 201) {
        notify("تمت إضافة صورة الخصم بنجاح", "success");
        // Reset form
        setImg(avatar);
        setTitle("");
        setDescription("");
        setBackgroundColor("");
        setSelectedFile(null);
        setLoading(true);
        setTimeout(() => setIsPress(false), 1000);
      } else {
        notify("هناك مشكلة في عملية الإضافة", "error");
        setLoading(true);
        setTimeout(() => setIsPress(false), 1000);
      }
    } catch (error) {
      console.error("Error adding discount image:", error);
      notify("هناك مشكلة في عملية الإضافة", "error");
      setLoading(true);
      setTimeout(() => setIsPress(false), 1000);
    }
  };

  return [
    img,
    title,
    description,
    backgroundColor,
    loading,
    isPress,
    handelSubmit,
    onImageChange,
    onChangeTitle,
    onChangeDescription,
    onChangeBackgroundColor,
  ];
};

export default AddDiscountImageHook;
