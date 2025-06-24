# 📷 ChitraShaala

Welcome to **ChitraShaala** — a powerful **image management system** inspired by Google Photos. It provides authenticated users the ability to upload images, manage albums, share access with others, and interact through tags, favorites, and comments. Powered by Google OAuth2 and built with secure API handling, this project focuses on usability, privacy, and metadata-rich image organization.

---

## 🚀 Features

### 🔐 Google OAuth Authentication
- Sign in with Google (OAuth2)
- Retrieve user's email and ID
- JWT token issued upon login
- Token used for authenticated API access
- Logout clears token and session

### 📁 Album Management
- **Create Album**: Name and optional description
- **Edit Description**: Update album metadata (owner only)
- **Delete Album**: Deletes album and all its images (owner only)
- **Share Album**: Add users by email for view-only access

### 🖼️ Image Upload & Metadata
- Upload image files (jpg, png, gif only, max 5MB)
- Add optional metadata:
  - Tags (e.g., "sunset", "vacation")
  - Person name (if tagged)
  - Favorite toggle (⭐)
  - Comments (array of strings)
- File validation via MIME/type and size limits
- Metadata includes: name, size, tags, person, favorites, comments, uploadedAt

### ❤️ Favorite Images
- Mark/unmark any image as favorite
- View all favorites in an album

### 💬 Image Comments
- Add comments to any uploaded image
- Stored in an array for each image

### 🗑️ Delete Image
- Only allowed for the album owner
- Deletes the image metadata and file

### 📖 Read/Fetch APIs
- **Get All Albums** (owned and shared)
- **Get All Images in Album**
- **Filter by Tags**: `/albums/:albumId/images?tags=sunset`
- **Get Favorites**: `/albums/:albumId/images/favorites`

### 🔒 Permissions
- Only owners can:
  - Delete albums or images
  - Edit album descriptions
- Shared users:
  - Can view albums/images
  - Cannot modify/delete content

---

## 🔧 Tech Stack

Here’s what powers this project:

### 🖥️ Frontend
- ⚛️ **React (Vite)** – For blazing-fast development
- 🧭 **React Router** – SPA routing
- 💨 **Tailwind CSS** – Utility-first styling
- 🌐 **Axios** – API requests

### 🗄️ Backend
- 🟢 **Node.js + Express.js** – RESTful APIs
- 🛢️ **MongoDB** – Image metadata, albums, users
- 📦 **Mongoose** – ODM for schema management
- 🔐 **Google OAuth2** – Secure sign-in
- 🪪 **JWT** – Access token handling and route protection
- 🖼️ **Multer + Cloudinary** – File upload handling
- 📁 **fs & path** – File size/type validation

---

## 🗂️ Project Structure

### 🔷 Frontend (React + Vite)

```
ChitraShaala/
├── public/
└── src/
    ├── api/
    ├── assets/      
    ├── components/  
    ├── context/     
    ├── hooks/       
    ├── pages/       
    ├── routes/     
    ├── App.jsx
    └── main.jsx
```

### 🟩 Backend (Node.js + Express)

```
ChitraShaala-API/
├── config/
├── controllers/
├── middlewares/
├── models/
├── public/
├── routes/
├── utils/
├── .env
├── server.js
```

---

## 🚀 Getting Started

To run the frontend locally:

```bash
# Clone the frontend repo
git clone https://github.com/SherlockValer/ChitraShaala.git
cd ChitraShaala

# Install dependencies
npm install

# Start the dev server
npm run dev
```

---

## 🌍 Environment Setup

Create a `.env` file with the backend URL:

```
VITE_API_BASE_URL=https://chitrashaala-api.vercel.app
```

---

## 🧩 Backend Repository

To run the backend locally or deploy:

🔗 [ChitraShaala Backend GitHub Repo](https://github.com/SherlockValer/ChitraShaala-API)

---

## 📸 Try it Out

Live demo available here:  
👉 [https://chitrashaala.vercel.app](https://chitrashaala.vercel.app)

---

## 🤝 Contributions

Ideas, improvements, or bug reports?  
Open a pull request or raise an issue.

---

## 👋 About the Creator

Hi! I’m **Vaibhav Chopde**, crafting modern web solutions with security, clarity, and great UX in mind.

- 🌐 Portfolio: [vaibhav-chopde-pvla.vercel.app](https://vaibhav-chopde-pvla.vercel.app/)
- 🧑‍💻 GitHub: [@SherlockValer](https://github.com/SherlockValer)

---

Thanks for exploring **ChitraShaala**! Stay organized. Share securely. 📷

