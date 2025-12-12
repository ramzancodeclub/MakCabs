import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { BookingFormData } from '../types';
import { FLEET } from '../constants';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledVehicle?: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, prefilledVehicle }) => {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    email: '',
    phone: '',
    pickupAddress: '',
    destinationAddress: '',
    date: '',
    time: '',
    vehicleType: prefilledVehicle || 'economy',
    flightNumber: '',
    paymentMethod: 'Card',
    promoCode: '',
    specialInstructions: '',
    consent: false
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (prefilledVehicle) {
      setFormData(prev => ({ ...prev, vehicleType: prefilledVehicle }));
    }
  }, [prefilledVehicle]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, consent: e.target.checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) return;

    setStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      // Mock success
      setStatus('success');
      console.log('Booking submitted:', formData);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark/80 backdrop-blur-sm transition-all" aria-modal="true" role="dialog">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center z-10">
          <h2 className="text-2xl font-display font-bold text-dark">Book a Ride</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Close modal">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {status === 'success' ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 text-success rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Booking Received</h3>
              <p className="text-gray-600 mb-6">Thanks — your ride is confirmed. We’ll text you the driver details shortly.</p>
              <button onClick={onClose} className="bg-primary text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Contact Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input required name="fullName" value={formData.fullName} onChange={handleChange} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" placeholder="+1 234 567 8900" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" placeholder="john@example.com" />
              </div>

              {/* Ride Details */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Address *</label>
                  <input required name="pickupAddress" value={formData.pickupAddress} onChange={handleChange} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" placeholder="Airport or Street Address" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Destination Address *</label>
                  <input required name="destinationAddress" value={formData.destinationAddress} onChange={handleChange} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" placeholder="Hotel or Street Address" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                  <input required name="date" value={formData.date} onChange={handleChange} type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
                  <input required name="time" value={formData.time} onChange={handleChange} type="time" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                  <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none bg-white">
                    {FLEET.map(car => (
                      <option key={car.id} value={car.id}>{car.name} (Max {car.capacity})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                  <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none bg-white">
                    <option value="Card">Credit/Debit Card</option>
                    <option value="Cash">Cash to Driver</option>
                    <option value="ApplePay">Apple Pay</option>
                    <option value="GooglePay">Google Pay</option>
                    <option value="EFT">EFT (Corporate)</option>
                  </select>
                </div>
              </div>

              {/* Optional */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Flight Number (Optional)</label>
                  <input name="flightNumber" value={formData.flightNumber} onChange={handleChange} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" placeholder="e.g. XY123" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Promo Code</label>
                  <input name="promoCode" value={formData.promoCode} onChange={handleChange} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" placeholder="Promo Code" />
                </div>
              </div>

              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
                 <textarea name="specialInstructions" value={formData.specialInstructions} onChange={handleChange} rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" placeholder="Child seat needed, gate code, etc."></textarea>
              </div>

              {/* Consent */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <input required type="checkbox" id="consent" checked={formData.consent} onChange={handleCheckboxChange} className="mt-1 w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary" />
                <label htmlFor="consent" className="text-sm text-gray-600">
                  I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>. This site is protected by reCAPTCHA.
                </label>
              </div>

              <button type="submit" disabled={status === 'submitting'} className="w-full bg-primary text-white font-bold py-4 rounded-lg shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                {status === 'submitting' ? <Loader2 className="animate-spin" /> : 'Confirm Booking'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
