# 🤖 Chat AI Web Application

A full-stack AI chat application that allows users to interact with an intelligent assistant in real time. Built with modern web technologies, it delivers a smooth, responsive, and production-ready user experience.

---

## 🚀 Features

* 💬 Real-time AI chat interaction
* ⚡ Fast and responsive UI (React + Tailwind CSS)
* 📜 Auto-scroll and dynamic message rendering
* ✍️ Expanding textarea input (ChatGPT-like UX)
* ⌨️ Enter to send / Shift+Enter for new line
* 🤖 Typing indicator for AI responses
* 🌐 Fully deployed (Frontend + Backend)

---

## 🛠️ Tech Stack

### Frontend

* React (with TypeScript)
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* AI API integration (OpenAI / Groq)

### Deployment

* Frontend: Vercel
* Backend: Render

---

## 📁 Project Structure

```
ai-chat-app/
│
├── client/        # React frontend
│   ├── src/
│   └── .env
│
├── server/        # Express backend
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   └── .env
```

---

## ⚙️ Environment Variables

### 🔹 Client (`client/.env`)

```
VITE_API_URL=https://your-backend-url
```

### 🔹 Server (`server/.env`)

```
PORT=5000
OPENAI_API_KEY=your_api_key
```

---

## 🧑‍💻 Installation & Setup

### 1. Clone the repository

```
git clone https://github.com/your-username/ai-chat-app.git
cd ai-chat-app
```

---

### 2. Install dependencies

#### Client

```
cd client
npm install
```

#### Server

```
cd server
npm install
```

---

### 3. Run the project

#### Start backend

```
cd server
nodemon server.js
```

#### Start frontend

```
cd client
npm run dev
```

---

## 🌐 API Endpoint

```
POST /api/chat
```

### Request Body

```
{
  "message": "Hello AI"
}
```

### Response

```
{
  "reply": "Hello! How can I help you?"
}
```

---

## 🎨 UI Highlights

* IDE-style panel layout
* Dark theme with layered colors
* Clean spacing and typography
* Smooth scrolling experience

---

## 🔮 Future Improvements

* 🧠 Chat memory (context-aware responses)
* 📂 Chat history storage
* 🔐 Authentication system
* 📱 Mobile responsiveness enhancements
* 🎙️ Voice input support

---

## 📌 Conclusion

This project demonstrates how to build a modern AI-powered chat application using a full-stack approach. It combines clean UI design, efficient state management, and real-world API integration, making it a strong portfolio project for developers.

---

## 👨‍💻 Author

**Ujjwal Kumar**

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
