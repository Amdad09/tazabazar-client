## 🛒 Daily Price Tracker for Local Markets (কাঁচাবাজার)

### 🔗 Live Site: [https://your-deployed-site-link.com](https://your-deployed-site-link.com)

> *Track today’s bazaar prices, compare trends, and make smart purchases.*

---

### 📌 Project Objective

The goal of this project is to create a platform that helps general users track real-time prices of daily essential items across local markets. Vendors can submit price updates, and users can compare historical data, make purchases, and stay informed. This helps create transparency and supports smart buying.

---

### 🔑 Key Features

#### ✅ Public Routes

* 🏠 **Home Page** with banner, product previews, ads carousel, and extra sections
* 🛍️ **All Products Page** with filters (by date) & sorting (by price)
* 🔍 **Product Details Page** (Private Route - login required)
* 🎁 **Offers Page** (Optional Bonus)

#### ✅ Authentication & Role Management

* 🔐 Email/Password login & registration (with image upload)
* 🔐 Google OAuth (Default role: user)
* 🧾 JWT-based authentication with token stored in `localStorage`
* 🎭 Role-Based Access: Admin / Vendor / User
* 🛡️ Protected routes via custom `PrivateRoute`, `SellerRoute`, and `AdminRoute`

#### ✅ User Dashboard

* 📊 View price trends using Recharts
* ⭐ Manage watchlist (add/remove)
* 🛒 View order history
* 💬 Comment & rate market prices

#### ✅ Vendor Dashboard

* 📝 Add product with date-wise price entries
* 🧺 View, update, and delete own products
* 📢 Post & manage advertisements
* ✏️ Update rejected products with feedback

#### ✅ Admin Dashboard

* 👥 Manage all users (search by name/email, role edit)
* 📋 Approve/reject vendor products
* 🗣️ Rejection modal with feedback collection
* 📢 Approve/reject/delete advertisements
* 🛒 View all orders
* 🎁 Post special market offers *(optional bonus)*

#### ✅ UX/UI Highlights

* 📱 Fully responsive (mobile, tablet, desktop)
* 🎨 Elegant layout, eye-friendly color contrast
* 🧭 Clean alignment, spacing, and animation via Framer Motion
* 🔄 Smooth navigation without reload issues

---

### 📦 Technologies Used

#### 💻 Client Side

* React.js
* React Router DOM
* Axios & Axios Interceptor
* Firebase Auth (Google Login)
* React Hook Form + Zod
* Tailwind CSS
* Framer Motion (Animation)
* React Icons
* React Toastify
* Recharts (Data visualization)
* React DatePicker
* Stripe (Payment)

#### 🌐 Server Side

* Express.js
* MongoDB + Mongoose
* JWT
* CORS
* Dotenv
* Stripe Payment Gateway

---

### 🔐 Environment Variables Used

**Client Side:**

* `VITE_API_BASE_URL`
* `VITE_FIREBASE_API_KEY`
* `VITE_FIREBASE_AUTH_DOMAIN`
* `VITE_FIREBASE_PROJECT_ID`
* `VITE_FIREBASE_STORAGE_BUCKET`
* `VITE_FIREBASE_MESSAGING_SENDER_ID`
* `VITE_FIREBASE_APP_ID`

**Server Side:**

* `PORT`
* `MONGODB_URI`
* `JWT_SECRET`
* `STRIPE_SECRET_KEY`

✅ All sensitive credentials are secured using environment variables.

---

### 🚀 Deployment Info

| Part     | Tool Used        |
| -------- | ---------------- |
| Frontend | Vercel / Netlify |
| Backend  | Render / Cyclic  |
| Database | MongoDB Atlas    |
| Auth     | Firebase         |
| Payment  | Stripe           |

---

### 📊 Additional Features

* 🌐 Pagination on multiple pages (admin/user tables)
* 🔎 Search in All Users page (admin only, backend-implemented)
* 📉 Price trend graph comparison by date
* 💬 Comment & rating system with date + user info
* 📢 Advertisements and promotional carousel
* 🎁 Special Offers page (optional bonus route)

---

### ✅ Commit Requirements Met

* ✅ 20+ Meaningful client-side commits (with descriptive messages)
* ✅ 12+ Server-side commits (RESTful endpoints with secure access)
* ✅ Separated folders: `/client` and `/server`

---

### 🧪 Testing & Validation

* ✅ Reloading private routes doesn’t break the app
* ✅ CORS handled properly in production
* ✅ Live site runs smoothly on first load and reload
* ✅ Domain added to Firebase Auth config
* ✅ Proper toast notifications everywhere
* ✅ Fallback loading & error pages added

---

### 👤 Admin Credentials (For Testing)

```txt
Email: amdadulhaque601671@gmail.com
Password: Amdad123
```

### 💬 Author

**Name:** Amdadul Haque
**Role:** MERN Stack Developer
**Email:** mailto:amdadulhaque601671@gmail.com

--