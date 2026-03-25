import { useState, useEffect, useMemo, useRef } from "react";

interface Message {
  id: number;
  text: string;
  time: string;
  sender: "me" | "other";
  status?: "sent" | "delivered" | "read";
}

interface Contact {
  id: number;
  name: string;
  avatar: string;
  status: "online" | "offline" | "typing...";
  lastMessage: string;
  time: string;
}

const App = () => {
  const [loading, setLoading] = useState(true);
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const lastMessageRef = useRef<HTMLDivElement>(null);

  // Simulation of initial loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // State for contacts
  const [contacts] = useState<Contact[]>([
    {
      id: 1,
      name: "Ali Mazhar",
      lastMessage: "Bhai, project kab tak khatam hoga?",
      time: "10:30 AM",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ali",
      status: "online",
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

  // State for messages per contact
  const [conversations, setConversations] = useState<Record<number, Message[]>>(
    {
      1: [
        {
          id: 1,
          text: "Assalam o Alaikum! Kaisa chal raha hai kaam?",
          time: "10:00 AM",
          sender: "other",
        },
        {
          id: 2,
          text: "Walaikum Assalam! Sab fit hai, UI design complete kar raha hoon.",
          time: "10:05 AM",
          sender: "me",
          status: "read",
        },
        {
          id: 3,
          text: "Bhai, project kab tak khatam hoga?",
          time: "10:30 AM",
          sender: "other",
        },
      ],
      2: [
        {
          id: 1,
          text: "Oye, React seekh li?",
          time: "09:30 AM",
          sender: "other",
        },
        {
          id: 2,
          text: "Haan bhai, seekh raha hoon abhi.",
          time: "09:40 AM",
          sender: "me",
          status: "read",
        },
        {
          id: 3,
          text: "Good hogaya. React seekh lo, bohat scope hai.",
          time: "09:45 AM",
          sender: "other",
        },
      ],
      3: [
        {
          id: 1,
          text: "Kal milna hai na?",
          time: "Yesterday",
          sender: "other",
        },
        {
          id: 2,
          text: "InshaAllah, kal milte hain.",
          time: "Yesterday",
          sender: "me",
          status: "read",
        },
      ],
      4: [
        {
          id: 1,
          text: "How is the new design?",
          time: "Yesterday",
          sender: "me",
          status: "read",
        },
        {
          id: 2,
          text: "Design looks awesome!",
          time: "Yesterday",
          sender: "other",
        },
      ],
      5: [
        {
          id: 1,
          text: "Check the new API documentation.",
          time: "Monday",
          sender: "other",
        },
        {
          id: 2,
          text: "The endpoint is working fine.",
          time: "Monday",
          sender: "me",
          status: "read",
        },
      ],
    },
  );

  const filteredContacts = useMemo(() => {
    return contacts.filter((c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [contacts, searchQuery]);

  const currentChat = useMemo(
    () => contacts.find((c) => c.id === activeChat),
    [contacts, activeChat],
  );
  const currentMessages = useMemo(
    () => (activeChat ? conversations[activeChat] || [] : []),
    [conversations, activeChat],
  );

  // Scroll to bottom when messages change
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!messageInput.trim() || !activeChat) return;

    const newMessage: Message = {
      id: Date.now(),
      text: messageInput,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
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
        <div className="relative mt-20">
          <div className="w-16 h-16 border-4 border-whatsapp-teal/20 border-t-whatsapp-teal rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <i className="fab fa-whatsapp text-whatsapp-teal text-3xl"></i>
          </div>
        </div>
        <h1 className="mt-6 text-gray-500 font-light text-xl tracking-widest uppercase animate-pulse">
          WhatsApp
        </h1>
        <div className="mt-auto mb-10 flex flex-col items-center">
          <div className="flex items-center text-gray-400 text-[13px] tracking-wide bg-white/50 px-4 py-1.5 rounded-full border border-gray-100 shadow-sm">
            <span>End-to-end encrypted</span>
          </div>
          <p className="text-gray-600 text-xs">
            Developed by Syed Muhammad Ali
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#f0f2f5] overflow-hidden antialiased text-gray-800 font-sans selection:bg-whatsapp-teal/10">
      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? "w-full md:w-[450px]" : "hidden md:flex md:w-[450px]"} flex-col bg-white border-r border-gray-200 h-full transition-all duration-300 relative z-20 shadow-xl md:shadow-none`}
      >
        {/* Sidebar Header with Glassmorphism */}
        <div className="bg-[#f0f2f5]/90 backdrop-blur-md h-16 flex items-center justify-between px-4 shrink-0 border-b border-gray-200/50 sticky top-0 z-30">
          <div className="relative group">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden cursor-pointer ring-2 ring-transparent group-hover:ring-whatsapp-teal/30 transition-all duration-300">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Me"
                alt="My Profile"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="flex space-x-4 text-gray-500">
            <button className="p-2 hover:bg-black/5 rounded-full transition-all duration-200 group">
              <i className="fas fa-circle-notch text-lg group-hover:rotate-180 transition-transform duration-500"></i>
            </button>
            <button className="p-2 hover:bg-black/5 rounded-full transition-all duration-200">
              <i className="fas fa-comment-alt text-lg"></i>
            </button>
            <button className="p-2 hover:bg-black/5 rounded-full transition-all duration-200">
              <i className="fas fa-ellipsis-v text-lg"></i>
            </button>
          </div>
        </div>

        {/* Search Bar - Interactive */}
        <div className="p-2 bg-white sticky top-16 z-20">
          <div className="relative group">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 group-focus-within:text-whatsapp-teal transition-colors">
              <i className="fas fa-search text-sm"></i>
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search or start new chat"
              className="w-full bg-[#f0f2f5] py-2 pl-10 pr-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-whatsapp-teal/20 transition-all text-sm placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Chat List - Animated */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-50 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => {
                  setActiveChat(contact.id);
                  if (window.innerWidth < 768) setIsSidebarOpen(false);
                }}
                className={`flex items-center px-4 py-3.5 cursor-pointer transition-all duration-300 animate-in fade-in slide-in-from-left-2 ${activeChat === contact.id ? "bg-[#f0f2f5] border-l-4 border-whatsapp-teal" : "hover:bg-[#f9fafb]"}`}
              >
                <div className="relative shrink-0">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-gray-100">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  {contact.status === "online" && (
                    <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="ml-4 flex-1 overflow-hidden">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-semibold text-[16px] truncate text-gray-900">
                      {contact.name}
                    </h3>
                    <span
                      className={`text-[12px] ${activeChat === contact.id ? "text-whatsapp-teal font-medium" : "text-gray-400"}`}
                    >
                      {contact.time}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5 min-w-0">
                    {contact.status === "typing..." ? (
                      <span className="text-whatsapp-teal text-[13px] font-medium animate-pulse">
                        typing...
                      </span>
                    ) : (
                      <>
                        <i className="fas fa-check-double text-blue-400 text-[11px] shrink-0"></i>
                        <p className="text-[13px] text-gray-500 truncate leading-relaxed max-w-[80%]">
                          {contact.lastMessage}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-400">
              <i className="fas fa-search text-3xl mb-4 opacity-20"></i>
              <p className="text-sm">No contacts found</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area - Premium Styling */}
      <div
        className={`${!isSidebarOpen ? "flex" : "hidden md:flex"} flex-1 flex-col bg-[#efeae2] h-full relative overflow-hidden`}
      >
        {activeChat ? (
          <>
            {/* Chat Header - Glassmorphism */}
            <div className="bg-[#f0f2f5]/85 backdrop-blur-lg h-16 flex items-center justify-between px-4 border-l border-gray-200/50 shrink-0 z-30 shadow-sm transition-all duration-300 sticky top-0">
              <div className="flex items-center min-w-0">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="mr-3 text-gray-500 md:hidden p-2 hover:bg-black/5 rounded-full transition-all"
                >
                  <i className="fas fa-arrow-left text-lg"></i>
                </button>
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-gray-100 shadow-sm cursor-pointer hover:opacity-80 transition-opacity">
                    <img src={currentChat?.avatar} alt={currentChat?.name} />
                  </div>
                </div>
                <div className="ml-3 truncate">
                  <h3 className="font-semibold text-[16px] text-gray-900 truncate leading-tight cursor-pointer hover:underline underline-offset-2">
                    {currentChat?.name}
                  </h3>
                  <div className="flex items-center space-x-1.5">
                    {currentChat?.status === "online" ? (
                      <>
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                        <span className="text-[12px] text-gray-500">
                          online
                        </span>
                      </>
                    ) : currentChat?.status === "typing..." ? (
                      <span className="text-whatsapp-teal text-[12px] font-medium animate-pulse italic">
                        typing...
                      </span>
                    ) : (
                      <span className="text-[12px] text-gray-400">
                        last seen recently
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex space-x-4 md:space-x-6 text-gray-500 px-2 shrink-0">
                <button className="p-2 hover:bg-black/5 rounded-full transition-all">
                  <i className="fas fa-video text-lg"></i>
                </button>
                <button className="p-2 hover:bg-black/5 rounded-full transition-all">
                  <i className="fas fa-phone-alt text-lg"></i>
                </button>
                <div className="w-[1px] h-6 bg-gray-300 self-center mx-1 hidden sm:block"></div>
                <button className="p-2 hover:bg-black/5 rounded-full transition-all">
                  <i className="fas fa-search text-lg"></i>
                </button>
                <button className="p-2 hover:bg-black/5 rounded-full transition-all">
                  <i className="fas fa-ellipsis-v text-lg"></i>
                </button>
              </div>
            </div>

            {/* Messages Area - Background Tile & Shadows */}
            <div
              className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 relative scroll-smooth scrollbar-thin scrollbar-thumb-black/20"
              style={{
                backgroundImage:
                  "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
                backgroundSize: "450px",
                backgroundBlendMode: "overlay",
                backgroundColor: "#efeae2",
              }}
            >
              <div className="flex justify-center sticky top-2 z-10 my-4">
                <span className="bg-white/80 backdrop-blur px-3 py-1 rounded-xl shadow-lg border border-gray-100 text-[11px] font-bold text-gray-600 uppercase tracking-widest pointer-events-none">
                  Today
                </span>
              </div>

              {currentMessages.map((msg, index) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className={`relative px-3.5 py-2 rounded-2xl max-w-[85%] sm:max-w-[70%] lg:max-w-[60%] shadow-[0_2px_10px_rgba(0,0,0,0.06)] group ${
                      msg.sender === "me"
                        ? "bg-[#dcf8c6] rounded-tr-none ring-1 ring-[#c0de9e]"
                        : "bg-white rounded-tl-none ring-1 ring-gray-100"
                    }`}
                  >
                    {/* Message Tail Simulation */}
                    <div
                      className={`absolute top-0 w-3 h-3 ${
                        msg.sender === "me"
                          ? "right-[-8px] text-[#dcf8c6]"
                          : "left-[-8px] text-white"
                      }`}
                    >
                      <svg
                        viewBox="0 0 8 13"
                        className="w-full h-full fill-current drop-shadow-sm"
                      >
                        <path
                          d={
                            msg.sender === "me"
                              ? "M5.188 0H0l.031.207A20.73 20.73 0 0 1 2.316 6.3 20.5 20.5 0 0 1 .15 12.83l-.015.17h5.138A2.923 2.923 0 0 0 8 10.08V2.92A2.923 2.923 0 0 0 5.188 0z"
                              : "M2.812 0H8l-.031.207A20.73 20.73 0 0 0 5.684 6.3a20.5 20.5 0 0 0 2.166 6.53l.015.17H2.812A2.923 2.923 0 0 1 0 10.08V2.92A2.923 2.923 0 0 1 2.812 0z"
                          }
                        ></path>
                      </svg>
                    </div>

                    <p className="text-[14.8px] leading-relaxed text-gray-800 break-words">
                      {msg.text}
                    </p>
                    <div className="flex items-center justify-end space-x-1.5 mt-1 leading-none">
                      <span className="text-[10px] text-gray-500 font-medium">
                        {msg.time}
                      </span>
                      {msg.sender === "me" && (
                        <i
                          className={`fas fa-check-double text-[11px] ${msg.status === "read" ? "text-blue-500" : "text-gray-400"}`}
                        ></i>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={lastMessageRef} />
            </div>

            {/* Input Area - Interactive with Better Feedback */}
            <form
              onSubmit={handleSendMessage}
              className="bg-[#f0f2f5] px-4 py-3 flex items-center space-x-3 shrink-0 z-30 shadow-[0_-2px_10px_rgba(0,0,0,0.03)]"
            >
              <div className="flex items-center space-x-2 text-gray-500 px-1">
                <button
                  type="button"
                  className="p-2 hover:bg-black/5 rounded-full transition-all hover:text-whatsapp-teal"
                >
                  <i className="far fa-smile text-2xl"></i>
                </button>
                <button
                  type="button"
                  className="p-2 hover:bg-black/5 rounded-full transition-all hover:text-whatsapp-teal group"
                >
                  <i className="fas fa-paperclip text-xl rotate-45 group-hover:rotate-[55deg] transition-transform"></i>
                </button>
              </div>

              <div className="flex-1">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a message"
                  className="w-full bg-white py-3 px-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-whatsapp-teal/10 transition-all text-[15.5px] shadow-sm placeholder:text-gray-400 border border-transparent focus:border-gray-200"
                />
              </div>

              <div className="flex items-center justify-center w-12">
                <button
                  type="submit"
                  className={`flex items-center justify-center w-11 h-11 rounded-full text-white shadow-lg transform transition-all active:scale-95 ${
                    messageInput.trim()
                      ? "bg-whatsapp-teal hover:bg-teal-700"
                      : "bg-gray-400 opacity-80 cursor-not-allowed"
                  }`}
                  disabled={!messageInput.trim()}
                >
                  <i
                    className={`fas ${messageInput.trim() ? "fa-paper-plane" : "fa-microphone"} text-lg`}
                  ></i>
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-[#f8f9fa] border-l border-gray-200 p-8  h-full animate-in fade-in duration-700 ">
            <h2 className="text-[34px] font-thin text-gray-700 mb-4 tracking-tight">
              WhatsApp Web
            </h2>
            <p className="text-[14.5px] text-gray-500 text-center max-w-sm leading-relaxed font-light">
              Send and receive messages without keeping your phone online.
              <br />
              Use WhatsApp on up to 4 linked devices and 1 phone at the same
              time.
            </p>
            <div className="flex flex-col items-center space-y-3 pb-8 mt-20">
              <div className="flex items-center text-gray-400 text-[13px] tracking-wide bg-white/50 px-4 py-1.5 rounded-full border border-gray-100 shadow-sm">
                <i className="fas fa-lock mr-2 text-[10px]"></i>
                <span>End-to-end encrypted</span>
              </div>
              <p className="text-gray-600 text-[11px] font-medium tracking-widest uppercase">
                From Syed Muhammad Ali
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Font Awesome CDN */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
    </div>
  );
};

export default App;
