export type Page =
  | 'landing'
  | 'dashboard'
  | 'feed'
  | 'resources'
  | 'chat'
  | 'doubts'
  | 'placements'
  | 'projects'
  | 'marketplace'
  | 'events'
  | 'clubs'
  | 'lostfound'
  | 'people'
  | 'profile'
  | 'settings';

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  icon: string;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  duration: string;
  description: string;
  type: 'internship' | 'project' | 'leadership';
}

export interface Student {
  id: string;
  name: string;
  avatar: string;
  branch: string;
  semester: number;
  year: number;
  bio: string;
  skills: string[];
  interests: string[];
  lookingFor: string;
  xp: number;
  level: number;
  streak: number;
  badges: string[];
  github?: string;
  linkedin?: string;
  portfolio?: string;
  certificates?: Certificate[];
  experience?: Experience[];
  projects?: { title: string; description: string; link?: string }[];
}

export interface Post {
  id: string;
  author: string;
  avatar: string;
  branch: string;
  time: string;
  content: string;
  tag: string;
  likes: number;
  comments: number;
  bookmarks: number;
  liked?: boolean;
  bookmarked?: boolean;
  pinned?: boolean;
  type: 'text' | 'achievement' | 'question' | 'resource';
}

export interface Resource {
  id: string;
  title: string;
  subject: string;
  branch: string;
  semester: number;
  type: 'Notes' | 'PYQ' | 'Assignment' | 'Book' | 'Slides' | 'Code';
  uploader: string;
  rating: number;
  downloads: number;
  upvotes: number;
  bookmarked?: boolean;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'completed';
  progress: number;
}

export interface ClassEvent {
  id: string;
  subject: string;
  time: string;
  room: string;
  teacher: string;
  color: string;
  status?: 'upcoming' | 'live' | 'done';
}

export interface ChatMessage {
  id: string;
  author: string;
  avatar: string;
  content: string;
  time: string;
  reactions?: { emoji: string; count: number }[];
  pinned?: boolean;
}

export interface ChatChannel {
  id: string;
  name: string;
  type: 'branch' | 'semester' | 'subject' | 'hostel' | 'placements' | 'clubs' | 'hackathons' | 'dm';
  unread: number;
  lastMessage: string;
  lastTime: string;
  members?: number;
}

export interface Doubt {
  id: string;
  title: string;
  subject: string;
  author: string;
  avatar: string;
  votes: number;
  answers: number;
  accepted: boolean;
  tags: string[];
  time: string;
}

export interface Placement {
  id: string;
  company: string;
  logo: string;
  role: string;
  package: string;
  type: 'Full-time' | 'Internship' | 'Off-campus';
  eligibility: string;
  deadline: string;
  applied?: boolean;
}

export interface InterviewExperience {
  id: string;
  author: string;
  avatar: string;
  branch: string;
  company: string;
  logo: string;
  role: string;
  type: 'Interview' | 'Internship' | 'Placement' | 'Off-campus';
  result: 'Selected' | 'Rejected' | 'In Progress';
  rounds: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  date: string;
  title: string;
  content: string;
  tips: string[];
  likes: number;
  comments: number;
  liked?: boolean;
  bookmarked?: boolean;
}

export interface ProjectListing {
  id: string;
  title: string;
  creator: string;
  avatar: string;
  roles: string[];
  members: number;
  maxMembers: number;
  tags: string[];
  status: 'recruiting' | 'full' | 'closed';
  description: string;
}

export interface MarketListing {
  id: string;
  title: string;
  price: number;
  category: string;
  seller: string;
  image: string;
  condition: 'New' | 'Like New' | 'Good' | 'Fair';
  negotiable: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  attendees: number;
  rsvped?: boolean;
  organizer: string;
}

export interface Club {
  id: string;
  name: string;
  category: string;
  members: number;
  icon: string;
  color: string;
  description: string;
  recruiting: boolean;
}

export interface LostFoundItem {
  id: string;
  title: string;
  type: 'lost' | 'found';
  location: string;
  date: string;
  reward?: string;
  image: string;
  description: string;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'mention' | 'placement' | 'deadline' | 'event' | 'system';
  content: string;
  time: string;
  read: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  branch: string;
  xp: number;
  level: number;
  streak: number;
  badge?: string;
}
