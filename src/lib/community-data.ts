export type PostType = 'text' | 'achievement';

export interface Author {
  id: string;
  name: string;
  initials: string;
  level: string;
  avatarColor: string;
}

export interface Comment {
  id: string;
  author: Author;
  content: string;
  timestamp: string;
}

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  description: string;
}

export interface Post {
  id: string;
  author: Author;
  content: string;
  type: PostType;
  achievement?: Achievement;
  image?: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
  tags: string[];
}

export interface CommunityMember {
  id: string;
  name: string;
  initials: string;
  level: string;
  workoutsThisWeek: number;
  avatarColor: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'a1', title: 'First Workout', icon: '🏃', description: 'Completed first workout session' },
  { id: 'a2', title: '7-Day Streak', icon: '🔥', description: 'Worked out 7 days in a row' },
  { id: 'a3', title: 'Personal Record', icon: '💪', description: 'Broke a personal record' },
  { id: 'a4', title: '10K Run', icon: '🏅', description: 'Completed a 10K run' },
  { id: 'a5', title: 'Weight Goal', icon: '⚖️', description: 'Hit a weight milestone' },
  { id: 'a6', title: 'Marathon', icon: '🎽', description: 'Completed a full marathon' },
  { id: 'a7', title: '100 Workouts', icon: '🏆', description: 'Completed 100 total workouts' },
  { id: 'a8', title: 'HIIT Champion', icon: '⚡', description: 'Completed 20 HIIT sessions' },
];

const authors: Author[] = [
  { id: 'u1', name: 'Alex Rivers', initials: 'AR', level: 'Gold Member', avatarColor: 'bg-yellow-600' },
  { id: 'u2', name: 'Jordan Steele', initials: 'JS', level: 'Platinum', avatarColor: 'bg-slate-500' },
  { id: 'u3', name: 'Maya Chen', initials: 'MC', level: 'Silver', avatarColor: 'bg-blue-600' },
  { id: 'u4', name: 'Caleb Brooks', initials: 'CB', level: 'Gold Member', avatarColor: 'bg-amber-600' },
  { id: 'u5', name: 'Priya Nair', initials: 'PN', level: 'Elite', avatarColor: 'bg-purple-600' },
];

export const CURRENT_USER: Author = {
  id: 'current',
  name: 'You',
  initials: 'YO',
  level: 'Gold Member',
  avatarColor: 'bg-primary',
};

export const CURRENT_USER_STATS = {
  posts: 12,
  followers: 48,
  following: 35,
  workouts: 67,
};

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    author: authors[1],
    content:
      '🔥 Just smashed my deadlift PR — 180kg! Six months of grinding paid off. The consistency, the discipline, the early mornings. Nothing beats that feeling when it all clicks. Who else hit a PR this week?',
    type: 'achievement',
    achievement: ACHIEVEMENTS[2],
    likes: 47,
    timestamp: '2m ago',
    tags: ['#Deadlift', '#PR', '#Strength'],
    comments: [
      {
        id: 'c1',
        author: authors[0],
        content: 'Beast mode activated! 🔥 What program are you running?',
        timestamp: '1m ago',
      },
      {
        id: 'c2',
        author: authors[2],
        content: "Incredible! I just hit 100kg myself — you're an inspiration!",
        timestamp: '45s ago',
      },
    ],
  },
  {
    id: 'p2',
    author: authors[4],
    content:
      'Morning run done ✅ 8km in 42 minutes. The sunrise over the park made every step worth it. I love how running clears my head before the day begins. If you haven\'t tried morning runs yet — start tomorrow. You won\'t regret it.',
    type: 'text',
    image: 'https://picsum.photos/seed/run1/800/400',
    likes: 31,
    timestamp: '18m ago',
    tags: ['#MorningRun', '#Cardio', '#Running'],
    comments: [
      {
        id: 'c3',
        author: authors[3],
        content: 'Same! Morning runs are life-changing 🌅',
        timestamp: '10m ago',
      },
    ],
  },
  {
    id: 'p3',
    author: authors[0],
    content:
      'Completed my first full marathon today! 42.2km. I cried at the finish line (not gonna lie 😭). 6 months of training, 3 injuries, and countless doubts — but I made it. Thank you to everyone who cheered me on. You all kept me going.',
    type: 'achievement',
    achievement: ACHIEVEMENTS[5],
    likes: 124,
    timestamp: '1h ago',
    tags: ['#Marathon', '#Running', '#Milestone'],
    comments: [
      {
        id: 'c4',
        author: authors[1],
        content: 'This made my day! Congratulations legend 🏅',
        timestamp: '55m ago',
      },
      {
        id: 'c5',
        author: authors[4],
        content: 'Tears of joy are the best kind. So proud of you!',
        timestamp: '40m ago',
      },
      {
        id: 'c6',
        author: authors[2],
        content: '42km is no joke. You are absolutely incredible! 🎉',
        timestamp: '20m ago',
      },
    ],
  },
  {
    id: 'p4',
    author: authors[2],
    content:
      "Week 4 of my yoga journey 🧘‍♀️ I started because my back was a mess. Now I can touch my toes for the first time in years! The FitKit yoga classes have been incredible — shoutout to the instructors. Flexibility is fitness too!",
    type: 'text',
    likes: 56,
    timestamp: '2h ago',
    tags: ['#Yoga', '#Flexibility', '#Wellness'],
    comments: [
      {
        id: 'c7',
        author: authors[0],
        content: 'Yoga is so underrated for recovery. Keep it up! 🙌',
        timestamp: '1h ago',
      },
    ],
  },
  {
    id: 'p5',
    author: authors[3],
    content:
      "Finally hit my 7-day workout streak! 💪 No excuses, no skipping. Even squeezed in a session during my business trip. If I can do it traveling for work, you can do it at home. Lock in!",
    type: 'achievement',
    achievement: ACHIEVEMENTS[1],
    likes: 38,
    timestamp: '3h ago',
    tags: ['#Streak', '#Consistency', '#Motivation'],
    comments: [],
  },
  {
    id: 'p6',
    author: authors[4],
    content:
      'Post-HIIT recovery smoothie recipe that actually works:\n\n🍌 1 banana\n🍓 Handful of berries\n🥛 250ml oat milk\n🥜 2 tbsp peanut butter\n🍯 1 tsp honey\n\nBlend and down it within 30 mins of training. Your muscles will thank you tomorrow!',
    type: 'text',
    likes: 89,
    timestamp: '4h ago',
    tags: ['#Nutrition', '#Recovery', '#Smoothie'],
    comments: [
      {
        id: 'c8',
        author: authors[2],
        content: 'Adding hemp seeds to this is a game changer btw 🌿',
        timestamp: '3h ago',
      },
      {
        id: 'c9',
        author: authors[1],
        content: 'Saving this! Perfect timing, just finished HIIT 😅',
        timestamp: '2h ago',
      },
    ],
  },
];

export const ACTIVE_MEMBERS: CommunityMember[] = [
  { id: 'u5', name: 'Priya Nair', initials: 'PN', level: 'Elite', workoutsThisWeek: 7, avatarColor: 'bg-purple-600' },
  { id: 'u2', name: 'Jordan Steele', initials: 'JS', level: 'Platinum', workoutsThisWeek: 6, avatarColor: 'bg-slate-500' },
  { id: 'u1', name: 'Alex Rivers', initials: 'AR', level: 'Gold', workoutsThisWeek: 5, avatarColor: 'bg-yellow-600' },
  { id: 'u4', name: 'Caleb Brooks', initials: 'CB', level: 'Gold', workoutsThisWeek: 4, avatarColor: 'bg-amber-600' },
];

export const TRENDING_TAGS = [
  '#HIIT',
  '#StrengthTraining',
  '#MorningWorkout',
  '#Nutrition',
  '#Marathon',
  '#Yoga',
  '#PR',
  '#Cardio',
];
