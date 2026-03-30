import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Sprout, Droplets, Save, Edit2 } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';

export const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user') || '{}'));
  const [formData, setFormData] = useState({
    farm_size: user.farm_size || '',
    soil_type: user.soil_type || '',
    water_source: user.water_source || ''
  });

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/farmer/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const updatedUser = { ...user, ...formData };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setIsEditing(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-3xl font-bold border-4 border-white shadow-sm">
            {user.name?.[0]}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{user.name}</h1>
            <p className="text-slate-500 flex items-center gap-1">
              <MapPin className="w-4 h-4" /> {user.district}, {user.state}
            </p>
          </div>
        </div>
        <Button 
          variant={isEditing ? 'outline' : 'primary'} 
          className="gap-2"
          onClick={() => isEditing ? setIsEditing(false) : setIsEditing(true)}
        >
          {isEditing ? 'Cancel' : <><Edit2 className="w-4 h-4" /> Edit Profile</>}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Personal Info */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-600" /> Personal Information
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50">
              <Phone className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500 font-medium">Phone Number</p>
                <p className="text-sm font-bold text-slate-900">{user.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50">
              <Mail className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500 font-medium">Email Address</p>
                <p className="text-sm font-bold text-slate-900">{user.email || 'Not provided'}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50">
              <MapPin className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500 font-medium">Location</p>
                <p className="text-sm font-bold text-slate-900">{user.district}, {user.state}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Farm Info */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Sprout className="w-5 h-5 text-emerald-600" /> Farm Information
          </h3>
          {isEditing ? (
            <div className="space-y-4">
              <Input 
                label="Farm Size (Acres)" 
                type="number" 
                value={formData.farm_size}
                onChange={(e) => setFormData({ ...formData, farm_size: e.target.value })}
              />
              <Select 
                label="Soil Type" 
                options={[
                  { label: 'Alluvial', value: 'alluvial' },
                  { label: 'Black', value: 'black' },
                  { label: 'Red', value: 'red' },
                  { label: 'Sandy', value: 'sandy' },
                  { label: 'Clay', value: 'clay' },
                ]}
                value={formData.soil_type}
                onChange={(e) => setFormData({ ...formData, soil_type: e.target.value })}
              />
              <Select 
                label="Water Source" 
                options={[
                  { label: 'Canal', value: 'canal' },
                  { label: 'Borewell', value: 'borewell' },
                  { label: 'Rain-fed', value: 'rainfed' },
                  { label: 'River', value: 'river' },
                ]}
                value={formData.water_source}
                onChange={(e) => setFormData({ ...formData, water_source: e.target.value })}
              />
              <Button className="w-full gap-2 mt-4" onClick={handleSave}>
                <Save className="w-4 h-4" /> Save Changes
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50">
                <Sprout className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500 font-medium">Farm Size</p>
                  <p className="text-sm font-bold text-slate-900">{user.farm_size || 'Not set'} Acres</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50">
                <Sprout className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500 font-medium">Soil Type</p>
                  <p className="text-sm font-bold text-slate-900 capitalize">{user.soil_type || 'Not set'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50">
                <Droplets className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500 font-medium">Water Source</p>
                  <p className="text-sm font-bold text-slate-900 capitalize">{user.water_source || 'Not set'}</p>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Account Settings</h3>
        <div className="space-y-2">
          <button className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            Change Password
          </button>
          <button className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            Notification Preferences
          </button>
          <button className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            Language Settings (Hindi/English)
          </button>
          <button className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
            Delete Account
          </button>
        </div>
      </Card>
    </div>
  );
};
