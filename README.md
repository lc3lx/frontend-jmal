# Frontend - موقع بيع حسابات البث

واجهة أمامية مبنية على React.js لموقع بيع حسابات خدمات البث المباشر.

## 🏗️ البنية

```
frontend/
├── public/          # الملفات العامة
├── src/
│   ├── Api/         # إعدادات API
│   ├── Components/  # المكونات
│   │   ├── Admin/   # مكونات لوحة الإدمن
│   │   ├── Category/
│   │   ├── Home/
│   │   ├── Products/
│   │   ├── User/
│   │   └── Uitily/
│   ├── hook/        # Custom Hooks
│   ├── hooks/       # API Hooks
│   ├── Page/        # الصفحات
│   │   ├── Admin/
│   │   ├── Auth/
│   │   ├── Category/
│   │   ├── Home/
│   │   ├── Products/
│   │   └── User/
│   ├── redux/       # Redux Store
│   │   ├── actions/
│   │   ├── reducers/
│   │   └── store.js
│   └── images/      # الصور
└── package.json
```

## 📦 المكونات الرئيسية

### للمستخدمين

#### الصفحات
- `HomePage` - الصفحة الرئيسية مع السلايدر والمنتجات
- `ShopProductsPage` - صفحة جميع المنتجات مع الفلتر والبحث
- `ProductDetalisPage` - تفاصيل المنتج والشراء المباشر
- `AllCategoryPage` - جميع التصنيفات
- `UserAllOrdersPage` - طلبات المستخدم
- `UserProfilePage` - الملف الشخصي

#### المكونات
- `ProductCard` - بطاقة عرض المنتج
- `CategoryCard` - بطاقة عرض التصنيف
- `NavBarLogin` - شريط التنقل
- `Footer` - تذييل الصفحة
- `SideFilter` - فلتر جانبي للمنتجات

### للإدمن

#### الصفحات
- `AdminAllOrdersPage` - إدارة الطلبات
- `AdminOrderDetalisPage` - تفاصيل الطلب وإضافة معلومات الحساب
- `AdminAllProductsPage` - إدارة المنتجات
- `AdminAddProductsPage` - إضافة منتج جديد
- `AdminEditProductsPage` - تعديل منتج
- `AdminAddCategoryPage` - إضافة تصنيف
- `AdminAddCouponPage` - إضافة كوبون خصم

## 🎣 Custom Hooks

### Products
- `use-homepage-products-hook` - الحصول على منتجات الصفحة الرئيسية
- `view-all-products-hook` - عرض جميع المنتجات
- `view-products-detalis-hook` - عرض تفاصيل منتج
- `add-products-hook` - إضافة منتج (Admin)
- `edit-products-hook` - تعديل منتج (Admin)

### Orders
- `user-get-all-order-hook` - الحصول على طلبات المستخدم
- `change-order-status-hook` - تغيير حالة الطلب (Admin)
- `get-order-detalis-hook` - الحصول على تفاصيل الطلب

### Categories
- `all-category-page-hook` - الحصول على جميع التصنيفات
- `add-category-hook` - إضافة تصنيف (Admin)

### Coupons
- `add-coupon-hook` - إضافة كوبون (Admin)
- `coupon-card-hook` - إدارة الكوبونات
- `edit-coupon-hook` - تعديل كوبون (Admin)

### Auth
- `login-hook` - تسجيل الدخول
- `register-hook` - التسجيل
- `forget-password-hook` - نسيت كلمة المرور
- `reset-password-hook` - إعادة تعيين كلمة المرور

## 🔄 Redux State Management

### Reducers
- `authReducer` - حالة المصادقة
- `categoryReducer` - حالة التصنيفات
- `productsReducer` - حالة المنتجات
- `orderReducer` - حالة الطلبات
- `couponReducer` - حالة الكوبونات
- `homepageImageReducer` - حالة صور الصفحة الرئيسية

### Actions
تم تنظيم Actions حسب الوحدة:
- `authAction.js`
- `categoryAction.js`
- `productsAction.js`
- `ordersAction.js`
- `couponAction.js`
- `homepageImageAction.js`

## 🎨 التصميم

- Bootstrap 5 للتصميم الأساسي
- CSS مخصص للمكونات
- تصميم متجاوب مع جميع الأجهزة
- واجهة عربية كاملة
- ألوان عصرية وجذابة

## 🚀 التشغيل

1. تثبيت الحزم:
```bash
npm install
```

2. إنشاء ملف `.env` (اختياري):
```env
REACT_APP_API_URL=http://localhost:8000/api/v1
```

3. تشغيل التطبيق:
```bash
npm start
```

## 📝 التغييرات من المشروع الأصلي

### تم إزالة:
- ❌ مكونات السلة (Cart)
- ❌ مكونات المراجعات (Rate/Review)
- ❌ مكونات العناوين (Address)
- ❌ مكونات Wishlist
- ❌ صفحة Checkout
- ❌ جميع الـ Redux actions والـ reducers المتعلقة بالأعلى

### تم تبسيط:
- ✅ عملية الشراء - شراء مباشر بدون سلة
- ✅ صفحة الطلبات - عرض معلومات الحساب
- ✅ لوحة المستخدم - طلبات وملف شخصي فقط

## 🛣️ Routes

### Public Routes
- `/` - الصفحة الرئيسية
- `/login` - تسجيل الدخول
- `/register` - التسجيل
- `/products` - جميع المنتجات
- `/products/:id` - تفاصيل المنتج
- `/allcategory` - جميع التصنيفات
- `/products/category/:id` - منتجات تصنيف معين

### Protected User Routes
- `/user/allorders` - طلبات المستخدم
- `/user/profile` - الملف الشخصي

### Protected Admin Routes
- `/admin/allorders` - إدارة الطلبات
- `/admin/orders/:id` - تفاصيل الطلب
- `/admin/allproducts` - إدارة المنتجات
- `/admin/addproduct` - إضافة منتج
- `/admin/editproduct/:id` - تعديل منتج
- `/admin/addcategory` - إضافة تصنيف
- `/admin/addcoupon` - إضافة كوبون
- `/admin/slider-images` - إدارة السلايدر
- `/admin/discount-images` - إدارة صور العروض

## 📦 الحزم المستخدمة

- react - المكتبة الأساسية
- react-router-dom - التنقل
- redux - إدارة الحالة
- react-redux - ربط Redux مع React
- axios - HTTP client
- bootstrap - التصميم
- react-bootstrap - مكونات Bootstrap لـ React
- react-toastify - الإشعارات

## 🔐 الحماية

- `ProtectedRoute` - حماية المسارات حسب الصلاحيات
- `protected-route-hook` - التحقق من صلاحيات المستخدم
- تخزين JWT في localStorage
- إعادة توجيه تلقائية للمستخدمين غير المصرح لهم

## 📱 الصفحات الرئيسية

### الصفحة الرئيسية
- سلايدر رئيسي
- قسم العروض والخصومات
- عرض المنتجات حسب التصنيفات
- قسم تسويقي

### صفحة المنتجات
- عرض جميع المنتجات
- بحث وفلتر
- ترتيب النتائج
- Pagination

### صفحة تفاصيل المنتج
- صور المنتج
- وصف تفصيلي
- معلومات المدة والسعر
- زر شراء مباشر

### صفحة الطلبات
- قائمة الطلبات
- حالة الطلب
- معلومات الحساب (بعد التسليم)

## 🎯 المميزات

- ✅ تصميم عصري وبسيط
- ✅ واجهة سهلة الاستخدام
- ✅ متجاوبة مع جميع الأجهزة
- ✅ سرعة في التحميل
- ✅ حماية قوية
- ✅ إشعارات للمستخدم
- ✅ بحث وفلتر متقدم

---

**ملاحظة**: تأكد من تشغيل Backend قبل استخدام Frontend.
