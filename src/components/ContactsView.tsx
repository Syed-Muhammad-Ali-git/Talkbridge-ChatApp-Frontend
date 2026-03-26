import { Search, UserPlus } from 'lucide-react';

interface Contact {
  id: number;
  name: string;
  avatar: string;
  status: "online" | "offline" | "typing...";
  lastMessage: string;
  time: string;
}

interface ContactsViewProps {
  contacts: Contact[];
  onSelectContact: (id: number) => void;
  onAddContact?: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ContactsView = ({ contacts, onSelectContact, onAddContact, searchQuery, setSearchQuery }: ContactsViewProps) => {
  return (
    <div className="w-full lg:w-[350px] bg-white border-r border-gray-100 flex flex-col h-full shrink-0 overflow-hidden">
      <div className="p-6 pb-2">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-text-primary">Contacts</h1>
          <button 
            onClick={onAddContact}
            className="p-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-all"
          >
            <UserPlus size={20} />
          </button>
        </div>
        
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search contacts..."
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
            onClick={() => onSelectContact(contact.id)}
            className="w-full flex items-center p-3 rounded-2xl hover:bg-gray-50 transition-all duration-200 group"
          >
            <div className="relative shrink-0">
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
              />
              {contact.status === 'online' && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-online border-2 border-white rounded-full" />
              )}
            </div>
            
            <div className="ml-3 flex-1 text-left">
              <span className="font-semibold text-sm text-text-primary block">
                {contact.name}
              </span>
              <p className="text-xs text-text-secondary">
                {contact.status === 'online' ? 'Available' : 'Offline'}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ContactsView;
