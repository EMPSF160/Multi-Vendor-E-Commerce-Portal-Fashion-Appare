import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { QuickViewModal } from './components/QuickViewModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { ToastContainer } from './components/ToastContainer';

// 5 Main Pages + 2 SaaS Portals
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartCheckoutPage } from './pages/CartCheckoutPage';
import { AccountPage } from './pages/AccountPage';
import { VendorDashboard } from './pages/VendorDashboard';
import { AdminDashboard } from './pages/AdminDashboard';

export function AppContent() {
  const { activePage } = useApp();

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfbfa] text-[#0d0d0d]">
      <Navbar />

      {/* Main Page Routing */}
      <main className="flex-1">
        {activePage === 'home' && <HomePage />}
        {activePage === 'shop' && <ShopPage />}
        {activePage === 'product-detail' && <ProductDetailPage />}
        {activePage === 'cart-checkout' && <CartCheckoutPage />}
        {activePage === 'account' && <AccountPage />}
        {activePage === 'vendor-dashboard' && <VendorDashboard />}
        {activePage === 'admin-dashboard' && <AdminDashboard />}
      </main>

      <Footer />

      {/* Global Modals & Notifications */}
      <AuthModal />
      <QuickViewModal />
      <SizeGuideModal />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
