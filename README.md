# 🚀 TaskFlow: Full-Stack Task Management System


> **A secure, scalable, and responsive CRUD application engineered to demonstrate the complete software development lifecycle—from database schema design to cloud deployment.**

### 🔗 **[Live Demo](https://to-do-list-nu-puce.vercel.app/)**

---

## 📖 Overview

**TaskFlow** is more than just a to-do list; it is a full-stack architectural demonstration. It allows users to securely register, manage tasks with priority levels, and persist data across devices.

Unlike typical tutorials, this project solves real-world engineering challenges, including **Cross-Site Request Forgery (CSRF) protection**, **Mobile/Safari Intelligent Tracking Prevention (ITP)**, and **Database Object-Relational Mapping (ORM)** using Prisma.

---

## ✨ Key Features

### 🛡️ **Security & Authentication**
* **JWT Authentication:** Secure stateless authentication using JSON Web Tokens.
* **Password Hashing:** User passwords are encrypted using `bcrypt` before storage.
* **Auth Guards:** Frontend routing logic prevents unauthorized access to private pages.
* **Mobile-Compatible Security:** Implemented a **Reverse Proxy** on the frontend to unify domains. This allows secure tokens to function correctly on iOS/Safari by bypassing third-party cookie restrictions (ITP).

### ⚡ **Frontend Experience**
* **Vanilla JavaScript SPA:** Built without frameworks to demonstrate mastery of the DOM, Event Loop, and Asynchronous JavaScript.
* **Optimistic UI:** The interface updates instantly for a seamless user experience while data syncs in the background.
* **Responsive Design:** Fully optimized for Mobile, Tablet, and Desktop views.

### 🏗️ **Backend Architecture**
* **MVC Pattern:** Codebase refactored into **Models, Views (JSON), and Controllers** for maintainability and scalability.
* **RESTful API:** Clean API endpoints following standard HTTP methods (GET, POST, PUT, DELETE).
* **Prisma ORM:** Type-safe database interactions with PostgreSQL.

---

## 🛠️ Tech Stack

| Component | Technology | Usage |
| :--- | :--- | :--- |
| **Frontend** | ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow) ![HTML5](https://img.shields.io/badge/HTML5-Semantic-orange) ![CSS3](https://img.shields.io/badge/CSS3-Flexbox-blue) | Dynamic UI, State Management, Fetch API |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-Runtime-green) ![Express](https://img.shields.io/badge/Express.js-Framework-white) | REST API, Middleware, Routing |
| **Database** | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Relational_DB-blue) ![Prisma](https://img.shields.io/badge/Prisma-ORM-black) | Data Persistence, Schema Migrations |
| **DevOps** | ![Vercel](https://img.shields.io/badge/Vercel-Frontend_Hosting-black) ![Render](https://img.shields.io/badge/Render-Backend_Hosting-black) ![Neon](https://img.shields.io/badge/Neon-Cloud_DB-green) | CI/CD, Production Deployment |

---

## ⚙️ Architecture & Workflow

The application uses a decoupled architecture:
1.  **Client:** The Vercel-hosted frontend sends HTTP requests using secure tokens.
2.  **Server:** The Render-hosted Express API validates the token and processes the request.
3.  **Controller:** Business logic (in `controllers/`) determines the action.
4.  **Database:** Prisma translates the request into SQL and queries the Neon PostgreSQL DB.

---

## 🚀 Getting Started (Run Locally)

Follow these steps to set up the project on your local machine.

### Prerequisites
* Node.js (v18+)
* Git

### 1. Clone the Repository
```bash
git clone https://github.com/Hima-Kishore/To-Do-List.git
cd todo-app
```


### 2. Backend Setup

**Navigate to the backend folder and install dependencies.**
```bash
cd backend
npm install
```

**Configure Environment Variables: Create a *.env* file in the *backend/* root and add your credentials:**
```bash
DATABASE_URL="your_neon_postgres_connection_string"
JWT_SECRET="your_secret_key"
PORT=8000
```

**Initialize Database: Run the Prisma generator and start the server:**
```bash
npx prisma generate
npm run dev
```


### 3. Frontend Setup
* Open frontend/index.html with Live Server (VS Code Extension) or simply drag the file into your browser.

---

## 🧠 Engineering Challenges & Solutions

1. ### The Cross-Site Cookie Problem (CORS & ITP)
* **Challenge:** When deploying Frontend (Vercel) and Backend (Render) on different domains, mobile browsers (especially Safari on iPhone) blocked HttpOnly cookies due to Intelligent Tracking Prevention (ITP).

* **Solution:** I implemented a Reverse Proxy mechanism. This routes backend requests through the frontend domain, making them appear as "same-site" requests. This bypasses ITP restrictions and ensures stable token persistence across all devices.

2. ### Scalable Code Structure
* **Challenge:** As the application grew, the routes file became cluttered with logic.

* **Solution:** Refactored the backend into the MVC (Model-View-Controller) pattern. Route files now only handle routing, while controllers/ handle business logic. This makes the codebase modular and testable.

---

## 🔮 Future Improvements

* [ ] **Drag & Drop:** Implement a drag-and-drop interface for reordering tasks.
* [ ] **Category Tags:** Allow users to filter tasks by custom tags (Work, Personal).
* [ ] **Dark Mode:** System-preference aware dark theme.

---

## 📬 Contact

**Hima Kishore** Full Stack Developer [LinkedIn Profile](https://www.linkedin.com/in/bukya-hima-kishore) | [GitHub Profile](https://github.com/Hima-Kishore)

**If you liked this project, please give it a ⭐ on GitHub!**