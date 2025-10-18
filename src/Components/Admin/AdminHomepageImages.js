import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getHomepageImages } from "../../redux/actions/homepageImageAction";
import { useGetData } from "../../hooks/useGetData";
import { usePostData } from "../../hooks/usePostData";
import { usePutData } from "../../hooks/usePutData";
import { useDeleteData } from "../../hooks/useDeleteData";
import notify from "../../hook/useNotifaction";

const AdminHomepageImages = () => {
  const dispatch = useDispatch();
  const { homepageImages } = useSelector((state) => state.homepageImages);

  const [showModal, setShowModal] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "slider",
    title: "",
    description: "",
    order: 0,
    isActive: true,
    image: null,
  });

  useEffect(() => {
    dispatch(getHomepageImages());
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
    setLoading(true);

    try {
      const data = new FormData();
      data.append("type", formData.type);
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("order", formData.order);
      data.append("isActive", formData.isActive);
      if (formData.image) {
        data.append("image", formData.image);
      }

      if (editingImage) {
        await usePutData(`/api/v1/homepage-images/${editingImage._id}`, data);
        notify("تم تحديث الصورة بنجاح", "success");
      } else {
        await usePostData("/api/v1/homepage-images", data);
        notify("تم إضافة الصورة بنجاح", "success");
      }

      dispatch(getHomepageImages());
      handleCloseModal();
    } catch (error) {
      notify("حدث خطأ في حفظ الصورة", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (image) => {
    setEditingImage(image);
    setFormData({
      type: image.type,
      title: image.title,
      description: image.description,
      order: image.order,
      isActive: image.isActive,
      image: null,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الصورة؟")) {
      try {
        await useDeleteData(`/api/v1/homepage-images/${id}`);
        notify("تم حذف الصورة بنجاح", "success");
        dispatch(getHomepageImages());
      } catch (error) {
        notify("حدث خطأ في حذف الصورة", "error");
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingImage(null);
    setFormData({
      type: "slider",
      title: "",
      description: "",
      order: 0,
      isActive: true,
      image: null,
    });
  };

  const sliderImages = homepageImages.filter((img) => img.type === "slider");
  const discountImages = homepageImages.filter(
    (img) => img.type === "discount"
  );

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>إدارة صور الصفحة الرئيسية</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          إضافة صورة جديدة
        </Button>
      </div>

      {/* Slider Images */}
      <Card className="mb-4">
        <Card.Header>
          <h4>صور السليدر</h4>
        </Card.Header>
        <Card.Body>
          <Row>
            {sliderImages.map((image) => (
              <Col md={4} key={image._id} className="mb-3">
                <Card>
                  <Card.Img
                    variant="top"
                    src={`/uploads/homepage/${image.image}`}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{image.title}</Card.Title>
                    <Card.Text>{image.description}</Card.Text>
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
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>

      {/* Discount Images */}
      <Card>
        <Card.Header>
          <h4>صور قسم الخصم</h4>
        </Card.Header>
        <Card.Body>
          <Row>
            {discountImages.map((image) => (
              <Col md={4} key={image._id} className="mb-3">
                <Card>
                  <Card.Img
                    variant="top"
                    src={`/uploads/homepage/${image.image}`}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{image.title}</Card.Title>
                    <Card.Text>{image.description}</Card.Text>
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
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingImage ? "تعديل الصورة" : "إضافة صورة جديدة"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>نوع الصورة</Form.Label>
                  <Form.Select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="slider">سليدر</option>
                    <option value="discount">خصم</option>
                  </Form.Select>
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
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>العنوان</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>الوصف</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>الصورة</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required={!editingImage}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="isActive"
                label="نشط"
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

export default AdminHomepageImages;
