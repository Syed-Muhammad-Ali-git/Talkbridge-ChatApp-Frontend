import { useState } from 'react'

const App = () => {
  const [activeChat, setActiveChat] = useState<number | null>(1)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [message, setMessage] = useState('')

  const contacts = [
    { id: 1, name: 'Ali Mazhar', lastMessage: 'Bhai, project kab tak khatam hoga?', time: '10:30 AM', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ali' },
    { id: 2, name: 'Zain Ahmed', lastMessage: 'React seekh lo, bohat scope hai.', time: '09:45 AM', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zain' },
    { id: 3, name: 'Umar Khan', lastMessage: 'Kal milte hain InshaAllah.', time: 'Yesterday', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Umar' },
    { id: 4, name: 'Sara Malik', lastMessage: 'Design looks awesome!', time: 'Yesterday', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sara' },
    { id: 5, name: 'Hassan Raza', lastMessage: 'Check the new API.', time: 'Monday', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hassan' },
  ]

  const currentChat = contacts.find(c => c.id === activeChat)

  return (
    <div className="flex h-screen bg-[#f0f2f5] overflow-hidden antialiased text-gray-800">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-full md:w-[400px]' : 'hidden md:flex md:w-[400px]'} flex-col bg-white border-r border-gray-200 h-full transition-all duration-300 relative z-10`}>
        {/* Sidebar Header */}
        <div className="bg-[#f0f2f5] h-16 flex items-center justify-between px-4 shrink-0">
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden cursor-pointer shadow-sm">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Me" alt="My Profile" />
          </div>
          <div className="flex space-x-5 text-gray-500">
            <button className="hover:text-gray-700 transition-colors"><i className="fas fa-circle-notch text-xl"></i></button>
            <button className="hover:text-gray-700 transition-colors"><i className="fas fa-comment-alt text-xl"></i></button>
            <button className="hover:text-gray-700 transition-colors"><i className="fas fa-ellipsis-v text-xl"></i></button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-2 shrink-0 bg-white">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <i className="fas fa-search text-sm"></i>
            </span>
            <input
              type="text"
              placeholder="Search or start new chat"
              className="w-full bg-[#f0f2f5] py-2 pl-10 pr-4 rounded-lg focus:outline-none text-sm placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => {
                setActiveChat(contact.id)
                if (window.innerWidth < 768) setIsSidebarOpen(false)
              }}
              className={`flex items-center px-4 py-3 cursor-pointer transition-colors duration-200 ${activeChat === contact.id ? 'bg-[#f0f2f5]' : 'hover:bg-[#f9fafb]'}`}
            >
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-100">
                  <img src={contact.avatar} alt={contact.name} />
                </div>
              </div>
              <div className="ml-4 flex-1 overflow-hidden">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium text-[15px] truncate">{contact.name}</h3>
                  <span className={`text-[12px] ${activeChat === contact.id ? 'text-gray-600' : 'text-gray-400'}`}>{contact.time}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <i className="fas fa-check-double text-blue-400 text-[10px]"></i>
                  <p className="text-[13px] text-gray-500 truncate leading-tight">{contact.lastMessage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={`${!isSidebarOpen ? 'flex' : 'hidden md:flex'} flex-1 flex-col bg-[#efeae2] h-full relative`}>
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="bg-[#f0f2f5] h-16 flex items-center justify-between px-4 border-l border-gray-200 shrink-0 z-20 shadow-sm">
              <div className="flex items-center min-w-0">
                <button 
                  onClick={() => setIsSidebarOpen(true)}
                  className="mr-3 text-gray-500 md:hidden p-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <i className="fas fa-arrow-left"></i>
                </button>
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-gray-200">
                  <img src={currentChat?.avatar} alt={currentChat?.name} />
                </div>
                <div className="ml-3 truncate">
                  <h3 className="font-semibold text-gray-900 truncate">{currentChat?.name}</h3>
                  <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-[12px] text-gray-500">online</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-6 text-gray-500 px-2">
                <button className="hover:text-gray-700"><i className="fas fa-search"></i></button>
                <button className="hover:text-gray-700"><i className="fas fa-ellipsis-v"></i></button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 relative overflow-x-hidden scroll-smooth" style={{
              backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
              backgroundSize: '400px'
            }}>
              <div className="flex justify-center sticky top-0 z-10">
                <span className="bg-white/90 backdrop-blur-sm text-[11px] font-medium px-2.5 py-1 rounded-lg shadow-sm uppercase tracking-wider text-gray-600 border border-gray-100">Today</span>
              </div>
              
              <div className="flex justify-start">
                <div className="bg-white px-3 py-1.5 rounded-lg rounded-tl-none shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] max-w-[85%] sm:max-w-[70%] lg:max-w-[60%]">
                  <p className="text-[14.2px] leading-relaxed">Assalam o Alaikum! Kaisa chal raha hai kaam?</p>
                  <div className="text-[10px] text-gray-400 text-right mt-0.5 leading-none">10:00 AM</div>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="bg-[#dcf8c6] px-3 py-1.5 rounded-lg rounded-tr-none shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] max-w-[85%] sm:max-w-[70%] lg:max-w-[60%]">
                  <p className="text-[14.2px] leading-relaxed text-left">Walaikum Assalam! Sab fit hai, UI design complete kar raha hoon.</p>
                  <div className="flex items-center justify-end space-x-1 mt-0.5 leading-none uppercase">
                    <span className="text-[10px] text-gray-500">10:05 AM</span>
                    <i className="fas fa-check-double text-blue-400 text-[10px]"></i>
                  </div>
                </div>
              </div>

              <div className="flex justify-start">
                <div className="bg-white px-3 py-1.5 rounded-lg rounded-tl-none shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] max-w-[85%] sm:max-w-[70%] lg:max-w-[60%]">
                  <p className="text-[14.2px] leading-relaxed">{currentChat?.lastMessage}</p>
                  <div className="text-[10px] text-gray-400 text-right mt-0.5 leading-none">{currentChat?.time}</div>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="bg-[#f0f2f5] px-4 py-2.5 flex items-center space-x-3 shrink-0">
              <div className="flex items-center space-x-4 text-gray-500">
                <button className="hover:text-gray-700 transition-colors">
                  <i className="far fa-smile text-2xl"></i>
                </button>
                <button className="hover:text-gray-700 transition-colors rotate-45">
                  <i className="fas fa-paperclip text-xl"></i>
                </button>
              </div>
              
              <div className="flex-1">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message"
                  className="w-full bg-white py-2.5 px-4 rounded-lg focus:outline-none text-[15px] shadow-sm placeholder:text-gray-400"
                />
              </div>

              <button className="bg-transparent text-gray-500 hover:text-whatsapp-teal transition-colors flex items-center justify-center w-10 h-10">
                {message ? (
                  <i className="fas fa-paper-plane text-[22px] text-whatsapp-teal"></i>
                ) : (
                  <i className="fas fa-microphone text-[22px]"></i>
                )}
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-[#f8f9fa] border-l border-gray-200 p-8">
            <div className="w-64 h-64 opacity-[0.08] bg-[url('https://static.whatsapp.net/rsrc.php/v3/y6/r/wa669ae5y9Z.png')] bg-no-repeat bg-center bg-contain mb-8"></div>
            <h2 className="text-[32px] font-light text-gray-600 mb-4">WhatsApp Web</h2>
            <p className="text-[14px] text-gray-500 text-center max-w-sm leading-relaxed">
              Send and receive messages without keeping your phone online.<br/>
              Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
            </p>
            <div className="mt-auto flex items-center text-gray-400 text-[13px] tracking-wide">
              <i className="fas fa-lock mr-2 text-[10px]"></i> End-to-end encrypted
            </div>
          </div>
        )}
      </div>
      
      {/* Font Awesome CDN */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
    </div>
  )
}

export default App
