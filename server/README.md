# AI Chat App - Server

The backend of the AI Chat App built with **Node.js** and **Express.js**. It provides REST APIs for processing user messages and communicating with the Groq AI API.

## Tech Stack

- Node.js
- Express.js
- Groq API
- CORS
- dotenv
- Jest (Testing)
- Docker

## Features

- RESTful API
- AI-powered chat responses using Groq
- Environment variable support
- Dockerized backend
- Unit testing support
- Ready for cloud deployment

---

## Project Structure

```
server/
├── controllers/
├── routes/
├── services/
├── tests/
├── app.js
├── server.js
├── Dockerfile
├── package.json
└── .env
```

---

## Environment Variables

Create a `.env` file inside the `server` directory.

Example:

```env
PORT=5000
GROQ_API_KEY=YOUR_GROQ_API_KEY
```

> Never commit your `.env` file to GitHub.

Create a `.env.example` file for other developers:

```env
PORT=5000
GROQ_API_KEY=YOUR_GROQ_API_KEY
```

---

## Installation

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Start the production server:

```bash
npm start
```

The server runs at:

```
http://localhost:5000
```

---

## API Endpoints

### Health Check

**GET /**

Response

```text
Server is running...
```

---

### AI Chat

**POST /api/chat**

Request

```json
{
  "message": "Hello AI!"
}
```

Response

```json
{
  "reply": "Hello! How can I help you today?"
}
```

---

## Running Tests

Run all tests:

```bash
npm test
```

---

## Docker

Build the Docker image:

```bash
docker build -t ai-chat-server .
```

Run the container:

```bash
docker run -p 5000:5000 --env-file .env ai-chat-server
```

Or use Docker Compose from the project root:

```bash
docker compose up --build
```

---

## Deployment

The backend has been successfully deployed on **AWS EC2** using Docker.

Deployment stack:

- Ubuntu 24.04 LTS
- Docker
- Docker Compose
- AWS EC2

The backend listens on:

```
http://<EC2_PUBLIC_IP>:5000
```

---

## Security

- API keys are stored using environment variables.
- Sensitive files such as `.env` are excluded from Git using `.gitignore`.
- Docker containers expose only the required ports.

---

## Future Improvements

- Authentication & Authorization
- Rate Limiting
- Request Validation
- Logging
- API Documentation (Swagger/OpenAPI)
- Redis Caching
- CI/CD with GitHub Actions
- HTTPS with Nginx
- Monitoring & Health Checks

---

## License

This project is licensed under the MIT License.