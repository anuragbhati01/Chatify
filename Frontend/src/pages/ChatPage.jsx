import {useAuthStore} from "../store/useAuthStore.js";

function ChatPage() {
  const {logout } = useAuthStore();
  return (
    <div className="z-10">
      <h1 className='text-white'>Chat page</h1>

      <button className='auth-btn' onClick={logout}>Logout</button>
    </div>
  )
}

export default ChatPage;
