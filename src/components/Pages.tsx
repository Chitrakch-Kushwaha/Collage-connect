import { useState } from 'react';
import {
  ThumbsUp, ThumbsDown, CheckCircle2, MessageCircle,
  Search, Plus, ArrowLeft, MapPin, Clock, Calendar,
  Rocket, UserPlus, Heart, Users, Trophy,
  Code2, BrainCircuit, Palette, Bot, MessageSquare, Camera,
  Award, Zap, Flame, TrendingUp, Filter, Sun, Moon,
  Briefcase, Sparkles, X, Linkedin, Github,
  ExternalLink, BadgeCheck, Mail, Bookmark,
} from 'lucide-react';
import { Avatar, Badge, ProgressBar, EmptyState } from './ui';
import { Reveal } from './Reveal';
import { useToast } from './Toast';
import {
  doubts, placements, projects, marketListings, events, clubs,
  lostFoundItems, currentUser, leaderboard, students,
  interviewExperiences,
} from '../data';
import type { Student, InterviewExperience } from '../types';

const clubIcons: Record<string, typeof Code2> = {
  Code2, BrainCircuit, Palette, Bot, MessageSquare, Camera,
};

/* ============ Doubts Page ============ */
export function DoubtsPage() {
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = doubts.filter((d) =>
    d.title.toLowerCase().includes(search.toLowerCase()) ||
    d.tags.some((t) => t.includes(search.toLowerCase()))
  );

  const selectedDoubt = doubts.find((d) => d.id === selected);

  if (selectedDoubt) {
    return (
      <div className="max-w-3xl mx-auto space-y-4">
        <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-sm text-brand-500 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to questions
        </button>
        <Reveal>
          <div className="card-base p-6">
            <div className="flex items-center gap-2 mb-3">
              <Badge color="brand">{selectedDoubt.subject}</Badge>
              {selectedDoubt.accepted && <Badge color="mint">Answered</Badge>}
            </div>
            <h1 className="text-xl font-bold mb-3">{selectedDoubt.title}</h1>
            <div className="flex items-center gap-3 mb-4">
              <Avatar src={selectedDoubt.avatar} alt={selectedDoubt.author} size={32} />
              <span className="text-sm font-medium">{selectedDoubt.author}</span>
              <span className="text-xs text-ink-400">· {selectedDoubt.time} ago</span>
            </div>
            <div className="flex gap-2 mb-4">
              {selectedDoubt.tags.map((t) => (
                <span key={t} className="text-xs px-2 py-1 rounded-lg bg-ink-100 dark:bg-ink-800 text-ink-500">#{t}</span>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="card-base p-6">
            <div className="flex gap-4">
              <div className="flex flex-col items-center gap-2">
                <button className="w-10 h-10 rounded-xl bg-mint-50 dark:bg-mint-500/10 text-mint-600 flex items-center justify-center hover:scale-110 transition-transform">
                  <ThumbsUp className="w-5 h-5" />
                </button>
                <span className="text-sm font-bold">{selectedDoubt.votes}</span>
                <button className="w-10 h-10 rounded-xl bg-ink-100 dark:bg-ink-800 text-ink-400 flex items-center justify-center hover:scale-110 transition-transform">
                  <ThumbsDown className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-mint-500" />
                  <span className="text-sm font-semibold text-mint-600">Accepted Answer</span>
                </div>
                <p className="text-sm text-ink-700 dark:text-ink-200 leading-relaxed">
                  A B+ tree stores data only in leaf nodes, while a B-tree stores data in both internal and leaf nodes. This makes B+ trees more efficient for range queries since all data is at the leaf level and linked sequentially. B-trees are better for random access patterns.
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <Avatar src={currentUser.avatar} alt={currentUser.name} size={28} />
                  <span className="text-xs font-medium">{currentUser.name}</span>
                  <span className="text-xs text-ink-400">· 2h ago</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
        <div className="card-base p-4">
          <div className="flex items-center gap-3">
            <Avatar src={currentUser.avatar} alt={currentUser.name} size={36} />
            <input
              placeholder="Add your answer..."
              className="flex-1 bg-ink-50 dark:bg-ink-800/50 rounded-xl px-4 py-2.5 text-sm outline-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter') { toast('Answer posted! +15 XP'); setSelected(null); }
              }}
            />
            <button onClick={() => { toast('Answer posted! +15 XP'); setSelected(null); }} className="gradient-brand text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:scale-105 transition-transform">
              Post
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <Reveal>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Doubt Solving Forum</h1>
          <button onClick={() => toast('Ask form opened', 'info')} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-brand text-white text-sm font-semibold hover:scale-105 transition-transform">
            <Plus className="w-4 h-4" /> Ask
          </button>
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions or tags..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-ink-50 dark:bg-ink-800/50 text-sm outline-none border border-transparent focus:border-brand-300 transition-colors"
          />
        </div>
      </Reveal>
      <div className="space-y-3">
        {filtered.map((d, i) => (
          <Reveal key={d.id} delay={i * 0.05}>
            <button
              onClick={() => setSelected(d.id)}
              className="w-full card-base p-4 text-left hover:shadow-card hover:-translate-y-0.5 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <div className="flex items-center gap-1 text-xs font-bold text-mint-600">
                    <ThumbsUp className="w-3.5 h-3.5" /> {d.votes}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-ink-400">
                    <MessageCircle className="w-3.5 h-3.5" /> {d.answers}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {d.accepted && <CheckCircle2 className="w-4 h-4 text-mint-500 shrink-0" />}
                    <h3 className="text-sm font-bold group-hover:text-brand-500 transition-colors">{d.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <Badge color="brand" size="xs">{d.subject}</Badge>
                    {d.tags.slice(0, 3).map((t) => (
                      <span key={t} className="text-xs text-ink-400">#{t}</span>
                    ))}
                    <span className="text-xs text-ink-400 ml-auto">{d.time} ago</span>
                  </div>
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ============ Placements Page ============ */
export function PlacementsPage() {
  const toast = useToast();
  const [tab, setTab] = useState<'opportunities' | 'experiences'>('opportunities');
  const [filter, setFilter] = useState('All');
  const [applied, setApplied] = useState<Set<string>>(new Set(placements.filter((p) => p.applied).map((p) => p.id)));

  // Experience state
  const [expList, setExpList] = useState<InterviewExperience[]>(interviewExperiences);
  const [expFilter, setExpFilter] = useState('All');
  const [showExpForm, setShowExpForm] = useState(false);
  const [expForm, setExpForm] = useState({ company: '', role: '', type: 'Interview' as InterviewExperience['type'], result: 'Selected' as InterviewExperience['result'], difficulty: 'Medium' as InterviewExperience['difficulty'], title: '', content: '', tips: '' });

  const filtered = placements.filter((p) => filter === 'All' || p.type === filter);
  const filteredExps = expList.filter((e) => expFilter === 'All' || e.type === expFilter);

  const toggleApply = (id: string) => {
    setApplied((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); toast('Application withdrawn', 'info'); }
      else { next.add(id); toast('Applied successfully!'); }
      return next;
    });
  };

  const toggleExpLike = (id: string) => {
    setExpList((prev) => prev.map((e) => e.id === id ? { ...e, liked: !e.liked, likes: e.likes + (e.liked ? -1 : 1) } : e));
  };

  const toggleExpBookmark = (id: string) => {
    setExpList((prev) => prev.map((e) => e.id === id ? { ...e, bookmarked: !e.bookmarked } : e));
    toast('Experience bookmarked!');
  };

  const submitExperience = () => {
    if (!expForm.company.trim() || !expForm.title.trim() || !expForm.content.trim()) {
      toast('Please fill in company, title, and content', 'error');
      return;
    }
    const newExp: InterviewExperience = {
      id: `ie${Date.now()}`,
      author: currentUser.name,
      avatar: currentUser.avatar,
      branch: currentUser.branch,
      company: expForm.company,
      logo: '🏢',
      role: expForm.role || 'Student',
      type: expForm.type,
      result: expForm.result,
      rounds: 3,
      difficulty: expForm.difficulty,
      date: 'Just now',
      title: expForm.title,
      content: expForm.content,
      tips: expForm.tips.split('\n').filter((t) => t.trim()).map((t) => t.trim()),
      likes: 0,
      comments: 0,
      liked: false,
      bookmarked: false,
    };
    setExpList((prev) => [newExp, ...prev]);
    setExpForm({ company: '', role: '', type: 'Interview', result: 'Selected', difficulty: 'Medium', title: '', content: '', tips: '' });
    setShowExpForm(false);
    toast('Experience shared! +20 XP');
  };

  const resultColors = { Selected: 'mint' as const, Rejected: 'rose' as const, 'In Progress': 'accent' as const };
  const diffColors = { Easy: 'mint' as const, Medium: 'accent' as const, Hard: 'rose' as const };
  const typeColors = { Interview: 'brand' as const, Internship: 'mint' as const, Placement: 'accent' as const, 'Off-campus': 'ink' as const };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <Reveal>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Placement Portal</h1>
        <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">Latest placements, internships, and shared interview experiences.</p>
      </Reveal>

      {/* Tabs */}
      <Reveal delay={0.05}>
        <div className="flex gap-2">
          <button
            onClick={() => setTab('opportunities')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              tab === 'opportunities' ? 'gradient-brand text-white shadow-float' : 'bg-ink-100 dark:bg-ink-800 text-ink-500 hover:bg-ink-200'
            }`}
          >
            <Briefcase className="w-4 h-4" /> Opportunities
          </button>
          <button
            onClick={() => setTab('experiences')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              tab === 'experiences' ? 'gradient-brand text-white shadow-float' : 'bg-ink-100 dark:bg-ink-800 text-ink-500 hover:bg-ink-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" /> Experiences
            <span className="text-xs bg-ink-200 dark:bg-ink-700 px-1.5 py-0.5 rounded-full">{expList.length}</span>
          </button>
        </div>
      </Reveal>

      {/* Opportunities tab */}
      {tab === 'opportunities' && (
        <>
          <Reveal delay={0.1}>
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {['All', 'Full-time', 'Internship', 'Off-campus'].map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    filter === t ? 'gradient-brand text-white shadow-float' : 'bg-ink-100 dark:bg-ink-800 text-ink-500 hover:bg-ink-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.05}>
                <div className="card-base p-5 hover:shadow-card transition-shadow group">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-ink-50 dark:bg-ink-800 flex items-center justify-center text-2xl shrink-0">
                      {p.logo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm">{p.company}</h3>
                      <p className="text-xs text-ink-500 dark:text-ink-400">{p.role}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge color={p.type === 'Full-time' ? 'mint' : p.type === 'Internship' ? 'brand' : 'accent'} size="xs">{p.type}</Badge>
                        <span className="text-xs font-bold text-mint-600">{p.package}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5 text-xs text-ink-500 dark:text-ink-400 mb-3">
                    <div className="flex items-center gap-2"><Filter className="w-3.5 h-3.5" /> {p.eligibility}</div>
                    <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> Deadline: {p.deadline}</div>
                  </div>
                  <button
                    onClick={() => toggleApply(p.id)}
                    className={`w-full py-2 rounded-xl text-sm font-semibold transition-all ${
                      applied.has(p.id)
                        ? 'bg-mint-100 dark:bg-mint-500/20 text-mint-600'
                        : 'gradient-brand text-white hover:scale-[1.02]'
                    }`}
                  >
                    {applied.has(p.id) ? '✓ Applied' : 'Apply Now'}
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </>
      )}

      {/* Experiences tab */}
      {tab === 'experiences' && (
        <>
          <Reveal delay={0.1}>
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {['All', 'Interview', 'Internship', 'Placement', 'Off-campus'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setExpFilter(t)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                      expFilter === t ? 'gradient-brand text-white shadow-float' : 'bg-ink-100 dark:bg-ink-800 text-ink-500 hover:bg-ink-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowExpForm(!showExpForm)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-brand text-white text-sm font-semibold hover:scale-105 transition-transform shrink-0"
              >
                <Plus className="w-4 h-4" /> Share Experience
              </button>
            </div>
          </Reveal>

          {/* Share form */}
          {showExpForm && (
            <Reveal>
              <div className="card-base p-5 space-y-4 animate-fade-in">
                <h3 className="font-bold text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-500" /> Share Your Experience
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-ink-500 mb-1.5 block">Company *</label>
                    <input
                      value={expForm.company}
                      onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                      placeholder="e.g. Google"
                      className="w-full px-3 py-2 rounded-xl bg-ink-50 dark:bg-ink-800/50 text-sm outline-none border border-transparent focus:border-brand-300 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-ink-500 mb-1.5 block">Role</label>
                    <input
                      value={expForm.role}
                      onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                      placeholder="e.g. SDE Intern"
                      className="w-full px-3 py-2 rounded-xl bg-ink-50 dark:bg-ink-800/50 text-sm outline-none border border-transparent focus:border-brand-300 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-ink-500 mb-1.5 block">Type</label>
                    <select
                      value={expForm.type}
                      onChange={(e) => setExpForm({ ...expForm, type: e.target.value as InterviewExperience['type'] })}
                      className="w-full px-3 py-2 rounded-xl bg-ink-50 dark:bg-ink-800/50 text-sm outline-none border border-transparent focus:border-brand-300 transition-colors"
                    >
                      <option>Interview</option>
                      <option>Internship</option>
                      <option>Placement</option>
                      <option>Off-campus</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-ink-500 mb-1.5 block">Result</label>
                    <select
                      value={expForm.result}
                      onChange={(e) => setExpForm({ ...expForm, result: e.target.value as InterviewExperience['result'] })}
                      className="w-full px-3 py-2 rounded-xl bg-ink-50 dark:bg-ink-800/50 text-sm outline-none border border-transparent focus:border-brand-300 transition-colors"
                    >
                      <option>Selected</option>
                      <option>Rejected</option>
                      <option>In Progress</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium text-ink-500 mb-1.5 block">Difficulty</label>
                    <div className="flex gap-2">
                      {(['Easy', 'Medium', 'Hard'] as const).map((d) => (
                        <button
                          key={d}
                          onClick={() => setExpForm({ ...expForm, difficulty: d })}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            expForm.difficulty === d
                              ? d === 'Easy' ? 'bg-mint-500 text-white' : d === 'Medium' ? 'bg-accent-500 text-white' : 'bg-rose-500 text-white'
                              : 'bg-ink-100 dark:bg-ink-800 text-ink-500'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-ink-500 mb-1.5 block">Title *</label>
                  <input
                    value={expForm.title}
                    onChange={(e) => setExpForm({ ...expForm, title: e.target.value })}
                    placeholder="e.g. Google SDE Intern — Full Interview Process"
                    className="w-full px-3 py-2 rounded-xl bg-ink-50 dark:bg-ink-800/50 text-sm outline-none border border-transparent focus:border-brand-300 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-ink-500 mb-1.5 block">Your Experience *</label>
                  <textarea
                    value={expForm.content}
                    onChange={(e) => setExpForm({ ...expForm, content: e.target.value })}
                    placeholder="Describe the rounds, questions asked, and your overall experience..."
                    className="w-full px-3 py-2 rounded-xl bg-ink-50 dark:bg-ink-800/50 text-sm outline-none border border-transparent focus:border-brand-300 transition-colors min-h-[100px] resize-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-ink-500 mb-1.5 block">Tips (one per line)</label>
                  <textarea
                    value={expForm.tips}
                    onChange={(e) => setExpForm({ ...expForm, tips: e.target.value })}
                    placeholder="Practice DSA daily&#10;Be confident in interviews"
                    className="w-full px-3 py-2 rounded-xl bg-ink-50 dark:bg-ink-800/50 text-sm outline-none border border-transparent focus:border-brand-300 transition-colors min-h-[60px] resize-none"
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => setShowExpForm(false)}
                    className="px-4 py-2 rounded-xl text-sm font-medium text-ink-500 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitExperience}
                    className="flex items-center gap-2 px-5 py-2 rounded-xl gradient-brand text-white text-sm font-semibold hover:scale-105 transition-transform"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Publish
                  </button>
                </div>
              </div>
            </Reveal>
          )}

          {/* Experience cards */}
          <div className="space-y-4">
            {filteredExps.length === 0 ? (
              <EmptyState
                icon={<MessageSquare className="w-8 h-8" />}
                title="No experiences shared yet"
                desc="Be the first to share your interview or internship experience!"
                action={
                  <button onClick={() => setShowExpForm(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-brand text-white text-sm font-semibold hover:scale-105 transition-transform">
                    <Plus className="w-4 h-4" /> Share Experience
                  </button>
                }
              />
            ) : (
              filteredExps.map((e, i) => (
                <Reveal key={e.id} delay={i * 0.05}>
                  <article className="card-base p-5 hover:shadow-card transition-shadow group">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-11 h-11 rounded-xl bg-ink-50 dark:bg-ink-800 flex items-center justify-center text-2xl shrink-0">
                        {e.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-sm">{e.title}</h3>
                        </div>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <Badge color={typeColors[e.type]} size="xs">{e.type}</Badge>
                          <Badge color={resultColors[e.result]} size="xs">{e.result}</Badge>
                          <Badge color={diffColors[e.difficulty]} size="xs">{e.difficulty}</Badge>
                          <span className="text-xs text-ink-400">{e.rounds} rounds · {e.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <Avatar src={e.avatar} alt={e.author} size={24} />
                      <span className="text-xs font-medium">{e.author}</span>
                      <span className="text-xs text-ink-400">· {e.branch}</span>
                    </div>
                    <p className="text-sm text-ink-700 dark:text-ink-200 leading-relaxed mb-3">{e.content}</p>
                    {e.tips.length > 0 && (
                      <div className="p-3 rounded-xl bg-mint-50 dark:bg-mint-500/10 border border-mint-100 dark:border-mint-500/20 mb-3">
                        <div className="text-xs font-bold text-mint-600 mb-2 flex items-center gap-1.5">
                          <Trophy className="w-3.5 h-3.5" /> Tips from {e.author.split(' ')[0]}
                        </div>
                        <ul className="space-y-1.5">
                          {e.tips.map((tip, j) => (
                            <li key={j} className="text-xs text-ink-600 dark:text-ink-300 flex items-start gap-2">
                              <span className="text-mint-500 shrink-0 mt-0.5">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="flex items-center gap-4 pt-2 border-t border-ink-100 dark:border-ink-800">
                      <button
                        onClick={() => toggleExpLike(e.id)}
                        className={`flex items-center gap-1.5 text-sm transition-all hover:scale-105 ${e.liked ? 'text-rose-500' : 'text-ink-400 hover:text-rose-500'}`}
                      >
                        <Heart className={`w-4 h-4 ${e.liked ? 'fill-rose-500' : ''}`} />
                        <span className="font-medium text-xs">{e.likes}</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-sm text-ink-400 hover:text-brand-500 transition-all hover:scale-105">
                        <MessageCircle className="w-4 h-4" />
                        <span className="font-medium text-xs">{e.comments}</span>
                      </button>
                      <button
                        onClick={() => toggleExpBookmark(e.id)}
                        className={`flex items-center gap-1.5 text-sm transition-all hover:scale-105 ml-auto ${e.bookmarked ? 'text-brand-500' : 'text-ink-400 hover:text-brand-500'}`}
                      >
                        <Bookmark className={`w-4 h-4 ${e.bookmarked ? 'fill-brand-500' : ''}`} />
                      </button>
                    </div>
                  </article>
                </Reveal>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}

/* ============ Projects Page ============ */
export function ProjectsPage() {
  const toast = useToast();
  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <Reveal>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Project Finder</h1>
            <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">Find teammates for hackathons, projects, and startups.</p>
          </div>
          <button onClick={() => toast('Project form opened', 'info')} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-brand text-white text-sm font-semibold hover:scale-105 transition-transform">
            <Plus className="w-4 h-4" /> Post
          </button>
        </div>
      </Reveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.05}>
            <div className="card-base p-5 hover:shadow-card transition-shadow group">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl gradient-brand flex items-center justify-center text-white shrink-0">
                  <Rocket className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm">{p.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar src={p.avatar} alt={p.creator} size={20} />
                    <span className="text-xs text-ink-400">{p.creator}</span>
                  </div>
                </div>
                {p.status === 'recruiting' ? (
                  <Badge color="mint" size="xs">Recruiting</Badge>
                ) : (
                  <Badge color="ink" size="xs">Full</Badge>
                )}
              </div>
              <p className="text-xs text-ink-500 dark:text-ink-400 leading-relaxed mb-3">{p.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {p.roles.map((r) => (
                  <span key={r} className="text-xs px-2 py-1 rounded-lg bg-brand-50 dark:bg-brand-500/10 text-brand-600 font-medium">
                    {r}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.tags.map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded-lg bg-ink-100 dark:bg-ink-800 text-ink-400">#{t}</span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-ink-400">
                  <Users className="w-3.5 h-3.5" /> {p.members}/{p.maxMembers} members
                </div>
                <button
                  onClick={() => toast(p.status === 'recruiting' ? 'Application sent!' : 'Project is full', p.status === 'recruiting' ? 'success' : 'info')}
                  disabled={p.status !== 'recruiting'}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    p.status === 'recruiting' ? 'gradient-brand text-white hover:scale-105' : 'bg-ink-100 dark:bg-ink-800 text-ink-400'
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" /> {p.status === 'recruiting' ? 'Apply' : 'Full'}
                </button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ============ Marketplace Page ============ */
export function MarketplacePage() {
  const toast = useToast();
  const [category, setCategory] = useState('All');
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  const categories = ['All', 'Books', 'Electronics', 'Cycles', 'Hostel Items', 'Furniture'];
  const filtered = marketListings.filter((m) => category === 'All' || m.category === category);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      <Reveal>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Marketplace</h1>
            <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">Buy and sell books, electronics, cycles, and more.</p>
          </div>
          <button onClick={() => toast('Listing form opened', 'info')} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-brand text-white text-sm font-semibold hover:scale-105 transition-transform">
            <Plus className="w-4 h-4" /> Sell
          </button>
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                category === c ? 'gradient-brand text-white shadow-float' : 'bg-ink-100 dark:bg-ink-800 text-ink-500 hover:bg-ink-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </Reveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((m, i) => (
          <Reveal key={m.id} delay={i * 0.05}>
            <div className="card-base overflow-hidden hover:shadow-card transition-shadow group">
              <div className="h-32 bg-gradient-to-br from-brand-50 to-accent-50 dark:from-ink-800 dark:to-ink-700 flex items-center justify-center text-5xl group-hover:scale-105 transition-transform">
                {m.image}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold leading-snug line-clamp-2">{m.title}</h3>
                  <button onClick={() => toggleWishlist(m.id)} className="shrink-0 text-ink-300 hover:text-rose-500 transition-colors">
                    <Heart className={`w-4 h-4 ${wishlist.has(m.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge color={m.condition === 'New' ? 'mint' : m.condition === 'Like New' ? 'brand' : 'ink'} size="xs">{m.condition}</Badge>
                  {m.negotiable && <span className="text-xs text-ink-400">Negotiable</span>}
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-lg font-extrabold text-brand-600">₹{m.price}</span>
                  <button onClick={() => toast('Chat opened with seller', 'info')} className="text-xs font-semibold text-brand-500 hover:underline">
                    Contact
                  </button>
                </div>
                <div className="text-xs text-ink-400 mt-1">by {m.seller}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ============ Events Page ============ */
export function EventsPage() {
  const toast = useToast();
  const [rsvped, setRsvped] = useState<Set<string>>(new Set(events.filter((e) => e.rsvped).map((e) => e.id)));

  const toggleRsvp = (id: string) => {
    setRsvped((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); toast('RSVP cancelled', 'info'); }
      else { next.add(id); toast('RSVP confirmed!'); }
      return next;
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <Reveal>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Events</h1>
            <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">Register, RSVP, and get QR tickets for campus events.</p>
          </div>
          <button onClick={() => toast('Event form opened', 'info')} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-brand text-white text-sm font-semibold hover:scale-105 transition-transform">
            <Plus className="w-4 h-4" /> Create
          </button>
        </div>
      </Reveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {events.map((e, i) => (
          <Reveal key={e.id} delay={i * 0.05}>
            <div className="card-base p-5 hover:shadow-card transition-shadow group">
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl gradient-brand text-white shrink-0">
                  <span className="text-xs font-medium opacity-80">{e.date.split(' ')[0]}</span>
                  <span className="text-xl font-extrabold leading-none">{e.date.split(' ')[1]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge color="accent" size="xs">{e.category}</Badge>
                  </div>
                  <h3 className="font-bold text-sm">{e.title}</h3>
                  <div className="space-y-0.5 mt-1.5 text-xs text-ink-500 dark:text-ink-400">
                    <div className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {e.time}</div>
                    <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {e.venue}</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-ink-100 dark:border-ink-800">
                <div className="flex items-center gap-2 text-xs text-ink-400">
                  <Users className="w-3.5 h-3.5" /> {e.attendees} attending
                </div>
                <button
                  onClick={() => toggleRsvp(e.id)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    rsvped.has(e.id) ? 'bg-mint-100 dark:bg-mint-500/20 text-mint-600' : 'gradient-brand text-white hover:scale-105'
                  }`}
                >
                  {rsvped.has(e.id) ? '✓ Going' : 'RSVP'}
                </button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ============ Clubs Page ============ */
export function ClubsPage() {
  const toast = useToast();
  const [joined, setJoined] = useState<Set<string>>(new Set(['cl1']));

  const toggleJoin = (id: string) => {
    setJoined((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); toast('Left club', 'info'); }
      else { next.add(id); toast('Joined club! Welcome aboard'); }
      return next;
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <Reveal>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Clubs & Societies</h1>
        <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">Join clubs, attend events, and connect with like-minded students.</p>
      </Reveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {clubs.map((c, i) => {
          const Icon = clubIcons[c.icon] || Users;
          const colorClass = c.color === 'brand' ? 'gradient-brand' : c.color === 'accent' ? 'gradient-warm' : c.color === 'rose' ? 'gradient-rose' : 'gradient-mint';
          return (
            <Reveal key={c.id} delay={i * 0.05}>
              <div className="card-base p-5 hover:shadow-card transition-shadow group text-center">
                <div className={`w-14 h-14 rounded-2xl ${colorClass} flex items-center justify-center text-white mx-auto mb-3 group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-sm">{c.name}</h3>
                <Badge color="ink" size="xs">{c.category}</Badge>
                <p className="text-xs text-ink-500 dark:text-ink-400 mt-2 leading-relaxed">{c.description}</p>
                <div className="flex items-center justify-center gap-2 text-xs text-ink-400 mt-3">
                  <Users className="w-3.5 h-3.5" /> {c.members} members
                </div>
                <button
                  onClick={() => toggleJoin(c.id)}
                  className={`w-full mt-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    joined.has(c.id) ? 'bg-mint-100 dark:bg-mint-500/20 text-mint-600' : 'gradient-brand text-white hover:scale-[1.02]'
                  }`}
                >
                  {joined.has(c.id) ? '✓ Joined' : c.recruiting ? 'Join Club' : 'Not Recruiting'}
                </button>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

/* ============ Lost & Found Page ============ */
export function LostFoundPage() {
  const toast = useToast();
  const [filter, setFilter] = useState<'all' | 'lost' | 'found'>('all');

  const filtered = lostFoundItems.filter((i) => filter === 'all' || i.type === filter);

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <Reveal>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Lost & Found</h1>
            <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">Report lost items or claim found ones.</p>
          </div>
          <button onClick={() => toast('Report form opened', 'info')} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-brand text-white text-sm font-semibold hover:scale-105 transition-transform">
            <Plus className="w-4 h-4" /> Report
          </button>
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <div className="flex gap-2">
          {(['all', 'lost', 'found'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                filter === t ? 'gradient-brand text-white shadow-float' : 'bg-ink-100 dark:bg-ink-800 text-ink-500 hover:bg-ink-200'
              }`}
            >
              {t === 'all' ? 'All Items' : t}
            </button>
          ))}
        </div>
      </Reveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((item, i) => (
          <Reveal key={item.id} delay={i * 0.05}>
            <div className="card-base p-4 hover:shadow-card transition-shadow group">
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 rounded-xl bg-ink-50 dark:bg-ink-800 flex items-center justify-center text-3xl shrink-0">
                  {item.image}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge color={item.type === 'lost' ? 'rose' : 'mint'} size="xs">{item.type === 'lost' ? 'Lost' : 'Found'}</Badge>
                    {item.reward && <span className="text-xs font-bold text-accent-500">Reward: {item.reward}</span>}
                  </div>
                  <h3 className="font-bold text-sm">{item.title}</h3>
                  <p className="text-xs text-ink-500 dark:text-ink-400 mt-1 line-clamp-2">{item.description}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-ink-400">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {item.location}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {item.date}</span>
                  </div>
                  <button
                    onClick={() => toast(item.type === 'lost' ? 'Contact info shared' : 'Claim request sent', 'info')}
                    className="mt-3 text-xs font-semibold text-brand-500 hover:underline"
                  >
                    {item.type === 'lost' ? 'I found this' : 'Claim this item'} →
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ============ Profile Page (LinkedIn-style) ============ */
export function ProfilePage() {
  const u = currentUser;
  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Cover + avatar */}
      <Reveal>
        <div className="card-base overflow-hidden">
          <div className="h-32 gradient-brand relative">
            <div className="absolute inset-0 bg-grid-light opacity-20" />
            <div className="absolute -bottom-12 left-6">
              <div className="w-24 h-24 rounded-2xl ring-4 ring-white dark:ring-ink-900 overflow-hidden bg-white">
                <img src={u.avatar} alt={u.name} className="w-full h-full" />
              </div>
            </div>
          </div>
          <div className="pt-14 px-6 pb-6">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-extrabold truncate">{u.name}</h1>
                  <BadgeCheck className="w-5 h-5 text-brand-500 shrink-0" />
                </div>
                <p className="text-sm text-ink-500 dark:text-ink-400">{u.branch} · Semester {u.semester} · Year {u.year}</p>
                <p className="text-xs text-ink-400 mt-1">KR Mangalam University</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent-50 dark:bg-accent-500/10 text-accent-600">
                  <Flame className="w-4 h-4" /> <span className="text-sm font-bold">{u.streak}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-50 dark:bg-brand-500/10 text-brand-600">
                  <Zap className="w-4 h-4" /> <span className="text-sm font-bold">Lv.{u.level}</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-ink-700 dark:text-ink-200 mt-3 leading-relaxed">{u.bio}</p>
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <Badge color="accent"><Sparkles className="w-3 h-3" /> {u.lookingFor}</Badge>
            </div>
            {/* Social links */}
            <div className="flex items-center gap-3 mt-4">
              {u.github && (
                <a href={`https://${u.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-medium text-ink-500 hover:text-ink-900 dark:hover:text-ink-100 transition-colors">
                  <Github className="w-4 h-4" /> {u.github}
                </a>
              )}
              {u.linkedin && (
                <a href={`https://${u.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-medium text-brand-500 hover:text-brand-700 transition-colors">
                  <Linkedin className="w-4 h-4" /> {u.linkedin}
                </a>
              )}
              {u.portfolio && (
                <a href={`https://${u.portfolio}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-medium text-mint-600 hover:text-mint-700 transition-colors">
                  <ExternalLink className="w-4 h-4" /> {u.portfolio}
                </a>
              )}
            </div>
          </div>
        </div>
      </Reveal>

      {/* XP Progress */}
      <Reveal delay={0.05}>
        <div className="card-base p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold">Level {u.level}</span>
            <span className="text-xs text-ink-400">{u.xp.toLocaleString()} XP</span>
          </div>
          <ProgressBar value={75} color="brand" />
          <div className="text-xs text-ink-400 mt-2">1,550 XP to Level {u.level + 1}</div>
        </div>
      </Reveal>

      {/* About */}
      <Reveal delay={0.08}>
        <div className="card-base p-5">
          <h3 className="font-bold text-sm mb-2">About</h3>
          <p className="text-sm text-ink-600 dark:text-ink-300 leading-relaxed">{u.bio}</p>
        </div>
      </Reveal>

      {/* Experience */}
      {u.experience && u.experience.length > 0 && (
        <Reveal delay={0.1}>
          <div className="card-base p-5">
            <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-brand-500" /> Experience
            </h3>
            <div className="space-y-4">
              {u.experience.map((exp) => (
                <div key={exp.id} className="flex items-start gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-500/10 text-brand-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    {exp.type === 'internship' ? <Briefcase className="w-5 h-5" /> :
                     exp.type === 'leadership' ? <Users className="w-5 h-5" /> :
                     <Rocket className="w-5 h-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold">{exp.role}</div>
                    <div className="text-xs text-brand-500 font-medium">{exp.organization}</div>
                    <div className="text-xs text-ink-400 mt-0.5">{exp.duration}</div>
                    <p className="text-xs text-ink-500 dark:text-ink-400 mt-1.5 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* Certificates */}
      {u.certificates && u.certificates.length > 0 && (
        <Reveal delay={0.12}>
          <div className="card-base p-5">
            <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-accent-500" /> Licenses & Certificates
            </h3>
            <div className="space-y-3">
              {u.certificates.map((cert) => (
                <div key={cert.id} className="flex items-start gap-3 p-3 rounded-xl bg-ink-50 dark:bg-ink-800/50 hover:shadow-card transition-all group cursor-pointer">
                  <div className="w-11 h-11 rounded-xl bg-white dark:bg-ink-700 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                    {cert.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold leading-snug">{cert.title}</div>
                    <div className="text-xs text-ink-500 dark:text-ink-400 mt-0.5">{cert.issuer}</div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-ink-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {cert.date}
                      </span>
                      {cert.credentialId && (
                        <span className="text-xs text-ink-400 flex items-center gap-1">
                          <BadgeCheck className="w-3 h-3" /> {cert.credentialId}
                        </span>
                      )}
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-ink-300 group-hover:text-brand-500 transition-colors shrink-0 mt-1" />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* Projects */}
      {u.projects && u.projects.length > 0 && (
        <Reveal delay={0.14}>
          <div className="card-base p-5">
            <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
              <Rocket className="w-4 h-4 text-mint-500" /> Projects
            </h3>
            <div className="space-y-3">
              {u.projects.map((p, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-ink-100 dark:border-ink-800 hover:border-mint-200 dark:hover:border-mint-500/30 transition-all group">
                  <div className="w-10 h-10 rounded-xl gradient-mint flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                    <Rocket className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold">{p.title}</div>
                    <p className="text-xs text-ink-500 dark:text-ink-400 mt-1 leading-relaxed">{p.description}</p>
                    {p.link && (
                      <a href={`https://${p.link}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-mint-600 font-medium mt-2 hover:underline">
                        <Github className="w-3 h-3" /> {p.link}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* Skills */}
      <Reveal delay={0.16}>
        <div className="card-base p-5">
          <h3 className="font-bold text-sm mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {u.skills.map((s) => (
              <span key={s} className="px-3 py-1.5 rounded-xl bg-brand-50 dark:bg-brand-500/10 text-brand-600 text-xs font-medium hover:scale-105 transition-transform cursor-default">
                {s}
              </span>
            ))}
          </div>
          <h3 className="font-bold text-sm mb-3 mt-5">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {u.interests.map((i) => (
              <span key={i} className="px-3 py-1.5 rounded-xl bg-accent-50 dark:bg-accent-500/10 text-accent-600 text-xs font-medium hover:scale-105 transition-transform cursor-default">
                {i}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Badges */}
      <Reveal delay={0.18}>
        <div className="card-base p-5">
          <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-accent-500" /> Badges & Achievements
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {u.badges.map((b) => (
              <div key={b} className="flex flex-col items-center text-center p-3 rounded-xl bg-ink-50 dark:bg-ink-800/50 hover:scale-105 transition-transform">
                <div className="w-10 h-10 rounded-xl gradient-warm flex items-center justify-center text-white mb-2">
                  <Trophy className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Leaderboard rank */}
      <Reveal delay={0.2}>
        <div className="card-base p-5">
          <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-brand-500" /> Leaderboard Ranking
          </h3>
          <div className="space-y-2">
            {leaderboard.slice(0, 3).map((e) => (
              <div key={e.rank} className={`flex items-center gap-3 p-2.5 rounded-xl ${e.name === u.name ? 'bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/30' : ''}`}>
                <span className="text-lg">{e.badge}</span>
                <Avatar src={e.avatar} alt={e.name} size={28} />
                <span className="text-sm font-medium flex-1">{e.name}</span>
                <span className="text-xs font-bold text-brand-500">{e.xp.toLocaleString()} XP</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}

/* ============ People Finder Page ============ */
export function PeopleFinderPage({ onNavigate }: { onNavigate: (p: import('../types').Page) => void }) {
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [skillFilter, setSkillFilter] = useState<string | null>(null);
  const [interestFilter, setInterestFilter] = useState<string | null>(null);
  const [branchFilter, setBranchFilter] = useState('All');
  const [lookingForFilter, setLookingForFilter] = useState('All');
  const [connected, setConnected] = useState<Set<string>>(new Set());
  const [pending, setPending] = useState<Set<string>>(new Set());
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const allSkills = Array.from(new Set(students.flatMap((s) => s.skills))).sort();
  const allInterests = Array.from(new Set(students.flatMap((s) => s.interests))).sort();
  const allBranches = Array.from(new Set(students.map((s) => s.branch)));
  const allLookingFor = Array.from(new Set(students.map((s) => s.lookingFor)));

  const filtered = students.filter((s) => {
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.bio.toLowerCase().includes(search.toLowerCase())) return false;
    if (skillFilter && !s.skills.includes(skillFilter)) return false;
    if (interestFilter && !s.interests.includes(interestFilter)) return false;
    if (branchFilter !== 'All' && s.branch !== branchFilter) return false;
    if (lookingForFilter !== 'All' && s.lookingFor !== lookingForFilter) return false;
    return true;
  });

  const toggleConnect = (id: string, name: string) => {
    if (connected.has(id)) {
      setConnected((prev) => { const n = new Set(prev); n.delete(id); return n; });
      toast(`Disconnected from ${name}`, 'info');
    } else if (pending.has(id)) {
      setPending((prev) => { const n = new Set(prev); n.delete(id); return n; });
      toast('Connection request withdrawn', 'info');
    } else {
      setPending((prev) => new Set(prev).add(id));
      toast(`Connection request sent to ${name}!`);
    }
  };

  const getConnectState = (id: string) => connected.has(id) ? 'connected' : pending.has(id) ? 'pending' : 'none';

  const connectButton = (id: string, name: string) => {
    const state = getConnectState(id);
    return (
      <button
        onClick={(e) => { e.stopPropagation(); toggleConnect(id, name); }}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
          state === 'connected' ? 'bg-mint-100 dark:bg-mint-500/20 text-mint-600' :
          state === 'pending' ? 'bg-ink-100 dark:bg-ink-800 text-ink-500' :
          'gradient-brand text-white hover:scale-105'
        }`}
      >
        {state === 'connected' ? <><BadgeCheck className="w-3.5 h-3.5" /> Connected</> :
         state === 'pending' ? <><Clock className="w-3.5 h-3.5" /> Pending</> :
         <><UserPlus className="w-3.5 h-3.5" /> Connect</>}
      </button>
    );
  };

  // Detail modal
  if (selectedStudent) {
    const s = selectedStudent;
    const state = getConnectState(s.id);
    return (
      <div className="max-w-2xl mx-auto space-y-4">
        <button onClick={() => setSelectedStudent(null)} className="flex items-center gap-2 text-sm text-brand-500 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to People
        </button>
        <Reveal>
          <div className="card-base overflow-hidden">
            <div className="h-24 gradient-brand relative">
              <div className="absolute inset-0 bg-grid-light opacity-20" />
              <div className="absolute -bottom-10 left-6">
                <div className="w-20 h-20 rounded-2xl ring-4 ring-white dark:ring-ink-900 overflow-hidden bg-white">
                  <img src={s.avatar} alt={s.name} className="w-full h-full" />
                </div>
              </div>
            </div>
            <div className="pt-12 px-6 pb-6">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h1 className="text-lg font-extrabold truncate">{s.name}</h1>
                    <BadgeCheck className="w-4 h-4 text-brand-500 shrink-0" />
                  </div>
                  <p className="text-sm text-ink-500 dark:text-ink-400">{s.branch} · Semester {s.semester}</p>
                </div>
                {connectButton(s.id, s.name)}
              </div>
              <p className="text-sm text-ink-700 dark:text-ink-200 mt-3 leading-relaxed">{s.bio}</p>
              <div className="flex items-center gap-2 mt-3">
                <Badge color="accent" size="xs"><Sparkles className="w-3 h-3" /> {s.lookingFor}</Badge>
                <Badge color="brand" size="xs"><Zap className="w-3 h-3" /> Lv.{s.level}</Badge>
                <Badge color="ink" size="xs"><Flame className="w-3 h-3" /> {s.streak}d streak</Badge>
              </div>
              {/* Social */}
              <div className="flex items-center gap-3 mt-3">
                {s.github && <a href={`https://${s.github}`} target="_blank" rel="noopener noreferrer" className="text-ink-400 hover:text-ink-700 dark:hover:text-ink-200 transition-colors"><Github className="w-4 h-4" /></a>}
                {s.linkedin && <a href={`https://${s.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:text-brand-600 transition-colors"><Linkedin className="w-4 h-4" /></a>}
                {s.portfolio && <a href={`https://${s.portfolio}`} target="_blank" rel="noopener noreferrer" className="text-mint-500 hover:text-mint-700 transition-colors"><ExternalLink className="w-4 h-4" /></a>}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Skills */}
        <Reveal delay={0.05}>
          <div className="card-base p-5">
            <h3 className="font-bold text-sm mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {s.skills.map((sk) => (
                <button
                  key={sk}
                  onClick={() => { setSkillFilter(sk); setSelectedStudent(null); }}
                  className="px-3 py-1.5 rounded-xl bg-brand-50 dark:bg-brand-500/10 text-brand-600 text-xs font-medium hover:scale-105 transition-transform"
                >
                  {sk}
                </button>
              ))}
            </div>
            <h3 className="font-bold text-sm mb-3 mt-5">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {s.interests.map((it) => (
                <button
                  key={it}
                  onClick={() => { setInterestFilter(it); setSelectedStudent(null); }}
                  className="px-3 py-1.5 rounded-xl bg-accent-50 dark:bg-accent-500/10 text-accent-600 text-xs font-medium hover:scale-105 transition-transform"
                >
                  {it}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Certificates */}
        {s.certificates && s.certificates.length > 0 && (
          <Reveal delay={0.1}>
            <div className="card-base p-5">
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-accent-500" /> Certificates
              </h3>
              <div className="space-y-3">
                {s.certificates.map((cert) => (
                  <div key={cert.id} className="flex items-start gap-3 p-3 rounded-xl bg-ink-50 dark:bg-ink-800/50 hover:shadow-card transition-all group cursor-pointer">
                    <div className="w-11 h-11 rounded-xl bg-white dark:bg-ink-700 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                      {cert.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold leading-snug">{cert.title}</div>
                      <div className="text-xs text-ink-500 dark:text-ink-400 mt-0.5">{cert.issuer}</div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-ink-400 flex items-center gap-1"><Calendar className="w-3 h-3" /> {cert.date}</span>
                        {cert.credentialId && <span className="text-xs text-ink-400 flex items-center gap-1"><BadgeCheck className="w-3 h-3" /> {cert.credentialId}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* Experience */}
        {s.experience && s.experience.length > 0 && (
          <Reveal delay={0.12}>
            <div className="card-base p-5">
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-brand-500" /> Experience
              </h3>
              <div className="space-y-4">
                {s.experience.map((exp) => (
                  <div key={exp.id} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-500/10 text-brand-500 flex items-center justify-center shrink-0">
                      {exp.type === 'internship' ? <Briefcase className="w-5 h-5" /> :
                       exp.type === 'leadership' ? <Users className="w-5 h-5" /> :
                       <Rocket className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold">{exp.role}</div>
                      <div className="text-xs text-brand-500 font-medium">{exp.organization}</div>
                      <div className="text-xs text-ink-400 mt-0.5">{exp.duration}</div>
                      <p className="text-xs text-ink-500 dark:text-ink-400 mt-1.5 leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* Projects */}
        {s.projects && s.projects.length > 0 && (
          <Reveal delay={0.14}>
            <div className="card-base p-5">
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                <Rocket className="w-4 h-4 text-mint-500" /> Projects
              </h3>
              <div className="space-y-3">
                {s.projects.map((p, i) => (
                  <div key={i} className="p-3 rounded-xl border border-ink-100 dark:border-ink-800 hover:border-mint-200 dark:hover:border-mint-500/30 transition-all">
                    <div className="text-sm font-bold">{p.title}</div>
                    <p className="text-xs text-ink-500 dark:text-ink-400 mt-1 leading-relaxed">{p.description}</p>
                    {p.link && (
                      <a href={`https://${p.link}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-mint-600 font-medium mt-2 hover:underline">
                        <Github className="w-3 h-3" /> {p.link}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* Message button */}
        <Reveal delay={0.16}>
          <div className="flex gap-3">
            <button
              onClick={() => { toast(`Message sent to ${s.name}!`); setSelectedStudent(null); onNavigate('chat'); }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl gradient-brand text-white text-sm font-semibold hover:scale-[1.02] transition-transform"
            >
              <Mail className="w-4 h-4" /> Send Message
            </button>
            <button
              onClick={() => toggleConnect(s.id, s.name)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                state === 'connected' ? 'bg-mint-100 dark:bg-mint-500/20 text-mint-600' :
                state === 'pending' ? 'bg-ink-100 dark:bg-ink-800 text-ink-500' :
                'bg-ink-100 dark:bg-ink-800 text-ink-700 dark:text-ink-200 hover:scale-[1.02]'
              }`}
            >
              {state === 'connected' ? <><BadgeCheck className="w-4 h-4" /> Connected</> :
               state === 'pending' ? <><Clock className="w-4 h-4" /> Pending</> :
               <><UserPlus className="w-4 h-4" /> Connect</>}
            </button>
          </div>
        </Reveal>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      <Reveal>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">People Finder</h1>
          <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">Discover students by skills and interests. Connect like LinkedIn.</p>
        </div>
      </Reveal>

      {/* Search */}
      <Reveal delay={0.05}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or bio..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-ink-50 dark:bg-ink-800/50 text-sm outline-none border border-transparent focus:border-brand-300 transition-colors"
          />
        </div>
      </Reveal>

      {/* Filters */}
      <Reveal delay={0.08}>
        <div className="card-base p-4 space-y-4">
          {/* Branch filter */}
          <div>
            <div className="text-xs font-bold text-ink-400 uppercase mb-2">Branch</div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setBranchFilter('All')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${branchFilter === 'All' ? 'gradient-brand text-white' : 'bg-ink-100 dark:bg-ink-800 text-ink-500 hover:bg-ink-200'}`}>All</button>
              {allBranches.map((b) => (
                <button key={b} onClick={() => setBranchFilter(b)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${branchFilter === b ? 'gradient-brand text-white' : 'bg-ink-100 dark:bg-ink-800 text-ink-500 hover:bg-ink-200'}`}>{b}</button>
              ))}
            </div>
          </div>
          {/* Looking For filter */}
          <div>
            <div className="text-xs font-bold text-ink-400 uppercase mb-2">Looking For</div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setLookingForFilter('All')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${lookingForFilter === 'All' ? 'gradient-brand text-white' : 'bg-ink-100 dark:bg-ink-800 text-ink-500 hover:bg-ink-200'}`}>All</button>
              {allLookingFor.map((l) => (
                <button key={l} onClick={() => setLookingForFilter(l)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${lookingForFilter === l ? 'gradient-brand text-white' : 'bg-ink-100 dark:bg-ink-800 text-ink-500 hover:bg-ink-200'}`}>{l}</button>
              ))}
            </div>
          </div>
          {/* Skill filter */}
          <div>
            <div className="text-xs font-bold text-ink-400 uppercase mb-2 flex items-center justify-between">
              Skills
              {skillFilter && <button onClick={() => setSkillFilter(null)} className="text-brand-500 hover:underline normal-case font-medium">Clear</button>}
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto scrollbar-thin">
              {allSkills.map((sk) => (
                <button
                  key={sk}
                  onClick={() => setSkillFilter(skillFilter === sk ? null : sk)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    skillFilter === sk ? 'gradient-brand text-white shadow-float' : 'bg-ink-50 dark:bg-ink-800/50 text-ink-500 hover:bg-brand-50 hover:text-brand-600'
                  }`}
                >
                  {sk}
                </button>
              ))}
            </div>
          </div>
          {/* Interest filter */}
          <div>
            <div className="text-xs font-bold text-ink-400 uppercase mb-2 flex items-center justify-between">
              Interests
              {interestFilter && <button onClick={() => setInterestFilter(null)} className="text-brand-500 hover:underline normal-case font-medium">Clear</button>}
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto scrollbar-thin">
              {allInterests.map((it) => (
                <button
                  key={it}
                  onClick={() => setInterestFilter(interestFilter === it ? null : it)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    interestFilter === it ? 'gradient-warm text-white shadow-float' : 'bg-ink-50 dark:bg-ink-800/50 text-ink-500 hover:bg-accent-50 hover:text-accent-600'
                  }`}
                >
                  {it}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Active filter summary */}
      {(skillFilter || interestFilter || branchFilter !== 'All' || lookingForFilter !== 'All') && (
        <div className="flex items-center gap-2 flex-wrap animate-fade-in">
          <span className="text-xs text-ink-400 font-medium">{filtered.length} results</span>
          {skillFilter && <Badge color="brand" size="xs">Skill: {skillFilter} <button onClick={() => setSkillFilter(null)} className="ml-1 hover:text-rose-500"><X className="w-2.5 h-2.5" /></button></Badge>}
          {interestFilter && <Badge color="accent" size="xs">Interest: {interestFilter} <button onClick={() => setInterestFilter(null)} className="ml-1 hover:text-rose-500"><X className="w-2.5 h-2.5" /></button></Badge>}
          {branchFilter !== 'All' && <Badge color="mint" size="xs">Branch: {branchFilter} <button onClick={() => setBranchFilter('All')} className="ml-1 hover:text-rose-500"><X className="w-2.5 h-2.5" /></button></Badge>}
          {lookingForFilter !== 'All' && <Badge color="rose" size="xs">Looking: {lookingForFilter} <button onClick={() => setLookingForFilter('All')} className="ml-1 hover:text-rose-500"><X className="w-2.5 h-2.5" /></button></Badge>}
        </div>
      )}

      {/* People grid */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<Users className="w-8 h-8" />}
          title="No people found"
          desc="Try adjusting your filters or search query."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.05}>
              <div
                onClick={() => setSelectedStudent(s)}
                className="card-base p-5 hover:shadow-float hover:-translate-y-1 transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="relative shrink-0">
                    <Avatar src={s.avatar} alt={s.name} size={48} ring />
                    {connected.has(s.id) && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-mint-500 flex items-center justify-center ring-2 ring-white dark:ring-ink-900">
                        <BadgeCheck className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-sm truncate">{s.name}</h3>
                      <BadgeCheck className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                    </div>
                    <p className="text-xs text-ink-400">{s.branch} · Sem {s.semester}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Zap className="w-3 h-3 text-brand-400" />
                      <span className="text-xs text-ink-400">Lv.{s.level} · {s.xp.toLocaleString()} XP</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-ink-500 dark:text-ink-400 line-clamp-2 leading-relaxed mb-3">{s.bio}</p>
                {/* Skills preview */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {s.skills.slice(0, 3).map((sk) => (
                    <span key={sk} className="text-[10px] px-2 py-0.5 rounded-md bg-brand-50 dark:bg-brand-500/10 text-brand-600 font-medium">{sk}</span>
                  ))}
                  {s.skills.length > 3 && <span className="text-[10px] text-ink-400">+{s.skills.length - 3} more</span>}
                </div>
                {/* Interests preview */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {s.interests.slice(0, 2).map((it) => (
                    <span key={it} className="text-[10px] px-2 py-0.5 rounded-md bg-accent-50 dark:bg-accent-500/10 text-accent-600 font-medium">{it}</span>
                  ))}
                  {s.interests.length > 2 && <span className="text-[10px] text-ink-400">+{s.interests.length - 2}</span>}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-ink-100 dark:border-ink-800">
                  <Badge color="accent" size="xs"><Sparkles className="w-2.5 h-2.5" /> {s.lookingFor}</Badge>
                  {connectButton(s.id, s.name)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============ Settings Page ============ */
export function SettingsPage({ dark, onToggleDark }: { dark: boolean; onToggleDark: () => void }) {
  const toast = useToast();
  const [settings, setSettings] = useState({
    notifications: true,
    emailDigest: false,
    placementAlerts: true,
    assignmentReminders: true,
    eventUpdates: true,
    profileVisible: true,
    showOnlineStatus: true,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    toast('Setting updated', 'info');
  };

  const Toggle = ({ on, onClick }: { on: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`w-10 h-6 rounded-full transition-colors relative ${on ? 'bg-brand-500' : 'bg-ink-200 dark:bg-ink-700'}`}
    >
      <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${on ? 'translate-x-4' : 'translate-x-0.5'}`} />
    </button>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <Reveal>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Settings</h1>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="card-base p-5">
          <h3 className="font-bold text-sm mb-4">Appearance</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {dark ? <Moon className="w-5 h-5 text-ink-400" /> : <Sun className="w-5 h-5 text-accent-500" />}
              <div>
                <div className="text-sm font-medium">Dark Mode</div>
                <div className="text-xs text-ink-400">Toggle dark theme</div>
              </div>
            </div>
            <Toggle on={dark} onClick={onToggleDark} />
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="card-base p-5">
          <h3 className="font-bold text-sm mb-4">Notifications</h3>
          <div className="space-y-4">
            {[
              { key: 'notifications' as const, label: 'Push Notifications', desc: 'Receive notifications on this device' },
              { key: 'emailDigest' as const, label: 'Email Digest', desc: 'Weekly summary of activity' },
              { key: 'placementAlerts' as const, label: 'Placement Alerts', desc: 'New placement and internship postings' },
              { key: 'assignmentReminders' as const, label: 'Assignment Reminders', desc: 'Deadlines and due date reminders' },
              { key: 'eventUpdates' as const, label: 'Event Updates', desc: 'New events and RSVP reminders' },
            ].map((s) => (
              <div key={s.key} className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{s.label}</div>
                  <div className="text-xs text-ink-400">{s.desc}</div>
                </div>
                <Toggle on={settings[s.key]} onClick={() => toggle(s.key)} />
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="card-base p-5">
          <h3 className="font-bold text-sm mb-4">Privacy</h3>
          <div className="space-y-4">
            {[
              { key: 'profileVisible' as const, label: 'Profile Visibility', desc: 'Allow other students to find your profile' },
              { key: 'showOnlineStatus' as const, label: 'Online Status', desc: 'Show when you are active' },
            ].map((s) => (
              <div key={s.key} className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{s.label}</div>
                  <div className="text-xs text-ink-400">{s.desc}</div>
                </div>
                <Toggle on={settings[s.key]} onClick={() => toggle(s.key)} />
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="card-base p-5">
          <h3 className="font-bold text-sm mb-4">Connected Accounts</h3>
          <div className="space-y-3">
            {[
              { label: 'GitHub', value: currentUser.github, icon: Code2, color: 'text-ink-700 dark:text-ink-200' },
              { label: 'LinkedIn', value: currentUser.linkedin, icon: Users, color: 'text-brand-600' },
            ].map((a) => {
              const Icon = a.icon;
              return (
                <div key={a.label} className="flex items-center justify-between p-3 rounded-xl bg-ink-50 dark:bg-ink-800/50">
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${a.color}`} />
                    <div>
                      <div className="text-sm font-medium">{a.label}</div>
                      <div className="text-xs text-ink-400">{a.value}</div>
                    </div>
                  </div>
                  <Badge color="mint" size="xs">Connected</Badge>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
