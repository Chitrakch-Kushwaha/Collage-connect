import { useState, useEffect, useRef } from 'react';
import {
  GraduationCap, LayoutDashboard, MessageSquare, FolderOpen,
  MessagesSquare, HelpCircle, Briefcase, Rocket, ShoppingBag,
  Calendar, Users, Search, Bell, Sun, Moon, Menu, X, Settings,
  MapPinned, ChevronRight, Command, Sparkles, Check, UserRound,
} from 'lucide-react';
import { ToastProvider, useToast } from './components/Toast';
import { Avatar } from './components/ui';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { FeedPage } from './components/FeedPage';
import { ResourcesPage } from './components/ResourcesPage';
import { ChatPage } from './components/ChatPage';
import {
  DoubtsPage, PlacementsPage, ProjectsPage, MarketplacePage,
  EventsPage, ClubsPage, LostFoundPage, ProfilePage, SettingsPage,
  PeopleFinderPage,
} from './components/Pages';
import { currentUser, notifications as initialNotifs } from './data';
import type { Page } from './types';

const navItems: { id: Page; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'feed', label: 'Community', icon: MessageSquare },
  { id: 'resources', label: 'Resources', icon: FolderOpen },
  { id: 'chat', label: 'Chat', icon: MessagesSquare },
  { id: 'doubts', label: 'Doubts', icon: HelpCircle },
  { id: 'placements', label: 'Placements', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: Rocket },
  { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'clubs', label: 'Clubs', icon: Users },
  { id: 'people', label: 'People', icon: UserRound },
  { id: 'lostfound', label: 'Lost & Found', icon: MapPinned },
];

function AppContent() {
  const toast = useToast();
  const [page, setPage] = useState<Page>('landing');
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs] = useState(initialNotifs);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setNotifOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  const unreadCount = notifs.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
    toast('All notifications marked as read', 'info');
  };

  const navigate = (p: Page) => {
    setPage(p);
    setSidebarOpen(false);
    setSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (page === 'landing') {
    return <LandingPage onEnter={() => navigate('dashboard')} dark={dark} onToggleDark={() => setDark(!dark)} />;
  }

  const searchResults = [
    { type: 'Student', label: currentUser.name, page: 'people' as Page },
    { type: 'Resource', label: 'OS Notes — CS302', page: 'resources' as Page },
    { type: 'Post', label: 'DSA patterns for interviews', page: 'feed' as Page },
    { type: 'Event', label: 'Smart India Hackathon', page: 'events' as Page },
    { type: 'Doubt', label: 'B+ tree vs B-tree', page: 'doubts' as Page },
    { type: 'Placement', label: 'Google SDE Intern', page: 'placements' as Page },
    { type: 'Project', label: 'AI Study Companion', page: 'projects' as Page },
  ].filter((r) => r.label.toLowerCase().includes(searchQuery.toLowerCase()));

  const notifIcons: Record<string, string> = {
    like: '❤️', comment: '💬', mention: '👤', placement: '💼',
    deadline: '⏰', event: '📅', system: '🔔',
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg)' }}>
      {/* Sidebar */}
      <aside
        className={`w-60 border-r border-ink-100 dark:border-ink-800 flex flex-col shrink-0 fixed lg:sticky top-0 h-screen z-40 transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{ background: 'var(--bg-soft)' }}
      >
        {/* Logo */}
        <button
          onClick={() => navigate('landing')}
          className="h-16 flex items-center gap-2 px-5 border-b border-ink-100 dark:border-ink-800 shrink-0"
        >
          <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center shadow-glow">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">CollegeConnect</span>
        </button>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto scrollbar-thin p-3 space-y-0.5">
          <div className="text-[10px] font-bold text-ink-400 uppercase px-3 py-2">Menu</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = page === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  active
                    ? 'gradient-brand text-white shadow-float'
                    : 'text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${active ? '' : 'group-hover:scale-110 transition-transform'}`} />
                <span className="flex-1 text-left">{item.label}</span>
                {active && <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </nav>

        {/* User card */}
        <div className="p-3 border-t border-ink-100 dark:border-ink-800 shrink-0">
          <button
            onClick={() => navigate('profile')}
            className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors group"
          >
            <Avatar src={currentUser.avatar} alt={currentUser.name} size={36} ring />
            <div className="flex-1 text-left min-w-0">
              <div className="text-sm font-semibold truncate">{currentUser.name}</div>
              <div className="text-xs text-ink-400">Level {currentUser.level} · {currentUser.xp.toLocaleString()} XP</div>
            </div>
          </button>
          <button
            onClick={() => navigate('settings')}
            className={`w-full flex items-center gap-3 px-2 py-2 mt-1 rounded-xl text-sm font-medium transition-colors ${
              page === 'settings' ? 'gradient-brand text-white' : 'text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800'
            }`}
          >
            <Settings className="w-4 h-4" /> Settings
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header
          className="h-16 border-b border-ink-100 dark:border-ink-800 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-20 glass-strong"
        >
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h2 className="font-bold text-base sm:text-lg capitalize">
              {navItems.find((n) => n.id === page)?.label || page}
            </h2>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-ink-100 dark:bg-ink-800 text-sm text-ink-400 hover:bg-ink-200 dark:hover:bg-ink-700 transition-colors"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-ink-200 dark:bg-ink-700 text-[10px] font-medium">
                <Command className="w-2.5 h-2.5" />K
              </kbd>
            </button>
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative w-9 h-9 rounded-xl bg-ink-100 dark:bg-ink-800 flex items-center justify-center hover:scale-110 transition-transform"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-bounce-soft">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setDark(!dark)}
              className="w-9 h-9 rounded-xl bg-ink-100 dark:bg-ink-800 flex items-center justify-center hover:scale-110 transition-transform"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </header>

        {/* Notifications dropdown */}
        {notifOpen && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setNotifOpen(false)} />
            <div className="absolute top-14 right-4 sm:right-6 w-80 max-w-[calc(100vw-2rem)] z-40 glass-strong rounded-2xl shadow-float border border-ink-100 dark:border-ink-800 animate-fade-down overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-ink-100 dark:border-ink-800">
                <h3 className="font-bold text-sm">Notifications</h3>
                <button onClick={markAllRead} className="text-xs text-brand-500 font-medium hover:underline flex items-center gap-1">
                  <Check className="w-3 h-3" /> Mark all read
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto scrollbar-thin">
                {notifs.map((n) => (
                  <div
                    key={n.id}
                    className={`flex items-start gap-3 px-4 py-3 border-b border-ink-50 dark:border-ink-800/50 hover:bg-ink-50 dark:hover:bg-ink-800/50 cursor-pointer transition-colors ${!n.read ? 'bg-brand-50/30 dark:bg-brand-500/5' : ''}`}
                  >
                    <span className="text-lg shrink-0">{notifIcons[n.type]}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-ink-700 dark:text-ink-200 leading-snug">{n.content}</p>
                      <span className="text-[10px] text-ink-400">{n.time} ago</span>
                    </div>
                    {!n.read && <div className="w-2 h-2 rounded-full bg-brand-500 shrink-0 mt-1" />}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Search modal */}
        {searchOpen && (
          <>
            <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={() => setSearchOpen(false)} />
            <div className="fixed top-[15vh] left-1/2 -translate-x-1/2 w-[90vw] max-w-xl z-50 animate-scale-in">
              <div className="glass-strong rounded-2xl shadow-float border border-ink-100 dark:border-ink-800 overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-ink-100 dark:border-ink-800">
                  <Search className="w-5 h-5 text-ink-400" />
                  <input
                    ref={searchInputRef}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search students, resources, posts, events..."
                    className="flex-1 bg-transparent outline-none text-sm placeholder:text-ink-400"
                  />
                  <kbd className="px-1.5 py-0.5 rounded-md bg-ink-200 dark:bg-ink-700 text-[10px] font-medium">ESC</kbd>
                </div>
                <div className="max-h-80 overflow-y-auto scrollbar-thin p-2">
                  {searchQuery && searchResults.length === 0 ? (
                    <div className="text-center py-8 text-sm text-ink-400">No results found</div>
                  ) : (
                    (searchQuery ? searchResults : searchResults).map((r, i) => (
                      <button
                        key={i}
                        onClick={() => navigate(r.page)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-500/10 text-brand-500 flex items-center justify-center shrink-0">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="text-sm font-medium">{r.label}</div>
                          <div className="text-xs text-ink-400">{r.type}</div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-ink-300 group-hover:text-brand-500 transition-colors" />
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
          {page === 'dashboard' && <Dashboard onNavigate={navigate} />}
          {page === 'feed' && <FeedPage />}
          {page === 'resources' && <ResourcesPage />}
          {page === 'chat' && <ChatPage />}
          {page === 'doubts' && <DoubtsPage />}
          {page === 'placements' && <PlacementsPage />}
          {page === 'projects' && <ProjectsPage />}
          {page === 'marketplace' && <MarketplacePage />}
          {page === 'events' && <EventsPage />}
          {page === 'clubs' && <ClubsPage />}
          {page === 'lostfound' && <LostFoundPage />}
          {page === 'people' && <PeopleFinderPage onNavigate={navigate} />}
          {page === 'profile' && <ProfilePage />}
          {page === 'settings' && <SettingsPage dark={dark} onToggleDark={() => setDark(!dark)} />}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
