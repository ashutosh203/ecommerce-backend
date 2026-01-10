E-Commerce Backend API

This is the backend service for an E-Commerce application built using Node.js, Express.js, and MongoDB.
It provides APIs for User, Seller, Admin, product management, cart, and order processing.

Tech Stack

Node.js

Express.js

MongoDB (Atlas)

Mongoose

JWT Authentication

bcrypt

REST APIs

src/
│── controllers/
│ ├── user/
│ ├── seller/
│ └── admin/
│
│── routes/
│ ├── userRoutes.js
│ ├── sellerRoutes.js
│ └── adminRoutes.js
│
│── models/
│ ├── user.model.js
│ ├── seller.model.js
│ ├── product.model.js
│ ├── cart.model.js
│ └── order.model.js
│
│── middlewares/
│ ├── auth.middleware.js
│ └── role.middleware.js
│
│── utils/
│ └── errorHandler.js
│
│── app.js
│── server.js

Core Features

## User

Sign up / Login

Browse products

Add to cart

Update cart quantity

Remove from cart

Checkout (COD)

View orders

## Seller

Signup / Login

Admin approval required

Add / Edit / Delete products

Manage stock

View seller dashboard

## Admin

Login

Approve / Block sellers

Block / Unblock products

View dashboard analytics

## Cart Flow (Important)

User adds product to cart

Cart is created automatically (if not exists)

Quantity updates handled via PATCH

Total amount calculated on backend

Checkout converts cart → order

## SELLER APIs

|POST------------|/api/seller/signup
|GET-------------|/api/seller/dashboard
|POST------------|/api/seller/product/add
|GET-------------|/api/seller/product
|GET-------------|/api/seller/product/:id
|PUT-------------|/api/seller/product/update/:id
|DELETE----------|/api/seller/product/delete/:id
|GET-------------|/api/seller/profile

## ADMIN APIs

|POST-----------|/api/admin/login
|GET------------|/api/admin/dashboard
|GET------------|/api/admin/products
|PATCH----------|/api/admin/products/:productId/status
|GET------------|/api/admin/sellerList
|PATCH----------|/api/admin/seller/:sellerId/status

## USER APIs

|POST-----------|/api/user/signup
|POST-----------|/api/user/login
|GET------------|/api/user/products
|POST-----------|/api/user/favorites
|GET------------|/api/user/favorites/list
|POST-----------|/api/user/cart/add
|GET------------|/api/user/cart/getAllCart
|DELETE---------|/api/user/cart/:productId
|PATCH----------|/api/user/cart
|POST-----------|/api/user/order

Backend is deployed on Render (Free Tier).

⚠️ Note:

Free instance sleeps when inactive

Automatically wakes up on new request (cold start delay)

Security Notes

Passwords are hashed using bcrypt

JWT used for authentication

Role-based route protection

Sensitive files excluded via .gitignore

Future Improvements

Online payment integration (Stripe / Razorpay)

Order status tracking

Pagination & filtering

Address management

Email notifications

Author

Your **ASHUTOSH KUMAR SHAH**
Backend Developer (Node.js | MongoDB)
