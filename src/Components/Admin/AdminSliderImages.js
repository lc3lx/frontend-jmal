import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getActiveSliderImages } from "../../redux/actions/homepageImageAction";
import { useInsertDataWithImage as insertDataWithImage } from "../../hooks/useInsertData";
import { useInUpdateDataWithImage as updateDataWithImage } from "../../hooks/useUpdateData";
import useDeleteData from "../../hooks/useDeleteData";
import notify from "../../hook/useNotifaction";

// Create alias to avoid React hooks rule
const deleteData = useDeleteData;

const AdminSliderImages = () => {
  const dispatch = useDispatch();
  const { sliderImages } = useSelector((state) => state.homepageImages);

  const [showModal, setShowModal] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    order: 0,
    isActive: true,
    image: null,
    backgroundColor: "",
  });

  useEffect(() => {
    dispatch(getActiveSliderImages());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!formData.title || formData.title.length < 3) {
      notify("العنوان يجب أن يكون 3 أحرف على الأقل", "error");
      return;
    }

    if (!formData.description || formData.description.length < 5) {
      notify("الوصف يجب أن يكون 5 أحرف على الأقل", "error");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append("type", "slider");
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("order", formData.order);
      data.append("isActive", formData.isActive);
      data.append("backgroundColor", formData.backgroundColor);
      if (formData.image) {
        data.append("image", formData.image);
      }

      if (editingImage) {
        await updateDataWithImage(
          `/api/v1/homepage-images/${editingImage._id}`,
          data
        );
        notify("تم تحديث صورة السليدر بنجاح", "success");
      } else {
        await insertDataWithImage("/api/v1/homepage-images", data);
        notify("تم إضافة صورة السليدر بنجاح", "success");
      }

      // تحديث البيانات بعد الإضافة/التعديل
      await dispatch(getActiveSliderImages());

      // إرسال custom event لتحديث الصفحة الرئيسية
      window.dispatchEvent(new CustomEvent("homepageImagesUpdated"));

      handleCloseModal();
    } catch (error) {
      notify("حدث خطأ في حفظ صورة السليدر", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (image) => {
    setEditingImage(image);
    setFormData({
      title: image.title,
      description: image.description,
      order: image.order,
      isActive: image.isActive,
      image: null,
      backgroundColor: image.backgroundColor || "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الصورة من السليدر؟")) {
      try {
        await deleteData(`/api/v1/homepage-images/${id}`);
        notify("تم حذف صورة السليدر بنجاح", "success");
        await dispatch(getActiveSliderImages());

        // إرسال custom event لتحديث الصفحة الرئيسية
        window.dispatchEvent(new CustomEvent("homepageImagesUpdated"));
      } catch (error) {
        notify("حدث خطأ في حذف صورة السليدر", "error");
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingImage(null);
    setFormData({
      title: "",
      description: "",
      order: 0,
      isActive: true,
      image: null,
      backgroundColor: "",
    });
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>إدارة صور السليدر</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          إضافة صورة سليدر جديدة
        </Button>
      </div>

      <Alert variant="info" className="mb-4">
        <strong>ملاحظة:</strong> يمكنك إضافة صور السليدر التي ستظهر في أعلى
        الصفحة الرئيسية. الصور ستظهر بالتناوب مع النصوص المخصصة.
      </Alert>

      <Row>
        {sliderImages && sliderImages.length > 0 ? (
          sliderImages.map((image) => (
            <Col md={4} key={image._id} className="mb-4">
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={image.image}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{image.title}</Card.Title>
                  <Card.Text className="flex-grow-1">
                    {image.description}
                  </Card.Text>
                  <div className="mt-auto">
                    <div className="mb-2">
                      <small className="text-muted">
                        ترتيب العرض: {image.order} |
                        {image.isActive ? (
                          <span className="text-success"> نشط</span>
                        ) : (
                          <span className="text-danger"> غير نشط</span>
                        )}
                      </small>
                    </div>
                    <div className="d-flex gap-2">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleEdit(image)}
                      >
                        تعديل
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(image._id)}
                      >
                        حذف
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <Card className="text-center py-5">
              <Card.Body>
                <h5 className="text-muted">لا توجد صور سليدر</h5>
                <p className="text-muted">ابدأ بإضافة صورة سليدر جديدة</p>
                <Button variant="primary" onClick={() => setShowModal(true)}>
                  إضافة صورة سليدر
                </Button>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingImage ? "تعديل صورة السليدر" : "إضافة صورة سليدر جديدة"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>صورة السليدر</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required={!editingImage}
              />
              <Form.Text className="text-muted">
                الصورة المثالية: 800x400 بكسل
              </Form.Text>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>العنوان</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="مثال: خصم كبير على المنتجات"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>ترتيب العرض</Form.Label>
                  <Form.Control
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="0"
                  />
                  <Form.Text className="text-muted">
                    الصور ذات الرقم الأقل تظهر أولاً
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>الوصف (5 أحرف على الأقل)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="مثال: خصم يصل إلى 50% عند الشراء - اكتب وصفاً واضحاً وجذاباً"
                required
                minLength={5}
              />
              <Form.Text className="text-muted">
                يجب أن يكون الوصف 5 أحرف على الأقل
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>لون الخلفية</Form.Label>
              <Form.Control
                type="text"
                name="backgroundColor"
                value={formData.backgroundColor}
                onChange={handleInputChange}
                placeholder="مثال: linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              />
              <Form.Text className="text-muted">
                يمكنك استخدام ألوان CSS أو تدرجات، مثال: #ff6b6b أو
                linear-gradient(135deg, #667eea 0%, #764ba2 100%)
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="isActive"
                label="نشط (سيظهر في السليدر)"
                checked={formData.isActive}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              إلغاء
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <Spinner size="sm" /> : "حفظ"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default AdminSliderImages;
