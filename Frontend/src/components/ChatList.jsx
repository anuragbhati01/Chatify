import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore.js";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton.jsx";
import NoChatFound from "./NoChatFound.jsx";
import { useAuthStore } from "../store/useAuthStore.js";

function ChatList() {
  const { getChatPartners, chats, isUserLoading, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getChatPartners();
  }, [getChatPartners]);

  if (isUserLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatFound />;

  return (
    <>
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="bg-cyan-500/10 hover:bg-cyan-500/20 p-4 rounded-lg cursor-pointer transition-colors"
          onClick={() => setSelectedUser(chat)}
        >
          <div className="flex items-center gap-3">
            <div className={`avatar ${onlineUsers.includes(chat._id) ? "avatar-online" : "avatar-offline"}`}>
              <div className="size-12 rounded-full">
                <img
                  src={chat.profilePic || "/avatar.png"}
                  alt={chat.fullName}
                />
              </div>
            </div>
            <h3 className="text-slate-200 font-medium truncate">
              {chat.fullName}
            </h3>
          </div>
        </div>
      ))}
    </>
  );
}

export default ChatList;
