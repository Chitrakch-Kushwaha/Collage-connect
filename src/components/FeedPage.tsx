import { useState } from 'react';
import {
  Heart, MessageCircle, Bookmark, Share2, MoreHorizontal, Pin,
  Image, FileText, Send, TrendingUp, Clock, Flame, Bookmark as BookmarkIcon,
  Flag, Smile,
} from 'lucide-react';
import { Avatar, Badge, EmptyState } from './ui';
import { Reveal } from './Reveal';
import { useToast } from './Toast';
import { posts as initialPosts, currentUser } from '../data';
import type { Post } from '../types';

const tabs = [
  { id: 'trending', label: 'Trending', icon: TrendingUp },
  { id: 'latest', label: 'Latest', icon: Clock },
  { id: 'hot', label: 'Hot', icon: Flame },
  { id: 'saved', label: 'Saved', icon: BookmarkIcon },
];

const tagColors: Record<string, 'brand' | 'mint' | 'accent' | 'rose' | 'ink'> = {
  Achievement: 'accent',
  Design: 'rose',
  Question: 'brand',
  Resource: 'mint',
  Project: 'brand',
};

export function FeedPage() {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState('trending');
  const [postList, setPostList] = useState<Post[]>(initialPosts);
  const [newPost, setNewPost] = useState('');
  const [showComposer, setShowComposer] = useState(false);

  const toggleLike = (id: string) => {
    setPostList((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) }
          : p
      )
    );
  };

  const toggleBookmark = (id: string) => {
    setPostList((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, bookmarked: !p.bookmarked, bookmarks: p.bookmarks + (p.bookmarked ? -1 : 1) }
          : p
      )
    );
    const p = postList.find((x) => x.id === id);
    toast(p?.bookmarked ? 'Removed from saved' : 'Saved!', 'info');
  };

  const submitPost = () => {
    if (!newPost.trim()) return;
    const p: Post = {
      id: `p${Date.now()}`,
      author: currentUser.name,
      avatar: currentUser.avatar,
      branch: currentUser.branch,
      time: 'now',
      content: newPost,
      tag: 'Discussion',
      likes: 0,
      comments: 0,
      bookmarks: 0,
      type: 'text',
    };
    setPostList((prev) => [p, ...prev]);
    setNewPost('');
    setShowComposer(false);
    toast('Post published! +5 XP');
  };

  const filtered = postList.filter((p) => {
    if (activeTab === 'saved') return p.bookmarked;
    if (activeTab === 'hot') return p.likes > 50;
    if (activeTab === 'latest') return true;
    return true;
  }).sort((a, b) => {
    if (activeTab === 'trending') return b.likes - a.likes;
    if (activeTab === 'hot') return b.likes - a.likes;
    return 0;
  });

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <Reveal>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Community Feed</h1>
        </div>
      </Reveal>

      {/* Composer */}
      <Reveal delay={0.05}>
        <div className="card-base p-4">
          {showComposer ? (
            <div className="space-y-3 animate-fade-in">
              <div className="flex items-start gap-3">
                <Avatar src={currentUser.avatar} alt={currentUser.name} size={40} />
                <div className="flex-1">
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Share something with the community..."
                    className="w-full bg-transparent resize-none outline-none text-sm placeholder:text-ink-400 min-h-[80px]"
                    autoFocus
                  />
                </div>
              </div>
              <div className="flex items-center justify-between pl-13">
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-lg bg-ink-100 dark:bg-ink-800 flex items-center justify-center hover:bg-brand-100 hover:text-brand-600 transition-colors">
                    <Image className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-ink-100 dark:bg-ink-800 flex items-center justify-center hover:bg-brand-100 hover:text-brand-600 transition-colors">
                    <FileText className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-ink-100 dark:bg-ink-800 flex items-center justify-center hover:bg-brand-100 hover:text-brand-600 transition-colors">
                    <Smile className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setShowComposer(false); setNewPost(''); }}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium text-ink-500 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitPost}
                    disabled={!newPost.trim()}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg gradient-brand text-white text-sm font-semibold disabled:opacity-40 hover:scale-105 transition-transform"
                  >
                    <Send className="w-3.5 h-3.5" /> Post
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowComposer(true)}
              className="w-full flex items-center gap-3 text-left group"
            >
              <Avatar src={currentUser.avatar} alt={currentUser.name} size={40} />
              <div className="flex-1 px-3 py-2.5 rounded-xl bg-ink-50 dark:bg-ink-800/50 text-sm text-ink-400 group-hover:bg-ink-100 dark:group-hover:bg-ink-800 transition-colors">
                Share something with the community...
              </div>
            </button>
          )}
        </div>
      </Reveal>

      {/* Tabs */}
      <Reveal delay={0.1}>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === t.id
                    ? 'gradient-brand text-white shadow-float'
                    : 'bg-ink-100 dark:bg-ink-800 text-ink-500 hover:bg-ink-200 dark:hover:bg-ink-700'
                }`}
              >
                <Icon className="w-4 h-4" /> {t.label}
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Posts */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <EmptyState
            icon={<BookmarkIcon className="w-8 h-8" />}
            title="No saved posts yet"
            desc="Bookmark posts to find them here later."
          />
        ) : (
          filtered.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <article className="card-base p-5 hover:shadow-card transition-shadow group">
                {p.pinned && (
                  <div className="flex items-center gap-1.5 mb-3 text-xs font-medium text-accent-500">
                    <Pin className="w-3.5 h-3.5" /> Pinned by community
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <Avatar src={p.avatar} alt={p.author} size={44} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm">{p.author}</span>
                      <Badge color="ink" size="xs">{p.branch}</Badge>
                      <Badge color={tagColors[p.tag] || 'ink'} size="xs">{p.tag}</Badge>
                      <span className="text-xs text-ink-400">· {p.time}</span>
                    </div>
                    <p className="text-sm text-ink-700 dark:text-ink-200 mt-2 leading-relaxed">{p.content}</p>
                    <div className="flex items-center gap-4 mt-4">
                      <button
                        onClick={() => toggleLike(p.id)}
                        className={`flex items-center gap-1.5 text-sm transition-all hover:scale-105 ${
                          p.liked ? 'text-rose-500' : 'text-ink-400 hover:text-rose-500'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${p.liked ? 'fill-rose-500' : ''}`} />
                        <span className="font-medium">{p.likes}</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-sm text-ink-400 hover:text-brand-500 transition-all hover:scale-105">
                        <MessageCircle className="w-4 h-4" />
                        <span className="font-medium">{p.comments}</span>
                      </button>
                      <button
                        onClick={() => toggleBookmark(p.id)}
                        className={`flex items-center gap-1.5 text-sm transition-all hover:scale-105 ${
                          p.bookmarked ? 'text-brand-500' : 'text-ink-400 hover:text-brand-500'
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${p.bookmarked ? 'fill-brand-500' : ''}`} />
                        <span className="font-medium">{p.bookmarks}</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-sm text-ink-400 hover:text-mint-500 transition-all hover:scale-105 ml-auto">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toast('Post reported', 'info')}
                        className="text-ink-400 hover:text-rose-500 transition-colors"
                      >
                        <Flag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <button className="text-ink-300 hover:text-ink-500 transition-colors opacity-0 group-hover:opacity-100">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))
        )}
      </div>
    </div>
  );
}
