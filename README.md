# 🎓 LMS Platform

A full-featured Learning Management System (LMS) built with:
- **Next.js** for frontend rendering and SSR
- **Node.js + TypeScript** for a type-safe backend
- **MongoDB** for data storage
- **WebSocket** for real-time features
- **LiveKit (SDK + Cloud)** for live audio/video communication
- Deployed on **Vercel**
- Runs locally at `http://localhost:3000`

---

## 🚀 Features

- ✨ User Authentication (JWT/session-based)
- 📚 Course Management (create, edit, delete, enroll)
- 🧠 Lesson & Quiz Management
- 🧑‍🏫 Teacher/Student Roles
- 🔴 Real-time Classrooms (via WebSocket & LiveKit)
- 🎥 Live Video/Audio Rooms using LiveKit Cloud
- 🗂️ Dashboard (Instructor & Student)
- 🌐 SEO Optimized with SSR
- 📱 Fully Responsive UI
- ⚙️ Admin Panel

---

## 🛠️ Tech Stack

| Layer        | Tech Stack                           |
|--------------|--------------------------------------|
| Frontend     | Next.js, Tailwind CSS, TypeScript    |
| Backend      | Node.js, Express (if used), TypeScript |
| Database     | MongoDB (Mongoose ODM)               |
| Real-Time    | WebSocket, LiveKit SDK               |
| Deployment   | Vercel (frontend), optional backend on EC2/Render |
| Auth         | JWT or NextAuth                      |

---

## 📦 Getting Started

### Prerequisites

- Node.js `>=18.x`
- MongoDB (local or Atlas)
- LiveKit Cloud project
- Vercel account (for deployment)

### 1. Clone the repository

```bash
git clone https://github.com/yashsingha99/Eduspark.git
cd Eduspark
