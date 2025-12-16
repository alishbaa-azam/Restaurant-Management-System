# MongoDB Data Storage - Complete Flow

## ✅ Customer Data Storage Verification

Your restaurant system **saves all customer data to MongoDB** automatically. Here's the complete flow:

---

## 1. CUSTOMER REGISTRATION (MongoDB User Collection)

### Frontend Flow:
- User fills login form at `/admin/login`
- Clicks "Register as Customer" or "Demo Customer"
- Form data sent to backend via `api.auth.register()`

### Backend Processing:
- **Endpoint:** `POST /api/auth/register`
- **File:** `backend/controllers/auth.controller.js`
- **Model:** `backend/models/user.model.js`
- **Process:**
  1. Validate email, name, password
  2. Check if email already exists in DB
  3. Hash password with bcrypt (10 rounds)
  4. Create new User document in MongoDB
  5. Generate JWT token (7-day expiry)
  6. Return token + user data to frontend

### Saved Data (Users Collection):
```
{
  _id: ObjectId,
  name: "Customer Name",
  email: "customer@example.com",
  password: "hashed_password_bcrypt",
  role: "customer",
  createdAt: Date
}
```

---

## 2. CUSTOMER CONTACT INQUIRIES (MongoDB Contact Collection)

### Frontend Flow:
- User navigates to `/contact`
- Fills form (name, phone, email, address, query)
- Clicks "Submit Query"

### Backend Processing:
- **Endpoint:** `POST /api/contact`
- **File:** `backend/controllers/contact.controller.js`
- **Model:** `backend/models/contact.model.js`
- **Process:**
  1. Validate required fields
  2. Create new Contact document
  3. Save to MongoDB with timestamp
  4. Return success message

### Saved Data (Contact Collection):
```
{
  _id: ObjectId,
  fullName: "Customer Name",
  phoneNumber: "+91 XXXXXX",
  emailAddress: "email@example.com",
  address: "Delivery address",
  dishName: "Butter Chicken",
  query: "User's message",
  status: "new" | "read" | "replied",
  createdAt: Date
}
```

---

## 3. CUSTOMER ORDERS (MongoDB Order Collection)

### Frontend Flow:
- Customer adds items to cart
- Clicks "Checkout"
- Confirms delivery details
- Submits order

### Backend Processing:
- **Endpoint:** `POST /api/customer/orders`
- **File:** `backend/controllers/customer/order.controller.js`
- **Model:** `backend/models/order.model.js`
- **Process:**
  1. Verify customer is authenticated (JWT)
  2. Enrich items with current product prices
  3. Create Order with items array
  4. Link to User via user._id (Reference)
  5. Save to MongoDB
  6. Return order details

### Saved Data (Order Collection):
```
{
  _id: ObjectId,
  user: ObjectId (Reference to User),
  items: [
    {
      product: ObjectId,
      name: "Butter Chicken",
      qty: 2,
      price: 250
    }
  ],
  shippingAddress: "123 Main Street",
  paymentMethod: "credit_card",
  totalPrice: 500,
  status: "pending" | "processing" | "completed" | "cancelled",
  createdAt: Date
}
```

---

## 4. MENU PRODUCTS (MongoDB Product Collection)

### Admin Flow:
- Admin logs in with role 'admin'
- Navigates to `/admin/menu`
- Adds/edits/deletes menu items
- Selects image from assets

### Backend Processing:
- **Create:** `POST /api/admin/products`
- **Update:** `PUT /api/admin/products/:id`
- **Delete:** `DELETE /api/admin/products/:id`
- **Model:** `backend/models/product.model.js`

### Saved Data (Product Collection):
```
{
  _id: ObjectId,
  name: "Menu Item Name",
  description: "Item description",
  price: 250,
  category: "Main Course",
  image: "/src/assets/ItemName.png",
  stock: 50,
  createdAt: Date
}
```

---

## 5. DATABASE COLLECTIONS STRUCTURE

Your MongoDB database has these collections:

```
Restaurant DB
├── users (Customers & Admins)
│   ├── name
│   ├── email (unique)
│   ├── password (hashed)
│   ├── role (admin/customer)
│   └── createdAt
│
├── contacts (Contact Form Submissions)
│   ├── fullName
│   ├── phoneNumber
│   ├── emailAddress
│   ├── address
│   ├── dishName
│   ├── query
│   ├── status
│   └── createdAt
│
├── orders (Customer Orders)
│   ├── user (Reference → users._id)
│   ├── items []
│   ├── shippingAddress
│   ├── paymentMethod
│   ├── totalPrice
│   ├── status
│   └── createdAt
│
└── products (Menu Items)
    ├── name
    ├── description
    ├── price
    ├── category
    ├── image
    ├── stock
    └── createdAt
```

---

## 6. AUTOMATIC DEMO DATA (Development Only)

When backend starts in development:
- **Auto-creates admin:** `admin@example.com` / `demo1234`
- **Auto-creates customer:** `customer@example.com` / `demo1234`
- Password hashed with bcrypt
- Only created if they don't already exist

Location: `backend/server.js` → `seedDemoUsers()`

---

## 7. DATA SECURITY

✅ **Passwords:** Hashed with bcryptjs (10 salt rounds)
✅ **JWT Tokens:** Signed with SECRET (7-day expiry)
✅ **Authentication:** Required for admin/customer protected routes
✅ **Database:** MongoDB Atlas (cloud-hosted)
✅ **Unique Emails:** Duplicate registration prevented at DB level

---

## 8. HOW TO VERIFY DATA IS SAVING

### Option 1: Check MongoDB Atlas Dashboard
1. Go to: https://cloud.mongodb.com
2. Login with your MongoDB credentials
3. Select "restaurant" database
4. Collections tab shows: users, contacts, orders, products
5. Click collection to view saved documents

### Option 2: Backend Console Logs
```
Running backend: npm run dev (in backend folder)
Look for logs showing:
- "MongoDB Connected: [hostname]"
- "Demo admin created: admin@example.com"
- "Demo customer created: customer@example.com"
- Post request logs as data is saved
```

### Option 3: Frontend → Backend → MongoDB Flow Test
1. **Register Customer:** Go to login page → click "Register" → submit form
2. **Submit Contact:** Go to `/contact` → fill form → click Submit
3. **Create Order:** Add items to cart → checkout
4. **Add Menu:** As admin, add product at `/admin/menu`
5. Check MongoDB Atlas to see new documents

---

## 9. ENVIRONMENT SETUP CHECK

✅ **MongoDB Connection String:** `backend/.env` → `URI` variable configured
✅ **JWT Secret:** `backend/.env` → `JWT_SECRET` configured
✅ **Database:** Connected to MongoDB Atlas
✅ **Models:** All Mongoose schemas created and exported
✅ **Controllers:** All CRUD operations implemented
✅ **Routes:** All endpoints mounted in `server.js`

---

## 10. QUICK START TEST

To verify everything works:

```bash
# Terminal 1 - Backend
cd backend
npm install  # if needed
npm run dev  # starts on port 5000

# Terminal 2 - Frontend
cd ../rms
npm run dev  # starts on port 5174

# Browser
1. Go to http://localhost:5174
2. Click Login → Register as Customer
3. Go to /contact → Submit Query
4. Check MongoDB Atlas Dashboard → See saved data ✅
```

---

## Summary

✅ **All customer data is automatically saved to MongoDB**
- Customers registering → Users collection
- Contact forms → Contacts collection  
- Orders → Orders collection (linked to Users)
- Menu items → Products collection

✅ **Data is secure** (passwords hashed, JWT protected routes)
✅ **Data is persistent** (stays in MongoDB forever unless deleted)
✅ **Data is queryable** (admin can view orders, contacts, users via backend)

Your system is **production-ready** for storing customer data! 🎉
