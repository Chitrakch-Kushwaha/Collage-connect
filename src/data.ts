import type {
  Student, Post, Resource, Assignment, ClassEvent,
  ChatMessage, ChatChannel, Doubt, Placement, ProjectListing,
  MarketListing, EventItem, Club, LostFoundItem, Notification, LeaderboardEntry,
  InterviewExperience,
} from './types';

const avatar = (seed: string) =>
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;

export const currentUser: Student = {
  id: 'u1',
  name: 'Aarav Sharma',
  avatar: avatar('Aarav'),
  branch: 'CSE',
  semester: 5,
  year: 3,
  bio: 'Full-stack dev & ML enthusiast. Building things that matter. Always open to collaborating on exciting projects.',
  skills: ['React', 'TypeScript', 'Python', 'TensorFlow', 'Node.js', 'Supabase'],
  interests: ['AI/ML', 'Web Dev', 'Hackathons', 'Open Source'],
  lookingFor: 'Hackathon Team',
  xp: 8450,
  level: 12,
  streak: 23,
  badges: ['Top Contributor', '30-Day Streak', 'Resource Hero', 'Hackathon Winner'],
  github: 'github.com/aarav',
  linkedin: 'linkedin.com/in/aarav',
  portfolio: 'aarav.dev',
  certificates: [
    { id: 'cert1', title: 'TensorFlow Developer Certificate', issuer: 'Google', date: 'Mar 2026', credentialId: 'TF-2026-04821', icon: '🤖' },
    { id: 'cert2', title: 'Meta Front-End Developer', issuer: 'Meta', date: 'Jan 2026', credentialId: 'META-FE-9102', icon: '🌐' },
    { id: 'cert3', title: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', date: 'Nov 2025', credentialId: 'AWS-CP-3347', icon: '☁️' },
    { id: 'cert4', title: 'Smart India Hackathon Winner', issuer: 'Govt. of India', date: 'Aug 2025', icon: '🏆' },
  ],
  experience: [
    { id: 'exp1', role: 'SDE Intern', organization: 'Zomato', duration: 'May 2025 - Jul 2025', description: 'Built internal dashboards using React and Node.js. Optimized API response times by 40%.', type: 'internship' },
    { id: 'exp2', role: 'Full-Stack Developer', organization: 'Campus Startup — EduFlow', duration: 'Jan 2025 - Present', description: 'Co-founded an ed-tech platform serving 500+ students. Led frontend architecture.', type: 'project' },
    { id: 'exp3', role: 'Technical Lead', organization: 'Coding Club KR Mangalam', duration: 'Aug 2024 - Present', description: 'Organized 5+ coding contests and mentorship sessions for 200+ students.', type: 'leadership' },
  ],
  projects: [
    { title: 'AI Study Companion', description: 'LLM-powered assistant that summarizes notes and generates practice questions.', link: 'github.com/aarav/ai-study' },
    { title: 'Campus Marketplace', description: 'Peer-to-peer marketplace for students with real-time chat.', link: 'github.com/aarav/campus-mart' },
  ],
};

export const students: Student[] = [
  currentUser,
  { id: 'u2', name: 'Priya Verma', avatar: avatar('Priya'), branch: 'CSE', semester: 5, year: 3, bio: 'UI/UX designer & front-end dev passionate about creating delightful user experiences.', skills: ['Figma', 'React', 'Tailwind', 'Framer Motion'], interests: ['Design', 'Frontend', 'UI/UX'], lookingFor: 'Project Partner', xp: 7200, level: 10, streak: 15, badges: ['Design Master'], github: 'github.com/priya', linkedin: 'linkedin.com/in/priya', portfolio: 'priya.design', certificates: [{ id: 'pc1', title: 'Google UX Design Certificate', issuer: 'Google', date: 'Feb 2026', icon: '🎨' }, { id: 'pc2', title: 'Figma Advanced Certification', issuer: 'Figma Academy', date: 'Dec 2025', icon: '🖌️' }], experience: [{ id: 'pe1', role: 'UI/UX Intern', organization: 'Razorpay', duration: 'Jun 2025 - Aug 2025', description: 'Designed payment flow improvements used by 2M+ users.', type: 'internship' }], projects: [{ title: 'Design System for EduFlow', description: 'A comprehensive component library with 50+ reusable components.' }] },
  { id: 'u3', name: 'Rohan Gupta', avatar: avatar('Rohan'), branch: 'ECE', semester: 5, year: 3, bio: 'Robotics & IoT tinkerer. Love building things that move and think.', skills: ['Arduino', 'C++', 'Raspberry Pi', 'Python', 'ROS'], interests: ['Robotics', 'IoT', 'Embedded Systems'], lookingFor: 'Internship', xp: 6800, level: 9, streak: 8, badges: ['Maker'], github: 'github.com/rohan', linkedin: 'linkedin.com/in/rohan', certificates: [{ id: 'rc1', title: 'Embedded Systems Specialization', issuer: 'University of Colorado', date: 'Jan 2026', icon: '🔌' }, { id: 'rc2', title: 'Arduino Certified Engineer', issuer: 'Arduino', date: 'Oct 2025', icon: '🔧' }], experience: [{ id: 're1', role: 'IoT Research Intern', organization: 'IIT Delhi', duration: 'May 2025 - Jul 2025', description: 'Built sensor networks for smart agriculture research.', type: 'internship' }], projects: [{ title: 'Autonomous Maze Bot', description: 'Arduino-based robot that navigates mazes using IR sensors and pathfinding algorithms.' }] },
  { id: 'u4', name: 'Sneha Reddy', avatar: avatar('Sneha'), branch: 'CSE', semester: 5, year: 3, bio: 'Competitive programmer. 500+ problems solved. Algo enthusiast.', skills: ['C++', 'DSA', 'Python', 'Java', 'SQL'], interests: ['Competitive Programming', 'Algorithms', 'Data Structures'], lookingFor: 'Study Partner', xp: 9100, level: 13, streak: 31, badges: ['Code Wizard', '30-Day Streak'], github: 'github.com/sneha', linkedin: 'linkedin.com/in/sneha', certificates: [{ id: 'sc1', title: 'Codeforces Candidate Master', issuer: 'Codeforces', date: 'Mar 2026', icon: '⚡' }, { id: 'sc2', title: 'Meta Hacker Cup Top 500', issuer: 'Meta', date: 'Jan 2026', icon: '🏆' }], experience: [{ id: 'se1', role: 'SDE Intern', organization: 'Google', duration: 'May 2025 - Aug 2025', description: 'Worked on Search infrastructure team. Optimized indexing pipeline.', type: 'internship' }], projects: [{ title: 'AlgoVisualizer', description: 'Interactive visualizations for 30+ algorithms with step-by-step execution.' }] },
  { id: 'u5', name: 'Karthik Nair', avatar: avatar('Karthik'), branch: 'ME', semester: 5, year: 3, bio: 'Mechanical design & CAD enthusiast. Building physical things that work.', skills: ['SolidWorks', 'AutoCAD', 'ANSYS', 'MATLAB', '3D Printing'], interests: ['Mechanical Design', 'Manufacturing', 'CAD'], lookingFor: 'Project Partner', xp: 5400, level: 8, streak: 5, badges: [], github: 'github.com/karthik', linkedin: 'linkedin.com/in/karthik', certificates: [{ id: 'kc1', title: 'SolidWorks Professional', issuer: 'Dassault Systèmes', date: 'Nov 2025', icon: '📐' }, { id: 'kc2', title: 'ANSYS Simulation Fundamentals', issuer: 'ANSYS', date: 'Sep 2025', icon: '🔬' }], experience: [{ id: 'ke1', role: 'Design Intern', organization: 'Tata Motors', duration: 'Jun 2025 - Jul 2025', description: 'Designed bracket components for EV chassis. Reduced weight by 12%.', type: 'internship' }], projects: [{ title: 'Autonomous Drone Frame', description: 'Carbon fiber drone frame optimized for weight and strength using FEA.' }] },
  { id: 'u6', name: 'Ananya Singh', avatar: avatar('Ananya'), branch: 'CSE', semester: 5, year: 3, bio: 'Data scientist in training. Love finding patterns in chaos.', skills: ['Python', 'Pandas', 'Scikit-learn', 'PyTorch', 'SQL', 'Tableau'], interests: ['Data Science', 'Machine Learning', 'Analytics'], lookingFor: 'Hackathon Team', xp: 7800, level: 11, streak: 12, badges: ['Data Pioneer'], github: 'github.com/ananya', linkedin: 'linkedin.com/in/ananya', portfolio: 'ananya.datascience', certificates: [{ id: 'ac1', title: 'Deep Learning Specialization', issuer: 'DeepLearning.AI', date: 'Feb 2026', icon: '🧠' }, { id: 'ac2', title: 'Google Data Analytics', issuer: 'Google', date: 'Dec 2025', icon: '📊' }], experience: [{ id: 'ae1', role: 'Data Science Intern', organization: 'Microsoft', duration: 'May 2025 - Jul 2025', description: 'Built churn prediction model with 92% accuracy for Azure customer team.', type: 'internship' }], projects: [{ title: 'Campus Sentiment Analyzer', description: 'NLP model analyzing student feedback to improve campus services.' }] },
  { id: 'u7', name: 'Vikram Patel', avatar: avatar('Vikram'), branch: 'CSE', semester: 5, year: 3, bio: 'Blockchain & Web3 developer. Smart contracts and DeFi protocols.', skills: ['Solidity', 'Web3.js', 'React', 'Rust', 'Ethers.js'], interests: ['Blockchain', 'Web3', 'DeFi', 'Crypto'], lookingFor: 'Project Partner', xp: 6200, level: 9, streak: 7, badges: ['Web3 Pioneer'], github: 'github.com/vikram', linkedin: 'linkedin.com/in/vikram', certificates: [{ id: 'vc1', title: 'Ethereum Developer Bootcamp', issuer: 'Consensys', date: 'Jan 2026', icon: '⛓️' }, { id: 'vc2', title: 'Chainlink Hackathon Winner', issuer: 'Chainlink', date: 'Nov 2025', icon: '🔗' }], experience: [{ id: 've1', role: 'Blockchain Developer', organization: 'Polygon Labs', duration: 'Jun 2025 - Aug 2025', description: 'Developed and audited 5 smart contracts for DeFi protocol.', type: 'internship' }], projects: [{ title: 'Decentralized Certificate Verifier', description: 'ERC-721 based system for issuing and verifying academic certificates.' }] },
  { id: 'u8', name: 'Diya Mehta', avatar: avatar('Diya'), branch: 'CSE', semester: 5, year: 3, bio: 'Mobile app developer. Flutter & React Native. Building cross-platform apps.', skills: ['Flutter', 'Dart', 'React Native', 'Firebase', 'Java'], interests: ['Mobile Dev', 'App Development', 'UI Design'], lookingFor: 'Internship', xp: 5900, level: 8, streak: 10, badges: ['App Builder'], github: 'github.com/diya', linkedin: 'linkedin.com/in/diya', certificates: [{ id: 'dc1', title: 'Google Associate Android Developer', issuer: 'Google', date: 'Dec 2025', icon: '📱' }, { id: 'dc2', title: 'Flutter Dart Certification', issuer: 'Google', date: 'Oct 2025', icon: '🐦' }], experience: [{ id: 'de1', role: 'Mobile Dev Intern', organization: 'Swiggy', duration: 'May 2025 - Jul 2025', description: 'Built delivery partner app features in Flutter. Shipped to 50k+ users.', type: 'internship' }], projects: [{ title: 'Campus Food Ordering App', description: 'Flutter app for ordering from campus canteens with real-time tracking.' }] },
  { id: 'u9', name: 'Arjun Kumar', avatar: avatar('Arjun'), branch: 'ECE', semester: 5, year: 3, bio: 'Cloud & DevOps engineer. AWS, Docker, Kubernetes. Infrastructure as code.', skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'Linux'], interests: ['Cloud Computing', 'DevOps', 'Infrastructure'], lookingFor: 'Project Partner', xp: 6700, level: 9, streak: 14, badges: ['Cloud Native'], github: 'github.com/arjun', linkedin: 'linkedin.com/in/arjun', certificates: [{ id: 'arc1', title: 'AWS Solutions Architect Associate', issuer: 'Amazon Web Services', date: 'Feb 2026', icon: '☁️' }, { id: 'arc2', title: 'Certified Kubernetes Administrator', issuer: 'CNCF', date: 'Dec 2025', icon: '⚓' }], experience: [{ id: 'are1', role: 'DevOps Intern', organization: 'Flipkart', duration: 'Jun 2025 - Aug 2025', description: 'Automated deployment pipelines reducing deploy time by 60%.', type: 'internship' }], projects: [{ title: 'Self-Healing Kubernetes Cluster', description: 'Auto-scaling K8s setup with custom health checks and auto-remediation.' }] },
  { id: 'u10', name: 'Ishita Jain', avatar: avatar('Ishita'), branch: 'CSE', semester: 5, year: 3, bio: 'Cybersecurity enthusiast. CTF player. Bug bounty hunter.', skills: ['Python', 'Bash', 'Wireshark', 'Burp Suite', 'Linux', 'Cryptography'], interests: ['Cybersecurity', 'CTF', 'Ethical Hacking', 'Network Security'], lookingFor: 'Hackathon Team', xp: 7100, level: 10, streak: 18, badges: ['Security Champion'], github: 'github.com/ishita', linkedin: 'linkedin.com/in/ishita', certificates: [{ id: 'ic1', title: 'Certified Ethical Hacker', issuer: 'EC-Council', date: 'Jan 2026', icon: '🛡️' }, { id: 'ic2', title: 'OSCP', issuer: 'Offensive Security', date: 'Nov 2025', icon: '🔓' }], experience: [{ id: 'ie1', role: 'Security Intern', organization: 'HackerOne', duration: 'May 2025 - Jul 2025', description: 'Found 3 critical vulnerabilities in client systems. Earned bug bounty.', type: 'internship' }], projects: [{ title: 'Campus Network Scanner', description: 'Automated vulnerability scanner for KR Mangalam campus network.' }] },
  { id: 'u11', name: 'Nisha Agarwal', avatar: avatar('Nisha'), branch: 'CSE', semester: 5, year: 3, bio: 'Backend developer. APIs, microservices, databases. Scale matters.', skills: ['Java', 'Spring Boot', 'PostgreSQL', 'Redis', 'Kafka', 'Go'], interests: ['Backend', 'System Design', 'Distributed Systems'], lookingFor: 'Study Partner', xp: 6500, level: 9, streak: 9, badges: ['API Architect'], github: 'github.com/nisha', linkedin: 'linkedin.com/in/nisha', certificates: [{ id: 'nc1', title: 'Spring Professional Certification', issuer: 'VMware', date: 'Jan 2026', icon: '🍃' }, { id: 'nc2', title: 'MongoDB Developer', issuer: 'MongoDB University', date: 'Oct 2025', icon: '🍃' }], experience: [{ id: 'ne1', role: 'Backend Intern', organization: 'PhonePe', duration: 'Jun 2025 - Aug 2025', description: 'Built microservice handling 10k+ TPS for payment processing.', type: 'internship' }], projects: [{ title: 'Distributed Task Queue', description: 'Go-based message queue with Redis backend supporting 50k+ tasks/sec.' }] },
  { id: 'u12', name: 'Sai Teja', avatar: avatar('Sai'), branch: 'ME', semester: 5, year: 3, bio: 'Automotive & EV enthusiast. Building the future of transportation.', skills: ['CATIA', 'MATLAB', 'Simulink', 'Python', 'EV Systems'], interests: ['Automotive', 'Electric Vehicles', 'Sustainability'], lookingFor: 'Internship', xp: 5800, level: 8, streak: 6, badges: ['EV Pioneer'], github: 'github.com/sai', linkedin: 'linkedin.com/in/sai', certificates: [{ id: 'sc2', title: 'EV Powertrain Design', issuer: 'Coursera', date: 'Dec 2025', icon: '🔋' }, { id: 'sc3', title: 'MATLAB Onramp', issuer: 'MathWorks', date: 'Sep 2025', icon: '📐' }], experience: [{ id: 'se2', role: 'EV Research Intern', organization: 'Ather Energy', duration: 'May 2025 - Jul 2025', description: 'Simulated battery thermal management systems for scooter EV.', type: 'internship' }], projects: [{ title: 'Solar-Powered Go-Kart', description: 'Designed and built a solar-powered go-kart for inter-college competition.' }] },
];

export const posts: Post[] = [
  { id: 'p1', author: 'Sneha Reddy', avatar: avatar('Sneha'), branch: 'CSE', time: '2h', content: 'Just solved my 500th problem on LeetCode! Consistency pays off. Anyone want to start a CP study group?', tag: 'Achievement', likes: 142, comments: 28, bookmarks: 15, type: 'achievement' },
  { id: 'p2', author: 'Priya Verma', avatar: avatar('Priya'), branch: 'CSE', time: '4h', content: 'Designed a complete design system for our hackathon project. Sharing the Figma file — feel free to remix! 🎨', tag: 'Design', likes: 89, comments: 12, bookmarks: 45, type: 'resource' },
  { id: 'p3', author: 'Rohan Gupta', avatar: avatar('Rohan'), branch: 'ECE', time: '6h', content: 'Having trouble with I2C communication between Arduino and MPU6050. Anyone faced similar issues?', tag: 'Question', likes: 23, comments: 17, bookmarks: 8, type: 'question' },
  { id: 'p4', author: 'Ananya Singh', avatar: avatar('Ananya'), branch: 'CSE', time: '8h', content: 'Our team won 1st place at Smart India Hackathon! So grateful for the amazing teammates. Onwards and upwards!', tag: 'Achievement', likes: 312, comments: 45, bookmarks: 22, type: 'achievement', pinned: true },
  { id: 'p5', author: 'Karthik Nair', avatar: avatar('Karthik'), branch: 'ME', time: '12h', content: 'Looking for 2 team members for a mechanical design project. Need someone good with SolidWorks and simulation.', tag: 'Project', likes: 34, comments: 8, bookmarks: 5, type: 'text' },
  { id: 'p6', author: 'Sneha Reddy', avatar: avatar('Sneha'), branch: 'CSE', time: '1d', content: 'Compiled a list of all important DSA patterns for interviews. Link in comments. Hope it helps!', tag: 'Resource', likes: 198, comments: 33, bookmarks: 120, type: 'resource' },
];

export const resources: Resource[] = [
  { id: 'r1', title: 'Data Structures & Algorithms — Complete Notes', subject: 'CS301', branch: 'CSE', semester: 5, type: 'Notes', uploader: 'Sneha Reddy', rating: 4.8, downloads: 1240, upvotes: 89 },
  { id: 'r2', title: 'Operating Systems PYQs (2019-2024)', subject: 'CS302', branch: 'CSE', semester: 5, type: 'PYQ', uploader: 'Aarav Sharma', rating: 4.9, downloads: 2100, upvotes: 156 },
  { id: 'r3', title: 'DBMS Assignment 3 Solutions', subject: 'CS303', branch: 'CSE', semester: 5, type: 'Assignment', uploader: 'Priya Verma', rating: 4.5, downloads: 680, upvotes: 42 },
  { id: 'r4', title: 'Machine Learning — Theory Slides', subject: 'CS304', branch: 'CSE', semester: 5, type: 'Slides', uploader: 'Ananya Singh', rating: 4.7, downloads: 950, upvotes: 67 },
  { id: 'r5', title: 'Computer Networks — Tanenbaum (Ch. 1-5)', subject: 'CS305', branch: 'CSE', semester: 5, type: 'Book', uploader: 'Rohan Gupta', rating: 4.6, downloads: 1800, upvotes: 98 },
  { id: 'r6', title: 'OS Lab — Shell Implementation Code', subject: 'CS302L', branch: 'CSE', semester: 5, type: 'Code', uploader: 'Aarav Sharma', rating: 4.9, downloads: 540, upvotes: 73 },
  { id: 'r7', title: 'Digital Electronics Notes', subject: 'EC301', branch: 'ECE', semester: 5, type: 'Notes', uploader: 'Rohan Gupta', rating: 4.4, downloads: 420, upvotes: 31 },
  { id: 'r8', title: 'Thermodynamics PYQs', subject: 'ME301', branch: 'ME', semester: 5, type: 'PYQ', uploader: 'Karthik Nair', rating: 4.3, downloads: 310, upvotes: 22 },
];

export const assignments: Assignment[] = [
  { id: 'a1', title: 'DBMS Assignment 4 — Normalization', subject: 'CS303', dueDate: 'Tomorrow', priority: 'high', status: 'in-progress', progress: 60 },
  { id: 'a2', title: 'ML Project Report', subject: 'CS304', dueDate: '3 days', priority: 'high', status: 'todo', progress: 0 },
  { id: 'a3', title: 'OS Lab — Thread Scheduling', subject: 'CS302L', dueDate: '5 days', priority: 'medium', status: 'todo', progress: 0 },
  { id: 'a4', title: 'CN Quiz Preparation', subject: 'CS305', dueDate: '1 week', priority: 'medium', status: 'in-progress', progress: 30 },
  { id: 'a5', title: 'DSA Contest Problems', subject: 'CS301', dueDate: 'Completed', priority: 'low', status: 'completed', progress: 100 },
];

export const timetable: ClassEvent[] = [
  { id: 'c1', subject: 'Operating Systems', time: '09:00 - 10:00', room: 'A-301', teacher: 'Dr. Mehta', color: 'brand', status: 'done' },
  { id: 'c2', subject: 'DBMS', time: '10:15 - 11:15', room: 'A-205', teacher: 'Prof. Kapoor', color: 'mint', status: 'done' },
  { id: 'c3', subject: 'Machine Learning', time: '11:30 - 12:30', room: 'B-104', teacher: 'Dr. Rajan', color: 'accent', status: 'live' },
  { id: 'c4', subject: 'Computer Networks', time: '14:00 - 15:00', room: 'A-301', teacher: 'Prof. Singh', color: 'rose', status: 'upcoming' },
  { id: 'c5', subject: 'DSA Lab', time: '15:15 - 17:00', room: 'Lab-3', teacher: 'Dr. Mehta', color: 'brand', status: 'upcoming' },
];

export const chatChannels: ChatChannel[] = [
  { id: 'ch1', name: 'cse-5th-sem', type: 'semester', unread: 12, lastMessage: 'Anyone has the OS notes?', lastTime: '2m' },
  { id: 'ch2', name: 'data-structures', type: 'subject', unread: 3, lastMessage: 'The assignment is tough', lastTime: '5m' },
  { id: 'ch3', name: 'placements-2026', type: 'placements', unread: 47, lastMessage: 'Google onsite results!', lastTime: '1m' },
  { id: 'ch4', name: 'hackathon-team', type: 'hackathons', unread: 0, lastMessage: 'Meet at 6pm in lobby', lastTime: '15m' },
  { id: 'ch5', name: 'hostel-c', type: 'hostel', unread: 5, lastMessage: 'Water issue on 3rd floor', lastTime: '20m' },
  { id: 'ch6', name: 'coding-club', type: 'clubs', unread: 0, lastMessage: 'Next contest on Friday', lastTime: '1h' },
  { id: 'ch7', name: 'Priya Verma', type: 'dm', unread: 2, lastMessage: 'Sent the design file', lastTime: '30m' },
  { id: 'ch8', name: 'Rohan Gupta', type: 'dm', unread: 0, lastMessage: 'Thanks bro!', lastTime: '2h' },
];

export const chatMessages: ChatMessage[] = [
  { id: 'm1', author: 'Sneha Reddy', avatar: avatar('Sneha'), content: 'Hey everyone! Did anyone finish the DBMS assignment?', time: '10:30 AM', reactions: [{ emoji: '👀', count: 4 }] },
  { id: 'm2', author: 'Aarav Sharma', avatar: avatar('Aarav'), content: 'Almost done. The normalization part is tricky. I can share my approach after class.', time: '10:32 AM', reactions: [{ emoji: '👍', count: 6 }, { emoji: '🔥', count: 2 }] },
  { id: 'm3', author: 'Priya Verma', avatar: avatar('Priya'), content: 'I made a visual guide for normalization forms. Sharing it here!', time: '10:35 AM', pinned: true },
  { id: 'm4', author: 'Rohan Gupta', avatar: avatar('Rohan'), content: 'This is gold, Priya. Bookmarking!', time: '10:36 AM', reactions: [{ emoji: '💯', count: 8 }] },
  { id: 'm5', author: 'Ananya Singh', avatar: avatar('Ananya'), content: 'Anyone has the OS notes? I missed the last lecture 😅', time: '10:40 AM', reactions: [{ emoji: '😅', count: 3 }] },
  { id: 'm6', author: 'Aarav Sharma', avatar: avatar('Aarav'), content: 'I have them! Uploading to resources now.', time: '10:42 AM', reactions: [{ emoji: '🙏', count: 5 }] },
];

export const doubts: Doubt[] = [
  { id: 'd1', title: 'How does B+ tree differ from B-tree in DBMS indexing?', subject: 'DBMS', author: 'Rohan Gupta', avatar: avatar('Rohan'), votes: 24, answers: 5, accepted: true, tags: ['dbms', 'indexing', 'b-tree'], time: '3h' },
  { id: 'd2', title: 'Difference between supervised and unsupervised learning with examples?', subject: 'Machine Learning', author: 'Karthik Nair', avatar: avatar('Karthik'), votes: 18, answers: 7, accepted: true, tags: ['ml', 'ai'], time: '6h' },
  { id: 'd3', title: 'Why does TCP use 3-way handshake instead of 2?', subject: 'Computer Networks', author: 'Priya Verma', avatar: avatar('Priya'), votes: 31, answers: 4, accepted: false, tags: ['networks', 'tcp', 'protocols'], time: '8h' },
  { id: 'd4', title: 'How to implement LRU cache in C++ efficiently?', subject: 'DSA', author: 'Sneha Reddy', avatar: avatar('Sneha'), votes: 45, answers: 8, accepted: true, tags: ['dsa', 'cpp', 'caching'], time: '12h' },
  { id: 'd5', title: 'What is the difference between threads and processes?', subject: 'Operating Systems', author: 'Ananya Singh', avatar: avatar('Ananya'), votes: 15, answers: 3, accepted: false, tags: ['os', 'threads', 'processes'], time: '1d' },
];

export const placements: Placement[] = [
  { id: 'pl1', company: 'Google', logo: '🔍', role: 'Software Engineer Intern', package: '₹80,000/mo', type: 'Internship', eligibility: 'CGPA > 8.0, CSE/ECE', deadline: '3 days', applied: true },
  { id: 'pl2', company: 'Microsoft', logo: '🪟', role: 'SDE-1', package: '₹42 LPA', type: 'Full-time', eligibility: 'CGPA > 7.5, CSE', deadline: '5 days', applied: false },
  { id: 'pl3', company: 'Amazon', logo: '📦', role: 'SDE Intern', package: '₹1L/mo', type: 'Internship', eligibility: 'CGPA > 7.0, All branches', deadline: '1 week', applied: false },
  { id: 'pl4', company: 'Atlassian', logo: '🟣', role: 'Frontend Engineer', package: '₹36 LPA', type: 'Off-campus', eligibility: 'React experience', deadline: '2 weeks', applied: false },
  { id: 'pl5', company: 'Zomato', logo: '🍔', role: 'Backend Engineer', package: '₹28 LPA', type: 'Off-campus', eligibility: 'Node.js, Python', deadline: '10 days', applied: false },
];

export const interviewExperiences: InterviewExperience[] = [
  { id: 'ie1', author: 'Sneha Reddy', avatar: avatar('Sneha'), branch: 'CSE', company: 'Google', logo: '🔍', role: 'SDE Intern', type: 'Interview', result: 'Selected', rounds: 4, difficulty: 'Hard', date: 'Jun 2026', title: 'Google SDE Intern — Full Interview Process', content: 'Applied through campus placements. The process took about 3 weeks. First round was an online assessment with 2 DSA problems (medium-hard). Second round was a technical interview focused on graph algorithms and system design. Third round was a googlyness interview — lots of behavioral questions. Final round was with the hiring manager.', tips: ['Practice graph problems thoroughly — BFS, DFS, Dijkstra are must-know', 'Be ready to explain your thought process out loud', 'For googlyness, have 3-4 stories ready using STAR method', 'Don\'t panic if you get stuck — ask clarifying questions'], likes: 234, comments: 28, liked: false, bookmarked: false },
  { id: 'ie2', author: 'Aarav Sharma', avatar: avatar('Aarav'), branch: 'CSE', company: 'Zomato', logo: '🍔', role: 'Backend Intern', type: 'Internship', result: 'Selected', rounds: 3, difficulty: 'Medium', date: 'May 2026', title: 'Zomato Backend Intern — My Summer Experience', content: 'Got selected for a 2-month internship at Zomato. The interview had 3 rounds: coding, system design, and HR. The coding round had a problem on order management. System design was about designing a food delivery tracking system. The internship itself was amazing — worked on the order pipeline, learned a ton about microservices and Kafka.', tips: ['Understand microservices architecture before applying', 'Kafka basics are very helpful', 'Ask good questions during the internship — mentors love curiosity', 'Document your work — it helps during the final review'], likes: 156, comments: 15, liked: false, bookmarked: true },
  { id: 'ie3', author: 'Rohan Gupta', avatar: avatar('Rohan'), branch: 'ECE', company: 'Amazon', logo: '📦', role: 'SDE Intern', type: 'Interview', result: 'Rejected', rounds: 2, difficulty: 'Hard', date: 'Apr 2026', title: 'Amazon SDE Intern — Rejected but Learned a Lot', content: 'Cleared the online assessment but got rejected in the technical interview. The interviewer asked a tree problem (lowest common ancestor) and I blanked. Second question was on dynamic programming which I couldn\'t optimize. Learned that I need to practice more tree and DP problems. Reapplying next semester!', tips: ['Don\'t skip trees and DP — they come up often', 'Even if you get rejected, ask for feedback', 'Practice on LeetCode with a timer to simulate pressure', 'Stay calm — nervousness cost me the interview'], likes: 89, comments: 12, liked: true, bookmarked: false },
  { id: 'ie4', author: 'Ananya Singh', avatar: avatar('Ananya'), branch: 'CSE', company: 'Microsoft', logo: '🪟', role: 'Data Science Intern', type: 'Internship', result: 'Selected', rounds: 3, difficulty: 'Medium', date: 'Jun 2026', title: 'Microsoft Data Science Intern — ML Heavy Interview', content: 'The interview was ML-focused. First round was a coding problem on data manipulation with Pandas. Second round was about ML fundamentals — overfitting, regularization, cross-validation. Third round was a case study: given a dataset, how would you approach building a recommendation system. Loved the process — interviewers were very supportive.', tips: ['Know your ML fundamentals cold — bias/variance, regularization', 'Practice explaining ML concepts in simple terms', 'Have a project portfolio ready to discuss in depth', 'Cross-validation and evaluation metrics are frequently asked'], likes: 178, comments: 22, liked: false, bookmarked: false },
  { id: 'ie5', author: 'Priya Verma', avatar: avatar('Priya'), branch: 'CSE', company: 'Atlassian', logo: '🟣', role: 'Frontend Engineer', type: 'Off-campus', result: 'Selected', rounds: 4, difficulty: 'Medium', date: 'Mar 2026', title: 'Atlassian Off-Campus — Frontend Role', content: 'Applied off-campus through their careers page. The process was well-structured: online coding test, 2 technical interviews, and a values interview. Frontend-specific questions on React hooks, state management, and accessibility. They care a lot about code quality and component design. The values interview was about how you handle conflict and collaboration.', tips: ['Know React deeply — hooks, context, performance optimization', 'Accessibility questions are important at Atlassian', 'Show your design sensibility — they love frontend engineers who care about UX', 'The values interview matters as much as technical rounds'], likes: 112, comments: 18, liked: false, bookmarked: false },
  { id: 'ie6', author: 'Vikram Patel', avatar: avatar('Vikram'), branch: 'CSE', company: 'Polygon', logo: '🔺', role: 'Blockchain Developer', type: 'Off-campus', result: 'Selected', rounds: 3, difficulty: 'Hard', date: 'Feb 2026', title: 'Polygon Blockchain Dev — Web3 Interview Experience', content: 'Found the opening through a Web3 Discord community. First round was Solidity basics — smart contract security, gas optimization. Second round was a live coding session building a simple ERC-20 token. Third round was system design for a DeFi protocol. They really tested my understanding of blockchain fundamentals, not just syntax.', tips: ['Understand smart contract security — reentrancy, overflow, access control', 'Gas optimization is a big deal — know your patterns', 'Build and deploy your own contracts before interviewing', 'Join Web3 communities — that\'s where the opportunities are'], likes: 95, comments: 9, liked: false, bookmarked: false },
];

export const projects: ProjectListing[] = [
  { id: 'pr1', title: 'AI-Powered Study Companion', creator: 'Aarav Sharma', avatar: avatar('Aarav'), roles: ['ML Engineer', 'Frontend Developer'], members: 2, maxMembers: 4, tags: ['AI', 'React', 'Python'], status: 'recruiting', description: 'Building an AI assistant that summarizes notes and generates practice questions from course material.' },
  { id: 'pr2', title: 'Campus Navigation AR App', creator: 'Rohan Gupta', avatar: avatar('Rohan'), roles: ['Designer', 'Mobile Developer'], members: 1, maxMembers: 3, tags: ['AR', 'Flutter', 'UX'], status: 'recruiting', description: 'AR-based indoor navigation app to help freshers find their way around campus.' },
  { id: 'pr3', title: 'Blockchain Certificate Verifier', creator: 'Sneha Reddy', avatar: avatar('Sneha'), roles: ['Backend Developer', 'Blockchain Dev'], members: 3, maxMembers: 4, tags: ['Blockchain', 'Solidity', 'Web3'], status: 'recruiting', description: 'A system to issue and verify academic certificates on the blockchain.' },
  { id: 'pr4', title: 'Smart Hostel Energy Monitor', creator: 'Karthik Nair', avatar: avatar('Karthik'), roles: ['IoT Engineer', 'ML Engineer'], members: 4, maxMembers: 4, tags: ['IoT', 'ML', 'Sustainability'], status: 'full', description: 'IoT-based energy monitoring and optimization system for hostel buildings.' },
];

export const marketListings: MarketListing[] = [
  { id: 'ml1', title: 'Data Structures Textbook (Good condition)', price: 350, category: 'Books', seller: 'Sneha Reddy', image: '📚', condition: 'Good', negotiable: true },
  { id: 'ml2', title: 'HP Scientific Calculator', price: 800, category: 'Electronics', seller: 'Rohan Gupta', image: '🧮', condition: 'Like New', negotiable: false },
  { id: 'ml3', title: 'Atlas Cycle — 1 year old', price: 2500, category: 'Cycles', seller: 'Karthik Nair', image: '🚲', condition: 'Good', negotiable: true },
  { id: 'ml4', title: 'Study Lamp + Desk Organizer', price: 600, category: 'Hostel Items', seller: 'Priya Verma', image: '💡', condition: 'Like New', negotiable: true },
  { id: 'ml5', title: 'Dell Laptop Stand (Adjustable)', price: 1200, category: 'Electronics', seller: 'Ananya Singh', image: '💻', condition: 'New', negotiable: false },
  { id: 'ml6', title: 'Engineering Drawing Set', price: 250, category: 'Books', seller: 'Karthik Nair', image: '📐', condition: 'Fair', negotiable: true },
];

export const events: EventItem[] = [
  { id: 'e1', title: 'Smart India Hackathon 2026', date: 'Jul 20', time: '09:00 AM', venue: 'Auditorium', category: 'Hackathon', attendees: 240, rsvped: true, organizer: 'Coding Club' },
  { id: 'e2', title: 'Tech Talk: Future of AI', date: 'Jul 18', time: '04:00 PM', venue: 'Seminar Hall A', category: 'Talk', attendees: 120, rsvped: false, organizer: 'AI Society' },
  { id: 'e3', title: 'Inter-College Coding Contest', date: 'Jul 25', time: '10:00 AM', venue: 'Computer Lab 3', category: 'Competition', attendees: 85, rsvped: false, organizer: 'Coding Club' },
  { id: 'e4', title: 'Cultural Night — Rangmanch', date: 'Aug 02', time: '06:00 PM', venue: 'Open Air Theatre', category: 'Cultural', attendees: 500, rsvped: true, organizer: 'Cultural Society' },
  { id: 'e5', title: 'Resume Building Workshop', date: 'Jul 22', time: '02:00 PM', venue: 'Room B-201', category: 'Workshop', attendees: 65, rsvped: false, organizer: 'Placement Cell' },
];

export const clubs: Club[] = [
  { id: 'cl1', name: 'Coding Club', category: 'Technology', members: 340, icon: 'Code2', color: 'brand', description: 'Competitive programming, contests, and tech discussions.', recruiting: true },
  { id: 'cl2', name: 'AI Society', category: 'Technology', members: 180, icon: 'BrainCircuit', color: 'accent', description: 'Exploring AI/ML through projects and research.', recruiting: true },
  { id: 'cl3', name: 'Cultural Society', category: 'Arts', members: 220, icon: 'Palette', color: 'rose', description: 'Music, dance, drama — the creative heartbeat of campus.', recruiting: false },
  { id: 'cl4', name: 'Robotics Club', category: 'Technology', members: 95, icon: 'Bot', color: 'mint', description: 'Building robots and competing in national events.', recruiting: true },
  { id: 'cl5', name: 'Debate Society', category: 'Academic', members: 130, icon: 'MessageSquare', color: 'brand', description: 'Sharpen your arguments and public speaking.', recruiting: false },
  { id: 'cl6', name: 'Photography Club', category: 'Arts', members: 160, icon: 'Camera', color: 'accent', description: 'Capture moments, learn techniques, showcase work.', recruiting: true },
];

export const lostFoundItems: LostFoundItem[] = [
  { id: 'lf1', title: 'Black Wallet', type: 'lost', location: 'Library, 2nd floor', date: 'Jul 12', reward: '₹200', image: '👛', description: 'Black leather wallet with ID card inside. Lost near the reading section.' },
  { id: 'lf2', title: 'Scientific Calculator', type: 'found', location: 'Room A-301', date: 'Jul 13', image: '🧮', description: 'Found a Casio fx-991MS calculator after OS class. Claim at the front desk.' },
  { id: 'lf3', title: 'Blue Water Bottle', type: 'lost', location: 'Sports Complex', date: 'Jul 11', image: '🍶', description: 'Milton blue water bottle, has a sticker of a cat on it.' },
  { id: 'lf4', title: 'OnePlus Earbuds', type: 'found', location: 'Canteen', date: 'Jul 14', image: '🎧', description: 'Found OnePlus Nord earbuds near the canteen counter. Describe to claim.' },
];

export const notifications: Notification[] = [
  { id: 'n1', type: 'like', content: 'Sneha Reddy liked your post about DSA patterns', time: '5m', read: false },
  { id: 'n2', type: 'comment', content: 'Priya Verma commented on your resource upload', time: '20m', read: false },
  { id: 'n3', type: 'placement', content: 'Google internship deadline is in 3 days', time: '1h', read: false },
  { id: 'n4', type: 'mention', content: 'Rohan Gupta mentioned you in #data-structures', time: '2h', read: true },
  { id: 'n5', type: 'deadline', content: 'DBMS Assignment 4 due tomorrow', time: '3h', read: true },
  { id: 'n6', type: 'event', content: 'Smart India Hackathon starts in 6 days', time: '5h', read: true },
  { id: 'n7', type: 'system', content: 'Your resource hit 100 downloads! +50 XP earned', time: '1d', read: true },
];

export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Sneha Reddy', avatar: avatar('Sneha'), branch: 'CSE', xp: 9100, level: 13, streak: 31, badge: '👑' },
  { rank: 2, name: 'Aarav Sharma', avatar: avatar('Aarav'), branch: 'CSE', xp: 8450, level: 12, streak: 23, badge: '🥈' },
  { rank: 3, name: 'Ananya Singh', avatar: avatar('Ananya'), branch: 'CSE', xp: 7800, level: 11, streak: 12, badge: '🥉' },
  { rank: 4, name: 'Priya Verma', avatar: avatar('Priya'), branch: 'CSE', xp: 7200, level: 10, streak: 15, badge: '' },
  { rank: 5, name: 'Rohan Gupta', avatar: avatar('Rohan'), branch: 'ECE', xp: 6800, level: 9, streak: 8, badge: '' },
  { rank: 6, name: 'Karthik Nair', avatar: avatar('Karthik'), branch: 'ME', xp: 5400, level: 8, streak: 5, badge: '' },
];

export const stats = [
  { label: 'Active Students', value: '4,200+', icon: 'Users' },
  { label: 'Resources Shared', value: '12,800+', icon: 'FileText' },
  { label: 'Doubts Solved', value: '9,400+', icon: 'HelpCircle' },
  { label: 'Projects Built', value: '1,200+', icon: 'Rocket' },
];

export const features = [
  { icon: 'MessageSquare', title: 'Community Feed', desc: 'Share achievements, ask questions, and collaborate with peers across campus.' },
  { icon: 'FolderOpen', title: 'Resources Library', desc: 'Branch-wise notes, PYQs, assignments, and code — all organized and searchable.' },
  { icon: 'MessagesSquare', title: 'Real-time Chat', desc: 'Discord-like channels for subjects, branches, hostels, and clubs.' },
  { icon: 'HelpCircle', title: 'Doubt Solving', desc: 'Stack Overflow-style Q&A with accepted answers, votes, and tags.' },
  { icon: 'Briefcase', title: 'Placement Portal', desc: 'Latest placements, internships, interview experiences, and resume reviews.' },
  { icon: 'Rocket', title: 'Project Finder', desc: 'Find teammates for hackathons, projects, and startups by role.' },
  { icon: 'ShoppingBag', title: 'Marketplace', desc: 'Buy and sell books, electronics, cycles, and hostel essentials.' },
  { icon: 'Search', title: 'Universal Search', desc: 'One search bar for students, resources, posts, events, and more.' },
  { icon: 'Trophy', title: 'Gamification', desc: 'Earn XP, level up, unlock badges, and climb the leaderboard.' },
  { icon: 'Calendar', title: 'Smart Calendar', desc: 'Track assignments, events, deadlines, and classes in one view.' },
  { icon: 'Bot', title: 'AI Assistant', desc: 'Summarize notes, generate PYQs, analyze resumes, and prep for interviews.' },
  { icon: 'Bell', title: 'Notifications', desc: 'GitHub-style alerts for likes, comments, mentions, and deadlines.' },
];

export const testimonials = [
  { name: 'Aditya Kumar', role: 'CSE, 2025', avatar: avatar('Aditya'), text: 'CollegeConnect changed how I study. The resources library alone saved me countless hours before exams.', rating: 5 },
  { name: 'Riya Malhotra', role: 'ECE, 2024', avatar: avatar('Riya'), text: 'Found my hackathon team here in 10 minutes. We won 2nd place. The project finder is incredible.', rating: 5 },
  { name: 'Vikram Joshi', role: 'CSE, 2025', avatar: avatar('Vikram'), text: 'The doubt-solving forum is better than Stack Overflow for university subjects. Got answers in minutes.', rating: 5 },
  { name: 'Pooja Iyer', role: 'ME, 2023', avatar: avatar('Pooja'), text: 'Got my internship through the placement portal. The interview experiences shared by seniors were gold.', rating: 5 },
];

export const faqs = [
  { q: 'Who can use CollegeConnect?', a: 'Only verified students of KR Mangalam University with a valid university email can join. The platform is exclusive to our campus community.' },
  { q: 'Is CollegeConnect free?', a: 'Yes, completely free for all KR Mangalam University students. No hidden charges, no premium tiers.' },
  { q: 'How do I verify my student status?', a: 'Sign up with your university email (@krmu.edu.in). You will receive a verification link to activate your account.' },
  { q: 'Can I post anonymously?', a: 'Yes, the chat supports an anonymous mode. However, community feed posts require your identity to maintain accountability.' },
  { q: 'How does the gamification system work?', a: 'You earn XP for posting, sharing resources, answering doubts, and maintaining a daily streak. Level up to unlock badges and climb the leaderboard.' },
  { q: 'Is my data safe?', a: 'Absolutely. All data is encrypted and stored securely. You control your profile visibility and can adjust privacy settings anytime.' },
];

export const roadmap = [
  { quarter: 'Q1 2026', title: 'Launch', desc: 'Core platform: feed, resources, chat, doubts, and dashboard.', status: 'done' },
  { quarter: 'Q2 2026', title: 'AI Features', desc: 'AI study assistant, note summarizer, PYQ generator, and resume analyzer.', status: 'progress' },
  { quarter: 'Q3 2026', title: 'Alumni Network', desc: 'Verified alumni connections, mentorship, and referral requests.', status: 'planned' },
  { quarter: 'Q4 2026', title: 'Mobile App', desc: 'Native iOS and Android apps with offline support and push notifications.', status: 'planned' },
];
