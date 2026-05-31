export type EventCategory =
  | 'marathon'
  | 'hiit-challenge'
  | 'yoga-retreat'
  | 'nutrition-workshop'
  | 'strength-competition'
  | 'cycling-event';

export const EVENT_CATEGORY_LABELS: Record<EventCategory, string> = {
  'marathon': 'Marathon',
  'hiit-challenge': 'HIIT Challenge',
  'yoga-retreat': 'Yoga Retreat',
  'nutrition-workshop': 'Nutrition Workshop',
  'strength-competition': 'Strength Competition',
  'cycling-event': 'Cycling Event',
};

export type EventStatus = 'upcoming' | 'ongoing' | 'sold-out' | 'completed';

export interface EventSpeaker {
  name: string;
  role: string;
  avatarUrl: string;
}

export interface FitEvent {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  category: EventCategory;
  status: EventStatus;
  bannerImage: string;
  date: string;
  time: string;
  location: string;
  address?: string;
  price: number;
  originalPrice?: number;
  totalSlots: number;
  registeredCount: number;
  tags: string[];
  speakers?: EventSpeaker[];
  highlights: string[];
  isFeatured?: boolean;
  isNew?: boolean;
  createdAt: string;
}

export interface RegistrationFormData {
  name: string;
  email: string;
  phone: string;
}

export interface EventTicket {
  ticketId: string;
  eventId: string;
  eventSlug: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  bannerImage: string;
  attendeeName: string;
  attendeeEmail: string;
  registeredAt: string;
  qrValue: string;
}

export interface EventFilterParams {
  category?: string;
  status?: string;
}
