import React, { useState } from 'react';
import { BookOpen, Search, Filter, Sprout, Droplets, Thermometer, Clock, TrendingUp, Leaf } from 'lucide-react';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

const crops = [
  { 
    name: 'Wheat', 
    soil: 'Alluvial, Clayey', 
    season: 'Rabi (Winter)', 
    water: 'Moderate', 
    duration: '120-150 days', 
    yield: '15-20 Quintals/Acre',
    desc: 'Wheat is a grass widely cultivated for its seed, a cereal grain which is a worldwide staple food.'
  },
  { 
    name: 'Paddy (Rice)', 
    soil: 'Clayey, Loamy', 
    season: 'Kharif (Monsoon)', 
    water: 'High', 
    duration: '110-140 days', 
    yield: '20-25 Quintals/Acre',
    desc: 'Rice is the seed of the grass species Oryza sativa. As a cereal grain, it is the most widely consumed staple food.'
  },
  { 
    name: 'Cotton', 
    soil: 'Black Soil', 
    season: 'Kharif', 
    water: 'Moderate', 
    duration: '160-180 days', 
    yield: '8-12 Quintals/Acre',
    desc: 'Cotton is a soft, fluffy staple fiber that grows in a boll, or protective case, around the seeds of the cotton plants.'
  },
  { 
    name: 'Maize', 
    soil: 'Loamy Alluvial', 
    season: 'Kharif/Rabi', 
    water: 'Moderate', 
    duration: '90-110 days', 
    yield: '12-18 Quintals/Acre',
    desc: 'Maize, also known as corn, is a cereal grain first domesticated by indigenous peoples in southern Mexico.'
  },
  { 
    name: 'Mustard', 
    soil: 'Loamy', 
    season: 'Rabi', 
    water: 'Low', 
    duration: '100-120 days', 
    yield: '6-10 Quintals/Acre',
    desc: 'Mustard seeds are the small round seeds of various mustard plants. They are used as a spice and for oil extraction.'
  },
  { 
    name: 'Sugarcane', 
    soil: 'Deep Rich Loamy', 
    season: 'Annual', 
    water: 'High', 
    duration: '10-12 months', 
    yield: '300-400 Quintals/Acre',
    desc: 'Sugarcane refers to several species and hybrids of tall perennial grasses in the genus Saccharum.'
  },
];

export const LibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCrops = crops.filter(crop => 
    crop.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Crop Knowledge Library</h1>
            <p className="text-slate-500">Comprehensive guide for all major crops</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input 
            className="pl-10" 
            placeholder="Search crops (e.g. Wheat, Cotton)..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" /> Filter by Season
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCrops.map((crop, i) => (
          <Card key={i} className="flex flex-col hover:border-emerald-200 transition-colors group">
            <div className="h-48 bg-slate-100 relative overflow-hidden">
              <img 
                src={`https://picsum.photos/seed/${crop.name}/800/600`} 
                alt={crop.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-bold text-emerald-700 shadow-sm">
                  {crop.season}
                </span>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{crop.name}</h3>
              <p className="text-sm text-slate-500 mb-6 line-clamp-2">
                {crop.desc}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8 mt-auto">
                <div className="flex items-center gap-2 text-slate-600">
                  <Leaf className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-medium">{crop.soil}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-medium">{crop.water} Water</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-medium">{crop.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-medium">{crop.yield}</span>
                </div>
              </div>

              <Button variant="outline" className="w-full">View Full Guide</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
