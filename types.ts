export interface Vehicle {
  id: string;
  name: string;
  capacity: number;
  luggage: number;
  basePrice: number;
  image: string;
  features: string[];
  category: 'economy' | 'comfort' | 'van' | 'executive';
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string; // Placeholder URL
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PricingConfig {
  baseFare: number;
  perKm: number;
  waitingTime: number; // per minute
  airportSurcharge: number;
  currency: 'USD' | 'SAR' | 'ZAR'; // USD, Saudi Riyal, Rand (implied by prompt context)
}

export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  pickupAddress: string;
  destinationAddress: string;
  date: string;
  time: string;
  vehicleType: string;
  flightNumber?: string;
  paymentMethod: string;
  promoCode?: string;
  specialInstructions?: string;
  consent: boolean;
}
