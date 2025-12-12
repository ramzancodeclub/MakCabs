import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Phone, MapPin, ChevronDown, Star, 
  ShieldCheck, Clock, User, ArrowUp, Facebook, Instagram, Twitter, ArrowRight
} from 'lucide-react';
import { FLEET, SERVICES, TEAM, FAQS, TIMELINE, COMPANY_INFO } from './constants';
import BookingModal from './components/BookingModal';
import Calculator from './components/Calculator';
import AdminBadge from './components/AdminBadge';
import { Vehicle, Service } from './types';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<string>('');
  const [scrolled, setScrolled] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(true);

  // Scroll handler for navbar styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // SEO Injection (Simulated)
  useEffect(() => {
    // Schema.org Injection
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "TaxiService",
      "name": COMPANY_INFO.name,
      "image": "https://picsum.photos/1200/630",
      "@id": "https://makcabs.com",
      "url": "https://makcabs.com",
      "telephone": COMPANY_INFO.phone,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": COMPANY_INFO.address,
        "addressCountry": "SA" // inferred from context
      },
      "priceRange": "$$",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "00:00",
          "closes": "23:59"
        }
      ]
    });
    document.head.appendChild(script);

    // FAQ Schema
    const faqScript = document.createElement('script');
    faqScript.type = 'application/ld+json';
    faqScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQS.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer
        }
      }))
    });
    document.head.appendChild(faqScript);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(faqScript);
    };
  }, []);

  const openBooking = (vehicleId?: string) => {
    if (vehicleId) setSelectedVehicle(vehicleId);
    setIsBookingOpen(true);
  };

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="font-sans text-dark overflow-x-hidden">
      
      {/* --- Navigation --- */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
             {/* Simple SVG Logo */}
             <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-dark relative shadow-lg">
                <MapPin className="w-5 h-5 absolute -top-1 -right-1 text-primary fill-current" />
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                   <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM4 12h16v5H4v-5zM6 14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
             </div>
             <span className={`font-display font-bold text-2xl tracking-tight ${scrolled ? 'text-dark' : 'text-white md:text-white'}`}>
               Mak<span className="text-secondary">Cabs</span>
             </span>
          </div>

          {/* Desktop Menu */}
          <div className={`hidden md:flex items-center gap-8 font-medium ${scrolled ? 'text-gray-600' : 'text-gray-100'}`}>
            {['About', 'Fleet', 'Services', 'Pricing', 'Contact'].map(item => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="hover:text-secondary transition-colors">
                {item}
              </button>
            ))}
            <button onClick={() => openBooking()} className="bg-secondary text-dark px-6 py-2.5 rounded-full font-bold hover:bg-amber-400 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              Book a Ride
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-secondary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 flex flex-col p-6 gap-4 animate-in slide-in-from-top-2">
             {['About', 'Fleet', 'Services', 'Pricing', 'Contact'].map(item => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="text-left text-lg font-medium text-gray-700 py-2 border-b border-gray-50">
                {item}
              </button>
            ))}
             <button onClick={() => openBooking()} className="bg-secondary text-dark w-full py-3 rounded-lg font-bold mt-2">
              Book a Ride
            </button>
          </div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <header className="relative min-h-screen flex items-center overflow-hidden">
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(https://picsum.photos/id/111/1920/1080?grayscale)', // Using a specific ID for consistency
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-dark/70 bg-gradient-to-r from-dark/90 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 pt-20">
          <div className="max-w-3xl">
             <div className="inline-block bg-secondary/10 backdrop-blur-sm border border-secondary/30 text-secondary px-4 py-1.5 rounded-full text-sm font-semibold mb-6 animate-fade-in">
               24/7 Professional Transport
             </div>
             <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight opacity-0 animate-[fadeIn_0.5s_0.4s_forwards]">
               {COMPANY_INFO.tagline}
             </h1>
             <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl font-light opacity-0 animate-[fadeIn_0.5s_0.6s_forwards]">
               Safe, reliable rides — on demand or pre-booked. 24/7 support and professional drivers.
             </p>
             
             <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-[fadeIn_0.5s_0.8s_forwards]">
               <button 
                 onClick={() => openBooking()}
                 className="bg-primary hover:bg-blue-600 text-white text-lg font-bold py-4 px-10 rounded-lg shadow-blue-500/30 shadow-lg transition-all animate-bounce-subtle"
               >
                 Book a Ride
               </button>
               <button 
                 onClick={() => scrollTo('fleet')}
                 className="bg-transparent border-2 border-white hover:bg-white hover:text-dark text-white text-lg font-bold py-4 px-10 rounded-lg transition-all"
               >
                 View Fleet
               </button>
             </div>
          </div>
        </div>

        {/* Animated Taxi Icon driving in */}
        <div className="absolute bottom-10 -right-20 md:right-10 w-64 md:w-96 opacity-80 animate-drive-in pointer-events-none">
           <img src="https://picsum.photos/id/183/500/300" alt="Taxi" className="mask-image-gradient" style={{ maskImage: 'linear-gradient(to left, black 80%, transparent)'}} />
        </div>
      </header>

      {/* --- Intro / Mission --- */}
      <section id="about" className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-2">Our Story</h2>
            <h3 className="text-4xl font-display font-bold mb-6">Redefining Local Transport</h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {COMPANY_INFO.intro}
            </p>
            <blockquote className="border-l-4 border-secondary pl-4 italic text-gray-800 text-xl font-medium mb-8">
              "To make every trip safe, comfortable and on time — delivered with friendly drivers and fair pricing."
            </blockquote>
            
            {/* Timeline */}
            <div className="space-y-6">
              {TIMELINE.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-primary rounded-full mt-1.5"></div>
                    {i !== TIMELINE.length - 1 && <div className="w-0.5 h-full bg-gray-200 mt-1"></div>}
                  </div>
                  <div>
                    <span className="text-sm font-bold text-gray-400">{item.year}</span>
                    <h4 className="font-bold text-dark">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-secondary/10 rounded-3xl -z-10 transform rotate-3"></div>
            <img 
              src="https://picsum.photos/id/236/600/800" 
              alt="Passenger enjoying a ride" 
              className="rounded-2xl shadow-2xl w-full h-[600px] object-cover" 
              loading="lazy"
            />
            {/* Trust Stats Overlay */}
            <div className="absolute bottom-10 left-[-20px] bg-white p-6 rounded-xl shadow-xl max-w-xs">
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-green-100 rounded-full text-success">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="font-bold text-2xl">100%</p>
                  <p className="text-xs text-gray-500 uppercase">Insured Rides</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">All our drivers are vetted, licensed, and professionally trained for your safety.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Services --- */}
      <section id="services" className="py-20 bg-light">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-2">Our Services</h2>
            <h3 className="text-4xl font-display font-bold mb-4">Transport Solutions for Everyone</h3>
            <p className="text-gray-600">From quick hops across town to coordinated corporate events, we have the right service for you.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <div key={service.id} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
                <div className="w-14 h-14 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                   {/* Icon Mapping placeholder logic */}
                   {service.iconName === 'Plane' && <div className="text-2xl">✈️</div>}
                   {service.iconName === 'Clock' && <Clock />}
                   {service.iconName === 'MapPin' && <MapPin />}
                   {service.iconName === 'Users' && <div className="text-2xl">👥</div>}
                   {service.iconName === 'Briefcase' && <div className="text-2xl">💼</div>}
                   {service.iconName === 'Accessibility' && <div className="text-2xl">♿</div>}
                </div>
                <h4 className="text-xl font-bold mb-3">{service.title}</h4>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <button onClick={() => openBooking()} className="text-primary font-semibold group-hover:gap-2 flex items-center gap-1 transition-all text-sm">
                  Book Now <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Fleet --- */}
      <section id="fleet" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
           <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
              <div>
                <h2 className="text-4xl font-display font-bold mb-2">Our Modern Fleet</h2>
                <p className="text-gray-600">Choose the perfect vehicle for your journey.</p>
              </div>
              <button onClick={() => openBooking()} className="text-primary font-bold hover:underline">View All Vehicles</button>
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
             {FLEET.map((car) => (
               <div key={car.id} className="group relative overflow-hidden rounded-2xl shadow-lg border border-gray-100">
                 <div className="h-48 overflow-hidden bg-gray-200">
                    <img 
                      src={car.image} 
                      alt={car.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                 </div>
                 <div className="p-5 bg-white">
                    <h3 className="font-bold text-lg mb-1">{car.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                      <span className="flex items-center gap-1"><User size={12}/> {car.capacity}</span>
                      <span className="flex items-center gap-1">🧳 {car.luggage}</span>
                    </div>
                    <ul className="text-sm text-gray-600 mb-4 space-y-1">
                      {car.features.slice(0, 2).map(f => (
                        <li key={f} className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-success rounded-full"></div>{f}</li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between mt-4 border-t pt-4">
                       <div>
                         <span className="text-xs text-gray-400">From</span>
                         <div className="font-bold text-lg text-primary flex items-center gap-1">
                            ${car.basePrice} 
                            <AdminBadge label="" className="ml-0 opacity-50 scale-75"/>
                         </div>
                       </div>
                       <button onClick={() => openBooking(car.id)} className="bg-dark text-white p-2 rounded-lg hover:bg-secondary hover:text-dark transition-colors">
                         <ArrowRight size={20} />
                       </button>
                    </div>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* --- Pricing & Calculator --- */}
      <section id="pricing" className="py-20 bg-dark text-white relative overflow-hidden">
        {/* Abstract pattern */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 rounded-l-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
               <h2 className="text-4xl font-display font-bold mb-6">Transparent Pricing.<br/><span className="text-secondary">No Surprises.</span></h2>
               <p className="text-gray-300 text-lg mb-8">
                 Know your fare before you ride. We offer competitive rates with no hidden fees. 
                 Corporate accounts get exclusive benefits and monthly invoicing.
               </p>
               
               <div className="space-y-6">
                 {[
                   { title: "Standard Rate", price: "0.90", unit: "/km", desc: "For day-to-day travel" },
                   { title: "Waiting Time", price: "0.40", unit: "/min", desc: "First 5 mins free" },
                   { title: "Airport Fee", price: "5.00", unit: "flat", desc: "Includes meet & greet" }
                 ].map((rate, idx) => (
                   <div key={idx} className="flex items-center justify-between border-b border-gray-700 pb-4">
                      <div>
                        <h4 className="font-bold text-lg">{rate.title}</h4>
                        <p className="text-sm text-gray-400">{rate.desc}</p>
                      </div>
                      <div className="text-right">
                         <div className="text-2xl font-bold text-secondary flex items-center justify-end gap-1">
                           ${rate.price} <AdminBadge className="bg-transparent border-red-500/30 text-red-400" label="Edit" />
                         </div>
                         <span className="text-xs text-gray-400">{rate.unit}</span>
                      </div>
                   </div>
                 ))}
               </div>
               
               <div className="mt-8">
                 <button onClick={() => window.open('https://play.google.com/store/apps', '_blank')} className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl backdrop-blur transition-all">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-8" />
                    <div className="text-left">
                      <div className="text-[10px] uppercase tracking-wide">Download Driver App</div>
                      <div className="font-bold text-sm">Join the Team</div>
                    </div>
                 </button>
                 <p className="text-xs text-gray-500 mt-2 ml-1">Verified on Google Play <AdminBadge className="ml-0" label="Check Link" /></p>
               </div>
            </div>

            <div className="text-dark">
               <Calculator onBookClick={() => openBooking()} />
            </div>
          </div>
        </div>
      </section>

      {/* --- Team --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
           <div className="text-center mb-12">
             <h2 className="text-3xl font-display font-bold">Meet the Team</h2>
             <p className="text-gray-600">The people ensuring your ride is safe and smooth.</p>
           </div>
           <div className="grid md:grid-cols-3 gap-8">
              {TEAM.map(member => (
                <div key={member.id} className="text-center">
                   <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-4 border-light shadow-md relative group">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-xs font-bold">Upload</span>
                      </div>
                   </div>
                   <h4 className="font-bold text-lg">{member.name} <AdminBadge label="" /></h4>
                   <p className="text-primary font-medium text-sm mb-2">{member.role}</p>
                   <p className="text-gray-500 text-sm max-w-xs mx-auto">{member.bio}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section id="faq" className="py-20 bg-light">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
           <h2 className="text-3xl font-display font-bold text-center mb-12">Frequently Asked Questions</h2>
           <div className="space-y-4">
             {FAQS.map((faq, idx) => (
               <details key={idx} className="group bg-white rounded-xl shadow-sm border border-gray-100 open:ring-2 open:ring-primary/10 transition-all">
                 <summary className="flex cursor-pointer items-center justify-between p-6 font-medium text-lg list-none">
                   {faq.question}
                   <span className="transition group-open:rotate-180">
                     <ChevronDown className="text-primary" />
                   </span>
                 </summary>
                 <div className="border-t border-gray-100 p-6 pt-0 text-gray-600 animate-in fade-in slide-in-from-top-1">
                   <p className="mt-4">{faq.answer}</p>
                 </div>
               </details>
             ))}
           </div>
        </div>
      </section>

      {/* --- Footer & Contact --- */}
      <footer id="contact" className="bg-dark text-white pt-20 pb-10">
         <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-4 gap-12 mb-16">
               <div className="col-span-1 md:col-span-2">
                 <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center text-dark">
                        <MapPin size={16} fill="currentColor" />
                    </div>
                    <span className="font-display font-bold text-2xl">Mak<span className="text-secondary">Cabs</span></span>
                 </div>
                 <p className="text-gray-400 mb-6 max-w-md">
                   {COMPANY_INFO.description}
                 </p>
                 <div className="flex gap-4">
                   {/* Social Placeholders */}
                   {[Facebook, Twitter, Instagram].map((Icon, i) => (
                     <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-secondary hover:text-dark flex items-center justify-center transition-colors">
                       <Icon size={20} />
                     </a>
                   ))}
                 </div>
               </div>

               <div>
                 <h4 className="font-bold text-lg mb-6 text-secondary">Contact</h4>
                 <ul className="space-y-4 text-gray-400">
                   <li className="flex items-start gap-3">
                     <Phone size={20} className="mt-1 flex-shrink-0" />
                     <div>
                       <div className="text-white font-medium">{COMPANY_INFO.phone} <AdminBadge label="Edit" /></div>
                       <div className="text-xs mt-1">
                         Also: {COMPANY_INFO.socialPhones.join(', ')} <AdminBadge label="Verify" />
                       </div>
                     </div>
                   </li>
                   <li className="flex items-start gap-3">
                     <div className="text-xl">✉️</div>
                     <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white transition-colors">{COMPANY_INFO.email}</a>
                   </li>
                   <li className="flex items-start gap-3">
                     <MapPin size={20} className="mt-1 flex-shrink-0" />
                     <span>{COMPANY_INFO.address} <AdminBadge label="Edit" /></span>
                   </li>
                 </ul>
               </div>

               <div>
                 <h4 className="font-bold text-lg mb-6 text-secondary">Business Hours</h4>
                 <ul className="space-y-2 text-gray-400">
                   <li className="flex justify-between"><span>Mon - Sun</span> <span>24 Hours</span></li>
                   <li className="border-t border-gray-700 my-2 pt-2 text-xs">Support is available 24/7</li>
                 </ul>
                 <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">License No.</p>
                    <p className="font-mono text-sm">{COMPANY_INFO.license} <AdminBadge label="Edit" /></p>
                 </div>
               </div>
            </div>

            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
               <p>Copyright © {new Date().getFullYear()} {COMPANY_INFO.name} — All Rights Reserved.</p>
               <div className="flex gap-6">
                 <a href="#" className="hover:text-white">Privacy Policy</a>
                 <a href="#" className="hover:text-white">Terms of Service</a>
               </div>
            </div>
         </div>
      </footer>

      {/* --- Sticky Mobile CTA --- */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t border-gray-200 md:hidden z-40 flex gap-4 shadow-[0_-5px_15px_rgba(0,0,0,0.1)]">
        <a href={`tel:${COMPANY_INFO.phone}`} className="flex-1 bg-gray-100 text-dark font-bold py-3 rounded-lg flex items-center justify-center gap-2">
           <Phone size={20} /> Call Us
        </a>
        <button onClick={() => openBooking()} className="flex-[2] bg-primary text-white font-bold py-3 rounded-lg shadow-lg">
           Book Now
        </button>
      </div>

      {/* --- Cookie Consent --- */}
      {showCookieBanner && (
        <div className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md bg-white p-6 rounded-xl shadow-2xl border border-gray-100 z-50 animate-in slide-in-from-bottom-5">
           <h5 className="font-bold text-lg mb-2">We value your privacy</h5>
           <p className="text-sm text-gray-600 mb-4">
             This website uses cookies. We use cookies to analyze website traffic and optimize your website experience. By accepting our use of cookies, your data will be aggregated with all other user data.
           </p>
           <div className="flex gap-3 justify-end">
             <button onClick={() => setShowCookieBanner(false)} className="text-sm font-medium text-gray-500 hover:text-dark px-3 py-2">Decline</button>
             <button onClick={() => setShowCookieBanner(false)} className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-blue-600">Accept</button>
           </div>
        </div>
      )}

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} prefilledVehicle={selectedVehicle} />
    </div>
  );
}

export default App;