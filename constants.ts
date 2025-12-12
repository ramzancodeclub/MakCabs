import { Service, Vehicle, TeamMember, FAQItem, PricingConfig } from './types';

export const COMPANY_INFO = {
  name: "Mak Cabs",
  tagline: "Ride with Comfort and Care.",
  description: "Safe, reliable rides — on demand or pre-booked. 24/7 support and professional drivers.",
  intro: "Mak Cabs delivers comfortable, secure and punctual transport for individuals and businesses. We operate 24/7, with trained drivers, transparent fares, and easy online booking.",
  phone: "+1 555-0123-4567", // Placeholder
  email: "support@makcabs.com",
  address: "123 Transit Way, Business District", // Placeholder
  license: "LIC-2025-XXXX", // Placeholder
  socialPhones: ["+27 65 533 4396", "+966 56 874 6890"],
  foundedYear: 2019
};

export const SERVICES: Service[] = [
  { id: 'airport', title: 'Airport Transfers', description: 'Guaranteed pickup, flight tracking, meet & greet.', iconName: 'Plane' },
  { id: 'hourly', title: 'Hourly Hire', description: 'Flexible hourly bookings for meetings, events and errands.', iconName: 'Clock' },
  { id: 'point', title: 'Point-to-Point', description: 'Fast, direct rides around the clock.', iconName: 'MapPin' },
  { id: 'group', title: 'Group & Special Events', description: 'Vans and multi-vehicle coordination for groups.', iconName: 'Users' },
  { id: 'corporate', title: 'Corporate Accounts', description: 'Central billing, priority pickups, monthly invoicing.', iconName: 'Briefcase' },
  { id: 'access', title: 'Accessibility Support', description: 'Assistance & vehicles adapted for passengers with reduced mobility.', iconName: 'Accessibility' },
];

export const FLEET: Vehicle[] = [
  {
    id: 'economy',
    name: 'Economy Sedan',
    capacity: 4,
    luggage: 2,
    basePrice: 15,
    category: 'economy',
    features: ['A/C', 'Fabric Seats', 'USB Charging'],
    image: 'https://picsum.photos/id/111/1024/768' // Placeholder car
  },
  {
    id: 'comfort',
    name: 'Comfort Sedan',
    capacity: 4,
    luggage: 3,
    basePrice: 20,
    category: 'comfort',
    features: ['A/C', 'Bottled Water', 'Extra Legroom', 'Leather Seats'],
    image: 'https://picsum.photos/id/183/1024/768'
  },
  {
    id: 'van',
    name: 'Van / Group',
    capacity: 8,
    luggage: 6,
    basePrice: 35,
    category: 'van',
    features: ['Large Luggage Area', 'Dual A/C', 'Ideal for Groups'],
    image: 'https://picsum.photos/id/133/1024/768'
  },
  {
    id: 'exec',
    name: 'Executive / SUV',
    capacity: 4,
    luggage: 4,
    basePrice: 45,
    category: 'executive',
    features: ['Leather Interior', 'Privacy Glass', 'Premium Audio', 'VIP Service'],
    image: 'https://picsum.photos/id/655/1024/768'
  }
];

export const PRICING_DEFAULTS: PricingConfig = {
  baseFare: 2.50,
  perKm: 0.90,
  waitingTime: 0.40,
  airportSurcharge: 5.00,
  currency: 'USD'
};

export const TEAM: TeamMember[] = [
  {
    id: 'ceo',
    name: "Alex Mercer",
    role: "CEO & Founder",
    bio: "Driving the vision of safe, reliable transport since 2019. Focused on customer satisfaction and technological innovation in the taxi industry.",
    image: "https://picsum.photos/id/64/300/300"
  },
  {
    id: 'ops',
    name: "Sarah Johnson",
    role: "Operations Manager",
    bio: "Ensures our fleet runs like clockwork 24/7. Expert in logistics and fleet maintenance with over 10 years of experience.",
    image: "https://picsum.photos/id/65/300/300"
  },
  {
    id: 'safety',
    name: "David Chen",
    role: "Head of Safety",
    bio: "Responsible for driver vetting, training programs, and vehicle safety protocols. Safety is not just a policy, it's our promise.",
    image: "https://picsum.photos/id/91/300/300"
  }
];

export const FAQS: FAQItem[] = [
  { question: "How do I book an airport transfer?", answer: "You can book online via our 'Book a Ride' button, selecting 'Airport Transfer' as the service type. Please provide your flight number for tracking." },
  { question: "Can I request child seats?", answer: "Yes, please select the child seat option in the 'Special Instructions' field when booking. Subject to availability." },
  { question: "What payment methods do you accept?", answer: "We accept Cash, EFT, Credit/Debit Cards, Apple Pay, and Google Pay." },
  { question: "Are your prices fixed or metered?", answer: "We offer fixed quotes for pre-booked transfers and metered rates for on-demand hailing. Use our calculator for an estimate." },
  { question: "What happens if my flight is delayed?", answer: "We monitor flight arrivals. If you provided a flight number, we adjust the pickup time automatically at no extra cost for reasonable delays." },
  { question: "Do you offer corporate accounts?", answer: "Yes! Corporate accounts benefit from monthly invoicing and priority booking. Contact us to set one up." },
  { question: "Is there a cancellation fee?", answer: "Cancellations made more than 2 hours before pickup are free. Late cancellations may incur a base fee charge." },
  { question: "Are pets allowed?", answer: "Small pets in carriers are welcome. Please mention this in 'Special Instructions' so we can dispatch a suitable vehicle." }
];

export const TIMELINE = [
  { year: "2019", title: "Founded", desc: "Started with a mission to solve local punctuality issues." },
  { year: "2021", title: "App Launched", desc: "Introduced mobile booking for easier access." },
  { year: "2023", title: "Fleet Expansion", desc: "Added executive SUVs and group vans." },
  { year: "2024", title: "Corporate Partnerships", desc: "Trusted by 50+ local businesses." }
];
