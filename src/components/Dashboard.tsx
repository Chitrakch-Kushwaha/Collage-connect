import { useState } from 'react';
import {
  Clock, MapPin, AlertCircle, CheckCircle2, Circle, Calendar,
  Trophy, Flame, Zap, TrendingUp, Bell, Sun, Cloud, CloudRain,
  BookOpen, MessageSquare, Users, ChevronRight, Plus,
  CheckCheck, FileText, Briefcase, ArrowRight,
} from 'lucide-react';
import { Avatar, Badge, ProgressBar } from './ui';
import { Reveal } from './Reveal';
import { useToast } from './Toast';
import {
  currentUser, timetable, assignments, events, leaderboard,
  notifications, posts,
} from '../data';
import type { Page } from '../types';

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  brand: { bg: 'bg-brand-50 dark:bg-brand-500/10', text: 'text-brand-600 dark:text-brand-300', border: 'border-brand-200 dark:border-brand-500/30' },
  mint: { bg: 'bg-mint-50 dark:bg-mint-500/10', text: 'text-mint-600 dark:text-mint-300', border: 'border-mint-200 dark:border-mint-500/30' },
  accent: { bg: 'bg-accent-50 dark:bg-accent-500/10', text: 'text-accent-600 dark:text-accent-300', border: 'border-accent-200 dark:border-accent-500/30' },
  rose: { bg: 'bg-rose-50 dark:bg-rose-500/10', text: 'text-rose-600 dark:text-rose-300', border: 'border-rose-200 dark:border-rose-500/30' },
};

const priorityMap = {
  high: { color: 'rose' as const, icon: AlertCircle },
  medium: { color: 'accent' as const, icon: Clock },
  low: { color: 'mint' as const, icon: Circle },
};

const notifIcons = {
  like: { icon: TrendingUp, color: 'text-rose-500' },
  comment: { icon: MessageSquare, color: 'text-brand-500' },
  mention: { icon: Users, color: 'text-accent-500' },
  placement: { icon: Briefcase, color: 'text-mint-500' },
  deadline: { icon: AlertCircle, color: 'text-rose-500' },
  event: { icon: Calendar, color: 'text-brand-500' },
  system: { icon: Bell, color: 'text-ink-400' },
};

export function Dashboard({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const toast = useToast();
  const [assignmentList, setAssignmentList] = useState(assignments);
  const [rsvpEvents, setRsvpEvents] = useState<Set<string>>(
    new Set(events.filter((e) => e.rsvped).map((e) => e.id))
  );

  const toggleAssignment = (id: string) => {
    setAssignmentList((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: a.status === 'completed' ? 'todo' : 'completed', progress: a.status === 'completed' ? 0 : 100 }
          : a
      )
    );
    const a = assignmentList.find((x) => x.id === id);
    if (a && a.status !== 'completed') toast(`"${a.title}" marked complete! +10 XP`);
  };

  const toggleRsvp = (id: string) => {
    setRsvpEvents((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast('RSVP cancelled', 'info');
      } else {
        next.add(id);
        toast('RSVP confirmed! See you there');
      }
      return next;
    });
  };

  const upcomingClasses = timetable.filter((c) => c.status !== 'done');
  const liveClass = timetable.find((c) => c.status === 'live');
  const pendingAssignments = assignmentList.filter((a) => a.status !== 'completed');
  const completedCount = assignmentList.filter((a) => a.status === 'completed').length;
  const productivity = Math.round((completedCount / assignmentList.length) * 100);

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <Reveal>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Hey, {currentUser.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">
              You have {pendingAssignments.length} assignments pending and {upcomingClasses.length} classes left today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-ink-50 dark:bg-ink-800/50">
              <Flame className="w-5 h-5 text-accent-500" />
              <div>
                <div className="text-xs text-ink-400">Streak</div>
                <div className="text-sm font-bold">{currentUser.streak} days</div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-ink-50 dark:bg-ink-800/50">
              <Zap className="w-5 h-5 text-brand-500" />
              <div>
                <div className="text-xs text-ink-400">Level</div>
                <div className="text-sm font-bold">{currentUser.level}</div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Classes Today', value: timetable.length, sub: `${upcomingClasses.length} remaining`, icon: Clock, color: 'brand' },
          { label: 'Assignments', value: pendingAssignments.length, sub: `${completedCount} completed`, icon: BookOpen, color: 'accent' },
          { label: 'Events', value: events.length, sub: `${rsvpEvents.size} RSVP'd`, icon: Calendar, color: 'mint' },
          { label: 'Productivity', value: `${productivity}%`, sub: 'This week', icon: TrendingUp, color: 'rose' },
        ].map((s, i) => {
          const c = colorMap[s.color];
          const Icon = s.icon;
          return (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="card-base p-4 hover:shadow-card hover:-translate-y-0.5 transition-all group cursor-default">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center ${c.text} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-2xl font-extrabold">{s.value}</div>
                <div className="text-xs text-ink-500 dark:text-ink-400 mt-0.5">{s.label}</div>
                <div className="text-xs text-ink-400 mt-1">{s.sub}</div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Timetable */}
          <Reveal>
            <div className="card-base p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-brand-500" />
                  Today's Timetable
                </h2>
                <button onClick={() => onNavigate('dashboard')} className="text-xs text-brand-500 font-medium hover:underline">
                  Full schedule
                </button>
              </div>
              {liveClass && (
                <div className="mb-3 p-3 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 flex items-center gap-3 animate-fade-in">
                  <div className="relative">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping-slow" />
                  </div>
                  <span className="text-sm font-semibold text-rose-600 dark:text-rose-300">LIVE: {liveClass.subject}</span>
                  <span className="text-xs text-rose-500">{liveClass.time} · {liveClass.room}</span>
                </div>
              )}
              <div className="space-y-2">
                {timetable.map((c) => {
                  const cm = colorMap[c.color];
                  return (
                    <div
                      key={c.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all hover:scale-[1.01] ${cm.border} ${c.status === 'done' ? 'opacity-50' : ''}`}
                    >
                      <div className={`w-1 h-10 rounded-full ${cm.text.replace('text-', 'bg-')}`} />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm">{c.subject}</div>
                        <div className="text-xs text-ink-500 dark:text-ink-400 flex items-center gap-2 mt-0.5">
                          <Clock className="w-3 h-3" /> {c.time}
                          <MapPin className="w-3 h-3 ml-1" /> {c.room}
                        </div>
                      </div>
                      {c.status === 'done' ? (
                        <CheckCircle2 className="w-5 h-5 text-mint-500" />
                      ) : c.status === 'live' ? (
                        <Badge color="rose" size="xs">LIVE</Badge>
                      ) : (
                        <Badge color="ink" size="xs">Soon</Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* Assignments */}
          <Reveal delay={0.1}>
            <div className="card-base p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-accent-500" />
                  Assignments
                </h2>
                <Badge color="accent">{pendingAssignments.length} pending</Badge>
              </div>
              <div className="space-y-2">
                {assignmentList.map((a) => {
                  const pm = priorityMap[a.priority];
                  const PmIcon = pm.icon;
                  return (
                    <div
                      key={a.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border border-ink-100 dark:border-ink-800 hover:border-brand-200 dark:hover:border-brand-500/30 transition-all group ${a.status === 'completed' ? 'opacity-50' : ''}`}
                    >
                      <button
                        onClick={() => toggleAssignment(a.id)}
                        className="shrink-0 hover:scale-110 transition-transform"
                      >
                        {a.status === 'completed' ? (
                          <CheckCircle2 className="w-5 h-5 text-mint-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-ink-300 dark:text-ink-600 group-hover:text-brand-400 transition-colors" />
                        )}
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-medium ${a.status === 'completed' ? 'line-through' : ''}`}>{a.title}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-ink-400">{a.subject}</span>
                          <span className="text-xs text-ink-300">·</span>
                          <span className={`text-xs font-medium ${pm.color === 'rose' ? 'text-rose-500' : pm.color === 'accent' ? 'text-accent-500' : 'text-mint-500'}`}>
                            {a.dueDate}
                          </span>
                        </div>
                        {a.status === 'in-progress' && (
                          <div className="mt-2"><ProgressBar value={a.progress} color={pm.color} /></div>
                        )}
                      </div>
                      <PmIcon className={`w-4 h-4 shrink-0 ${pm.color === 'rose' ? 'text-rose-400' : pm.color === 'accent' ? 'text-accent-400' : 'text-mint-400'}`} />
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* Recent Posts */}
          <Reveal delay={0.15}>
            <div className="card-base p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-brand-500" />
                  Trending in Community
                </h2>
                <button onClick={() => onNavigate('feed')} className="text-xs text-brand-500 font-medium hover:underline flex items-center gap-1">
                  View all <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-3">
                {posts.slice(0, 3).map((p) => (
                  <div
                    key={p.id}
                    onClick={() => onNavigate('feed')}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-ink-50 dark:hover:bg-ink-800/50 cursor-pointer transition-colors group"
                  >
                    <Avatar src={p.avatar} alt={p.author} size={36} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">{p.author}</span>
                        <Badge color="ink" size="xs">{p.tag}</Badge>
                      </div>
                      <p className="text-xs text-ink-500 dark:text-ink-400 mt-1 line-clamp-2">{p.content}</p>
                      <div className="flex gap-3 mt-2 text-xs text-ink-400">
                        <span className="flex items-center gap-1 group-hover:text-rose-500 transition-colors">❤️ {p.likes}</span>
                        <span className="flex items-center gap-1 group-hover:text-brand-500 transition-colors">💬 {p.comments}</span>
                        <span className="flex items-center gap-1">🔖 {p.bookmarks}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Weather + Calendar widget */}
          <Reveal delay={0.05}>
            <div className="card-base p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-sm">Gurugram</h2>
                <Cloud className="w-5 h-5 text-ink-400" />
              </div>
              <div className="flex items-center gap-3">
                <div className="text-4xl font-extrabold">28°</div>
                <div>
                  <div className="text-sm text-ink-500 dark:text-ink-400">Partly Cloudy</div>
                  <div className="text-xs text-ink-400">H: 32° L: 24°</div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 mt-4">
                {[
                  { day: 'Mon', temp: '30°', icon: Sun },
                  { day: 'Tue', temp: '32°', icon: Sun },
                  { day: 'Wed', temp: '28°', icon: CloudRain },
                  { day: 'Thu', temp: '29°', icon: Cloud },
                ].map((d) => {
                  const Icon = d.icon;
                  return (
                    <div key={d.day} className="text-center p-2 rounded-lg bg-ink-50 dark:bg-ink-800/50">
                      <div className="text-xs text-ink-400">{d.day}</div>
                      <Icon className="w-4 h-4 mx-auto my-1 text-ink-400" />
                      <div className="text-xs font-semibold">{d.temp}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* Leaderboard */}
          <Reveal delay={0.1}>
            <div className="card-base p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-sm flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-accent-500" />
                  Leaderboard
                </h2>
                <button onClick={() => onNavigate('dashboard')} className="text-xs text-brand-500 hover:underline">View</button>
              </div>
              <div className="space-y-2">
                {leaderboard.slice(0, 5).map((entry) => (
                  <div
                    key={entry.rank}
                    className={`flex items-center gap-3 p-2 rounded-xl transition-all hover:scale-[1.02] ${
                      entry.name === currentUser.name ? 'bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/30' : ''
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold ${
                      entry.rank === 1 ? 'bg-accent-100 dark:bg-accent-500/20 text-accent-600' :
                      entry.rank === 2 ? 'bg-ink-100 dark:bg-ink-700 text-ink-500' :
                      entry.rank === 3 ? 'bg-rose-100 dark:bg-rose-500/20 text-rose-600' :
                      'bg-ink-50 dark:bg-ink-800 text-ink-400'
                    }`}>
                      {entry.badge || entry.rank}
                    </div>
                    <Avatar src={entry.avatar} alt={entry.name} size={28} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{entry.name}</div>
                      <div className="text-xs text-ink-400">{entry.branch} · Lv.{entry.level}</div>
                    </div>
                    <div className="text-xs font-bold text-brand-500">{entry.xp.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Events */}
          <Reveal delay={0.15}>
            <div className="card-base p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-mint-500" />
                  Upcoming Events
                </h2>
                <button onClick={() => onNavigate('events')} className="text-xs text-brand-500 hover:underline">All</button>
              </div>
              <div className="space-y-2">
                {events.slice(0, 3).map((e) => (
                  <div key={e.id} className="p-3 rounded-xl border border-ink-100 dark:border-ink-800 hover:border-mint-200 dark:hover:border-mint-500/30 transition-all">
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-mint-50 dark:bg-mint-500/10 text-mint-600 shrink-0">
                        <span className="text-xs font-medium">{e.date.split(' ')[0]}</span>
                        <span className="text-lg font-bold leading-none">{e.date.split(' ')[1]}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold truncate">{e.title}</div>
                        <div className="text-xs text-ink-400 mt-0.5">{e.time} · {e.venue}</div>
                        <button
                          onClick={() => toggleRsvp(e.id)}
                          className={`mt-2 text-xs font-medium px-2.5 py-1 rounded-lg transition-all ${
                            rsvpEvents.has(e.id)
                              ? 'bg-mint-100 dark:bg-mint-500/20 text-mint-600'
                              : 'bg-ink-100 dark:bg-ink-800 text-ink-500 hover:bg-brand-100 hover:text-brand-600'
                          }`}
                        >
                          {rsvpEvents.has(e.id) ? '✓ Going' : 'RSVP'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Notifications */}
          <Reveal delay={0.2}>
            <div className="card-base p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-sm flex items-center gap-2">
                  <Bell className="w-4 h-4 text-brand-500" />
                  Notifications
                </h2>
                <button className="text-xs text-brand-500 hover:underline flex items-center gap-1">
                  <CheckCheck className="w-3 h-3" /> Mark all
                </button>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin">
                {notifications.slice(0, 5).map((n) => {
                  const ni = notifIcons[n.type];
                  const Icon = ni.icon;
                  return (
                    <div
                      key={n.id}
                      className={`flex items-start gap-2.5 p-2.5 rounded-xl transition-colors cursor-pointer hover:bg-ink-50 dark:hover:bg-ink-800/50 ${
                        !n.read ? 'bg-brand-50/50 dark:bg-brand-500/5' : ''
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${ni.color}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-ink-700 dark:text-ink-200 leading-snug">{n.content}</p>
                        <span className="text-[10px] text-ink-400">{n.time} ago</span>
                      </div>
                      {!n.read && <div className="w-2 h-2 rounded-full bg-brand-500 shrink-0 mt-1" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* Quick Actions */}
          <Reveal delay={0.25}>
            <div className="card-base p-5">
              <h2 className="font-bold text-sm mb-3">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'New Post', icon: Plus, page: 'feed' as Page, color: 'brand' },
                  { label: 'Resources', icon: FileText, page: 'resources' as Page, color: 'accent' },
                  { label: 'Placements', icon: Briefcase, page: 'placements' as Page, color: 'mint' },
                  { label: 'Projects', icon: ArrowRight, page: 'projects' as Page, color: 'rose' },
                ].map((a) => {
                  const c = colorMap[a.color];
                  const Icon = a.icon;
                  return (
                    <button
                      key={a.label}
                      onClick={() => onNavigate(a.page)}
                      className={`flex items-center gap-2 p-3 rounded-xl ${c.bg} ${c.text} text-sm font-medium hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-4 h-4" />
                      {a.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
