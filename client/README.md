# AI Chat App - Client

The frontend of the AI Chat App built with **React**, **TypeScript**, and **Vite**. It provides a clean and responsive chat interface for interacting with the backend AI service.

## Tech Stack

- React
- TypeScript
- Vite
- CSS
- Axios

## Features

- Modern chat interface
- Real-time communication with the backend API
- Responsive design
- Fast development using Vite

## Project Structure

```
client/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── services/
│   ├── App.tsx
│   └── main.tsx
├── Dockerfile
├── package.json
└── vite.config.ts
```

## Environment Variables

Create a `.env` file inside the `client` directory.

Example:

```env
VITE_API_URL=http://localhost:5000
```

For production:

```env
VITE_API_URL=http://YOUR_SERVER_PUBLIC_IP:5000
```

Replace `YOUR_SERVER_PUBLIC_IP` with your deployed backend address.

## Installation

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

## Docker

Build the Docker image:

```bash
docker build -t ai-chat-client .
```

Run the container:

```bash
docker run -p 5173:5173 ai-chat-client
```

Or use Docker Compose from the project root:

```bash
docker compose up --build
```

## Backend

The client communicates with the Express backend through the API URL defined in the environment variables.

Default development endpoint:

```
http://localhost:5000
```

## Deployment

The frontend has been successfully deployed on **AWS EC2** using Docker.

Deployment stack:

- Ubuntu 24.04 LTS
- Docker
- Docker Compose
- AWS EC2

## License

This project is licensed under the MIT License.