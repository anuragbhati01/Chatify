import { useChatStore } from "../store/useChatStore.js";

function ActiveTabSwtich() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="tabs tabs-box bg-transparent py-2 pr-6 m-2 w-full">
      <button
        onClick={() => setActiveTab("chats")}
        className={`tab transition-colors  w-1/2 font-medium ${
          activeTab === "chats"
            ? "bg-cyan-500/20  text-cyan-400 "
            : "text-slate-400"
        }`}
      >
        Chats
      </button>

      <button
        onClick={() => setActiveTab("contacts")}
        className={`tab transition-colors w-1/2 font-medium ${
          activeTab === "contacts"
            ? "bg-cyan-500/20 text-cyan-400  "
            : "text-slate-400"
        }`}
      >
        Contacts
      </button>
    </div>
  );
}

export default ActiveTabSwtich;