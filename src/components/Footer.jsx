import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Store,
  CheckCircle2,
  Lock
} from 'lucide-react';

export const Footer = () => {
  const { navigateTo, setCategoryFilter, showToast, vendors } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      showToast('Welcome to AURA LUXE Private Client Editorial!', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#0a0a0a] text-white border-t border-[#222]">
      {/* 1. Value Proposition Banner (Farfetch Luxury Guarantees) */}
      <div className="border-b border-[#1c1c1c] py-10 bg-[#0e0e0e]">
        <div className="luxury-container grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#1c1c1c] border border-[#333] flex items-center justify-center shrink-0 text-[#c5a059]">
              <Store size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Direct Boutique Curation</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Handpicked collections directly from verified independent boutiques in Paris, Milan, London & Tokyo.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#1c1c1c] border border-[#333] flex items-center justify-center shrink-0 text-[#c5a059]">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">100% Authenticity Guaranteed</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Every piece is authenticated by boutique specialists and backed by blockchain NFC verification.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#1c1c1c] border border-[#333] flex items-center justify-center shrink-0 text-[#c5a059]">
              <Truck size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Global Express Courier</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Fast, insured worldwide air transit via DHL Express and FedEx Luxury with seamless customs clearance.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#1c1c1c] border border-[#333] flex items-center justify-center shrink-0 text-[#c5a059]">
              <RotateCcw size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Complimentary Returns</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                14-day hassle-free global return pickup directly from your doorstep with pre-printed return labels.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main 5-Column Luxury Footer Content */}
      <div className="luxury-container py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Col 1: Brand & Newsletter */}
        <div className="lg:col-span-2 pr-0 lg:pr-8">
          <div className="font-serif text-2xl font-bold tracking-[0.2em] text-white">
            AURA LUXE
          </div>
          <p className="text-xs text-gray-400 mt-3 leading-relaxed max-w-sm">
            The global destination for modern luxury fashion. Connecting discerning clientele with the world’s most prestigious independent designer boutiques.
          </p>

          <div className="mt-6">
            <div className="text-xs font-bold uppercase tracking-wider text-[#c5a059] mb-2 flex items-center gap-1.5">
              <Sparkles size={13} />
              <span>Join The Private Client List</span>
            </div>
            <p className="text-[11px] text-gray-400 mb-3">
              Receive 15% off your first boutique acquisition with code <strong className="text-white font-mono">LUXURY2026</strong>.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800 p-2.5 rounded-xs">
                <CheckCircle2 size={16} />
                <span>You are on the VIP guest list!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="bg-[#181818] border border-[#333] text-xs text-white px-3.5 py-2.5 rounded-xs flex-1 focus:outline-none focus:border-[#c5a059]"
                />
                <button
                  type="submit"
                  className="btn-gold !py-2.5 !px-4 text-xs shrink-0 flex items-center gap-1"
                >
                  <span>Join</span>
                  <ArrowRight size={13} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Col 2: Customer Service & 5 Pages */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#d8d8d8] mb-4">
            Navigation & Pages
          </h4>
          <ul className="space-y-2.5 text-xs text-gray-400">
            <li>
              <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">
                01. Home Showcase
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('shop')} className="hover:text-white transition-colors">
                02. Shop / Catalog
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('product-detail', 'prod-001')} className="hover:text-white transition-colors">
                03. Product Details
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('cart-checkout')} className="hover:text-white transition-colors">
                04. Cart & Checkout
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('account')} className="hover:text-white transition-colors">
                05. Client Account
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Featured Boutiques & Vendors */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#d8d8d8] mb-4">
            Partner Boutiques
          </h4>
          <ul className="space-y-2.5 text-xs text-gray-400">
            {vendors.map((v) => (
              <li key={v.id} className="flex items-center justify-between">
                <span className="text-gray-300 font-medium">{v.name}</span>
                <span className="text-[10px] text-gray-500 uppercase">{v.city}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: SaaS Portals & Access Control */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#d8d8d8] mb-4">
            SaaS Portals
          </h4>
          <ul className="space-y-2.5 text-xs text-gray-400">
            <li>
              <button
                onClick={() => navigateTo('vendor-dashboard')}
                className="hover:text-[#c5a059] transition-colors flex items-center gap-1.5"
              >
                <Store size={12} className="text-[#c5a059]" />
                <span>Vendor Seller Suite</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo('admin-dashboard')}
                className="hover:text-purple-400 transition-colors flex items-center gap-1.5"
              >
                <ShieldCheck size={12} className="text-purple-400" />
                <span>Super Admin HQ</span>
              </button>
            </li>
            <li>
              <span className="text-gray-500 flex items-center gap-1">
                <Lock size={10} />
                <span>RBAC Client Access Control</span>
              </span>
            </li>
            <li>
              <span className="text-gray-500">Real-time CSV/JSON Export</span>
            </li>
            <li>
              <span className="text-gray-500">Escrow Payout Settlement</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 3. Copyright & Legal Bar */}
      <div className="border-t border-[#181818] py-6 bg-[#070707] text-[11px] text-gray-500">
        <div className="luxury-container flex flex-col md:flex-row items-center justify-between gap-3">
          <div>
            © 2026 AURA LUXE Global Multi-Vendor Fashion Platform. Inspired by FARFETCH Luxury Architecture.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-gray-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-gray-300 cursor-pointer">Cookie Preferences</span>
            <span className="hover:text-gray-300 cursor-pointer">Security & Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
