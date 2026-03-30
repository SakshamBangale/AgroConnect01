import React, { useState } from 'react';
import { TrendingUp, Search, MapPin, ArrowUpRight, ArrowDownRight, Filter, Calendar } from 'lucide-react';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

const marketData = [
  { crop: 'Wheat', price: 2450, prevPrice: 2400, trend: 'up', mandi: 'Ludhiana Mandi' },
  { crop: 'Paddy (Basmati)', price: 4200, prevPrice: 4350, trend: 'down', mandi: 'Amritsar Mandi' },
  { crop: 'Cotton', price: 7800, prevPrice: 7600, trend: 'up', mandi: 'Bathinda Mandi' },
  { crop: 'Maize', price: 1950, prevPrice: 1950, trend: 'stable', mandi: 'Jalandhar Mandi' },
  { crop: 'Mustard', price: 5600, prevPrice: 5400, trend: 'up', mandi: 'Patiala Mandi' },
  { crop: 'Potato', price: 1200, prevPrice: 1100, trend: 'up', mandi: 'Hoshiarpur Mandi' },
  { crop: 'Onion', price: 2800, prevPrice: 3100, trend: 'down', mandi: 'Sangrur Mandi' },
];

export const MarketPricePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = marketData.filter(item => 
    item.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.mandi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Market Price Dashboard</h1>
            <p className="text-slate-500">Real-time crop prices from nearby mandis</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <MapPin className="w-4 h-4" /> Change Location
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="w-4 h-4" /> Historical Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-emerald-600 text-white border-none md:col-span-2">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold">Market Sentiment</h3>
            <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold">BULLISH</span>
          </div>
          <p className="text-emerald-50 mb-6 leading-relaxed">
            Wheat prices are seeing a steady rise due to increased export demand. Experts suggest holding your stock for another 2 weeks for maximum profit.
          </p>
          <div className="flex gap-4">
            <div className="bg-white/10 p-3 rounded-xl flex-1">
              <p className="text-xs text-emerald-200 mb-1">Top Gainer</p>
              <p className="font-bold">Mustard (+4.2%)</p>
            </div>
            <div className="bg-white/10 p-3 rounded-xl flex-1">
              <p className="text-xs text-emerald-200 mb-1">Most Traded</p>
              <p className="font-bold">Wheat</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Price Alerts</h3>
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
              <p className="text-xs text-blue-600 font-bold mb-1">GOVERNMENT MSP</p>
              <p className="text-sm font-bold text-slate-900">Wheat MSP increased to ₹2,275</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-100">
              <p className="text-xs text-amber-600 font-bold mb-1">MARKET ALERT</p>
              <p className="text-sm font-bold text-slate-900">Basmati prices expected to drop</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input 
              className="pl-10" 
              placeholder="Search crop or mandi..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="ghost" className="gap-2">
            <Filter className="w-4 h-4" /> Filter by Mandi
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-sm font-medium">
              <tr>
                <th className="px-6 py-4">Crop Name</th>
                <th className="px-6 py-4">Today's Price (₹/Q)</th>
                <th className="px-6 py-4">Yesterday</th>
                <th className="px-6 py-4">Trend</th>
                <th className="px-6 py-4">Mandi Location</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((item, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">{item.crop}</td>
                  <td className="px-6 py-4 font-black text-slate-900">₹{item.price}</td>
                  <td className="px-6 py-4 text-slate-500">₹{item.prevPrice}</td>
                  <td className="px-6 py-4">
                    {item.trend === 'up' ? (
                      <span className="flex items-center gap-1 text-emerald-600 font-bold text-sm">
                        <ArrowUpRight className="w-4 h-4" /> +{((item.price - item.prevPrice) / item.prevPrice * 100).toFixed(1)}%
                      </span>
                    ) : item.trend === 'down' ? (
                      <span className="flex items-center gap-1 text-red-600 font-bold text-sm">
                        <ArrowDownRight className="w-4 h-4" /> -{((item.prevPrice - item.price) / item.prevPrice * 100).toFixed(1)}%
                      </span>
                    ) : (
                      <span className="text-slate-400 font-bold text-sm">Stable</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-sm">{item.mandi}</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm">View Chart</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
