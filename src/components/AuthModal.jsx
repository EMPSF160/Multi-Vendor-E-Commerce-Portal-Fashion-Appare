import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Lock,
  Mail,
  User,
  Store,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { USERS } from '../data/mockData';

export const AuthModal = () => {
  const { authModal, setAuthModal, login, register, showToast } = useApp();
  const [activeTab, setActiveTab] = useState(authModal.mode || 'login'); // 'login' | 'register' | 'forgot'
  const [role, setRole] = useState(authModal.rolePrefill || 'customer');

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [boutiqueName, setBoutiqueName] = useState('');
  const [city, setCity] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  if (!authModal.isOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login(email || 'client@auraluxe.com', role);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    register({
      name: fullName || (role === 'vendor' ? boutiqueName : 'New VIP Client'),
      email: email,
      role: role,
      city: city || 'Paris'
    });
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setForgotSent(true);
    showToast(`Password reset link sent to ${email}`, 'success');
  };

  const handleQuickLogin = (userRole) => {
    login(USERS.find((u) => u.role === userRole)?.email, userRole);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content !max-w-lg border border-[#e5e0d8] shadow-2xl">
        {/* Header */}
        <div className="bg-[#0f0f0f] text-white p-6 relative">
          <button
            onClick={() => setAuthModal({ ...authModal, isOpen: false })}
            className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          <div className="font-serif text-xl font-bold tracking-[0.18em] text-[#c5a059] uppercase">
            AURA LUXE
          </div>
          <p className="text-xs text-gray-300 mt-1">
            Access your curated fashion wardrobe & multi-vendor dashboard
          </p>

          {/* Tab Selector */}
          <div className="flex items-center gap-6 mt-6 border-b border-[#2b2b2b] text-xs font-semibold tracking-wider uppercase">
            <button
              onClick={() => {
                setActiveTab('login');
                setForgotSent(false);
              }}
              className={`pb-2.5 transition-colors border-b-2 ${
                activeTab === 'login' ? 'border-[#c5a059] text-white' : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setActiveTab('register');
                setForgotSent(false);
              }}
              className={`pb-2.5 transition-colors border-b-2 ${
                activeTab === 'register' ? 'border-[#c5a059] text-white' : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              Register
            </button>
            <button
              onClick={() => setActiveTab('forgot')}
              className={`pb-2.5 transition-colors border-b-2 ${
                activeTab === 'forgot' ? 'border-[#c5a059] text-white' : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              Forgot Password
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 bg-white">
          {/* 1. Quick One-Click Simulated Logins (Instant Demo convenience) */}
          {activeTab === 'login' && (
            <div className="mb-6 p-3.5 bg-[#faf8f4] border border-[#ebd9b5] rounded-xs">
              <div className="text-[10px] font-bold tracking-widest uppercase text-[#785312] mb-2 flex items-center gap-1.5">
                <Sparkles size={12} className="text-[#c5a059]" />
                <span>Instant 1-Click Role Login</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('customer')}
                  className="px-2.5 py-1.5 bg-white hover:bg-black hover:text-white border border-[#ddd] text-[11px] font-semibold rounded-xs transition-colors text-left flex flex-col"
                >
                  <span className="font-bold flex items-center gap-1">
                    <User size={11} className="text-emerald-600" /> Customer
                  </span>
                  <span className="text-[9px] text-gray-500">Sophia Laurent</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('vendor')}
                  className="px-2.5 py-1.5 bg-white hover:bg-black hover:text-white border border-[#ddd] text-[11px] font-semibold rounded-xs transition-colors text-left flex flex-col"
                >
                  <span className="font-bold flex items-center gap-1">
                    <Store size={11} className="text-amber-600" /> Vendor
                  </span>
                  <span className="text-[9px] text-gray-500">Atelier Montaigne</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('admin')}
                  className="px-2.5 py-1.5 bg-white hover:bg-black hover:text-white border border-[#ddd] text-[11px] font-semibold rounded-xs transition-colors text-left flex flex-col"
                >
                  <span className="font-bold flex items-center gap-1">
                    <ShieldCheck size={11} className="text-purple-600" /> Admin
                  </span>
                  <span className="text-[9px] text-gray-500">Alexander Vance</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 1: SIGN IN */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1.5">
                  Account Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('customer')}
                    className={`py-2 text-xs font-medium border rounded-xs transition-colors ${
                      role === 'customer' ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                  >
                    Customer
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('vendor')}
                    className={`py-2 text-xs font-medium border rounded-xs transition-colors ${
                      role === 'vendor' ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                  >
                    Vendor / Seller
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('admin')}
                    className={`py-2 text-xs font-medium border rounded-xs transition-colors ${
                      role === 'admin' ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                  >
                    Platform Admin
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={
                      role === 'customer'
                        ? 'sophia.laurent@luxury-client.com'
                        : role === 'vendor'
                        ? 'manager@atelier-montaigne.paris'
                        : 'alexander.vance@auraluxe.com'
                    }
                    className="luxury-input !pl-9"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold uppercase text-gray-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setActiveTab('forgot')}
                    className="text-[11px] text-gray-500 hover:text-black underline"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="luxury-input !pl-9"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full btn-primary !py-3 flex items-center justify-center gap-2 mt-2"
              >
                <span>Sign In as {role.toUpperCase()}</span>
                <ArrowRight size={14} />
              </button>
            </form>
          )}

          {/* TAB 2: REGISTER */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1.5">
                  I want to register as
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('customer')}
                    className={`py-2 text-xs font-medium border rounded-xs transition-colors ${
                      role === 'customer' ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                  >
                    VIP Private Client
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('vendor')}
                    className={`py-2 text-xs font-medium border rounded-xs transition-colors ${
                      role === 'vendor' ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                  >
                    Designer Boutique / Vendor
                  </button>
                </div>
              </div>

              {role === 'customer' ? (
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Eleanor Vance"
                      required
                      className="luxury-input !pl-9"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                      Boutique / Brand Name
                    </label>
                    <div className="relative">
                      <Store size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={boutiqueName}
                        onChange={(e) => setBoutiqueName(e.target.value)}
                        placeholder="e.g. Maison Aurelia"
                        required
                        className="luxury-input !pl-9"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                      Boutique City & Country
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Milan, Italy"
                      required
                      className="luxury-input"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@luxury-domain.com"
                    required
                    className="luxury-input !pl-9"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  Create Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className="luxury-input !pl-9"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full btn-gold !py-3 flex items-center justify-center gap-2 mt-2"
              >
                <span>Create {role === 'vendor' ? 'Vendor Boutique' : 'VIP Client'} Account</span>
                <ArrowRight size={14} />
              </button>
            </form>
          )}

          {/* TAB 3: FORGOT PASSWORD */}
          {activeTab === 'forgot' && (
            <div>
              {forgotSent ? (
                <div className="text-center py-6">
                  <CheckCircle2 size={44} className="text-emerald-600 mx-auto mb-3" />
                  <h3 className="font-serif text-lg font-bold text-gray-900">Reset Instructions Dispatched</h3>
                  <p className="text-xs text-gray-500 mt-2">
                    We have sent a secure password recovery link to <strong className="text-gray-800">{email || 'your email'}</strong>. Please check your inbox.
                  </p>
                  <button
                    onClick={() => setActiveTab('login')}
                    className="mt-5 btn-primary !py-2 !px-6 text-xs"
                  >
                    Back to Sign In
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  <p className="text-xs text-gray-500">
                    Enter the email associated with your AURA LUXE account and we’ll send you a secure verification link to reset your credentials.
                  </p>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                      Registered Email
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="client@luxury-domain.com"
                        required
                        className="luxury-input !pl-9"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary !py-3 flex items-center justify-center gap-2"
                  >
                    <span>Send Password Reset Link</span>
                    <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
