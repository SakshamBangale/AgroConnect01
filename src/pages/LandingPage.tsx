import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sprout, 
  Users, 
  Calculator, 
  CloudSun, 
  ArrowRight, 
  CheckCircle2, 
  Leaf,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { motion } from 'motion/react';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-emerald-600 font-bold text-2xl">
          <Leaf className="w-8 h-8" />
          <span>AgroConnect</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-slate-600 font-medium">
          <a href="#features" className="hover:text-emerald-600 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-emerald-600 transition-colors">How it Works</a>
          <Link to="/auth/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link to="/auth/signup">
            <Button>Get Started</Button>
          </Link>
        </div>
        <div className="md:hidden">
           <Link to="/auth/login">
            <Button size="sm">Login</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-24 grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold mb-6">
            <Sprout className="w-4 h-4" />
            Empowering 1M+ Farmers
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight mb-6">
            Start Farming <span className="text-emerald-600">Smart</span> with AI
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-lg">
            The all-in-one platform for crop recommendations, weather insights, and profit calculations. Connect with experts and grow your future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/auth/signup">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                Start Farming Smart <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Watch Demo
            </Button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1000" 
              alt="Farmer in field" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 max-w-xs">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Expected Profit</p>
                <p className="text-lg font-bold text-slate-900">+42% Increase</p>
              </div>
            </div>
            <p className="text-xs text-slate-500">Based on AI crop recommendations for your soil type.</p>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything You Need to Succeed</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Powerful tools designed specifically for the modern farmer to maximize yield and minimize risk.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Sprout, title: 'AI Recommendations', desc: 'Get the best crop suggestions based on your soil and climate.' },
              { icon: Users, title: 'Farmer Community', desc: 'Share knowledge and get advice from experienced farmers.' },
              { icon: Calculator, title: 'Profit Calculator', desc: 'Estimate your costs and income before you even plant.' },
              { icon: CloudSun, title: 'Weather Insights', desc: 'Hyper-local weather forecasts and farming advice.' },
            ].map((feature, i) => (
              <Card key={i} className="p-8 text-center hover:border-emerald-200 transition-colors">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto mb-6">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">How AgroConnect Works</h2>
              <div className="space-y-8">
                {[
                  { step: '01', title: 'Register Your Account', desc: 'Sign up with your phone number and basic details.' },
                  { step: '02', title: 'Add Farm Details', desc: 'Tell us about your soil type, location, and farm size.' },
                  { step: '03', title: 'Get AI Insights', desc: 'Receive personalized crop and technique recommendations.' },
                  { step: '04', title: 'Grow & Profit', desc: 'Follow the advice, track your progress, and increase yield.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="text-4xl font-black text-emerald-100">{item.step}</div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 bg-emerald-600 rounded-3xl p-12 text-white">
              <h3 className="text-2xl font-bold mb-6">Ready to transform your farm?</h3>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-200" />
                  <span>Free AI crop analysis</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-200" />
                  <span>Real-time market prices</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-200" />
                  <span>Expert community access</span>
                </li>
              </ul>
              <Link to="/auth/signup">
                <Button variant="secondary" size="lg" className="w-full">
                  Join AgroConnect Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 text-white font-bold text-2xl mb-6">
              <Leaf className="w-8 h-8 text-emerald-500" />
              <span>AgroConnect</span>
            </div>
            <p className="max-w-sm mb-6">
              Empowering rural farmers with cutting-edge AI technology to build a more sustainable and profitable future for agriculture.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Platform</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-emerald-500">Crop AI</a></li>
              <li><a href="#" className="hover:text-emerald-500">Market Prices</a></li>
              <li><a href="#" className="hover:text-emerald-500">Community</a></li>
              <li><a href="#" className="hover:text-emerald-500">Weather</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Contact</h4>
            <ul className="space-y-3">
              <li>support@sakshambangale.com</li>
              <li>+91 98501 21183</li>
              <li>Wardha Maharashtra, India</li>
            </ul>
          </div>
        </div>
        
      </footer>
    </div>
  );
};
