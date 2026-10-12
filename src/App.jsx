import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import RouteGuard from './components/RouteGuard';

// Pages
import HomePage from './pages/HomePage';
import SegregationPage from './pages/SegregationPage';
import CollectionPointsPage from './pages/CollectionPointsPage';
import DonateSellPage from './pages/DonateSellPage';
import MarketplacePage from './pages/MarketplacePage';
import ImpactPage from './pages/ImpactPage';
import ContactPage from './pages/ContactPage';
import AdminPlaceholderPage from './pages/AdminPlaceholderPage';

// Scroll restoration helper
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-rrr-earth-50 text-rrr-earth-900 font-sans">
      <ScrollToTop />
      {/* Top Header with Language Switcher */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 sm:py-8 pb-24 lg:pb-12">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/segregate" element={<SegregationPage />} />
          <Route path="/points" element={<CollectionPointsPage />} />
          <Route path="/donate-sell" element={<DonateSellPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/impact" element={<ImpactPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route 
            path="/admin" 
            element={
              <RouteGuard requiredRole="admin">
                <AdminPlaceholderPage />
              </RouteGuard>
            } 
          />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Desktop & Mobile Footers */}
      <Footer />

      {/* Sticky Mobile Navigation Bar */}
      <MobileBottomNav />
    </div>
  );
}
