import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  Headset,
  ShieldCheck,
  Clock,
  Truck,
  CreditCard,
  Award,
} from "react-bootstrap-icons";

const MarketingSection = () => {
  const features = [
    {
      icon: <Headset className="text-primary" size={40} />,
      title: "دعم فني 24/7",
      description: "فريقنا متاح على مدار الساعة لمساعدتك في أي وقت",
    },
    {
      icon: <ShieldCheck className="text-success" size={40} />,
      title: "أمان وثقة",
      description: "معاملات آمنة ومحمية بأحدث تقنيات التشفير",
    },
    {
      icon: <Clock className="text-warning" size={40} />,
      title: "توصيل سريع",
      description: "توصيل خلال 24-48 ساعة لجميع أنحاء المملكة",
    },
    {
      icon: <Truck className="text-info" size={40} />,
      title: "شحن مجاني",
      description: "شحن مجاني للطلبات التي تزيد عن 200 ريال",
    },
    {
      icon: <CreditCard className="text-danger" size={40} />,
      title: "دفع آمن",
      description: "طرق دفع متعددة وآمنة مع ضمان استرداد المال",
    },
    {
      icon: <Award className="text-primary" size={40} />,
      title: "جودة مضمونة",
      description: "منتجات أصلية 100% مع ضمان الجودة",
    },
  ];

  return (
    <div className="marketing-section bg-light py-5">
      <Container>
        <Row className="mb-5">
          <Col className="text-center">
            <h2 className="fw-bold text-primary mb-3">لماذا تختارنا؟</h2>
            <p className="text-muted fs-5">
              نحن نقدم أفضل تجربة تسوق مع ضمانات لا مثيل لها
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          {features.map((feature, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={2}>
              <div className="text-center h-100 d-flex flex-column justify-content-center">
                <div className="mb-3">{feature.icon}</div>
                <h6 className="fw-bold text-dark mb-2">{feature.title}</h6>
                <p className="text-muted small mb-0">{feature.description}</p>
              </div>
            </Col>
          ))}
        </Row>

        <Row className="mt-5">
          <Col className="text-center">
            <div className="bg-primary text-white rounded-3 p-4">
              <h4 className="fw-bold mb-3">
                انضم إلى أكثر من 50,000 عميل راضي
              </h4>
              <p className="mb-0 fs-5">
                تسوق بثقة مع ضماناتنا الشاملة ودعمنا المستمر
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MarketingSection;
