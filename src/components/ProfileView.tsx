import { Camera, Mail, Phone, Info, LogOut } from 'lucide-react';

const ProfileView = () => {
  const user = {
    name: "Syed Muhammad Ali",
    bio: "Passionate Developer | Building the future of Chat.",
    email: "ali@talkbridge.com",
    phone: "+92 312 3456789",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Me"
  };

  return (
    <div className="w-full lg:w-[350px] bg-white border-r border-gray-100 flex flex-col h-full shrink-0 overflow-hidden">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-text-primary mb-8">Profile</h1>
        
        <div className="flex flex-col items-center mb-8">
          <div className="relative group cursor-pointer">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-28 h-28 rounded-3xl object-cover border-4 border-bg-main shadow-lg group-hover:opacity-90 transition-all"
            />
            <div className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-xl shadow-lg ring-4 ring-white group-hover:scale-110 transition-all">
              <Camera size={18} />
            </div>
          </div>
          <h2 className="mt-4 text-xl font-bold text-text-primary">{user.name}</h2>
          <p className="text-sm text-text-secondary text-center px-4 mt-1">{user.bio}</p>
        </div>

        <div className="space-y-4 px-2">
          <div className="flex items-center p-4 bg-bg-main/50 rounded-2xl border border-gray-50">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm mr-4">
              <Mail size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-text-secondary tracking-wider">Email</p>
              <p className="text-sm font-semibold text-text-primary">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-bg-main/50 rounded-2xl border border-gray-50">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm mr-4">
              <Phone size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-text-secondary tracking-wider">Phone</p>
              <p className="text-sm font-semibold text-text-primary">{user.phone}</p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-bg-main/50 rounded-2xl border border-gray-50">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm mr-4">
              <Info size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-text-secondary tracking-wider">About</p>
              <p className="text-sm font-semibold text-text-primary line-clamp-1">{user.bio}</p>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-8">
          <button className="w-full flex items-center justify-center space-x-2 p-4 text-accent-red bg-accent-red/5 hover:bg-accent-red/10 rounded-2xl transition-all font-bold">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
