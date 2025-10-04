import React from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import AddSliderImageHook from "../../hook/homepage/add-slider-image-hook";

const AdminAddSliderImage = () => {
  const [
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
  ] = AddSliderImageHook();

  return (
    <div>
      <Row className="justify-content-start ">
        <div className="admin-content-text pb-4">إضافة صورة سليدر جديدة</div>
        <Col sm="8">
          <div className="text-form pb-2">صورة السليدر</div>
          <div>
            <label htmlFor="upload-photo">
              <img
                src={img}
                alt="slider preview"
                height="100px"
                width="120px"
                style={{ cursor: "pointer" }}
              />
            </label>
            <input
              type="file"
              name="photo"
              onChange={onImageChange}
              id="upload-photo"
            />
          </div>

          <input
            onChange={onChangeTitle}
            value={title}
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="عنوان السليدر"
          />

          <textarea
            className="input-form-area p-2 mt-3"
            rows="3"
            placeholder="وصف السليدر (5 أحرف على الأقل)"
            value={description}
            onChange={onChangeDescription}
          />

          <input
            onChange={onChangeBackgroundColor}
            value={backgroundColor}
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="لون الخلفية (اختياري) - مثال: #ff0000"
          />
        </Col>
      </Row>
      <Row>
        <Col sm="8" className="d-flex justify-content-end ">
          <button onClick={handelSubmit} className="btn-save d-inline mt-2 ">
            إضافة صورة السليدر
          </button>
        </Col>
      </Row>

      {isPress ? (
        loading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <h4>تم الانتهاء</h4>
        )
      ) : null}
      <ToastContainer />
    </div>
  );
};

export default AdminAddSliderImage;
