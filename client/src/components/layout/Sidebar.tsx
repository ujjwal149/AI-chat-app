
type SidebarProps = {
    onNewChat: () => void;
}


export default function Sidebar({onNewChat}: SidebarProps){

    return(
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
        </div>
    )
}