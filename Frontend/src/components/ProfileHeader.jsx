import { useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useChatStore } from "../store/useChatStore.js";
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";
import { LoaderIcon } from "react-hot-toast";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");
 
function ProfileHeader() {
  const { logout, authUser, updateProfile, isUpdatingProfileImage } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedUser, setSelectedUser] = useState(null);

  const fileInputRef = useRef();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64String = reader.result;
      setSelectedUser(base64String);
      await updateProfile({profilePic: base64String});
    }
  };

  return (
    <div className="p-6 border-b border-slate-700/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 mr-10">
          {/* Profile Picture */}
          <div className="avatar avatar-online">
            
            <button
              className="rounded-full size-14 overflow-hidden relative group"
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src={selectedUser || authUser.profilePic || "/avatar.png"}
                alt="User image"
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-opacity">
                <span className="text-white text-xs">Change</span>
              </div>

              {/* Loading for profile image update */}
              {isUpdatingProfileImage && (
                <div className="absolute inset-0 bg-black/50 flex justify-center items-center">
                  <LoaderIcon className="size-6 text-white animate-spin" />
                </div>
              )}
            </button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* User Info */}
          <div>
            <h3 className="font-medium text-slate-200 text-base max-w-[180px] truncate">
              {authUser.fullName}
            </h3>

            <p className="text-slate-400 text-xs ">Online</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 items-center ">
          {/* Logout button */}
          <button
            className="text-slate-400 hover:text-slate-200  transition-colors"
            onClick={logout}
          >
            <LogOutIcon className="size-5" />
          </button>

          {/* Sound toggle button */}
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={() => {
              mouseClickSound.currentTime = 0;
              mouseClickSound.play().catch((err) => console.log("Audio play failed.", err));
              toggleSound();
            }}
          >
            {isSoundEnabled ? (
              <Volume2Icon className="size-5" />
            ) : (
              <VolumeOffIcon className="size-5" />
            )}
          </button>
        </div>
        <div>
          <button></button>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
