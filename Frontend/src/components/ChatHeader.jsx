import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import { XIcon } from 'lucide-react';

const ChatHeader = () => {
    const {selectedUser, setSelectedUser} = useChatStore();

    useEffect(() => {
        const handleEscKey = (event) => {
            if(event.key === "Escape") setSelectedUser(null);
        }
        window.addEventListener("keydown", handleEscKey);

        // cleanUp function
        return () => window.removeEventListener("keydown", handleEscKey);
    }, [setSelectedUser]);


  return (
    <div className='flex justify-between items-center px-6 bg-slate-800/50 border-b border-slate-700/50 max-h-[80px] flex-1'>
      <div className='flex items-center space-x-3'>
        <div className="avatar avatar-online">
            <div className='size-12 rounded-full'>
                <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
        </div>
        <div >
            <h2 className='font-semibold text-slate-200 '>{selectedUser.fullName}</h2>
            <p className='text-slate-400 text-sm'>Online</p>
        </div>
      </div>

      <button onClick={() => setSelectedUser(null)}>
        <XIcon className='text-slate-400 hover:text-slate-200 size-5 transition-colors cursor-pointer'/>
      </button>

    </div>
  )
}

export default ChatHeader
