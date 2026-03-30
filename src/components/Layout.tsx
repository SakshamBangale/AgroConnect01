import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Sprout, 
  CloudSun, 
  Calculator, 
  Users, 
  TrendingUp, 
  BookOpen, 
  ScanSearch, 
  Bell, 
  User,
  LogOut,
  Menu,
  X,
  Leaf
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Sprout, label: 'Crop AI', path: '/crop-recommendation' },
  { icon: CloudSun, label: 'Weather', path: '/weather' },
  { icon: Calculator, label: 'Profit Calc', path: '/profit-calculator' },
  { icon: TrendingUp, label: 'Market', path: '/market' },
  { icon: Users, label: 'Community', path: '/community' },
  { icon: ScanSearch, label: 'Disease Detection', path: '/disease-detection' },
  { icon: BookOpen, label: 'Library', path: '/library' },
];

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    if (!user && location.pathname !== '/' && !location.pathname.startsWith('/auth')) {
      navigate('/');
    }
  }, [user, location.pathname, navigate]);

  if (location.pathname === '/' || location.pathname.startsWith('/auth')) {
    return <>{children}</>;
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-2 text-emerald-600 font-bold text-xl">
          <Leaf className="w-8 h-8" />
          <span>AgroConnect</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
                location.pathname === item.path 
                  ? "bg-emerald-50 text-emerald-700 font-medium" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <Link to="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors mb-2">
            <User className="w-5 h-5" />
            Profile
          </Link>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Nav */}
      <header className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2 text-emerald-600 font-bold text-lg">
          <Leaf className="w-6 h-6" />
          <span>AgroConnect</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 md:hidden pt-20 px-6">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-4 rounded-xl text-lg",
                  location.pathname === item.path 
                    ? "bg-emerald-50 text-emerald-700 font-bold" 
                    : "text-slate-600"
                )}
              >
                <item.icon className="w-6 h-6" />
                {item.label}
              </Link>
            ))}
            <hr className="my-4 border-slate-100" />
            <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-4 text-slate-600 text-lg">
              <User className="w-6 h-6" />
              Profile
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-4 text-red-600 text-lg w-full text-left">
              <LogOut className="w-6 h-6" />
              Logout
            </button>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
};
