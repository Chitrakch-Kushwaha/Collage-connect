import { useState } from 'react';
import {
  GraduationCap, ArrowRight, Menu, X, Sun, Moon, Star, ChevronDown,
  Users, FileText, HelpCircle, Rocket, MessageSquare, FolderOpen,
  MessagesSquare, Briefcase, ShoppingBag, Search, Trophy, Calendar,
  Bot, Bell, Sparkles, Check, Zap,
} from 'lucide-react';
import { Reveal, Counter } from './Reveal';
import { Avatar, Badge } from './ui';
import { stats, features, testimonials, faqs, roadmap } from '../data';

const iconMap: Record<string, typeof Users> = {
  Users, FileText, HelpCircle, Rocket, MessageSquare, FolderOpen,
  MessagesSquare, Briefcase, ShoppingBag, Search, Trophy, Calendar,
  Bot, Bell, Sparkles, Check, Zap, GraduationCap,
};

export function LandingPage({
  onEnter,
  dark,
  onToggleDark,
}: {
  onEnter: () => void;
  dark: boolean;
  onToggleDark: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-bg text-ink-900 dark:text-ink-50 overflow-x-hidden" style={{ background: 'var(--bg)' }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-ink-100 dark:border-ink-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center shadow-glow">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">CollegeConnect</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-ink-600 dark:text-ink-300">
            <a href="#features" className="hover:text-brand-500 transition-colors">Features</a>
            <a href="#testimonials" className="hover:text-brand-500 transition-colors">Testimonials</a>
            <a href="#roadmap" className="hover:text-brand-500 transition-colors">Roadmap</a>
            <a href="#faq" className="hover:text-brand-500 transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleDark}
              className="w-9 h-9 rounded-xl bg-ink-100 dark:bg-ink-800 flex items-center justify-center hover:scale-110 transition-transform"
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={onEnter}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl gradient-brand text-white text-sm font-semibold shadow-float hover:shadow-glow hover:scale-105 transition-all"
            >
              Enter Platform <ArrowRight className="w-4 h-4" />
            </button>
            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-ink-100 dark:border-ink-800 px-4 py-3 space-y-2 animate-fade-down">
            <a href="#features" className="block py-2 text-sm font-medium" onClick={() => setMenuOpen(false)}>Features</a>
            <a href="#testimonials" className="block py-2 text-sm font-medium" onClick={() => setMenuOpen(false)}>Testimonials</a>
            <a href="#roadmap" className="block py-2 text-sm font-medium" onClick={() => setMenuOpen(false)}>Roadmap</a>
            <a href="#faq" className="block py-2 text-sm font-medium" onClick={() => setMenuOpen(false)}>FAQ</a>
            <button onClick={onEnter} className="w-full py-2 rounded-xl gradient-brand text-white text-sm font-semibold">Enter Platform</button>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-grid-light opacity-60 dark:opacity-10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-300/30 dark:bg-brand-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-accent-300/20 dark:bg-accent-500/15 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-mint-300/20 dark:bg-mint-500/10 rounded-full blur-3xl animate-float" />

        <div className="relative max-w-5xl mx-auto text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-brand-200 dark:border-brand-500/30 mb-6">
              <Sparkles className="w-4 h-4 text-accent-500" />
              <span className="text-sm font-medium text-ink-600 dark:text-ink-300">Exclusive to KR Mangalam University</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-balance leading-[1.05]">
              Everything You Need for College. <br />
              <span className="gradient-text">One Platform.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg sm:text-xl text-ink-500 dark:text-ink-400 max-w-2xl mx-auto text-balance">
              Connect, collaborate, and conquer college life. Discord + LinkedIn + Reddit + GitHub + Notion — built for KR Mangalam students.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onEnter}
                className="group flex items-center gap-2 px-6 py-3 rounded-xl gradient-brand text-white font-semibold shadow-float hover:shadow-glow hover:scale-105 transition-all"
              >
                Explore Platform
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#features"
                className="flex items-center gap-2 px-6 py-3 rounded-xl glass border border-ink-200 dark:border-ink-700 font-semibold hover:scale-105 transition-all"
              >
                See Features
              </a>
            </div>
          </Reveal>
        </div>

        {/* Floating preview */}
        <Reveal delay={0.4} y={40}>
          <div className="relative max-w-5xl mx-auto mt-16">
            <div className="absolute -inset-4 gradient-brand opacity-20 blur-2xl rounded-3xl animate-pulse-soft" />
            <div className="relative glass-strong rounded-2xl shadow-float p-2 border border-ink-100 dark:border-ink-700">
              <div className="flex items-center gap-2 px-3 py-2 border-b border-ink-100 dark:border-ink-700">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-accent-400" />
                  <div className="w-3 h-3 rounded-full bg-mint-400" />
                </div>
                <div className="flex-1 text-center text-xs text-ink-400 font-medium">collegeconnect.krmu.edu.in</div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3">
                {[
                  { label: 'Classes Today', value: '5', icon: '📅', color: 'bg-brand-50 dark:bg-brand-500/10' },
                  { label: 'Assignments', value: '4', icon: '📝', color: 'bg-accent-50 dark:bg-accent-500/10' },
                  { label: 'Unread Chats', value: '69', icon: '💬', color: 'bg-mint-50 dark:bg-mint-500/10' },
                  { label: 'Your XP', value: '8,450', icon: '⚡', color: 'bg-rose-50 dark:bg-rose-500/10' },
                ].map((s, i) => (
                  <div key={i} className={`rounded-xl p-3 ${s.color} animate-fade-up`} style={{ animationDelay: `${0.5 + i * 0.1}s` }}>
                    <div className="text-2xl mb-1">{s.icon}</div>
                    <div className="text-2xl font-bold">{s.value}</div>
                    <div className="text-xs text-ink-500 dark:text-ink-400">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-3 pt-0">
                <div className="rounded-xl bg-ink-50 dark:bg-ink-800/50 p-3 animate-fade-up" style={{ animationDelay: '0.9s' }}>
                  <div className="text-xs font-semibold text-ink-400 mb-2">Today's Timetable</div>
                  <div className="space-y-1.5">
                    {['OS — A301', 'DBMS — A205', 'ML — B104'].map((c, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <div className="w-2 h-2 rounded-full bg-brand-400" />
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl bg-ink-50 dark:bg-ink-800/50 p-3 animate-fade-up" style={{ animationDelay: '1s' }}>
                  <div className="text-xs font-semibold text-ink-400 mb-2">Leaderboard</div>
                  <div className="space-y-1.5">
                    {['Sneha — 9,100', 'Aarav — 8,450', 'Ananya — 7,800'].map((l, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <span className="text-sm">{['🥇', '🥈', '🥉'][i]}</span>
                        <span>{l}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl bg-ink-50 dark:bg-ink-800/50 p-3 animate-fade-up" style={{ animationDelay: '1.1s' }}>
                  <div className="text-xs font-semibold text-ink-400 mb-2">Recent Activity</div>
                  <div className="space-y-1.5 text-xs">
                    <div>📚 Uploaded OS notes</div>
                    <div>💬 3 new messages</div>
                    <div>🏆 +50 XP earned</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => {
            const Icon = iconMap[s.icon] || Users;
            return (
              <Reveal key={s.label} delay={i * 0.1}>
                <div className="text-center group">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center text-brand-500 mx-auto mb-3 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold">
                    {s.value.includes('+') ? (
                      <>
                        <Counter value={parseInt(s.value.replace(/[^\d]/g, ''))} suffix="+" />
                      </>
                    ) : s.value}
                  </div>
                  <div className="text-sm text-ink-500 dark:text-ink-400 mt-1">{s.label}</div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <Badge color="brand">FEATURES</Badge>
              <h2 className="text-3xl sm:text-5xl font-extrabold mt-3 tracking-tight">Built for every part of college</h2>
              <p className="mt-4 text-lg text-ink-500 dark:text-ink-400 max-w-2xl mx-auto">
                Twelve powerful modules. One seamless experience. Everything you need, nothing you don't.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => {
              const Icon = iconMap[f.icon] || Sparkles;
              return (
                <Reveal key={f.title} delay={(i % 3) * 0.1}>
                  <div className="group card-base p-6 hover:shadow-float hover:-translate-y-1 transition-all duration-300 cursor-default">
                    <div className="w-12 h-12 rounded-2xl gradient-brand flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                    <p className="text-sm text-ink-500 dark:text-ink-400 leading-relaxed">{f.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 bg-ink-50 dark:bg-ink-900/50">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <Badge color="accent">TESTIMONIALS</Badge>
              <h2 className="text-3xl sm:text-5xl font-extrabold mt-3 tracking-tight">Loved by students</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={(i % 2) * 0.1}>
                <div className="card-base p-6 hover:shadow-card transition-shadow">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-accent-400 text-accent-400" />
                    ))}
                  </div>
                  <p className="text-ink-700 dark:text-ink-200 leading-relaxed mb-4">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <Avatar src={t.avatar} alt={t.name} size={40} />
                    <div>
                      <div className="font-semibold text-sm">{t.name}</div>
                      <div className="text-xs text-ink-500 dark:text-ink-400">{t.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <Badge color="mint">ROADMAP</Badge>
              <h2 className="text-3xl sm:text-5xl font-extrabold mt-3 tracking-tight">What's coming next</h2>
            </div>
          </Reveal>
          <div className="space-y-4">
            {roadmap.map((r, i) => (
              <Reveal key={r.quarter} delay={i * 0.1}>
                <div className="flex items-start gap-4 card-base p-5 hover:shadow-card transition-shadow">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    r.status === 'done' ? 'bg-mint-100 dark:bg-mint-500/20 text-mint-600' :
                    r.status === 'progress' ? 'bg-brand-100 dark:bg-brand-500/20 text-brand-600' :
                    'bg-ink-100 dark:bg-ink-800 text-ink-400'
                  }`}>
                    {r.status === 'done' ? <Check className="w-6 h-6" /> :
                     r.status === 'progress' ? <Zap className="w-6 h-6 animate-pulse-soft" /> :
                     <ChevronDown className="w-6 h-6" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm font-bold text-brand-500">{r.quarter}</span>
                      {r.status === 'done' && <Badge color="mint" size="xs">Done</Badge>}
                      {r.status === 'progress' && <Badge color="brand" size="xs">In Progress</Badge>}
                      {r.status === 'planned' && <Badge color="ink" size="xs">Planned</Badge>}
                    </div>
                    <h3 className="text-lg font-bold">{r.title}</h3>
                    <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">{r.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 sm:px-6 bg-ink-50 dark:bg-ink-900/50">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <Badge color="rose">FAQ</Badge>
              <h2 className="text-3xl sm:text-5xl font-extrabold mt-3 tracking-tight">Questions, answered</h2>
            </div>
          </Reveal>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="card-base overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-ink-50 dark:hover:bg-ink-800/50 transition-colors"
                  >
                    <span className="font-semibold text-sm sm:text-base">{f.q}</span>
                    <ChevronDown className={`w-5 h-5 text-ink-400 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40' : 'max-h-0'}`}>
                    <p className="px-5 pb-5 text-sm text-ink-500 dark:text-ink-400 leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6">
        <Reveal>
          <div className="max-w-4xl mx-auto text-center relative overflow-hidden rounded-3xl gradient-brand p-12 sm:p-16">
            <div className="absolute inset-0 bg-grid-light opacity-20" />
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/20 rounded-full blur-3xl animate-float" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-accent-400/30 rounded-full blur-3xl animate-float-slow" />
            <div className="relative">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Ready to level up your college life?</h2>
              <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">Join thousands of KR Mangalam students already on CollegeConnect.</p>
              <button
                onClick={onEnter}
                className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-brand-600 font-bold shadow-float hover:scale-105 transition-transform"
              >
                Enter Platform <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink-100 dark:border-ink-800 py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold">CollegeConnect</span>
              <span className="text-xs text-ink-400 ml-2">KR Mangalam University</span>
            </div>
            <div className="flex gap-6 text-sm text-ink-500 dark:text-ink-400">
              <a href="#features" className="hover:text-brand-500 transition-colors">Features</a>
              <a href="#faq" className="hover:text-brand-500 transition-colors">FAQ</a>
              <a href="#roadmap" className="hover:text-brand-500 transition-colors">Roadmap</a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-ink-100 dark:border-ink-800 text-center text-xs text-ink-400">
            Built with care for the KR Mangalam community. Not affiliated with the university.
          </div>
        </div>
      </footer>
    </div>
  );
}
