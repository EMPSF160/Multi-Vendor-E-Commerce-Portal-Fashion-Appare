import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Store,
  Package,
  ShoppingBag,
  Users,
  TrendingUp,
  FileSpreadsheet,
  Lock,
  Settings,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Download,
  Search,
  Check,
  X,
  Sliders,
  DollarSign,
  Globe,
  ArrowUpRight,
  ExternalLink,
  ArrowLeft
} from 'lucide-react';
import { CURRENCY_RATES } from '../data/mockData';

export const AdminDashboard = () => {
  const {
    currentUser,
    vendors,
    products,
    orders,
    formatPrice,
    updateVendorStatus,
    toggleFeaturedProduct,
    exportData,
    rbacRoles,
    showToast,
    switchRole,
    logout,
    navigateTo
  } = useApp();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'vendors' | 'products' | 'orders' | 'customers' | 'analytics' | 'export' | 'rbac' | 'settings'

  // Platform Metrics
  const totalGMV = vendors.reduce((sum, v) => sum + (v.totalSales || 0), 0);
  const platformCommissions = vendors.reduce(
    (sum, v) => sum + Math.round(((v.totalSales || 0) * (v.commissionRate || 15)) / 100),
    0
  );

  return (
    <div className="min-h-screen bg-[#f8f7f4] py-4 sm:py-8">
      <div className="luxury-container">
        {/* Top Back Navigation Bar */}
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={() => {
              switchRole('customer');
              navigateTo('home');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-black transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Return to Customer Storefront</span>
          </button>
          <span className="text-[11px] text-gray-400 font-mono hidden sm:inline">
            Admin Session: {currentUser.name}
          </span>
        </div>

        {/* Admin Header Bar */}
        <div className="bg-[#0a0a0a] text-white p-4 sm:p-6 md:p-8 rounded-xs border border-[#2b2b2b] mb-6 sm:mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-5 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 min-w-0">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#1c1c1c] border-2 border-purple-500 flex items-center justify-center text-purple-400 shrink-0">
              <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-serif text-lg sm:text-2xl font-bold text-white break-words">
                  AURA LUXE Global Admin HQ
                </h1>
                <span className="badge-luxury text-[9px] sm:text-[10px] !bg-purple-950 !text-purple-300 !border !border-purple-700 shrink-0">
                  ROOT SUPER-ADMIN
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                Executive platform control: Multi-vendor moderation, RBAC access control & escrow analytics
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-300 mt-2">
                <span>Administrator: <strong className="text-white">{currentUser.name}</strong></span>
                <span className="text-gray-600 hidden sm:inline">•</span>
                <span>Active Boutiques: <strong className="text-emerald-400">{vendors.filter(v => v.status === 'Active').length}</strong></span>
                <span className="text-gray-600 hidden sm:inline">•</span>
                <span>Platform GMV: <strong className="text-[#c5a059]">{formatPrice(totalGMV)}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={() => exportData('orders', 'csv')}
              className="btn-gold !py-2 sm:!py-2.5 !px-3 sm:!px-4 text-xs flex items-center justify-center gap-1.5 shadow"
            >
              <Download size={14} />
              <span>Full Audit Export</span>
            </button>
            <button
              onClick={() => {
                switchRole('customer');
                navigateTo('home');
              }}
              className="btn-secondary !text-white !border-white/40 hover:!border-white !py-2 sm:!py-2.5 !px-3 sm:!px-4 text-xs flex items-center justify-center gap-1.5"
            >
              <span>Switch to Storefront</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-2 mb-6 border-b border-[#e5e0d8] text-xs font-semibold uppercase tracking-wider">
          {[
            { id: 'overview', label: 'Overview & KPIs', icon: TrendingUp },
            { id: 'vendors', label: `Vendors (${vendors.length})`, icon: Store },
            { id: 'products', label: `Catalog Moderation (${products.length})`, icon: Package },
            { id: 'orders', label: `Platform Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'customers', label: 'Customer Directory', icon: Users },
            { id: 'analytics', label: 'Sales & Analytics', icon: DollarSign },
            { id: 'export', label: 'Export Reports', icon: FileSpreadsheet },
            { id: 'rbac', label: 'Access Control (RBAC)', icon: Lock },
            { id: 'settings', label: 'Platform Settings', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xs flex items-center gap-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-black text-white shadow-sm'
                    : 'bg-white text-gray-700 hover:bg-[#eae6de] border border-[#e0dcd4]'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ================= TAB 1: OVERVIEW & KPIS ================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-5 rounded-xs border border-[#e5e0d8] shadow-sm">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span className="font-semibold uppercase tracking-wider">Gross Platform GMV</span>
                  <DollarSign size={16} className="text-emerald-600" />
                </div>
                <div className="font-serif text-2xl font-bold text-gray-900">
                  {formatPrice(totalGMV)}
                </div>
                <div className="text-[11px] text-emerald-700 flex items-center gap-1 mt-2">
                  <ArrowUpRight size={13} /> Across 5 luxury capitals
                </div>
              </div>

              <div className="bg-white p-5 rounded-xs border border-[#e5e0d8] shadow-sm">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span className="font-semibold uppercase tracking-wider">Platform Commissions</span>
                  <Sparkles size={16} className="text-[#c5a059]" />
                </div>
                <div className="font-serif text-2xl font-bold text-[#c5a059]">
                  {formatPrice(platformCommissions)}
                </div>
                <div className="text-[11px] text-gray-500 mt-2">
                  Net SaaS revenue retained
                </div>
              </div>

              <div className="bg-white p-5 rounded-xs border border-[#e5e0d8] shadow-sm">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span className="font-semibold uppercase tracking-wider">Verified Boutiques</span>
                  <Store size={16} className="text-blue-600" />
                </div>
                <div className="font-serif text-2xl font-bold text-gray-900">
                  {vendors.length} Partners
                </div>
                <div className="text-[11px] text-blue-700 mt-2">
                  {vendors.filter((v) => v.status === 'Active').length} Active • 1 Pending Audit
                </div>
              </div>

              <div className="bg-white p-5 rounded-xs border border-[#e5e0d8] shadow-sm">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span className="font-semibold uppercase tracking-wider">Global Orders</span>
                  <ShoppingBag size={16} className="text-purple-600" />
                </div>
                <div className="font-serif text-2xl font-bold text-gray-900">
                  {orders.length} Dispatches
                </div>
                <div className="text-[11px] text-gray-500 mt-2">
                  100% On-Time Delivery Rate
                </div>
              </div>
            </div>

            {/* Vendor Status Matrix & Quick Moderation */}
            <div className="bg-white p-6 rounded-xs border border-[#e5e0d8] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-base text-gray-900">
                  Boutique Health & Commission Benchmarks
                </h3>
                <span className="text-xs text-gray-500">Real-time Escrow Tracking</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#faf8f4] border-b text-gray-700 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-2.5 px-3">Boutique</th>
                      <th className="py-2.5 px-3">Location</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Take Rate</th>
                      <th className="py-2.5 px-3">GMV Volume</th>
                      <th className="py-2.5 px-3">Escrow Balance</th>
                      <th className="py-2.5 px-3 text-right">Quick Moderation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {vendors.map((v) => (
                      <tr key={v.id} className="hover:bg-gray-50">
                        <td className="py-3 px-3 font-bold text-gray-900 flex items-center gap-2">
                          <img src={v.logo} alt="" className="w-6 h-6 rounded-full object-cover" />
                          <span>{v.name}</span>
                        </td>
                        <td className="py-3 px-3">{v.city}, {v.country}</td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-xs text-[10px] font-bold uppercase tracking-wider ${
                              v.status === 'Active'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {v.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-bold text-[#c5a059]">{v.commissionRate}%</td>
                        <td className="py-3 px-3 font-serif font-bold">{formatPrice(v.totalSales)}</td>
                        <td className="py-3 px-3 font-mono">{formatPrice(v.payoutBalance)}</td>
                        <td className="py-3 px-3 text-right">
                          {v.status === 'Pending Verification' ? (
                            <button
                              onClick={() => updateVendorStatus(v.id, 'Active')}
                              className="btn-primary !py-1 !px-2.5 text-[10px]"
                            >
                              Approve Boutique
                            </button>
                          ) : (
                            <button
                              onClick={() => updateVendorStatus(v.id, 'Pending Verification')}
                              className="btn-secondary !py-1 !px-2.5 text-[10px]"
                            >
                              Suspend
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: VENDORS MANAGEMENT ================= */}
        {activeTab === 'vendors' && (
          <div className="bg-white p-6 rounded-xs border border-[#e5e0d8] shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-gray-900">
                  Global Boutiques Directory & Commission Control
                </h3>
                <p className="text-xs text-gray-500">
                  Manage vendor contracts, adjust take rates, and inspect shipping SLAs.
                </p>
              </div>
              <button
                onClick={() => exportData('vendors', 'csv')}
                className="btn-secondary !py-2 !px-4 text-xs flex items-center gap-1"
              >
                <Download size={13} />
                <span>Export Vendors</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vendors.map((v) => (
                <div
                  key={v.id}
                  className="p-5 border border-gray-200 rounded-xs space-y-4 bg-[#faf9f7]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img src={v.logo} alt="" className="w-12 h-12 rounded-full object-cover border" />
                      <div>
                        <h4 className="font-serif font-bold text-sm text-gray-900">{v.name}</h4>
                        <div className="text-xs text-gray-500">{v.city}, {v.country}</div>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-xs text-[10px] font-bold uppercase tracking-wider ${
                        v.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {v.status}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed">{v.bio}</p>

                  <div className="grid grid-cols-3 gap-2 text-xs pt-2 border-t border-gray-200">
                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase">Commission</span>
                      <strong className="text-[#c5a059]">{v.commissionRate}%</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase">Catalog</span>
                      <strong>{v.productsCount} Pieces</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase">Sales</span>
                      <strong>{formatPrice(v.totalSales)}</strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-gray-500">Adjust Rate:</span>
                      <select
                        value={v.commissionRate}
                        onChange={(e) => updateVendorStatus(v.id, v.status, Number(e.target.value))}
                        className="luxury-select !py-1 text-xs !w-auto font-bold"
                      >
                        <option value={10}>10% Take</option>
                        <option value={12}>12% Take</option>
                        <option value={14}>14% Take</option>
                        <option value={15}>15% Take</option>
                        <option value={16}>16% Take</option>
                        <option value={20}>20% VIP</option>
                      </select>
                    </div>

                    <button
                      onClick={() =>
                        updateVendorStatus(v.id, v.status === 'Active' ? 'Pending Verification' : 'Active')
                      }
                      className={`btn-secondary !py-1.5 !px-3 text-xs ${
                        v.status === 'Active' ? 'hover:bg-red-50 hover:text-red-600' : 'hover:bg-emerald-50 hover:text-emerald-700'
                      }`}
                    >
                      {v.status === 'Active' ? 'Suspend Boutique' : 'Approve Boutique'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: PRODUCTS MODERATION ================= */}
        {activeTab === 'products' && (
          <div className="bg-white p-6 rounded-xs border border-[#e5e0d8] shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-gray-900">
                  Platform Catalog Moderation ({products.length})
                </h3>
                <p className="text-xs text-gray-500">
                  Curate featured pieces on the homepage showcase and review designer submissions.
                </p>
              </div>

              <button
                onClick={() => exportData('products', 'csv')}
                className="btn-secondary !py-2 !px-4 text-xs flex items-center gap-1"
              >
                <Download size={13} />
                <span>Export Catalog</span>
              </button>
            </div>

            <div className="overflow-x-auto border border-gray-200 rounded-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#faf8f4] border-b text-gray-700 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-3">Item</th>
                    <th className="py-3 px-3">Boutique</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Price</th>
                    <th className="py-3 px-3">Featured on Home</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-3">
                          <img src={p.images[0]} alt="" className="w-10 h-12 object-cover rounded-xs border" />
                          <div>
                            <div className="font-bold text-gray-900">{p.title}</div>
                            <div className="text-[10px] text-gray-400 font-mono">{p.brand} • {p.sku}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">{p.vendorName}</td>
                      <td className="py-3 px-3">{p.category}</td>
                      <td className="py-3 px-3 font-serif font-bold">{formatPrice(p.price)}</td>
                      <td className="py-3 px-3">
                        <button
                          onClick={() => toggleFeaturedProduct(p.id)}
                          className={`px-2 py-1 rounded-xs text-[10px] font-bold uppercase ${
                            p.featured ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {p.featured ? '★ Featured' : 'Normal'}
                        </button>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => navigateTo('product-detail', p.id)}
                          className="text-xs text-black font-semibold hover:underline"
                        >
                          View Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 4: PLATFORM ORDERS ================= */}
        {activeTab === 'orders' && (
          <div className="bg-white p-6 rounded-xs border border-[#e5e0d8] shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-gray-900">
                  Global Consignment Orders ({orders.length})
                </h3>
                <p className="text-xs text-gray-500">
                  Platform-wide transaction oversight and escrow status across all boutiques.
                </p>
              </div>

              <button
                onClick={() => exportData('orders', 'csv')}
                className="btn-secondary !py-2 !px-4 text-xs flex items-center gap-1"
              >
                <Download size={13} />
                <span>Export Ledger (CSV)</span>
              </button>
            </div>

            <div className="overflow-x-auto border border-gray-200 rounded-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#faf8f4] border-b text-gray-700 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-3">Order ID</th>
                    <th className="py-3 px-3">Client</th>
                    <th className="py-3 px-3">Items & Boutiques</th>
                    <th className="py-3 px-3">Total</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Tracking</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-gray-50">
                      <td className="py-3 px-3 font-serif font-bold text-gray-900">#{o.id}</td>
                      <td className="py-3 px-3">
                        <div className="font-semibold">{o.customer.name}</div>
                        <div className="text-[10px] text-gray-400">{o.customer.email}</div>
                      </td>
                      <td className="py-3 px-3">
                        {o.items.map((it, i) => (
                          <div key={i} className="text-[11px]">
                            {it.title} (<span className="text-gray-500">{it.vendorName}</span>)
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-3 font-serif font-bold">{formatPrice(o.total)}</td>
                      <td className="py-3 px-3">
                        <span className="badge-luxury text-[10px]">{o.status}</span>
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px]">{o.trackingNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 5: CUSTOMER DIRECTORY ================= */}
        {activeTab === 'customers' && (
          <div className="bg-white p-6 rounded-xs border border-[#e5e0d8] shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-gray-900">
              Private Client Lifetime Directory
            </h3>
            <p className="text-xs text-gray-500">
              Registered customers, VIP tiers, and aggregate lifetime GMV.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 border border-gray-200 rounded-xs space-y-1">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-sm text-gray-900">Sophia Laurent</div>
                  <span className="badge-gold text-[9px]">Gold VIP Client</span>
                </div>
                <div className="text-xs text-gray-500">sophia.laurent@luxury-client.com</div>
                <div className="text-xs text-gray-700 pt-2">
                  Lifetime Platform GMV: <strong>$14,250</strong> (Paris, France)
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-xs space-y-1">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-sm text-gray-900">Marcus Aurelius B.</div>
                  <span className="badge-luxury text-[9px]">Platinum Elite</span>
                </div>
                <div className="text-xs text-gray-500">marcus.a@vance-capital.com</div>
                <div className="text-xs text-gray-700 pt-2">
                  Lifetime Platform GMV: <strong>$28,900</strong> (New York, USA)
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 6: SALES & ANALYTICS ================= */}
        {activeTab === 'analytics' && (
          <div className="bg-white p-6 rounded-xs border border-[#e5e0d8] shadow-sm space-y-6">
            <h3 className="font-serif text-lg font-bold text-gray-900">
              Global Platform Analytics & Category Breakdown
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-5 border border-gray-200 rounded-xs space-y-3">
                <div className="font-bold text-xs uppercase text-gray-700">Top Categories By GMV</div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>Women's Couture</span>
                    <strong>48% ($459,360)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Men's Sartorial</span>
                    <strong>28% ($267,960)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Designer Bags & Shoes</span>
                    <strong>24% ($229,680)</strong>
                  </div>
                </div>
              </div>

              <div className="p-5 border border-gray-200 rounded-xs space-y-3">
                <div className="font-bold text-xs uppercase text-gray-700">Geographic Fulfillment Hubs</div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>Paris Boutiques</span>
                    <strong>38% share</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Milan Showrooms</span>
                    <strong>32% share</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Tokyo Flagships</span>
                    <strong>20% share</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>London Bespoke</span>
                    <strong>10% share</strong>
                  </div>
                </div>
              </div>

              <div className="p-5 border border-gray-200 rounded-xs space-y-3">
                <div className="font-bold text-xs uppercase text-gray-700">Platform SLA Health</div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>Average Dispatch Time</span>
                    <strong>18.4 Hours</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Customs Clearance SLA</span>
                    <strong>100% Automated</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Customer Satisfaction</span>
                    <strong>4.92 / 5.0</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 7: EXPORT REPORTS ================= */}
        {activeTab === 'export' && (
          <div className="bg-white p-6 rounded-xs border border-[#e5e0d8] shadow-sm space-y-6">
            <h3 className="font-serif text-lg font-bold text-gray-900">
              Executive Export Engine (CSV / JSON)
            </h3>
            <p className="text-xs text-gray-500">
              Download clean, compliant structured tables for fiscal filing, inventory audits, and vendor payouts.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
              <div className="p-5 border border-gray-200 rounded-xs space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-black">
                  Complete Order Ledger
                </h4>
                <p className="text-xs text-gray-500">All customer orders, prices, tax, and tracking.</p>
                <div className="flex gap-2">
                  <button onClick={() => exportData('orders', 'csv')} className="btn-secondary !py-1.5 !px-3 text-xs flex-1">
                    Export CSV
                  </button>
                  <button onClick={() => exportData('orders', 'json')} className="btn-secondary !py-1.5 !px-3 text-xs flex-1">
                    Export JSON
                  </button>
                </div>
              </div>

              <div className="p-5 border border-gray-200 rounded-xs space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-black">
                  Product Inventory Audit
                </h4>
                <p className="text-xs text-gray-500">All SKUs, vendors, stock levels, and MSRPs.</p>
                <div className="flex gap-2">
                  <button onClick={() => exportData('products', 'csv')} className="btn-secondary !py-1.5 !px-3 text-xs flex-1">
                    Export CSV
                  </button>
                  <button onClick={() => exportData('products', 'json')} className="btn-secondary !py-1.5 !px-3 text-xs flex-1">
                    Export JSON
                  </button>
                </div>
              </div>

              <div className="p-5 border border-gray-200 rounded-xs space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-black">
                  Vendor Boutique Registry
                </h4>
                <p className="text-xs text-gray-500">Boutique contracts, take rates, and payout balances.</p>
                <div className="flex gap-2">
                  <button onClick={() => exportData('vendors', 'csv')} className="btn-secondary !py-1.5 !px-3 text-xs flex-1">
                    Export CSV
                  </button>
                  <button onClick={() => exportData('vendors', 'json')} className="btn-secondary !py-1.5 !px-3 text-xs flex-1">
                    Export JSON
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 8: CLIENT ACCESS CONTROL & RBAC ================= */}
        {activeTab === 'rbac' && (
          <div className="bg-white p-6 rounded-xs border border-[#e5e0d8] shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b pb-4 border-gray-200">
              <div>
                <h3 className="font-serif text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Lock size={18} className="text-purple-600" />
                  <span>Role-Based Access Control (RBAC) Matrix</span>
                </h3>
                <p className="text-xs text-gray-500">
                  Granular permission control and multi-tenant isolation across Admin, Vendor, and Client roles.
                </p>
              </div>

              <button
                onClick={() => showToast('RBAC permission policy enforced', 'success')}
                className="btn-primary !py-2 !px-4 text-xs"
              >
                Save Role Policies
              </button>
            </div>

            <div className="space-y-6">
              {rbacRoles.map((roleObj, idx) => (
                <div key={idx} className="p-5 border border-gray-200 rounded-xs bg-[#faf8f4]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif font-bold text-sm text-gray-900">{roleObj.role}</h4>
                      <span className="text-[10px] text-gray-500 font-mono">
                        ({roleObj.userCount} Assigned Users)
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-4">{roleObj.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {roleObj.permissions.map((perm, pIdx) => (
                      <div
                        key={pIdx}
                        className={`p-2.5 rounded-xs border text-xs flex items-center justify-between ${
                          perm.granted
                            ? 'bg-white border-emerald-300 text-emerald-950 font-medium'
                            : 'bg-gray-100 border-gray-200 text-gray-400'
                        }`}
                      >
                        <span>{perm.name}</span>
                        {perm.granted ? (
                          <Check size={14} className="text-emerald-600 shrink-0" />
                        ) : (
                          <X size={14} className="text-gray-400 shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 9: PLATFORM SETTINGS ================= */}
        {activeTab === 'settings' && (
          <div className="bg-white p-6 rounded-xs border border-[#e5e0d8] shadow-sm space-y-4 max-w-2xl">
            <h3 className="font-serif text-lg font-bold text-gray-900 border-b pb-3 border-gray-200">
              Global Platform Parameters
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold uppercase text-gray-700 mb-1">
                  Global Announcement Ticker Banner
                </label>
                <input
                  type="text"
                  defaultValue="SS26 PARIS COUTURE EDIT: Complimentary Global Express Delivery on orders over $500 • Verified Boutique Authenticity"
                  className="luxury-input text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase text-gray-700 mb-1">
                    Baseline Vendor Commission Rate
                  </label>
                  <input
                    type="number"
                    defaultValue={15}
                    className="luxury-input text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-gray-700 mb-1">
                    Prepaid Import Duties VAT Rate (%)
                  </label>
                  <input
                    type="number"
                    defaultValue={5}
                    className="luxury-input text-xs"
                  />
                </div>
              </div>

              <button
                onClick={() => showToast('Platform configuration saved to database', 'success')}
                className="btn-primary !py-2.5 !px-6 text-xs mt-3"
              >
                Apply Platform Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
