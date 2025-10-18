import { Row, Col } from "react-bootstrap";
import MultiImageInput from "react-multiple-image-input";
import { ToastContainer } from "react-toastify";
import AdminAddProductsHook from "./../../hook/products/add-products-hook";
import "./AdminDashboard.css";

const AdminAddProducts = () => {
  const [
    onChangePrice,
    onChangeProdName,
    category,
    price,
    images,
    setImages, // onRemove - not used here
    ,
    onSeletCategory,
    handelSubmit,
    prodName,
  ] = AdminAddProductsHook();

  return (
    <div className="admin-add-product-container">
      <Row className="justify-content-start">
        <div className="admin-content-text pb-4">إضافة منتج جديد</div>
        <Col sm="10" md="8" lg="8">
          <div className="product-form-card">
            {/* صورة المنتج */}
            <div className="form-section">
              <label className="form-label">صورة المنتج *</label>
              <MultiImageInput
                images={images}
                setImages={setImages}
                theme={"light"}
                allowCrop={false}
                max={1}
              />
              <small className="form-hint">صورة واحدة فقط بحجم مناسب</small>
            </div>

            {/* اسم المنتج */}
            <div className="form-section">
              <label className="form-label">اسم المنتج *</label>
              <input
                value={prodName}
                onChange={onChangeProdName}
                type="text"
                className="modern-input"
                placeholder="مثال: Netflix Premium"
              />
            </div>

            {/* وصف المنتج */}
            <div className="form-section">
              <label className="form-label">وصف المنتج *</label>
              <textarea
                className="modern-input modern-textarea"
                rows="4"
                placeholder="اكتب وصف تفصيلي للمنتج (20 حرف على الأقل)"
                id="description"
              />
            </div>

            {/* التصنيف والمدة */}
            <Row>
              <Col md="6">
                <div className="form-section">
                  <label className="form-label">التصنيف *</label>
                  <select
                    name="cat"
                    onChange={onSeletCategory}
                    className="modern-select"
                  >
                    <option value="0">اختر التصنيف</option>
                    {category.data
                      ? category.data.map((item, index) => {
                          return (
                            <option key={index} value={item._id}>
                              {item.name}
                            </option>
                          );
                        })
                      : null}
                  </select>
                </div>
              </Col>
              <Col md="6">
                <div className="form-section">
                  <label className="form-label">مدة الاشتراك *</label>
                  <select className="modern-select" id="duration">
                    <option value="">اختر المدة</option>
                    <option value="1 month">شهر واحد</option>
                    <option value="3 months">3 شهور</option>
                    <option value="6 months">6 شهور</option>
                    <option value="1 year">سنة كاملة</option>
                  </select>
                </div>
              </Col>
            </Row>

            {/* المخزون والسعر */}
            <Row>
              <Col md="6">
                <div className="form-section">
                  <label className="form-label">المخزون المتاح *</label>
                  <input
                    type="number"
                    className="modern-input"
                    placeholder="عدد الحسابات المتوفرة"
                    id="stock"
                    min="0"
                  />
                </div>
              </Col>
              <Col md="6">
                <div className="form-section">
                  <label className="form-label">السعر *</label>
                  <input
                    type="number"
                    className="modern-input"
                    placeholder="السعر بالريال"
                    value={price}
                    onChange={onChangePrice}
                    min="0"
                  />
                </div>
              </Col>
            </Row>

            {/* زر الحفظ */}
            <div className="form-actions">
              <button onClick={handelSubmit} className="modern-btn-save">
                <i className="fas fa-check"></i> حفظ المنتج
              </button>
            </div>
          </div>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
};

export default AdminAddProducts;
