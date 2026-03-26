import { Search } from 'lucide-react';

interface Contact {
  id: number;
  name: string;
  avatar: string;
  status: "online" | "offline" | "typing...";
  lastMessage: string;
  time: string;
  unreadCount?: number;
}

interface ConversationListProps {
  contacts: Contact[];
  activeChat: number | null;
  setActiveChat: (id: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ConversationList = ({ 
  contacts, 
  activeChat, 
  setActiveChat, 
  searchQuery, 
  setSearchQuery 
}: ConversationListProps) => {
  return (
    <div className="w-full lg:w-[350px] bg-white border-r border-gray-100 flex flex-col h-full shrink-0 overflow-hidden">
      <div className="p-6 pb-2">
        <h1 className="text-2xl font-bold text-text-primary mb-6">Talkbridge</h1>
        
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-bg-main py-2.5 pl-10 pr-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-transparent focus:border-primary/30"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-1 scrollbar-hide">
        {contacts.map((contact) => (
          <button
            key={contact.id}
            onClick={() => setActiveChat(contact.id)}
            className={`w-full flex items-center p-3 rounded-2xl transition-all duration-200 group ${
              activeChat === contact.id 
              ? 'bg-primary/5 shadow-sm' 
              : 'hover:bg-gray-50'
            }`}
          >
            <div className="relative shrink-0">
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
              />
              {contact.status === 'online' && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-online border-2 border-white rounded-full shadow-sm" />
              )}
            </div>
            
            <div className="ml-3 flex-1 text-left overflow-hidden">
              <div className="flex justify-between items-center mb-0.5">
                <span className={`font-semibold text-sm truncate ${activeChat === contact.id ? 'text-primary' : 'text-text-primary'}`}>
                  {contact.name}
                </span>
                <span className="text-[11px] text-text-secondary tabular-nums">
                  {contact.time}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xs text-text-secondary truncate pr-4">
                  {contact.status === 'typing...' ? (
                    <span className="text-primary italic animate-pulse">typing...</span>
                  ) : (
                    contact.lastMessage
                  )}
                </p>
                {contact.unreadCount && contact.unreadCount > 0 && (
                  <span className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center shadow-lg shadow-primary/20">
                    {contact.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ConversationList;
