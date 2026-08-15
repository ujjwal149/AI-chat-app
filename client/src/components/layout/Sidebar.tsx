import {
  Menu,
  MessageSquare,
  Plus,
  LogOut,
  X,
} from "lucide-react";

import { logout } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";

type SidebarProps = {
  onNewChat: () => void;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export default function Sidebar({
  onNewChat,
  isOpen,
  onClose,
  onOpen,
}: SidebarProps) {
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
    <>
      {/* =========================================
          MOBILE COLLAPSED SIDEBAR
      ========================================= */}
      <aside
        className="
          flex
          w-12
          shrink-0
          flex-col
          items-center
          rounded-2xl
          bg-[#2a2a2a]
          py-2
          md:hidden
        "
      >
        {/* Menu */}
        <button
          type="button"
          onClick={onOpen}
          aria-label="Open sidebar"
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            text-gray-400
            transition
            hover:bg-white/10
            hover:text-white
          "
        >
          <Menu size={21} />
        </button>

        {/* Chat */}
        <button
          type="button"
          aria-label="Chats"
          onClick={onOpen}
          className="
            mt-4
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            bg-[#303039]
            text-blue-400
            transition
            hover:bg-[#3a3a45]
          "
        >
          <MessageSquare size={20} />
        </button>

        {/* New chat */}
        <button
          type="button"
          onClick={onNewChat}
          aria-label="New chat"
          className="
            mt-3
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            text-gray-400
            transition
            hover:bg-white/10
            hover:text-white
          "
        >
          <Plus size={22} />
        </button>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          aria-label="Logout"
          className="
            mt-auto
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            text-gray-400
            transition
            hover:bg-white/10
            hover:text-white
          "
        >
          <LogOut size={20} />
        </button>
      </aside>

      {/* =========================================
          MOBILE BACKDROP
      ========================================= */}
      {isOpen && (
        <div
          onClick={onClose}
          className="
            fixed
            inset-0
            z-40
            bg-black/60
            backdrop-blur-[2px]
            md:hidden
          "
        />
      )}

      {/* =========================================
          MOBILE FULL SIDEBAR
      ========================================= */}
      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-50
          flex
          w-72
          flex-col
          rounded-r-xl
          border
          border-[#25262B]
          bg-[#181818]
          p-3
          shadow-2xl
          transition-transform
          duration-300
          md:hidden
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/chatAI-logo.png"
              alt="ChatAI Logo"
              className="h-12 w-12 object-contain"
            />

            <span className="text-lg font-semibold text-white">
              ChatAI
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              text-gray-400
              transition
              hover:bg-white/10
              hover:text-white
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* New Chat */}
        <button
          type="button"
          onClick={() => {
            onNewChat();
            onClose();
          }}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-white
            px-4
            py-3
            text-sm
            font-medium
            text-black
            transition
            hover:bg-gray-200
          "
        >
          <Plus size={18} />
          New Chat
        </button>

        {/* Chat history */}
        <div className="mt-4 text-center text-sm text-gray-400">
          Chat history coming soon...
        </div>

        {/* Logout */}
        <div
          className="
            mt-auto
            w-full
            border-t
            border-white/[0.08]
            pt-4
          "
        >
          <button
            type="button"
            onClick={handleLogout}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              px-4
              py-3
              text-sm
              font-medium
              text-white
              transition
              hover:bg-white/5
              hover:text-gray-300
            "
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* =========================================
          DESKTOP SIDEBAR
      ========================================= */}
      <aside
        className="
          hidden
          w-56
          shrink-0
          flex-col
          rounded-xl
          border
          border-[#25262B]
          bg-[#181818]
          p-3
          md:flex
          lg:w-64
        "
      >
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src="/chatAI-logo.png"
            alt="ChatAI Logo"
            className="
              h-16
              w-16
              object-contain
              lg:h-20
              lg:w-20
            "
          />
        </div>

        {/* New Chat */}
        <button
          type="button"
          onClick={onNewChat}
          className="
            mt-4
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-white
            px-4
            py-3
            text-sm
            font-medium
            text-black
            transition
            hover:bg-gray-200
            focus:outline-none
            focus:ring-2
            focus:ring-white/30
          "
        >
          <Plus size={18} />
          New Chat
        </button>

        {/* Chat history */}
        <div className="mt-4 text-center text-sm text-gray-400">
          Chat history coming soon...
        </div>

        {/* Logout */}
        <div
          className="
            mt-auto
            w-full
            border-t
            border-white/[0.08]
            pt-4
          "
        >
          <button
            type="button"
            onClick={handleLogout}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              px-4
              py-3
              text-sm
              font-medium
              text-white
              transition
              hover:bg-white/5
              hover:text-gray-300
            "
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}