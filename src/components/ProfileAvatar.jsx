const ProfileAvatar = ({ user, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center focus:outline-none group"
      title={user?.email || "User"}
    >
      {/* Profile Avatar Image */}
      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300 hover:border-red-600 transition flex items-center justify-center bg-gray-100">
        <img 
          src="/profile-avatar.png" 
          alt="Profile" 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.innerHTML = '<span class="text-lg font-bold text-gray-600">' + (user?.email?.[0]?.toUpperCase() || 'U') + '</span>';
          }}
        />
      </div>
      {/* Role Label */}
      <span className="text-xs font-semibold text-gray-700 mt-1">
        {user?.role || "Viewer"}
      </span>
    </button>
  );
};

export default ProfileAvatar;
