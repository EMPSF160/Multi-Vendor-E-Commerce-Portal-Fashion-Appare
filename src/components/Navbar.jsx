import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShoppingBag,
  Heart,
  User,
  Search,
  Globe,
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  Store,
  ShieldCheck,
  LogOut,
  ArrowRight,
  X,
  Check,
  Menu
} from 'lucide-react';
import { CURRENCY_RATES, CATEGORIES } from '../data/mockData';

export const Navbar = () => {
  const {
    activePage,
    navigateTo,
    activeRole,
    currentUser,
    switchRole,
    setAuthModal,
    logout,
    cart,
    wishlist,
    currency,
    setCurrency,
    searchQuery,
    setSearchQuery,
    products,
    setCategoryFilter
  } = useApp();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchInputRef = useRef(null);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Filter products for search autocomplete
  const searchResults = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.vendorName.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('shop');
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  const handleSelectProduct = (productId) => {
    navigateTo('product-detail', productId);
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
    setSearchQuery('');
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#ece8e1]">
      {/* 1. Top Luxury Announcement & Multi-Vendor Role Bar */}
      <div className="bg-[#0c0c0c] text-white text-xs border-b border-[#222]">
        <div className="luxury-container py-1.5 sm:py-2 flex items-center justify-between gap-2">
          {/* Announcement (hidden on extra small screens or compact badge) */}
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] tracking-wide text-[#d4af37] min-w-0 truncate">
            <Sparkles size={12} className="text-[#d4af37] animate-pulse shrink-0" />
            <span className="font-semibold whitespace-nowrap">SS26 PARIS EDIT</span>
            <span className="text-[#dedede] hidden md:inline truncate">
              • Express Worldwide Delivery on $500+ • Verified Boutique Authenticity
            </span>
          </div>

          {/* Right Controls: Role Switcher & Currency */}
          <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-[11px] shrink-0">
            {/* Quick Portal Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
                className="flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-[#1c1c1c] hover:bg-[#2a2a2a] border border-[#333] text-[#e8e8e8] transition-colors"
                title="Switch portal perspective"
              >
                {activeRole === 'customer' && <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400"></span>}
                {activeRole === 'vendor' && <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400"></span>}
                {activeRole === 'admin' && <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-400"></span>}
                <span className="font-semibold tracking-wider uppercase text-[9px] sm:text-[10px]">
                  {activeRole === 'customer' && 'VIP Customer'}
                  {activeRole === 'vendor' && 'Vendor Suite'}
                  {activeRole === 'admin' && 'Admin HQ'}
                </span>
                <ChevronDown size={10} className="text-[#888]" />
              </button>

              {isRoleMenuOpen && (
                <div
                  className="absolute right-0 mt-1.5 w-56 sm:w-60 bg-[#161616] border border-[#333] shadow-2xl rounded-sm py-1.5 z-50"
                  onMouseLeave={() => setIsRoleMenuOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[10px] text-[#777] uppercase font-bold tracking-widest border-b border-[#262626]">
                    Simulate Platform Persona
                  </div>
                  <button
                    onClick={() => {
                      switchRole('customer');
                      setIsRoleMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-[#222] transition-colors ${
                      activeRole === 'customer' ? 'text-[#d4af37]' : 'text-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <User size={13} />
                      <div>
                        <div className="text-xs font-medium">Customer / Client</div>
                        <div className="text-[10px] text-gray-400">Sophia Laurent (Gold VIP)</div>
                      </div>
                    </div>
                    {activeRole === 'customer' && <Check size={13} />}
                  </button>

                  <button
                    onClick={() => {
                      switchRole('vendor');
                      setIsRoleMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-[#222] transition-colors ${
                      activeRole === 'vendor' ? 'text-[#d4af37]' : 'text-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Store size={13} />
                      <div>
                        <div className="text-xs font-medium">Vendor Boutique</div>
                        <div className="text-[10px] text-gray-400">Atelier Montaigne Paris</div>
                      </div>
                    </div>
                    {activeRole === 'vendor' && <Check size={13} />}
                  </button>

                  <button
                    onClick={() => {
                      switchRole('admin');
                      setIsRoleMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-[#222] transition-colors ${
                      activeRole === 'admin' ? 'text-[#d4af37]' : 'text-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={13} />
                      <div>
                        <div className="text-xs font-medium">Platform Super Admin</div>
                        <div className="text-[10px] text-gray-400">Alexander Vance (Global HQ)</div>
                      </div>
                    </div>
                    {activeRole === 'admin' && <Check size={13} />}
                  </button>
                </div>
              )}
            </div>

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                className="flex items-center gap-1 text-[#aaa] hover:text-white transition-colors"
              >
                <Globe size={11} />
                <span className="font-semibold text-[10px] sm:text-xs">{currency}</span>
                <ChevronDown size={9} />
              </button>

              {isCurrencyOpen && (
                <div
                  className="absolute right-0 mt-1.5 w-36 bg-[#161616] border border-[#333] shadow-xl rounded-sm py-1 z-50"
                  onMouseLeave={() => setIsCurrencyOpen(false)}
                >
                  {Object.entries(CURRENCY_RATES).map(([code, data]) => (
                    <button
                      key={code}
                      onClick={() => {
                        setCurrency(code);
                        setIsCurrencyOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#222] ${
                        currency === code ? 'text-[#d4af37] font-semibold' : 'text-gray-300'
                      }`}
                    >
                      <span>{code} ({data.symbol})</span>
                      {currency === code && <Check size={12} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Luxury Header */}
      <div className="luxury-container py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Mobile Hamburger & Search (Mobile) / Search bar (Desktop) */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:flex-1 md:max-w-xs">
          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 text-[#222] hover:text-black rounded hover:bg-gray-100 transition-colors"
            title="Toggle Menu"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Mobile Search Icon Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden p-1.5 text-[#444] hover:text-black rounded hover:bg-gray-100 transition-colors"
            title="Search"
            aria-label="Search"
          >
            <Search size={19} />
          </button>

          {/* Desktop Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="hidden md:flex items-center gap-2.5 text-xs text-[#555] hover:text-black py-1.5 px-3 rounded border border-[#e0dcd4] bg-[#faf8f5] hover:border-[#aaa] transition-all w-full text-left"
          >
            <Search size={14} className="text-[#777]" />
            <span>Search runway, designers, items...</span>
          </button>
        </div>

        {/* Center: Brand Editorial Logo */}
        <div className="text-center cursor-pointer select-none px-1" onClick={() => navigateTo('home')}>
          <h1 className="font-serif text-lg sm:text-2xl md:text-3xl font-bold tracking-[0.16em] sm:tracking-[0.22em] text-[#0a0a0a] uppercase transition-transform duration-300 hover:scale-[1.01] whitespace-nowrap">
            AURA LUXE
          </h1>
          <p className="text-[7.5px] sm:text-[9px] tracking-[0.22em] sm:tracking-[0.35em] text-[#7a7a7a] uppercase font-sans font-medium -mt-0.5 whitespace-nowrap">
            PARIS • MILANO • TOKYO • LONDON
          </p>
        </div>

        {/* Right: Actions (Wishlist, Shopping Bag, Account) */}
        <div className="flex items-center justify-end gap-1.5 sm:gap-3 md:gap-5 md:flex-1">
          {/* Quick Vendor / Admin Dashboard link if active */}
          {activeRole === 'vendor' && (
            <button
              onClick={() => navigateTo('vendor-dashboard')}
              className={`hidden md:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded border transition-all ${
                activePage === 'vendor-dashboard'
                  ? 'bg-black text-white border-black'
                  : 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
              }`}
            >
              <Store size={14} />
              <span>Vendor Suite</span>
            </button>
          )}

          {activeRole === 'admin' && (
            <button
              onClick={() => navigateTo('admin-dashboard')}
              className={`hidden md:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded border transition-all ${
                activePage === 'admin-dashboard'
                  ? 'bg-black text-white border-black'
                  : 'bg-purple-50 text-purple-900 border-purple-300 hover:bg-purple-100'
              }`}
            >
              <ShieldCheck size={14} />
              <span>Admin HQ</span>
            </button>
          )}

          {/* Wishlist Button */}
          <button
            onClick={() => navigateTo('account')}
            className="relative p-1.5 sm:p-2 text-[#222] hover:text-black transition-colors"
            title="Wishlist"
          >
            <Heart size={19} className={wishlist.length > 0 ? "fill-[#c5a059] text-[#c5a059]" : ""} />
            {wishlist.length > 0 && (
              <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#c5a059] text-white text-[8px] sm:text-[9px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Bag Button */}
          <button
            onClick={() => navigateTo('cart-checkout')}
            className="relative p-1.5 sm:p-2 text-[#222] hover:text-black transition-colors flex items-center gap-1.5"
            title="Shopping Bag & Checkout"
          >
            <ShoppingBag size={19} />
            {cartItemsCount > 0 && (
              <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-black text-white text-[8px] sm:text-[9px] font-bold rounded-full flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </button>

          {/* User Account / Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="p-1 sm:p-1.5 flex items-center gap-1 sm:gap-2 rounded hover:bg-[#f2efe9] transition-colors"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover border border-[#c5a059]"
              />
              <span className="hidden lg:inline text-xs font-semibold text-[#111] max-w-[100px] truncate">
                {currentUser.name}
              </span>
              <ChevronDown size={11} className="text-[#666]" />
            </button>

            {isUserMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-64 max-w-[calc(100vw-1.5rem)] bg-white border border-[#e6e2db] shadow-2xl rounded-sm py-2 z-50"
                onMouseLeave={() => setIsUserMenuOpen(false)}
              >
                <div className="px-4 py-2 border-b border-[#f0ece5]">
                  <div className="font-semibold text-xs text-[#0a0a0a] truncate">{currentUser.name}</div>
                  <div className="text-[11px] text-[#666] truncate">{currentUser.email}</div>
                  <div className="mt-1">
                    <span className="badge-gold text-[9px]">
                      {currentUser.tier || `${currentUser.role.toUpperCase()} ACCESS`}
                    </span>
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      navigateTo('account');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-[#222] hover:bg-[#f6f4ee] flex items-center gap-2.5"
                  >
                    <User size={14} />
                    <span>My Luxury Account & Orders</span>
                  </button>

                  <button
                    onClick={() => {
                      navigateTo('cart-checkout');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-[#222] hover:bg-[#f6f4ee] flex items-center gap-2.5"
                  >
                    <ShoppingBag size={14} />
                    <span>Shopping Bag ({cartItemsCount})</span>
                  </button>

                  {/* Vendor link */}
                  <button
                    onClick={() => {
                      switchRole('vendor');
                      navigateTo('vendor-dashboard');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-amber-900 bg-amber-50/50 hover:bg-amber-100/70 flex items-center gap-2.5"
                  >
                    <Store size={14} className="text-amber-700" />
                    <span>Vendor Boutique Dashboard</span>
                  </button>

                  {/* Admin link */}
                  <button
                    onClick={() => {
                      switchRole('admin');
                      navigateTo('admin-dashboard');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-purple-900 bg-purple-50/50 hover:bg-purple-100/70 flex items-center gap-2.5"
                  >
                    <ShieldCheck size={14} className="text-purple-700" />
                    <span>Global Admin Suite</span>
                  </button>

                  <div className="border-t border-[#f0ece5] my-1"></div>

                  <button
                    onClick={() => {
                      setAuthModal({ isOpen: true, mode: 'login', rolePrefill: 'customer' });
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-[#333] hover:bg-[#f6f4ee] flex items-center gap-2.5"
                  >
                    <SlidersHorizontal size={14} />
                    <span>Switch Login Account</span>
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2.5"
                  >
                    <LogOut size={14} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer / Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#eae5dc] shadow-xl animate-fadeIn">
          <div className="px-4 py-3 space-y-3">
            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Main Navigation
            </div>
            <div className="grid grid-cols-1 gap-1 text-xs font-semibold">
              <button
                onClick={() => {
                  navigateTo('home');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left py-2 px-3 rounded flex items-center justify-between ${
                  activePage === 'home' ? 'bg-black text-white' : 'text-gray-800 hover:bg-gray-100'
                }`}
              >
                <span>01. HOME EDIT</span>
                <ArrowRight size={13} />
              </button>

              <button
                onClick={() => {
                  setCategoryFilter('all');
                  navigateTo('shop');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left py-2 px-3 rounded flex items-center justify-between ${
                  activePage === 'shop' ? 'bg-black text-white' : 'text-gray-800 hover:bg-gray-100'
                }`}
              >
                <span>02. SHOP ALL LUXURY</span>
                <ArrowRight size={13} />
              </button>

              <button
                onClick={() => {
                  navigateTo('product-detail', 'prod-001');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left py-2 px-3 rounded flex items-center justify-between ${
                  activePage === 'product-detail' ? 'bg-black text-white' : 'text-gray-800 hover:bg-gray-100'
                }`}
              >
                <span>03. PRODUCT SHOWCASE</span>
                <ArrowRight size={13} />
              </button>

              <button
                onClick={() => {
                  navigateTo('cart-checkout');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left py-2 px-3 rounded flex items-center justify-between ${
                  activePage === 'cart-checkout' ? 'bg-black text-white' : 'text-gray-800 hover:bg-gray-100'
                }`}
              >
                <span>04. BAG & CHECKOUT ({cartItemsCount})</span>
                <ArrowRight size={13} />
              </button>

              <button
                onClick={() => {
                  navigateTo('account');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left py-2 px-3 rounded flex items-center justify-between ${
                  activePage === 'account' ? 'bg-black text-white' : 'text-gray-800 hover:bg-gray-100'
                }`}
              >
                <span>05. CLIENT ACCOUNT</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="border-t border-[#ece7de] pt-2">
              <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">
                Departments
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['Women', 'Men', 'Bags', 'Jewelry'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setCategoryFilter(cat);
                      navigateTo('shop');
                      setIsMobileMenuOpen(false);
                    }}
                    className="px-2.5 py-1 bg-[#f3efe8] hover:bg-[#e7e1d6] text-[11px] font-medium rounded text-gray-800"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-[#ece7de] pt-2 grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  switchRole('vendor');
                  navigateTo('vendor-dashboard');
                  setIsMobileMenuOpen(false);
                }}
                className="py-2 px-2.5 text-[11px] font-semibold text-amber-900 bg-amber-50 border border-amber-200 rounded flex items-center justify-center gap-1.5"
              >
                <Store size={13} />
                <span>Vendor Suite</span>
              </button>
              <button
                onClick={() => {
                  switchRole('admin');
                  navigateTo('admin-dashboard');
                  setIsMobileMenuOpen(false);
                }}
                className="py-2 px-2.5 text-[11px] font-semibold text-purple-900 bg-purple-50 border border-purple-200 rounded flex items-center justify-center gap-1.5"
              >
                <ShieldCheck size={13} />
                <span>Admin Suite</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Luxury Navigation Bar (Desktop 5 Main Pages + Categories) */}
      <nav className="bg-[#faf9f6] border-t border-[#ece7de] hidden md:block overflow-x-auto no-scrollbar">
        <div className="luxury-container flex items-center justify-center gap-6 lg:gap-8 py-2.5 text-[11px] lg:text-xs font-semibold tracking-luxury text-[#2a2a2a] whitespace-nowrap flex-nowrap">
          <button
            onClick={() => navigateTo('home')}
            className={`transition-colors pb-1 border-b-2 whitespace-nowrap ${
              activePage === 'home' ? 'border-black text-black' : 'border-transparent text-[#555] hover:text-black'
            }`}
          >
            01. HOME EDIT
          </button>

          <button
            onClick={() => {
              setCategoryFilter('all');
              navigateTo('shop');
            }}
            className={`transition-colors pb-1 border-b-2 whitespace-nowrap ${
              activePage === 'shop' ? 'border-black text-black' : 'border-transparent text-[#555] hover:text-black'
            }`}
          >
            02. SHOP ALL LUXURY
          </button>

          <button
            onClick={() => navigateTo('product-detail', 'prod-001')}
            className={`transition-colors pb-1 border-b-2 whitespace-nowrap ${
              activePage === 'product-detail' ? 'border-black text-black' : 'border-transparent text-[#555] hover:text-black'
            }`}
          >
            03. PRODUCT SHOWCASE
          </button>

          <button
            onClick={() => navigateTo('cart-checkout')}
            className={`transition-colors pb-1 border-b-2 whitespace-nowrap ${
              activePage === 'cart-checkout' ? 'border-black text-black' : 'border-transparent text-[#555] hover:text-black'
            }`}
          >
            04. BAG & CHECKOUT
          </button>

          <button
            onClick={() => navigateTo('account')}
            className={`transition-colors pb-1 border-b-2 whitespace-nowrap ${
              activePage === 'account' ? 'border-black text-black' : 'border-transparent text-[#555] hover:text-black'
            }`}
          >
            05. CLIENT ACCOUNT
          </button>

          <span className="text-[#d0cbbf] select-none">|</span>

          {/* Categories Quick Filter Jump */}
          <button
            onClick={() => {
              setCategoryFilter('Women');
              navigateTo('shop');
            }}
            className="text-[#666] hover:text-black tracking-normal uppercase text-[11px] whitespace-nowrap"
          >
            Women
          </button>
          <button
            onClick={() => {
              setCategoryFilter('Men');
              navigateTo('shop');
            }}
            className="text-[#666] hover:text-black tracking-normal uppercase text-[11px] whitespace-nowrap"
          >
            Men
          </button>
          <button
            onClick={() => {
              setCategoryFilter('Bags');
              navigateTo('shop');
            }}
            className="text-[#666] hover:text-black tracking-normal uppercase text-[11px] whitespace-nowrap"
          >
            Bags
          </button>
          <button
            onClick={() => {
              setCategoryFilter('Jewelry');
              navigateTo('shop');
            }}
            className="text-[#666] hover:text-black tracking-normal uppercase text-[11px] whitespace-nowrap"
          >
            Jewelry
          </button>
        </div>
      </nav>

      {/* 4. Fullscreen Luxury Search Modal Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex flex-col p-4 sm:p-8 animate-fadeIn">
          <div className="max-w-3xl w-full mx-auto bg-white rounded-sm shadow-2xl p-6 relative">
            <div className="flex items-center justify-between border-b pb-4 border-gray-200">
              <span className="text-xs font-bold uppercase tracking-widest text-[#888]">Global Luxury Search</span>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-black transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="mt-4">
              <div className="relative">
                <Search size={22} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search designers (Saint Laurent, Bottega Veneta...), trench coats, silk gowns..."
                  className="w-full pl-11 pr-24 py-3.5 text-base border-b-2 border-black focus:outline-none placeholder-gray-400 font-sans"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary !py-1.5 !px-4 text-xs"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Live Autocomplete Results */}
            <div className="mt-6">
              {searchQuery.trim() && (
                <div>
                  <div className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-3">
                    Matching Designer Pieces ({searchResults.length})
                  </div>
                  {searchResults.length > 0 ? (
                    <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                      {searchResults.map((prod) => (
                        <div
                          key={prod.id}
                          onClick={() => handleSelectProduct(prod.id)}
                          className="py-2.5 flex items-center justify-between hover:bg-[#faf8f5] px-2 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={prod.images[0]}
                              alt={prod.title}
                              className="w-12 h-14 object-cover rounded-xs border"
                            />
                            <div>
                              <div className="text-xs font-bold uppercase tracking-wider text-[#999]">
                                {prod.brand}
                              </div>
                              <div className="text-sm font-medium text-black line-clamp-1">{prod.title}</div>
                              <div className="text-xs text-gray-500 flex items-center gap-2">
                                <span>{prod.category}</span>
                                <span>•</span>
                                <span className="text-emerald-700 font-medium">Boutique: {prod.vendorName}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold">${prod.price.toLocaleString()}</div>
                            <ArrowRight size={14} className="text-gray-400 ml-auto mt-1" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500 py-6 text-center">
                      No matching runway pieces found for "{searchQuery}". Try searching for 'Coat', 'Dress', 'Bag', or 'Prada'.
                    </div>
                  )}
                </div>
              )}

              {/* Popular Luxury Search Suggestions */}
              {!searchQuery.trim() && (
                <div>
                  <div className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-3">
                    Trending Searches SS26
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Bottega Veneta Cassette", "Saint Laurent Cashmere Coat", "Jacquemus Backless Gown", "Prada Comma Pumps", "Savile Row Bespoke", "Kyoto Silk Robe"].map((term) => (
                      <button
                        key={term}
                        onClick={() => {
                          setSearchQuery(term);
                        }}
                        className="px-3 py-1.5 bg-[#f4f2ec] hover:bg-[#e8e4db] text-xs font-medium rounded text-gray-800 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
