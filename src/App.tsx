import { useState, useEffect, useMemo } from "react";
import Sidebar from "./components/Sidebar";
import ConversationList from "./components/ConversationList";
import ChatWindow from "./components/ChatWindow";

interface Message {
  id: number;
  text: string;
  time: string;
  sender: "me" | "other" ;
  status?: "sent" | "delivered" | "read";
}

interface Contact {
  id: number;
  name: string;
  avatar: string;
  status: "online" | "offline" | "typing...";
  lastMessage: string;
  time: string;
  unreadCount?: number;
}

const App = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("chats");
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Simulation of initial loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const [contacts] = useState<Contact[]>([
    {
      id: 1,
      name: "Ali Mazhar",
      lastMessage: "Bhai, project kab tak khatam hoga?",
      time: "10:30 AM",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ali",
      status: "online",
      unreadCount: 2,
    },
    {
      id: 2,
      name: "Zain Ahmed",
      lastMessage: "React seekh lo, bohat scope hai.",
      time: "09:45 AM",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zain",
      status: "offline",
    },
    {
      id: 3,
      name: "Umar Khan",
      lastMessage: "Kal milte hain InshaAllah.",
      time: "Yesterday",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Umar",
      status: "typing...",
      unreadCount: 1,
    },
    {
      id: 4,
      name: "Sara Malik",
      lastMessage: "Design looks awesome!",
      time: "Yesterday",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara",
      status: "online",
    },
    {
      id: 5,
      name: "Hassan Raza",
      lastMessage: "Check the new API.",
      time: "Monday",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hassan",
      status: "offline",
    },
  ]);

  const [conversations, setConversations] = useState<Record<number, Message[]>>({
    1: [
      { id: 1, text: "Assalam o Alaikum! Kaisa chal raha hai kaam?", time: "10:00 AM", sender: "other" },
      { id: 2, text: "Walaikum Assalam! Sab fit hai, UI design complete kar raha hoon.", time: "10:05 AM", sender: "me", status: "read" },
      { id: 3, text: "Bhai, project kab tak khatam hoga?", time: "10:30 AM", sender: "other" },
    ],
    2: [
      { id: 1, text: "Oye, React seekh li?", time: "09:30 AM", sender: "other" },
      { id: 2, text: "Haan bhai, seekh raha hoon abhi.", time: "09:40 AM", sender: "me", status: "read" },
      { id: 3, text: "Good hogaya. React seekh lo, bohat scope hai.", time: "09:45 AM", sender: "other" },
    ],
  });

  const filteredContacts = useMemo(() => {
    return contacts.filter((c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [contacts, searchQuery]);

  const currentChat = useMemo(
    () => contacts.find((c) => c.id === activeChat),
    [contacts, activeChat]
  );

  const currentMessages = useMemo(
    () => (activeChat ? conversations[activeChat] || [] : []),
    [conversations, activeChat]
  );

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!messageInput.trim() || !activeChat) return;

    const newMessage: Message = {
      id: Date.now(),
      text: messageInput,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      sender: "me",
      status: "sent",
    };

    setConversations((prev) => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMessage],
    }));
    setMessageInput("");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <h1 className="mt-6 text-primary font-bold text-2xl tracking-tight">Talkbridge</h1>
        <p className="mt-2 text-text-secondary text-sm animate-pulse">Launching your secure messenger...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-bg-main overflow-hidden font-sans selection:bg-primary/10">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === 'chats' && (
        <ConversationList 
          contacts={filteredContacts} 
          activeChat={activeChat} 
          setActiveChat={setActiveChat}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery} 
        />
      )}

      {activeTab === 'contacts' && (
        <div className="w-[350px] bg-white border-r border-gray-100 flex flex-col h-full shrink-0 items-center justify-center p-8 text-center">
           <p className="text-text-secondary text-sm">Contacts list will appear here.</p>
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="w-[350px] bg-white border-r border-gray-100 flex flex-col h-full shrink-0 items-center justify-center p-8 text-center text-sm">
           <p className="text-text-secondary">Your profile settings.</p>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="w-[350px] bg-white border-r border-gray-100 flex flex-col h-full shrink-0 items-center justify-center p-8 text-center text-sm">
           <p className="text-text-secondary">Application settings.</p>
        </div>
      )}

      <ChatWindow 
        activeChat={currentChat} 
        messages={currentMessages}
        messageInput={messageInput}
        setMessageInput={setMessageInput}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default App;
