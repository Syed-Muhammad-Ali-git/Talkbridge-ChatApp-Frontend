import React, { useRef, useEffect } from 'react';
import { Phone, Video, Search, MoreVertical, Paperclip, Smile, Send, Mic, CheckCheck, ArrowLeft } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  time: string;
  sender: "me" | "other";
  status?: "sent" | "delivered" | "read";
}

interface ChatWindowProps {
  activeChat: any;
  messages: Message[];
  messageInput: string;
  setMessageInput: (val: string) => void;
  onSendMessage: (e?: React.FormEvent) => void;
  onBack?: () => void;
}

const ChatWindow = ({ activeChat, messages, messageInput, setMessageInput, onSendMessage, onBack }: ChatWindowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (!activeChat) {
    return (
      <div className="hidden lg:flex flex-1 flex flex-col items-center justify-center bg-bg-main p-8 text-center animate-in fade-in duration-500">
        <div className="w-24 h-24 bg-white/50 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-xl mb-8">
          <Paperclip size={48} className="text-primary/30 -rotate-45" />
        </div>
        <h2 className="text-3xl font-bold text-text-primary mb-4 tracking-tight">Talkbridge Web</h2>
        <p className="text-text-secondary max-w-sm leading-relaxed">
          Select a conversation to start messaging. Your messages are end-to-end encrypted.
        </p>
        <div className="mt-20 flex items-center space-x-2 text-text-secondary/50 text-xs font-semibold tracking-widest uppercase">
          <span className="w-8 h-[1px] bg-current opacity-20" />
          <span>Developed by Syed Muhammad Ali</span>
          <span className="w-8 h-[1px] bg-current opacity-20" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-white relative overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300 z-50 lg:z-auto">
      {/* Header */}
      <div className="h-[76px] px-4 lg:px-6 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center space-x-2 lg:space-x-4">
          {onBack && (
            <button 
              onClick={onBack}
              className="p-2 lg:hidden text-text-secondary hover:bg-gray-100 rounded-xl transition-all"
            >
              <ArrowLeft size={24} />
            </button>
          )}
          <div className="relative">
            <img
              src={activeChat.avatar}
              alt={activeChat.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
            />
            {activeChat.status === 'online' && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-online border-2 border-white rounded-full" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-sm md:text-base text-text-primary leading-tight truncate max-w-[120px] md:max-w-none">{activeChat.name}</h3>
            <p className={`text-[10px] md:text-[11px] font-medium ${activeChat.status === 'online' ? 'text-online' : 'text-text-secondary'}`}>
              {activeChat.status === 'online' ? 'Active now' : 'Last seen recently'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <button className="p-2.5 text-text-secondary hover:bg-gray-50 rounded-xl transition-all"><Phone size={20} /></button>
          <button className="p-2.5 text-text-secondary hover:bg-gray-50 rounded-xl transition-all"><Video size={20} /></button>
          <div className="w-[1px] h-6 bg-gray-100 mx-2" />
          <button className="p-2.5 text-text-secondary hover:bg-gray-50 rounded-xl transition-all"><Search size={20} /></button>
          <button className="p-2.5 text-text-secondary hover:bg-gray-50 rounded-xl transition-all"><MoreVertical size={20} /></button>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 bg-bg-main/30 scrollbar-hide"
      >
        <div className="flex justify-center mb-8">
          <span className="bg-white/70 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-text-secondary uppercase tracking-widest border border-gray-100 shadow-sm">
            Today
          </span>
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div
              className={`max-w-[70%] px-4 py-2.5 rounded-2xl shadow-sm relative group ${
                msg.sender === 'me'
                  ? 'bg-primary text-white rounded-tr-none'
                  : 'bg-white text-text-primary rounded-tl-none border border-gray-100'
              }`}
            >
              <p className="text-[14px] leading-relaxed break-words">
                {msg.text}
              </p>
              <div className={`flex items-center justify-end space-x-1 mt-1 ${msg.sender === 'me' ? 'text-white/70' : 'text-text-secondary'}`}>
                <span className="text-[9px] font-medium tabular-nums">{msg.time}</span>
                {msg.sender === 'me' && (
                  <CheckCheck size={12} className={msg.status === 'read' ? 'text-white' : 'text-white/50'} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="px-6 py-4 bg-white border-t border-gray-100">
        <form 
          onSubmit={onSendMessage}
          className="flex items-center space-x-3"
        >
          <div className="flex items-center space-x-1">
            <button type="button" className="p-2 text-text-secondary hover:bg-gray-50 rounded-xl transition-all"><Smile size={22} /></button>
            <button type="button" className="p-2 text-text-secondary hover:bg-gray-50 rounded-xl transition-all"><Paperclip size={22} /></button>
          </div>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type your message..."
              className="w-full bg-bg-main py-3 px-5 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-transparent focus:border-primary/30"
            />
          </div>

          <button
            type="submit"
            disabled={!messageInput.trim()}
            className={`w-[46px] h-[46px] rounded-2xl flex items-center justify-center shadow-lg transition-all active:scale-95 ${
              messageInput.trim() 
                ? 'bg-primary text-white shadow-primary/30 hover:bg-primary-hover animate-in zoom-in-50' 
                : 'bg-bg-main text-text-secondary cursor-not-allowed'
            }`}
          >
            {messageInput.trim() ? <Send size={20} /> : <Mic size={20} />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
