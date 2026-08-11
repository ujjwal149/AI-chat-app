import { logout } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";

type SidebarProps = {
  onNewChat: () => void;
};

export default function Sidebar({ onNewChat }: SidebarProps) {
  const { logout: clearAuth } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      clearAuth();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="w-1/5 bg-[#1E1F22] rounded-xl border border-[#25262B] p-3 flex flex-col items-center">
      <img
        src="/chatAI-logo.png"
        alt="ChatAI Logo"
        className="w-20 h-20 object-contain"
      />

      <button
        onClick={onNewChat}
        className="bg-white text-black hover:bg-gray-300 p-2 w-full mt-6 rounded-2xl"
      >
        New Chat +
      </button>

      <div className="text-sm text-gray-400 mt-4">
        Chat history coming soon...
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-auto w-full rounded-2xl bg-red-500 p-2 text-white hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}