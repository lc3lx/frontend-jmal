import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import "./ReviewsSection.css";

const ReviewsSection = () => {
  const allReviews = [
    { name: "ابو حصه شهاب", text: "ما شاء الله سريعين مره وثقه", rating: 5 },
    { name: "ماجد محمد", text: "متجر موثوق ورائع جدا شكرا لكم", rating: 5 },
    { name: "Abdullah S", text: "خدمة ممتازة وفي متناول الجميع", rating: 5 },
    { name: "Saad Noor", text: "اطلق متجر 🫡🫡", rating: 5 },
    { name: "عبدالله الرشيدي", text: "اجمل متجر والله انصحكم فيه", rating: 5 },
    {
      name: "nouf hussin",
      text: "سريعين ماشاءالله اشتركت وبسرعه وصلني الحساب",
      rating: 5,
    },
    { name: "يوسف بلفوز", text: "حلو مضمون يستاهل اكتر من 5 نجوم", rating: 5 },
    {
      name: "Abo Oo",
      text: "فوق التقيم وثقه من زمان اتعامل معه افضل ماجر تثق فيه",
      rating: 5,
    },
    {
      name: "عبدالملك احمد",
      text: "متجر ممتاز وعلى طول يوصلك الاشتراك",
      rating: 5,
    },
    {
      name: "Hala Hasan",
      text: "انا في ألمانيا كل اخواتي مشتركين عنكن...الباقات ممتازه",
      rating: 5,
    },
    { name: "ريناد محمد", text: "رائع جدا سرعه التسليم", rating: 5 },
    {
      name: "Hussain Alqallaf",
      text: "كل شي ممتاز وصلني باسرع وقت وشغال ١٠٠٪",
      rating: 5,
    },
    {
      name: "Waleed Hakami",
      text: "والله ممتاز حسب تجربتي وحل الدعم المشكلة بسرعة 👍🏼",
      rating: 5,
    },
    {
      name: "هيا الغامدي",
      text: "متجر رائع واسعاره ممتازة والخدمة كانت سريعة جدا",
      rating: 5,
    },
    {
      name: "saif Abdullah",
      text: "لاهنتتو ماتقصرون افضل متجر والله",
      rating: 5,
    },
    {
      name: "علي عسيري",
      text: "توصيل سريع وتعامل اكثر من رائع اشكرهم 👍🏻",
      rating: 5,
    },
    {
      name: "Khadija Hazeem",
      text: "السعر ممتاز جداً و الإجراءات سريعة",
      rating: 5,
    },
    { name: "Morouj alrashidi", text: "جودة و سعر ممتاز👍🏻", rating: 5 },
    { name: "محمد العنزي", text: "جميل جداً", rating: 5 },
    { name: "Mohammed Ali", text: "رائع", rating: 5 },
    { name: "هيام العنزي", text: "مضمون وسريع👍🏻", rating: 5 },
    {
      name: "KASSEM HASHEM",
      text: "الاستخدام فوري/ والرد على الواتساب سريع 👍",
      rating: 5,
    },
    { name: "ناصر الشهري", text: "ممتاز", rating: 5 },
    {
      name: "Said aladawi",
      text: "ممتاز وسريع في ثواني وصل الحساب",
      rating: 5,
    },
  ];

  const [index, setIndex] = useState(0);

  // Shuffle array function
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Split reviews into groups of 4
  const [reviewGroups, setReviewGroups] = useState([]);

  useEffect(() => {
    const shuffled = shuffleArray(allReviews);
    const groups = [];
    for (let i = 0; i < shuffled.length; i += 4) {
      groups.push(shuffled.slice(i, i + 4));
    }
    setReviewGroups(groups);
  }, []);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const renderStars = (rating) => {
    return "⭐".repeat(rating);
  };

  return (
    <section className="reviews-section">
      <div className="container">
        <div className="section-title">
          <h2>آراء عملائنا</h2>
          <p>اكتشف تجارب عملائنا الراضين عن خدماتنا</p>
        </div>

        <div className="reviews-carousel-container">
          <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            interval={5000}
            controls={true}
            indicators={true}
            className="reviews-carousel"
            fade={false}
            slide={true}
          >
            {reviewGroups.map((group, groupIndex) => (
              <Carousel.Item key={groupIndex} className="reviews-carousel-item">
                <div className="reviews-grid-slider">
                  {group.map((review, reviewIndex) => (
                    <div
                      key={reviewIndex}
                      className="review-card"
                      style={{
                        animationDelay: `${reviewIndex * 0.1}s`,
                      }}
                    >
                      <div className="review-header">
                        <div className="review-avatar">
                          {getInitials(review.name)}
                        </div>
                        <div className="review-info">
                          <div className="review-author">{review.name}</div>
                          <div className="review-rating">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                      </div>
                      <p className="review-text">{review.text}</p>
                    </div>
                  ))}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
