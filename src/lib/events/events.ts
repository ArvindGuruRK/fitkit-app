import type { FitEvent, EventTicket, EventFilterParams } from './types';

export const MOCK_EVENTS: FitEvent[] = [
  {
    id: 'evt-001',
    slug: 'mumbai-marathon-2026',
    title: 'Mumbai Marathon 2026',
    shortDescription: 'Run through the heart of Mumbai in the most iconic marathon of the year.',
    description:
      'Join thousands of runners in the spectacular Mumbai Marathon 2026. The route winds through iconic landmarks including the Gateway of India, Marine Drive, and Bandra-Worli Sea Link. Whether you\'re a first-timer targeting the 5K fun run or an elite athlete chasing a personal best in the full 42.2K, there\'s a category for every level. Professional timing chips, hydration stations every 2.5km, medical support, and a finisher medal await every participant. Post-race recovery zone with physiotherapy and nutrition support included.',
    category: 'marathon',
    status: 'upcoming',
    bannerImage: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200',
    date: '2026-07-19',
    time: '05:30 AM – 12:00 PM IST',
    location: 'Chhatrapati Shivaji Maharaj Terminus, Mumbai',
    address: 'CST Road, Fort, Mumbai, Maharashtra 400001',
    price: 1500,
    originalPrice: 2000,
    totalSlots: 5000,
    registeredCount: 4200,
    tags: ['running', 'marathon', 'outdoor', 'cardio'],
    highlights: [
      'Professional timing chip included',
      'Finisher medal for all categories',
      'Hydration stations every 2.5km',
      'Medical support throughout the route',
      'Post-race recovery zone with physiotherapy',
      'Official race t-shirt',
    ],
    isFeatured: true,
    createdAt: '2026-03-01',
  },
  {
    id: 'evt-002',
    slug: 'hiit-beast-mode-challenge',
    title: 'HIIT Beast Mode Challenge',
    shortDescription: 'Push your limits in a 60-minute all-out HIIT battle with India\'s top coaches.',
    description:
      'The HIIT Beast Mode Challenge is a high-octane 60-minute session designed to torch calories and build functional strength. Led by a team of certified coaches, this group workout cycles through 8 exercise stations covering burpees, kettlebell swings, battle ropes, box jumps, and more. Each round is timed to the beat of curated pump music. Suitable for intermediate and advanced fitness enthusiasts. Modifications available. All equipment provided.',
    category: 'hiit-challenge',
    status: 'upcoming',
    bannerImage: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=1200',
    date: '2026-06-28',
    time: '07:00 AM – 08:30 AM IST',
    location: 'FitKit Arena, Koramangala, Bengaluru',
    address: '7th Block, Koramangala, Bengaluru, Karnataka 560095',
    price: 599,
    totalSlots: 40,
    registeredCount: 32,
    tags: ['hiit', 'group-training', 'cardio', 'strength'],
    highlights: [
      '60-minute coached HIIT circuit',
      'All equipment provided (kettlebells, battle ropes, boxes)',
      'Energy drink and protein bar included',
      'Progress tracking with heart-rate monitors',
    ],
    isFeatured: true,
    isNew: true,
    createdAt: '2026-05-10',
  },
  {
    id: 'evt-003',
    slug: 'himalayan-yoga-retreat-2026',
    title: 'Himalayan Yoga Retreat 2026',
    shortDescription: 'Three days of transformative yoga and mindfulness in the serene Himalayan foothills.',
    description:
      'Escape the city and immerse yourself in three days of restorative yoga, pranayama, and guided meditation at our Himalayan retreat centre. Morning sessions begin at sunrise with dynamic vinyasa flow, followed by mindful hatha yoga in the afternoon and restorative yin yoga in the evening. Vegetarian meals, accommodation in eco-cottages, nature walks, and one-on-one sessions with master instructors are included. Limited to 25 participants for an intimate experience.',
    category: 'yoga-retreat',
    status: 'upcoming',
    bannerImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200',
    date: '2026-08-07',
    time: '08:00 AM Day 1 – 04:00 PM Day 3',
    location: 'Rishikesh Wellness Centre, Uttarakhand',
    address: 'Laxman Jhula Road, Rishikesh, Uttarakhand 249302',
    price: 12500,
    originalPrice: 15000,
    totalSlots: 25,
    registeredCount: 18,
    tags: ['yoga', 'wellness', 'retreat', 'mindfulness'],
    speakers: [
      {
        name: 'Swami Arjun Dev',
        role: 'Master Yoga Instructor, 30 years experience',
        avatarUrl: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=200',
      },
      {
        name: 'Priya Sharma',
        role: 'Certified Pranayama & Meditation Coach',
        avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
      },
    ],
    highlights: [
      '3 days / 2 nights in eco-cottages',
      'All vegetarian meals included (6 per day)',
      'Daily sunrise yoga and sunset meditation',
      'One-on-one session with a master instructor',
      'Nature walks in the Himalayan foothills',
      'Yoga props and equipment provided',
    ],
    createdAt: '2026-04-15',
  },
  {
    id: 'evt-004',
    slug: 'sports-nutrition-masterclass',
    title: 'Sports Nutrition Masterclass',
    shortDescription: 'Free workshop with registered dietitians on fueling performance and recovery.',
    description:
      'A comprehensive 3-hour online masterclass covering the science of sports nutrition. Learn from registered sports dietitians how to optimise macronutrient timing, choose evidence-based supplements, manage hydration, and design a nutrition plan for your specific goals — whether it\'s fat loss, muscle gain, or endurance performance. Includes a live Q&A session and access to downloadable meal plan templates.',
    category: 'nutrition-workshop',
    status: 'upcoming',
    bannerImage: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200',
    date: '2026-06-21',
    time: '10:00 AM – 01:00 PM IST',
    location: 'Online (Zoom)',
    price: 0,
    totalSlots: 500,
    registeredCount: 312,
    tags: ['nutrition', 'online', 'education', 'free'],
    speakers: [
      {
        name: 'Dr. Kavitha Nair',
        role: 'Registered Sports Dietitian, AIIMS Graduate',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
      },
      {
        name: 'Rahul Mehta',
        role: 'Certified Strength & Conditioning Specialist',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
      },
    ],
    highlights: [
      'Free to attend — no registration fee',
      'Live Q&A with registered dietitians',
      'Downloadable meal plan templates',
      'Certificate of participation',
      'Recording available for 30 days post-event',
    ],
    createdAt: '2026-05-01',
  },
  {
    id: 'evt-005',
    slug: 'iron-warrior-strength-championship',
    title: 'Iron Warrior Strength Championship',
    shortDescription: 'Compete in deadlift, squat, and bench press across 8 weight categories.',
    description:
      'The Iron Warrior Strength Championship is a sanctioned powerlifting meet open to lifters of all experience levels. Compete across three lifts — squat, bench press, and deadlift — in 8 bodyweight categories for both men and women. IPF-standard judging, calibrated plates, competition-spec powerlifting bars, and a detailed briefing session for first-time competitors. Trophies for top 3 in each category, and overall best lifter awards.',
    category: 'strength-competition',
    status: 'upcoming',
    bannerImage: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=1200',
    date: '2026-07-05',
    time: '08:00 AM – 06:00 PM IST',
    location: 'Iron House Gym, Andheri West, Mumbai',
    address: '4 Veera Industrial Estate, Andheri West, Mumbai 400053',
    price: 2500,
    totalSlots: 120,
    registeredCount: 87,
    tags: ['powerlifting', 'competition', 'strength', 'weightlifting'],
    highlights: [
      'IPF-standard judging panel',
      'Calibrated competition plates and bars',
      'All attempts tracked digitally',
      'Trophies for top 3 per category',
      'First-timer briefing session included',
      'Weigh-ins the evening before',
    ],
    createdAt: '2026-04-20',
  },
  {
    id: 'evt-006',
    slug: 'tour-de-fitness-cycling-gran-fondo',
    title: 'Tour de Fitness — Cycling Gran Fondo',
    shortDescription: 'A scenic 120km Gran Fondo through the Western Ghats for all cycling enthusiasts.',
    description:
      'The Tour de Fitness Gran Fondo takes you on a breathtaking 120km route through the lush Western Ghats. This non-competitive ride is about experiencing the joy of cycling in nature — expect stunning valley views, well-marked routes, SAG wagons every 20km, mechanical support, and a grand feast at the finish. Road bikes, gravel bikes, and hybrid bikes all welcome. Helmets mandatory.',
    category: 'cycling-event',
    status: 'upcoming',
    bannerImage: 'https://images.unsplash.com/photo-1544191696-102dbeb9c16a?w=1200',
    date: '2026-08-22',
    time: '06:00 AM – 02:00 PM IST',
    location: 'Start: Lavasa, End: Tamhini Ghat, Maharashtra',
    price: 1800,
    totalSlots: 200,
    registeredCount: 145,
    tags: ['cycling', 'outdoor', 'gran-fondo', 'endurance'],
    highlights: [
      '120km scenic Western Ghats route',
      'SAG wagons and mechanical support every 20km',
      'GPS route file and cue sheets provided',
      'Banana and electrolyte stations en route',
      'Grand feast at the finish line',
      'Finisher certificate and jersey',
    ],
    createdAt: '2026-04-28',
  },
  {
    id: 'evt-007',
    slug: 'crossfit-open-box-battles',
    title: 'CrossFit Open Box Battles',
    shortDescription: 'Team-based CrossFit competition with WODs across 5 rounds.',
    description:
      'Box Battles is a team-format CrossFit competition where teams of three tackle five demanding WODs over the course of a single day. Movements include Olympic lifts, gymnastics, and monostructural cardio. Scaled and RX divisions available. Top 3 teams in each division win cash prizes. Spectators welcome — bring your crew!',
    category: 'hiit-challenge',
    status: 'sold-out',
    bannerImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200',
    date: '2026-06-14',
    time: '08:00 AM – 05:00 PM IST',
    location: 'CrossFit Invictus, Indiranagar, Bengaluru',
    price: 3000,
    totalSlots: 60,
    registeredCount: 60,
    tags: ['crossfit', 'team', 'competition', 'wod'],
    highlights: [
      'Team of 3 format (RX and Scaled divisions)',
      '5 varied WODs across the day',
      'Cash prizes for top 3 teams',
      'Judges for every team',
    ],
    createdAt: '2026-03-15',
  },
  {
    id: 'evt-008',
    slug: 'sunrise-beach-yoga-series',
    title: 'Sunrise Beach Yoga Series',
    shortDescription: 'Weekly outdoor yoga sessions at Juhu Beach — open to all levels.',
    description:
      'Start your weekend right with a 75-minute outdoor yoga class on the sand as the sun rises over the Arabian Sea. A certified yoga instructor guides participants through a sun salutation sequence, balance postures, breathwork, and a 10-minute guided relaxation. Mats provided. Zero experience needed.',
    category: 'yoga-retreat',
    status: 'upcoming',
    bannerImage: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=1200',
    date: '2026-06-28',
    time: '06:00 AM – 07:15 AM IST',
    location: 'Juhu Beach, Mumbai (North End)',
    price: 299,
    totalSlots: 30,
    registeredCount: 21,
    tags: ['yoga', 'outdoor', 'beginner-friendly', 'wellness'],
    highlights: [
      'Yoga mats and blocks provided',
      'Suitable for complete beginners',
      'Breathtaking sunrise views',
      'Post-session coconut water refreshment',
    ],
    createdAt: '2026-05-20',
  },
  {
    id: 'evt-009',
    slug: 'muscle-building-nutrition-bootcamp',
    title: 'Muscle Building & Nutrition Bootcamp',
    shortDescription: 'A full-day immersive bootcamp combining training and nutrition coaching.',
    description:
      'A comprehensive full-day bootcamp designed for anyone serious about building lean muscle mass. The morning session covers progressive overload training theory and a practical lifting workshop. The afternoon focuses on sports nutrition — macros, meal timing, and supplement protocols — with a hands-on meal prep session. Includes all meals, training materials, and a personalised 4-week training plan.',
    category: 'nutrition-workshop',
    status: 'upcoming',
    bannerImage: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200',
    date: '2026-07-12',
    time: '09:00 AM – 05:00 PM IST',
    location: 'FitKit Performance Centre, Powai, Mumbai',
    price: 4500,
    originalPrice: 6000,
    totalSlots: 20,
    registeredCount: 14,
    tags: ['nutrition', 'strength', 'muscle-building', 'workshop'],
    speakers: [
      {
        name: 'Coach Arjun Singh',
        role: 'Strength & Hypertrophy Coach, 12 years experience',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      },
    ],
    highlights: [
      'Full-day hands-on training and nutrition workshop',
      'All meals and snacks included',
      'Personalised 4-week hypertrophy program',
      'Supplement guide and shopping list',
      'Practical meal prep session',
    ],
    isNew: true,
    createdAt: '2026-05-25',
  },
  {
    id: 'evt-010',
    slug: 'veloscapes-fixed-gear-criterium',
    title: 'Veloscapes Fixed Gear Criterium',
    shortDescription: 'High-speed criterium race for fixed-gear and single-speed bikes in an urban circuit.',
    description:
      'Veloscapes is an urban fixed-gear criterium set on a 1.2km closed city circuit. Multiple heats lead to a knockout final. Categories for men, women, and juniors. Cash prizes for top 3 finishers. Spectators encouraged — the circuit is designed for maximum viewing. Bike inspection and safety briefing mandatory for all participants.',
    category: 'cycling-event',
    status: 'upcoming',
    bannerImage: 'https://images.unsplash.com/photo-1501147830916-ce44a6359892?w=1200',
    date: '2026-09-05',
    time: '04:00 PM – 09:00 PM IST',
    location: 'BKC Exhibition Ground, Bandra Kurla Complex, Mumbai',
    price: 800,
    totalSlots: 80,
    registeredCount: 34,
    tags: ['cycling', 'criterium', 'urban', 'fixed-gear'],
    highlights: [
      '1.2km closed urban circuit',
      'Multiple qualifying heats + finals',
      'Cash prizes for top 3 per category',
      'Bike safety inspection included',
      'Live DJ and spectator zone',
    ],
    createdAt: '2026-05-18',
  },
];

export const MOCK_USER_TICKETS: EventTicket[] = [
  {
    ticketId: 'TKT-2026-001',
    eventId: 'evt-002',
    eventSlug: 'hiit-beast-mode-challenge',
    eventTitle: 'HIIT Beast Mode Challenge',
    eventDate: '2026-06-28',
    eventTime: '07:00 AM – 08:30 AM IST',
    eventLocation: 'FitKit Arena, Koramangala, Bengaluru',
    bannerImage: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=1200',
    attendeeName: 'Alex Johnson',
    attendeeEmail: 'alex.johnson@example.com',
    registeredAt: '2026-05-15T10:23:00Z',
    qrValue: 'TKT-2026-001|evt-002',
  },
  {
    ticketId: 'TKT-2026-002',
    eventId: 'evt-004',
    eventSlug: 'sports-nutrition-masterclass',
    eventTitle: 'Sports Nutrition Masterclass',
    eventDate: '2026-06-21',
    eventTime: '10:00 AM – 01:00 PM IST',
    eventLocation: 'Online (Zoom)',
    bannerImage: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200',
    attendeeName: 'Alex Johnson',
    attendeeEmail: 'alex.johnson@example.com',
    registeredAt: '2026-05-20T14:05:00Z',
    qrValue: 'TKT-2026-002|evt-004',
  },
  {
    ticketId: 'TKT-2026-003',
    eventId: 'evt-001',
    eventSlug: 'mumbai-marathon-2026',
    eventTitle: 'Mumbai Marathon 2026',
    eventDate: '2026-07-19',
    eventTime: '05:30 AM – 12:00 PM IST',
    eventLocation: 'Chhatrapati Shivaji Maharaj Terminus, Mumbai',
    bannerImage: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200',
    attendeeName: 'Alex Johnson',
    attendeeEmail: 'alex.johnson@example.com',
    registeredAt: '2026-05-28T09:00:00Z',
    qrValue: 'TKT-2026-003|evt-001',
  },
];

export function getAllEvents(): FitEvent[] {
  return MOCK_EVENTS;
}

export function getEventBySlug(slug: string): FitEvent | undefined {
  return MOCK_EVENTS.find((e) => e.slug === slug);
}

export function getFeaturedEvents(): FitEvent[] {
  return MOCK_EVENTS.filter((e) => e.isFeatured);
}

export function getUpcomingEvents(limit?: number): FitEvent[] {
  const upcoming = MOCK_EVENTS.filter((e) => e.status === 'upcoming');
  return limit ? upcoming.slice(0, limit) : upcoming;
}

export function filterEvents({ category, status }: { category?: string; status?: string }): FitEvent[] {
  return MOCK_EVENTS.filter((e) => {
    if (category && e.category !== category) return false;
    if (status && e.status !== status) return false;
    return true;
  });
}

export function getRelatedEvents(event: FitEvent, limit = 3): FitEvent[] {
  return MOCK_EVENTS.filter(
    (e) => e.id !== event.id && e.category === event.category
  ).slice(0, limit);
}
