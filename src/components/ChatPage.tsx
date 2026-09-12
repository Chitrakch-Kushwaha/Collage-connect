import { useState, useRef, useEffect } from 'react';
import {
  Hash, Users, Briefcase, Home, Trophy, Send, Search, Pin,
  Smile, Paperclip, Mic, Phone, Video, MoreVertical, ChevronDown,
  UserCircle, Bell, BookOpen,
} from 'lucide-react';
import { Avatar } from './ui';
import { chatChannels, chatMessages, currentUser } from '../data';
import type { ChatMessage, ChatChannel } from '../types';

const channelIcons: Record<string, typeof Hash> = {
  branch: Hash,
  semester: Hash,
  subject: BookOpen,
  hostel: Home,
  placements: Briefcase,
  clubs: Users,
  hackathons: Trophy,
  dm: UserCircle,
};

export function ChatPage() {
  const [activeChannel, setActiveChannel] = useState<ChatChannel>(chatChannels[0]);
  const [messages, setMessages] = useState<ChatMessage[]>(chatMessages);
  const [input, setInput] = useState('');
  const [showChannelList, setShowChannelList] = useState(false);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const t = setTimeout(() => setTyping(false), 3000);
    setTyping(true);
    return () => clearTimeout(t);
  }, [activeChannel]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const msg: ChatMessage = {
      id: `m${Date.now()}`,
      author: currentUser.name,
      avatar: currentUser.avatar,
      content: input,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, msg]);
    setInput('');
  };

  const pinnedMessages = messages.filter((m) => m.pinned);

  return (
    <div className="h-[calc(100vh-5rem)] flex overflow-hidden rounded-2xl card-base">
      {/* Channel list */}
      <div className={`w-64 border-r border-ink-100 dark:border-ink-800 flex flex-col shrink-0 ${showChannelList ? 'absolute inset-y-0 left-0 z-20 bg-white dark:bg-ink-900' : 'hidden'} md:flex md:relative md:translate-x-0`}>
        <div className="p-4 border-b border-ink-100 dark:border-ink-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-400" />
            <input
              placeholder="Search channels..."
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-ink-50 dark:bg-ink-800/50 text-xs outline-none"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-thin p-2 space-y-0.5">
          <div className="text-[10px] font-bold text-ink-400 uppercase px-2 py-1.5 flex items-center justify-between">
            Channels <ChevronDown className="w-3 h-3" />
          </div>
          {chatChannels.filter((c) => c.type !== 'dm').map((ch) => {
            const Icon = channelIcons[ch.type] || Hash;
            return (
              <button
                key={ch.id}
                onClick={() => { setActiveChannel(ch); setShowChannelList(false); }}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-colors ${
                  activeChannel.id === ch.id ? 'bg-brand-50 dark:bg-brand-500/10 text-brand-600' : 'hover:bg-ink-50 dark:hover:bg-ink-800 text-ink-600 dark:text-ink-300'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate flex-1 text-left">{ch.name}</span>
                {ch.unread > 0 && (
                  <span className="text-[10px] font-bold bg-rose-500 text-white rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                    {ch.unread > 99 ? '99+' : ch.unread}
                  </span>
                )}
              </button>
            );
          })}
          <div className="text-[10px] font-bold text-ink-400 uppercase px-2 py-1.5 mt-3 flex items-center justify-between">
            Direct Messages <ChevronDown className="w-3 h-3" />
          </div>
          {chatChannels.filter((c) => c.type === 'dm').map((ch) => (
            <button
              key={ch.id}
              onClick={() => { setActiveChannel(ch); setShowChannelList(false); }}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-colors ${
                activeChannel.id === ch.id ? 'bg-brand-50 dark:bg-brand-500/10 text-brand-600' : 'hover:bg-ink-50 dark:hover:bg-ink-800 text-ink-600 dark:text-ink-300'
              }`}
            >
              <div className="relative">
                <div className="w-5 h-5 rounded-full bg-mint-400" />
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-mint-500 border border-white dark:border-ink-900" />
              </div>
              <span className="truncate flex-1 text-left">{ch.name}</span>
              {ch.unread > 0 && (
                <span className="text-[10px] font-bold bg-rose-500 text-white rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                  {ch.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="h-14 border-b border-ink-100 dark:border-ink-800 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <button className="md:hidden" onClick={() => setShowChannelList(!showChannelList)}>
              <Users className="w-5 h-5" />
            </button>
            {activeChannel.type === 'dm' ? (
              <Avatar src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activeChannel.name}`} alt={activeChannel.name} size={28} />
            ) : (
              <Hash className="w-5 h-5 text-ink-400" />
            )}
            <span className="font-semibold text-sm truncate">{activeChannel.name}</span>
            {activeChannel.members && (
              <span className="text-xs text-ink-400 hidden sm:inline">· {activeChannel.members} members</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-lg hover:bg-ink-100 dark:hover:bg-ink-800 flex items-center justify-center transition-colors">
              <Phone className="w-4 h-4 text-ink-400" />
            </button>
            <button className="w-8 h-8 rounded-lg hover:bg-ink-100 dark:hover:bg-ink-800 flex items-center justify-center transition-colors">
              <Video className="w-4 h-4 text-ink-400" />
            </button>
            <button className="w-8 h-8 rounded-lg hover:bg-ink-100 dark:hover:bg-ink-800 flex items-center justify-center transition-colors">
              <Bell className="w-4 h-4 text-ink-400" />
            </button>
            <button className="w-8 h-8 rounded-lg hover:bg-ink-100 dark:hover:bg-ink-800 flex items-center justify-center transition-colors">
              <MoreVertical className="w-4 h-4 text-ink-400" />
            </button>
          </div>
        </div>

        {/* Pinned messages */}
        {pinnedMessages.length > 0 && (
          <div className="px-4 py-2 bg-accent-50 dark:bg-accent-500/10 border-b border-accent-100 dark:border-accent-500/20 flex items-center gap-2">
            <Pin className="w-3.5 h-3.5 text-accent-500 shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="text-xs font-semibold text-accent-600">Pinned: </span>
              <span className="text-xs text-accent-700 dark:text-accent-300 truncate">{pinnedMessages[0].content}</span>
            </div>
          </div>
        )}

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4">
          {messages.map((m, i) => {
            const isMe = m.author === currentUser.name;
            const showAvatar = i === 0 || messages[i - 1].author !== m.author;
            return (
              <div key={m.id} className={`flex items-start gap-3 group ${isMe ? 'flex-row-reverse' : ''}`}>
                {showAvatar ? (
                  <Avatar src={m.avatar} alt={m.author} size={36} />
                ) : (
                  <div className="w-9 shrink-0" />
                )}
                <div className={`max-w-[70%] ${isMe ? 'items-end' : ''} flex flex-col`}>
                  {showAvatar && (
                    <div className={`flex items-baseline gap-2 mb-1 ${isMe ? 'flex-row-reverse' : ''}`}>
                      <span className="text-xs font-semibold">{m.author}</span>
                      <span className="text-[10px] text-ink-400">{m.time}</span>
                    </div>
                  )}
                  <div
                    className={`px-3.5 py-2 rounded-2xl text-sm leading-relaxed animate-fade-up ${
                      isMe
                        ? 'gradient-brand text-white rounded-tr-md'
                        : 'bg-ink-100 dark:bg-ink-800 text-ink-800 dark:text-ink-100 rounded-tl-md'
                    }`}
                  >
                    {m.content}
                  </div>
                  {m.reactions && m.reactions.length > 0 && (
                    <div className={`flex gap-1 mt-1 ${isMe ? 'flex-row-reverse' : ''}`}>
                      {m.reactions.map((r, j) => (
                        <button
                          key={j}
                          className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-ink-100 dark:bg-ink-800 text-xs hover:scale-110 transition-transform"
                        >
                          {r.emoji} <span className="font-medium text-ink-500">{r.count}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          {typing && (
            <div className="flex items-center gap-2 text-xs text-ink-400 animate-fade-in">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-ink-400 animate-bounce-soft" />
                <span className="w-1.5 h-1.5 rounded-full bg-ink-400 animate-bounce-soft" style={{ animationDelay: '0.2s' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-ink-400 animate-bounce-soft" style={{ animationDelay: '0.4s' }} />
              </div>
              Someone is typing...
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-ink-100 dark:border-ink-800 shrink-0">
          <div className="flex items-center gap-2 bg-ink-50 dark:bg-ink-800/50 rounded-xl px-3 py-2">
            <button className="text-ink-400 hover:text-brand-500 transition-colors">
              <Paperclip className="w-4 h-4" />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder={`Message #${activeChannel.name}...`}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-ink-400"
            />
            <button className="text-ink-400 hover:text-accent-500 transition-colors">
              <Smile className="w-4 h-4" />
            </button>
            <button className="text-ink-400 hover:text-brand-500 transition-colors">
              <Mic className="w-4 h-4" />
            </button>
            <button
              onClick={sendMessage}
              className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center text-white hover:scale-110 transition-transform"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
