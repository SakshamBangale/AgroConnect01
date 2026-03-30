import React, { useEffect, useState } from 'react';
import { 
  LayoutDashboard, 
  Sprout, 
  CloudSun, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Plus,
  Calendar,
  MapPin,
  Droplets,
  Thermometer,
  ScanSearch,
  Users,
  BookOpen
} from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Jan', yield: 400 },
  { name: 'Feb', yield: 300 },
  { name: 'Mar', yield: 600 },
  { name: 'Apr', yield: 800 },
  { name: 'May', yield: 500 },
  { name: 'Jun', yield: 900 },
];

export const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [records, setRecords] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/records/${user.id}`)
      .then(res => res.json())
      .then(data => setRecords(data));
  }, [user.id]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Namaste, {user.name}!</h1>
          <p className="text-slate-500 flex items-center gap-1">
            <MapPin className="w-4 h-4" /> {user.district}, {user.state}
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/crop-recommendation">
            <Button className="gap-2">
              <Plus className="w-5 h-5" /> Add New Crop
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Sprout className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> 12%
            </span>
          </div>
          <p className="text-slate-500 text-sm font-medium">Total Land</p>
          <h3 className="text-2xl font-bold text-slate-900">{user.farm_size || '0'} Acres</h3>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600">
              <TrendingUp className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> 8%
            </span>
          </div>
          <p className="text-slate-500 text-sm font-medium">Expected Revenue</p>
          <h3 className="text-2xl font-bold text-slate-900">₹1.2L</h3>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
              <Droplets className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-lg flex items-center gap-1">
              <ArrowDownRight className="w-3 h-3" /> 5%
            </span>
          </div>
          <p className="text-slate-500 text-sm font-medium">Water Usage</p>
          <h3 className="text-2xl font-bold text-slate-900">420k L</h3>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600">
              <Thermometer className="w-6 h-6" />
            </div>
          </div>
          <p className="text-slate-500 text-sm font-medium">Current Temp</p>
          <h3 className="text-2xl font-bold text-slate-900">32°C</h3>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Yield Chart */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-900">Yield Analysis</h3>
            <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="yield" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorYield)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Weather & Advice */}
        <div className="space-y-6">
          <Card className="p-6 bg-emerald-600 text-white border-none">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold">Weather Advice</h3>
              <CloudSun className="w-6 h-6 text-emerald-200" />
            </div>
            <p className="text-emerald-50 mb-4 leading-relaxed">
              Heavy rainfall expected this Friday. We recommend delaying your irrigation schedule and applying fertilizers today for better absorption.
            </p>
            <Button variant="secondary" size="sm" className="w-full">View 7-Day Forecast</Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Active Crops</h3>
            <div className="space-y-4">
              {records.length > 0 ? records.slice(0, 3).map((record, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-slate-50">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <Sprout className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900">{record.crop_name}</p>
                    <p className="text-xs text-slate-500">{record.area} Acres • Expected ₹{record.profit}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-emerald-600">Healthy</p>
                  </div>
                </div>
              )) : (
                <p className="text-sm text-slate-500 text-center py-4">No active crops found.</p>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: ScanSearch, label: 'Check Disease', path: '/disease-detection', color: 'bg-orange-50 text-orange-600' },
          { icon: TrendingUp, label: 'Market Prices', path: '/market', color: 'bg-blue-50 text-blue-600' },
          { icon: Users, label: 'Community', path: '/community', color: 'bg-purple-50 text-purple-600' },
          { icon: BookOpen, label: 'Crop Library', path: '/library', color: 'bg-emerald-50 text-emerald-600' },
        ].map((action, i) => (
          <Link key={i} to={action.path}>
            <Card className="p-4 flex flex-col items-center gap-3 hover:bg-slate-50 transition-colors">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", action.color)}>
                <action.icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-bold text-slate-700">{action.label}</span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
