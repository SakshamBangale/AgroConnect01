import React, { useState } from 'react';
import { Sprout, Search, Loader2, CheckCircle2, AlertTriangle, TrendingUp, Droplets, Clock } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { getCropRecommendations, CropRecommendation } from '../services/geminiService';
import { motion, AnimatePresence } from 'motion/react';

export const CropRecommendationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  const [formData, setFormData] = useState({
    location: '',
    soilType: '',
    farmSize: '',
    season: '',
    waterAvailability: '',
    temperature: '25-35°C',
    rainfall: 'Moderate'
  });

  const handleRecommend = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const results = await getCropRecommendations(formData);
      setRecommendations(results);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
          <Sprout className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">AI Crop Recommendation</h1>
          <p className="text-slate-500">Get personalized crop suggestions for your land</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <Card className="p-6 h-fit">
          <form onSubmit={handleRecommend} className="space-y-4">
            <Input 
              label="Location" 
              placeholder="e.g. Ludhiana, Punjab" 
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
            <Select 
              label="Soil Type" 
              options={[
                { label: 'Alluvial Soil', value: 'alluvial' },
                { label: 'Black Soil', value: 'black' },
                { label: 'Red Soil', value: 'red' },
                { label: 'Laterite Soil', value: 'laterite' },
                { label: 'Sandy Soil', value: 'sandy' },
                { label: 'Clay Soil', value: 'clay' },
              ]}
              required
              value={formData.soilType}
              onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
            />
            <Input 
              label="Farm Size (Acres)" 
              type="number" 
              placeholder="e.g. 5" 
              required
              value={formData.farmSize}
              onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
            />
            <Select 
              label="Current Season" 
              options={[
                { label: ' (Monsoon)', value: 'kharif' },
                { label: ' (Winter)', value: 'rabi' },
                { label: ' (Summer)', value: 'zaid' },
              ]}
              required
              value={formData.season}
              onChange={(e) => setFormData({ ...formData, season: e.target.value })}
            />
            <Select 
              label="Water Availability" 
              options={[
                { label: 'High (Canal/Borewell)', value: 'high' },
                { label: 'Medium', value: 'medium' },
                { label: 'Low (Rain-fed)', value: 'low' },
              ]}
              required
              value={formData.waterAvailability}
              onChange={(e) => setFormData({ ...formData, waterAvailability: e.target.value })}
            />
            <Button className="w-full py-3 mt-4 gap-2" isLoading={isLoading}>
              {isLoading ? 'Analyzing Land...' : <><Search className="w-5 h-5" /> Get Recommendations</>}
            </Button>
          </form>
        </Card>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <div className="relative w-20 h-20 mb-6">
                  <div className="absolute inset-0 border-4 border-emerald-100 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                  <Sprout className="absolute inset-0 m-auto w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Analyzing Your Land</h3>
                <p className="text-slate-500 max-w-xs">Our AI is processing your soil data and weather patterns to find the best crops...</p>
              </motion.div>
            ) : recommendations.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-bold text-slate-900">Top 5 Recommended Crops</h3>
                {recommendations.map((crop, i) => (
                  <Card key={i} className="p-6 border-l-4 border-l-emerald-500">
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <h4 className="text-2xl font-bold text-slate-900">{crop.cropName}</h4>
                          <span className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold">{crop.seedVariety}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                          <div className="flex items-center gap-2 text-slate-600">
                            <Clock className="w-4 h-4 text-emerald-500" />
                            <span className="text-sm">{crop.growingDuration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                            <Droplets className="w-4 h-4 text-blue-500" />
                            <span className="text-sm">{crop.waterRequirement}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                            <TrendingUp className="w-4 h-4 text-amber-500" />
                            <span className="text-sm">{crop.expectedYieldPerAcre} / Acre</span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <p className="text-sm font-bold text-slate-900 mb-2">Farming Steps:</p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {crop.farmingSteps.map((step, j) => (
                                <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                  {step}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900 mb-2">Risk Factors:</p>
                            <div className="flex flex-wrap gap-2">
                              {crop.riskFactors.map((risk, j) => (
                                <span key={j} className="flex items-center gap-1 px-2 py-1 rounded-lg bg-red-50 text-red-600 text-xs font-medium">
                                  <AlertTriangle className="w-3 h-3" /> {risk}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="md:w-48 flex flex-col justify-center items-center bg-slate-50 rounded-2xl p-6 text-center">
                        <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Estimated Profit</p>
                        <p className="text-3xl font-black text-emerald-600 mb-2">{crop.estimatedProfit}</p>
                        <p className="text-xs text-slate-400">Market Price: {crop.expectedMarketPrice}</p>
                        <Button variant="outline" size="sm" className="mt-4 w-full">View Details</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-2xl border border-dashed border-slate-200">
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-4">
                  <Sprout className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">No Recommendations Yet</h3>
                <p className="text-slate-500 max-w-xs">Fill out the form on the left to get AI-powered crop suggestions for your farm.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
