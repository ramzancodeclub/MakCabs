import React, { useState } from 'react';
import { Calculator as CalcIcon, RefreshCw, ArrowRight } from 'lucide-react';
import { PRICING_DEFAULTS } from '../constants';
import AdminBadge from './AdminBadge';

interface CalculatorProps {
  onBookClick: () => void;
}

const Calculator: React.FC<CalculatorProps> = ({ onBookClick }) => {
  const [distance, setDistance] = useState<number>(0);
  const [waiting, setWaiting] = useState<number>(0);
  const [isAirport, setIsAirport] = useState<boolean>(false);
  const [currency, setCurrency] = useState<string>(PRICING_DEFAULTS.currency);
  
  const calculateFare = () => {
    let total = PRICING_DEFAULTS.baseFare;
    total += distance * PRICING_DEFAULTS.perKm;
    total += waiting * PRICING_DEFAULTS.waitingTime;
    if (isAirport) total += PRICING_DEFAULTS.airportSurcharge;
    return total.toFixed(2);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-display font-bold text-dark flex items-center gap-2">
          <CalcIcon className="text-secondary" /> Fare Estimator
        </h3>
        <AdminBadge label="Sample Rates" />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Distance (km)</label>
          <input 
            type="number" 
            min="0"
            value={distance || ''} 
            onChange={(e) => setDistance(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary outline-none transition-all"
            placeholder="e.g. 25"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Waiting Time (mins)</label>
          <input 
            type="number" 
            min="0"
            value={waiting || ''} 
            onChange={(e) => setWaiting(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary outline-none transition-all"
            placeholder="e.g. 10"
          />
        </div>

        <div className="flex items-center gap-3 py-2">
           <input 
            type="checkbox" 
            id="airport"
            checked={isAirport}
            onChange={(e) => setIsAirport(e.target.checked)}
            className="w-5 h-5 text-secondary rounded focus:ring-secondary border-gray-300"
           />
           <label htmlFor="airport" className="text-sm font-medium text-gray-700">Airport Transfer (+{currency} {PRICING_DEFAULTS.airportSurcharge})</label>
        </div>

        <div className="flex gap-2 text-sm text-gray-500 justify-end">
            <button onClick={() => setCurrency('USD')} className={`px-2 py-1 rounded ${currency === 'USD' ? 'bg-gray-200 text-dark font-bold' : ''}`}>USD</button>
            <button onClick={() => setCurrency('SAR')} className={`px-2 py-1 rounded ${currency === 'SAR' ? 'bg-gray-200 text-dark font-bold' : ''}`}>SAR</button>
        </div>

        <div className="mt-6 p-4 bg-dark rounded-xl text-white flex items-center justify-between">
            <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Estimated Fare</p>
                <p className="text-3xl font-bold font-display">{currency} {calculateFare()}</p>
            </div>
            <button 
                onClick={onBookClick}
                className="bg-secondary hover:bg-amber-400 text-dark font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors text-sm"
            >
                Get Exact Quote <ArrowRight size={16} />
            </button>
        </div>
        <p className="text-[10px] text-gray-400 text-center mt-2">
            *Estimates are approximate. Actual fare may vary due to traffic or route.
        </p>
      </div>
    </div>
  );
};

export default Calculator;
