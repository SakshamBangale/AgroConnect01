import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/LandingPage';
import { SignupPage } from './pages/SignupPage';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard';
import { CropRecommendationPage } from './pages/CropRecommendationPage';
import { WeatherPage } from './pages/WeatherPage';
import { ProfitCalculatorPage } from './pages/ProfitCalculatorPage';
import { MarketPricePage } from './pages/MarketPricePage';
import { CommunityPage } from './pages/CommunityPage';
import { DiseaseDetectionPage } from './pages/DiseaseDetectionPage';
import { LibraryPage } from './pages/LibraryPage';
import { ProfilePage } from './pages/ProfilePage';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/crop-recommendation" element={<CropRecommendationPage />} />
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="/profit-calculator" element={<ProfitCalculatorPage />} />
          <Route path="/market" element={<MarketPricePage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/disease-detection" element={<DiseaseDetectionPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
