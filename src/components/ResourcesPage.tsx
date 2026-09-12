import { useState } from 'react';
import {
  FileText, Star, Download, ThumbsUp, Bookmark, Search,
  ChevronRight, Folder, FolderOpen, Upload, Filter,
} from 'lucide-react';
import { Badge, EmptyState } from './ui';
import { Reveal } from './Reveal';
import { useToast } from './Toast';
import { resources as initialResources } from '../data';
import type { Resource } from '../types';

const typeColors: Record<string, 'brand' | 'mint' | 'accent' | 'rose' | 'ink'> = {
  Notes: 'brand',
  PYQ: 'accent',
  Assignment: 'rose',
  Book: 'mint',
  Slides: 'brand',
  Code: 'ink',
};

const typeIcons: Record<string, string> = {
  Notes: '📝', PYQ: '📋', Assignment: '✏️', Book: '📚', Slides: '📽️', Code: '💻',
};

const branches = ['All', 'CSE', 'ECE', 'ME'];
const semesters = [5, 6, 7, 8];

export function ResourcesPage() {
  const toast = useToast();
  const [resourceList, setResourceList] = useState<Resource[]>(initialResources);
  const [search, setSearch] = useState('');
  const [branch, setBranch] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [expandedBranch, setExpandedBranch] = useState<string | null>('CSE');

  const toggleBookmark = (id: string) => {
    setResourceList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, bookmarked: !r.bookmarked } : r))
    );
    toast('Resource bookmarked!');
  };

  const download = (r: Resource) => {
    toast(`Downloading "${r.title}"`);
  };

  const filtered = resourceList.filter((r) => {
    if (search && !r.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (branch !== 'All' && r.branch !== branch) return false;
    if (typeFilter !== 'All' && r.type !== typeFilter) return false;
    return true;
  });

  return (
    <div className="space-y-5">
      <Reveal>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Resources Library</h1>
            <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">Notes, PYQs, books & code — organized by branch and semester.</p>
          </div>
          <button
            onClick={() => toast('Upload dialog opened', 'info')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-brand text-white text-sm font-semibold shadow-float hover:scale-105 transition-transform"
          >
            <Upload className="w-4 h-4" /> Upload Resource
          </button>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {/* Sidebar tree */}
        <Reveal delay={0.05}>
          <div className="card-base p-4 h-fit lg:sticky lg:top-20">
            <h3 className="text-xs font-bold text-ink-400 uppercase mb-3">Browse by Branch</h3>
            <div className="space-y-1">
              {branches.slice(1).map((b) => (
                <div key={b}>
                  <button
                    onClick={() => { setExpandedBranch(expandedBranch === b ? null : b); setBranch(b); }}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      branch === b ? 'bg-brand-50 dark:bg-brand-500/10 text-brand-600' : 'hover:bg-ink-50 dark:hover:bg-ink-800'
                    }`}
                  >
                    {expandedBranch === b ? <FolderOpen className="w-4 h-4" /> : <Folder className="w-4 h-4" />}
                    {b}
                    <ChevronRight className={`w-3 h-3 ml-auto transition-transform ${expandedBranch === b ? 'rotate-90' : ''}`} />
                  </button>
                  {expandedBranch === b && (
                    <div className="ml-6 mt-1 space-y-1 animate-fade-in">
                      {semesters.map((s) => (
                        <button
                          key={s}
                          className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-ink-500 hover:bg-ink-50 dark:hover:bg-ink-800 transition-colors"
                        >
                          <Folder className="w-3.5 h-3.5" /> Semester {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={() => setBranch('All')}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium mt-2 transition-colors ${
                branch === 'All' ? 'bg-brand-50 dark:bg-brand-500/10 text-brand-600' : 'hover:bg-ink-50 dark:hover:bg-ink-800'
              }`}
            >
              <Filter className="w-4 h-4" /> All Branches
            </button>
          </div>
        </Reveal>

        {/* Main content */}
        <div className="lg:col-span-3 space-y-4">
          {/* Search + filters */}
          <Reveal delay={0.1}>
            <div className="card-base p-4 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search resources..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-ink-50 dark:bg-ink-800/50 text-sm outline-none border border-transparent focus:border-brand-300 transition-colors"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {['All', 'Notes', 'PYQ', 'Assignment', 'Book', 'Slides', 'Code'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      typeFilter === t
                        ? 'gradient-brand text-white shadow-float'
                        : 'bg-ink-100 dark:bg-ink-800 text-ink-500 hover:bg-ink-200 dark:hover:bg-ink-700'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Results */}
          {filtered.length === 0 ? (
            <EmptyState
              icon={<FileText className="w-8 h-8" />}
              title="No resources found"
              desc="Try adjusting your filters or search query."
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filtered.map((r, i) => (
                <Reveal key={r.id} delay={i * 0.05}>
                  <div className="card-base p-4 hover:shadow-card hover:-translate-y-0.5 transition-all group">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-xl bg-ink-50 dark:bg-ink-800 flex items-center justify-center text-2xl shrink-0">
                        {typeIcons[r.type]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge color={typeColors[r.type]} size="xs">{r.type}</Badge>
                          <span className="text-xs text-ink-400">{r.subject}</span>
                        </div>
                        <h3 className="text-sm font-bold leading-snug line-clamp-2">{r.title}</h3>
                        <div className="text-xs text-ink-400 mt-1">by {r.uploader}</div>
                      </div>
                      <button
                        onClick={() => toggleBookmark(r.id)}
                        className={`shrink-0 transition-colors ${r.bookmarked ? 'text-brand-500' : 'text-ink-300 hover:text-brand-500'}`}
                      >
                        <Bookmark className={`w-4 h-4 ${r.bookmarked ? 'fill-brand-500' : ''}`} />
                      </button>
                    </div>
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-ink-100 dark:border-ink-800 text-xs">
                      <span className="flex items-center gap-1 text-ink-500">
                        <Star className="w-3.5 h-3.5 fill-accent-400 text-accent-400" />
                        {r.rating}
                      </span>
                      <span className="flex items-center gap-1 text-ink-500">
                        <Download className="w-3.5 h-3.5" />
                        {r.downloads.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1 text-ink-500">
                        <ThumbsUp className="w-3.5 h-3.5" />
                        {r.upvotes}
                      </span>
                      <button
                        onClick={() => download(r)}
                        className="ml-auto flex items-center gap-1 text-brand-500 font-semibold hover:scale-105 transition-transform"
                      >
                        <Download className="w-3.5 h-3.5" /> Download
                      </button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
