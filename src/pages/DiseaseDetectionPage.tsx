import React, { useState, useRef } from 'react';
import { ScanSearch, Upload, Camera, Loader2, CheckCircle2, AlertTriangle, Leaf, Info } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { detectCropDisease } from '../services/geminiService';
import { motion, AnimatePresence } from 'motion/react';

export const DiseaseDetectionPage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setIsLoading(true);
    try {
      const base64 = image.split(',')[1];
      const data = await detectCropDisease(base64);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600">
          <ScanSearch className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Crop Disease Detection</h1>
          <p className="text-slate-500">Upload a photo of your crop to detect diseases instantly</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <Card className="p-8 flex flex-col items-center justify-center min-h-[400px]">
          <AnimatePresence mode="wait">
            {image ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full space-y-6"
              >
                <div className="aspect-video rounded-2xl overflow-hidden border-4 border-slate-100 shadow-lg relative">
                  <img src={image} alt="Uploaded crop" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => setImage(null)}
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2 rounded-full text-red-600 shadow-sm hover:bg-white"
                  >
                    <AlertTriangle className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1 py-3" onClick={() => fileInputRef.current?.click()}>
                    Change Photo
                  </Button>
                  <Button className="flex-1 py-3 gap-2" isLoading={isLoading} onClick={handleAnalyze}>
                    {isLoading ? 'Analyzing...' : <><ScanSearch className="w-5 h-5" /> Analyze Image</>}
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mx-auto mb-6 border-2 border-dashed border-slate-200">
                  <Camera className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Upload Crop Photo</h3>
                <p className="text-slate-500 max-w-xs mx-auto mb-8">
                  Take a clear photo of the affected leaf or stem for accurate detection.
                </p>
                <Button size="lg" className="gap-2" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="w-5 h-5" /> Select from Gallery
                </Button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Result Section */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center py-24 text-center"
              >
                <div className="relative w-20 h-20 mb-6">
                  <div className="absolute inset-0 border-4 border-orange-100 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                  <ScanSearch className="absolute inset-0 m-auto w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Scanning for Diseases</h3>
                <p className="text-slate-500 max-w-xs">Our AI is analyzing the visual patterns to identify possible infections...</p>
              </motion.div>
            ) : result ? (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <Card className="p-6 border-l-4 border-l-orange-500">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                      <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Detected Disease</p>
                      <h3 className="text-2xl font-bold text-slate-900">{result.disease}</h3>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Treatment Recommendation
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-4 rounded-xl">
                        {result.treatment}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-emerald-500" /> Fertilizer Suggestion
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-4 rounded-xl">
                        {result.fertilizerSuggestion}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-blue-50 border-none">
                  <div className="flex gap-4">
                    <Info className="w-6 h-6 text-blue-500 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-blue-900 mb-1">Expert Advice</h4>
                      <p className="text-sm text-blue-700">
                        We recommend isolating the affected plants immediately to prevent further spread. Consult with a local agricultural advisor if symptoms persist.
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center py-24 text-center bg-white rounded-2xl border border-dashed border-slate-200">
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-4">
                  <ScanSearch className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Analysis Result</h3>
                <p className="text-slate-500 max-w-xs mx-auto">Upload an image and click analyze to see the results here.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
