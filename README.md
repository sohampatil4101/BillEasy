# 📚 Book Review API

A RESTful API built using **Node.js**, **Express**, and **MongoDB** that allows users to register, login, manage books, and post reviews. Authenticated users can create and review books. The API supports JWT authentication, pagination, filtering, and search functionality.

---

## 🚀 Features

- User Signup & Login (JWT-based authentication)
- Add, list, and get books (with pagination and filters)
- Post, update, and delete reviews
- Average rating for each book
- Search by book title or author (case-insensitive and partial matches)

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (JSON Web Tokens)
- dotenv
- bcryptjs

---

## 📁 Folder Structure

project-root/
│
├── index.js
├── db.js
├── .env
│
├── routes/
│ ├── auth.js
│ ├── books.js
│ ├── reviews.js
│ └── search.js
│
├── models/
│ ├── User.js
│ ├── Book.js
│ └── Review.js
│
└── middleware/
└── auth.js

