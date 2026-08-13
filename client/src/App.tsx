import { Routes, Route, Navigate } from "react-router-dom";

import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import Chat from "./pages/Chat";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import { useAuth } from "./hooks/useAuth";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      {/* Signin page route */}
      <Route
        path="/signin"
        element={<SigninPage />}
      />

      {/* Signup page route */}
      <Route
        path="/signup"
        element={<SignupPage />}
      />

      {/* / redirects to /chat */}
      <Route
        path="/"
        element={<Navigate to="/chat" replace />}
      />

      {/* Protected chat page */}
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;