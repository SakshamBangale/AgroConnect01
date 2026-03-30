import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, PieChart as PieIcon, ArrowRight, Info } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  Legend
} from 'recharts';

export const ProfitCalculatorPage = () => {
  const [formData, setFormData] = useState({
    landSize: 1,
    seedCost: 5000,
    fertilizerCost: 8000,
    laborCost: 12000,
    irrigationCost: 3000,
    expectedYield: 25,
    marketPrice: 2400
  });

  const totalCost = (formData.seedCost + formData.fertilizerCost + formData.laborCost + formData.irrigationCost) * formData.landSize;
  const expectedRevenue = formData.expectedYield * formData.marketPrice * formData.landSize;
  const estimatedProfit = expectedRevenue - totalCost;
  const profitMargin = (estimatedProfit / expectedRevenue) * 100;

  const chartData = [
    { name: 'Seeds', value: formData.seedCost },
    { name: 'Fertilizer', value: formData.fertilizerCost },
    { name: 'Labor', value: formData.laborCost },
    { name: 'Irrigation', value: formData.irrigationCost },
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Farm Profit Calculator</h1>
          <p className="text-slate-500">Plan your investment and estimate your returns</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Inputs */}
        <Card className="p-6 space-y-6">
          <h3 className="text-lg font-bold text-slate-900">Cost Estimates (per Acre)</h3>
          <div className="space-y-4">
            <Input 
              label="Land Size (Acres)" 
              type="number" 
              value={formData.landSize}
              onChange={(e) => setFormData({ ...formData, landSize: Number(e.target.value) })}
            />
            <Input 
              label="Seed Cost (₹)" 
              type="number" 
              value={formData.seedCost}
              onChange={(e) => setFormData({ ...formData, seedCost: Number(e.target.value) })}
            />
            <Input 
              label="Fertilizer & Pesticide (₹)" 
              type="number" 
              value={formData.fertilizerCost}
              onChange={(e) => setFormData({ ...formData, fertilizerCost: Number(e.target.value) })}
            />
            <Input 
              label="Labor Cost (₹)" 
              type="number" 
              value={formData.laborCost}
              onChange={(e) => setFormData({ ...formData, laborCost: Number(e.target.value) })}
            />
            <Input 
              label="Irrigation & Fuel (₹)" 
              type="number" 
              value={formData.irrigationCost}
              onChange={(e) => setFormData({ ...formData, irrigationCost: Number(e.target.value) })}
            />
            <hr className="my-6 border-slate-100" />
            <h3 className="text-lg font-bold text-slate-900">Revenue Estimates</h3>
            <Input 
              label="Expected Yield (Quintals/Acre)" 
              type="number" 
              value={formData.expectedYield}
              onChange={(e) => setFormData({ ...formData, expectedYield: Number(e.target.value) })}
            />
            <Input 
              label="Expected Market Price (₹/Quintal)" 
              type="number" 
              value={formData.marketPrice}
              onChange={(e) => setFormData({ ...formData, marketPrice: Number(e.target.value) })}
            />
          </div>
        </Card>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-slate-900 text-white border-none">
              <p className="text-slate-400 text-sm font-medium mb-1">Total Investment</p>
              <h3 className="text-2xl font-bold">₹{totalCost.toLocaleString()}</h3>
            </Card>
            <Card className="p-6 bg-emerald-600 text-white border-none">
              <p className="text-emerald-100 text-sm font-medium mb-1">Expected Revenue</p>
              <h3 className="text-2xl font-bold">₹{expectedRevenue.toLocaleString()}</h3>
            </Card>
            <Card className="p-6 bg-amber-500 text-white border-none">
              <p className="text-amber-100 text-sm font-medium mb-1">Estimated Profit</p>
              <h3 className="text-2xl font-bold">₹{estimatedProfit.toLocaleString()}</h3>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Cost Breakdown</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-6 flex flex-col justify-center items-center text-center">
              <div className="w-24 h-24 rounded-full border-8 border-emerald-100 flex items-center justify-center mb-6">
                <span className="text-xl font-bold text-emerald-600">{profitMargin.toFixed(1)}%</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Profit Margin</h3>
              <p className="text-slate-500 text-sm max-w-xs">
                Your estimated profit margin is {profitMargin.toFixed(1)}%. This is considered a {profitMargin > 30 ? 'healthy' : 'moderate'} return for this crop type.
              </p>
              <div className="mt-8 p-4 bg-blue-50 rounded-xl flex gap-3 text-left">
                <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <p className="text-xs text-blue-700">
                  Tip: Reducing labor costs by 10% through mechanization could increase your profit by ₹{(formData.laborCost * 0.1 * formData.landSize).toLocaleString()}.
                </p>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">Profit Projection</h3>
              <div className="flex gap-2">
                <span className="px-2 py-1 rounded bg-emerald-50 text-emerald-600 text-xs font-bold">Best Case</span>
                <span className="px-2 py-1 rounded bg-slate-50 text-slate-600 text-xs font-bold">Average</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Market Price Increase (+10%)</p>
                    <p className="text-xs text-slate-500">If prices rise to ₹{(formData.marketPrice * 1.1).toFixed(0)}</p>
                  </div>
                </div>
                <p className="text-emerald-600 font-bold">+₹{(expectedRevenue * 0.1).toLocaleString()}</p>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">High Yield (+15%)</p>
                    <p className="text-xs text-slate-500">With optimal fertilizer use</p>
                  </div>
                </div>
                <p className="text-emerald-600 font-bold">+₹{(expectedRevenue * 0.15).toLocaleString()}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
