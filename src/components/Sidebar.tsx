import { MessageSquare, Users, User, Settings, LogOut } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  hideOnMobile?: boolean;
}

const Sidebar = ({ activeTab, setActiveTab, hideOnMobile }: SidebarProps) => {
  const menuItems = [
    { id: 'chats', icon: MessageSquare, label: 'Chats' },
    { id: 'contacts', icon: Users, label: 'Contacts' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-[70px] bg-white border-r border-gray-100 flex-col items-center py-6 h-full shrink-0">
        <div className="mb-8 rotate-0">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <MessageSquare size={24} fill="currentColor" />
          </div>
        </div>
        
        <div className="flex-1 flex flex-col space-y-4 w-full px-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`p-3 rounded-xl transition-all duration-200 flex flex-col items-center group relative ${
                activeTab === item.id 
                ? 'bg-primary/10 text-primary' 
                : 'text-text-secondary hover:bg-gray-50'
              }`}
            >
              <item.icon size={22} strokeWidth={activeTab === item.id ? 2.5 : 2} />
              {activeTab === item.id && (
                <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
              )}
            </button>
          ))}
        </div>

        <div className="mt-auto px-2 w-full">
          <button className="w-full p-3 rounded-xl text-accent-red hover:bg-accent-red/5 transition-all duration-200 flex flex-col items-center">
            <LogOut size={22} />
          </button>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      {!hideOnMobile && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-100 flex items-center justify-around py-3 px-4 z-40">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center space-y-1 ${
                activeTab === item.id ? 'text-primary' : 'text-text-secondary'
              }`}
            >
              <item.icon size={24} strokeWidth={activeTab === item.id ? 2.5 : 2} />
              <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default Sidebar;
