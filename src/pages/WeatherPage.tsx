import React, { useState } from 'react';
import { CloudSun, Wind, Droplets, Thermometer, CloudRain, Sun, CloudLightning, Info } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { cn } from '../lib/utils';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const forecastData = [
  { day: 'Mon', temp: 32, rain: 10 },
  { day: 'Tue', temp: 34, rain: 5 },
  { day: 'Wed', temp: 31, rain: 40 },
  { day: 'Thu', temp: 28, rain: 80 },
  { day: 'Fri', temp: 29, rain: 60 },
  { day: 'Sat', temp: 30, rain: 20 },
  { day: 'Sun', temp: 33, rain: 0 },
];

export const WeatherPage = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
          <CloudSun className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Weather Intelligence</h1>
          <p className="text-slate-500">Hyper-local weather insights for your farm</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Current Weather */}
        <Card className="p-8 bg-gradient-to-br from-blue-600 to-blue-700 text-white border-none">
          <div className="flex justify-between items-start mb-12">
            <div>
              <p className="text-blue-100 font-medium mb-1">Current Weather</p>
              <h2 className="text-5xl font-black">32°C</h2>
              <p className="text-blue-100">Partly Cloudy • Ludhiana</p>
            </div>
            <CloudSun className="w-16 h-16 text-blue-200" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-blue-200">Humidity</p>
                <p className="font-bold">64%</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Wind className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-blue-200">Wind</p>
                <p className="font-bold">12 km/h</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <CloudRain className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-blue-200">Rain Chance</p>
                <p className="font-bold">10%</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Thermometer className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-blue-200">UV Index</p>
                <p className="font-bold">High (7)</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Farming Advice */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 border-l-4 border-l-amber-500 bg-amber-50">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
                <Info className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Farming Advice</h3>
                <p className="text-slate-600 leading-relaxed">
                  Heavy rainfall is expected on Wednesday and Thursday. We recommend delaying irrigation and pesticide application. Ensure proper drainage in low-lying areas of your farm.
                </p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">Temperature Trend</h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={forecastData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <Tooltip />
                    <Line type="monotone" dataKey="temp" stroke="#3b82f6" strokeWidth={3} dot={{fill: '#3b82f6', strokeWidth: 2, r: 4}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">Rainfall Prediction (%)</h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={forecastData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <Tooltip />
                    <Bar dataKey="rain" fill="#60a5fa" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-8">7-Day Forecast</h3>
        <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
          {[
            { day: 'Mon', icon: Sun, temp: '32/24', desc: 'Sunny' },
            { day: 'Tue', icon: CloudSun, temp: '34/25', desc: 'Partly Cloudy' },
            { day: 'Wed', icon: CloudRain, temp: '31/22', desc: 'Showers' },
            { day: 'Thu', icon: CloudLightning, temp: '28/20', desc: 'Storms' },
            { day: 'Fri', icon: CloudRain, temp: '29/21', desc: 'Rain' },
            { day: 'Sat', icon: CloudSun, temp: '30/23', desc: 'Cloudy' },
            { day: 'Sun', icon: Sun, temp: '33/24', desc: 'Sunny' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center p-4 rounded-2xl bg-slate-50 text-center">
              <p className="text-sm font-bold text-slate-900 mb-3">{item.day}</p>
              <item.icon className={cn("w-8 h-8 mb-3", i === 2 || i === 3 || i === 4 ? "text-blue-500" : "text-amber-500")} />
              <p className="text-sm font-bold text-slate-900">{item.temp}°C</p>
              <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
