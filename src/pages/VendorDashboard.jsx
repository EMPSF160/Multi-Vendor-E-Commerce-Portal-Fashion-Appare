import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Store,
  Package,
  ShoppingBag,
  TrendingUp,
  Users,
  DollarSign,
  FileSpreadsheet,
  Settings,
  Plus,
  Search,
  Filter,
  Download,
  Trash2,
  Edit,
  Truck,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Sparkles,
  ExternalLink,
  X,
  Send,
  Eye
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

export const VendorDashboard = () => {
  const {
    currentUser,
    products,
    orders,
    vendors,
    formatPrice,
    addProduct,
    editProduct,
    deleteProduct,
    updateOrderStatus,
    exportData,
    showToast,
    navigateTo
  } = useApp();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'products' | 'orders' | 'customers' | 'earnings' | 'reports' | 'settings'

  // Product Add Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [productForm, setProductForm] = useState({
    title: '',
    brand: 'Saint Laurent',
    category: 'Women',
    subcategory: 'Coats & Outerwear',
    price: 2450,
    originalPrice: 2800,
    sku: `VND-2026-${Math.floor(100 + Math.random() * 900)}`,
    description: '',
    highlights: '100% Cashmere, Made in Italy, Direct Boutique Dispatch',
    sizes: 'FR 36, FR 38, FR 40',
    colorName: 'Obsidian Noir',
    colorHex: '#111111',
    imageUrl: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=900&q=85',
    tag: 'Boutique Exclusive'
  });

  // Payout Request Modal
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState('15000');

  // Vendor Boutique Identity
  const vendorId = currentUser.vendorId || 'v-paris';
  const vendorInfo = vendors.find((v) => v.id === vendorId) || vendors[0];

  // Vendor specific products and orders
  const vendorProducts = products.filter((p) => p.vendorId === vendorId);
  const vendorOrders = orders.filter((o) =>
    o.items.some((item) => item.vendorId === vendorId)
  );

  const totalRevenue = vendorProducts.reduce((sum, p) => sum + p.price * (p.reviewsCount || 1), 0);
  const availablePayout = vendorInfo.payoutBalance || 42150;

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!productForm.title.trim()) return;

    const sizesArr = productForm.sizes.split(',').map((s) => s.trim());
    const stockMap = {};
    sizesArr.forEach((s) => {
      stockMap[s] = 4;
    });

    const highlightsArr = productForm.highlights.split(',').map((h) => h.trim());

    addProduct({
      title: productForm.title,
      brand: productForm.brand,
      vendorId: vendorInfo.id,
      vendorName: vendorInfo.name,
      vendorCity: vendorInfo.city,
      category: productForm.category,
      subcategory: productForm.subcategory,
      price: Number(productForm.price),
      originalPrice: Number(productForm.originalPrice),
      discount: Math.round(((productForm.originalPrice - productForm.price) / productForm.originalPrice) * 100) || 0,
      sku: productForm.sku,
      inStock: true,
      featured: true,
      trending: false,
      tag: productForm.tag,
      description: productForm.description || "Exclusive boutique piece crafted according to the highest European fashion standards.",
      highlights: highlightsArr.length ? highlightsArr : ["Luxury craftsmanship", "Handmade in Europe"],
      sizes: sizesArr,
      stockPerSize: stockMap,
      colors: [
        { name: productForm.colorName, hex: productForm.colorHex }
      ],
      images: [
        productForm.imageUrl,
        "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=900&q=85"
      ]
    });

    setIsAddModalOpen(false);
  };

  const handleRequestPayoutSubmit = (e) => {
    e.preventDefault();
    showToast(`Wire transfer request for $${Number(payoutAmount).toLocaleString()} submitted to Swiss Private Bank`, 'success');
    setIsPayoutModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] py-8">
      <div className="luxury-container">
        {/* Top Header Banner */}
        <div className="bg-[#0e0e0e] text-white p-6 md:p-8 rounded-xs border border-[#2b2b2b] mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-5">
            <img
              src={vendorInfo.logo}
              alt={vendorInfo.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-[#c5a059]"
            />
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="font-serif text-2xl font-bold text-white">
                  {vendorInfo.name}
                </h1>
                <span className="badge-boutique text-[10px]">
                  {vendorInfo.badge}
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  {vendorInfo.city}, {vendorInfo.country}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1 max-w-xl line-clamp-1">
                {vendorInfo.bio}
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-300 mt-2">
                <span>Commission: <strong className="text-[#c5a059]">{vendorInfo.commissionRate}%</strong></span>
                <span>•</span>
                <span>Rating: <strong className="text-white">{vendorInfo.rating}★</strong></span>
                <span>•</span>
                <span>SLA: <strong className="text-gray-300">{vendorInfo.shippingSLA}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn-gold !py-2.5 !px-4 text-xs flex items-center gap-1.5 shadow"
            >
              <Plus size={14} />
              <span>Add New Runway Piece</span>
            </button>
            <button
              onClick={() => navigateTo('shop')}
              className="btn-secondary !text-white !border-white/40 hover:!border-white !py-2.5 !px-4 text-xs flex items-center gap-1.5"
            >
              <Eye size={14} />
              <span>View Live Storefront</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 border-b border-[#e5e0d8] text-xs font-semibold uppercase tracking-wider">
          {[
            { id: 'overview', label: 'Overview & Stats', icon: TrendingUp },
            { id: 'products', label: `Catalog (${vendorProducts.length})`, icon: Package },
            { id: 'orders', label: `Orders (${vendorOrders.length})`, icon: ShoppingBag },
            { id: 'customers', label: 'VIP Clients', icon: Users },
            { id: 'earnings', label: 'Earnings & Payouts', icon: DollarSign },
            { id: 'reports', label: 'Reports / Export', icon: FileSpreadsheet },
            { id: 'settings', label: 'Store Settings', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xs flex items-center gap-2 transition-all whitespace-nowrap ${
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

        {/* ================= TAB 1: OVERVIEW & STATS ================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-5 rounded-xs border border-[#e5e0d8] shadow-sm">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span className="font-semibold uppercase tracking-wider">Gross Boutique Sales</span>
                  <DollarSign size={16} className="text-emerald-600" />
                </div>
                <div className="font-serif text-2xl font-bold text-gray-900">
                  {formatPrice(vendorInfo.totalSales || 248600)}
                </div>
                <div className="text-[11px] text-emerald-700 flex items-center gap-1 mt-2">
                  <ArrowUpRight size={13} /> +18.4% vs last fashion quarter
                </div>
              </div>

              <div className="bg-white p-5 rounded-xs border border-[#e5e0d8] shadow-sm">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span className="font-semibold uppercase tracking-wider">Available For Payout</span>
                  <Sparkles size={16} className="text-[#c5a059]" />
                </div>
                <div className="font-serif text-2xl font-bold text-[#c5a059]">
                  {formatPrice(availablePayout)}
                </div>
                <button
                  onClick={() => setIsPayoutModalOpen(true)}
                  className="text-[11px] text-black font-semibold hover:underline mt-2 inline-block"
                >
                  Request Wire Settlement →
                </button>
              </div>

              <div className="bg-white p-5 rounded-xs border border-[#e5e0d8] shadow-sm">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span className="font-semibold uppercase tracking-wider">Active Boutique Orders</span>
                  <ShoppingBag size={16} className="text-blue-600" />
                </div>
                <div className="font-serif text-2xl font-bold text-gray-900">
                  {vendorOrders.length} Orders
                </div>
                <div className="text-[11px] text-blue-700 mt-2">
                  All within 24hr dispatch SLA
                </div>
              </div>

              <div className="bg-white p-5 rounded-xs border border-[#e5e0d8] shadow-sm">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span className="font-semibold uppercase tracking-wider">Verified Rating</span>
                  <Store size={16} className="text-purple-600" />
                </div>
                <div className="font-serif text-2xl font-bold text-gray-900">
                  {vendorInfo.rating} / 5.0
                </div>
                <div className="text-[11px] text-gray-500 mt-2">
                  Based on {vendorInfo.reviewsCount} customer reviews
                </div>
              </div>
            </div>

            {/* Sales Chart Simulation & Recent Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left: Monthly Revenue Chart Simulation */}
              <div className="lg:col-span-8 bg-white p-6 rounded-xs border border-[#e5e0d8] shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-serif font-bold text-base text-gray-900">
                      Boutique Sales Velocity (2026)
                    </h3>
                    <p className="text-xs text-gray-500">Gross revenue before platform commission</p>
                  </div>
                  <span className="badge-luxury text-[10px]">Avenue Montaigne</span>
                </div>

                {/* Visual CSS Bar Chart */}
                <div className="h-48 flex items-end justify-between gap-3 pt-6 border-b border-gray-200">
                  {[
                    { month: 'Oct', amount: 32000, height: '40%' },
                    { month: 'Nov', amount: 48000, height: '60%' },
                    { month: 'Dec', amount: 72000, height: '90%' },
                    { month: 'Jan', amount: 39000, height: '50%' },
                    { month: 'Feb', amount: 54000, height: '70%' },
                    { month: 'Mar', amount: 84000, height: '100%' }
                  ].map((bar) => (
                    <div key={bar.month} className="flex-1 flex flex-col items-center gap-2 group">
                      <div className="text-[10px] text-gray-500 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                        ${(bar.amount / 1000).toFixed(0)}k
                      </div>
                      <div
                        className="w-full bg-[#111] group-hover:bg-[#c5a059] rounded-t-xs transition-all duration-300"
                        style={{ height: bar.height }}
                      />
                      <span className="text-[11px] font-bold text-gray-700">{bar.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Quick Actions & SLA Status */}
              <div className="lg:col-span-4 bg-white p-6 rounded-xs border border-[#e5e0d8] shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-base text-gray-900">
                  Boutique Operations Hub
                </h3>
                <div className="p-3.5 bg-[#faf8f4] border border-[#ebd9b5]/60 rounded-xs text-xs space-y-2">
                  <div className="font-bold text-gray-900 flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-[#c5a059]" />
                    <span>NFC Authenticity Sync</span>
                  </div>
                  <p className="text-gray-600 text-[11px] leading-relaxed">
                    All pieces added to your catalog receive encrypted digital passports verified upon checkout.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => exportData('products', 'csv')}
                    className="w-full btn-secondary !py-2 text-xs flex items-center justify-center gap-2"
                  >
                    <Download size={13} />
                    <span>Export Product Inventory (CSV)</span>
                  </button>
                  <button
                    onClick={() => exportData('orders', 'csv')}
                    className="w-full btn-secondary !py-2 text-xs flex items-center justify-center gap-2"
                  >
                    <Download size={13} />
                    <span>Export Order Ledger (CSV)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: PRODUCTS CATALOG MANAGEMENT ================= */}
        {activeTab === 'products' && (
          <div className="bg-white p-6 rounded-xs border border-[#e5e0d8] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-gray-900">
                  Boutique Runway Catalog ({vendorProducts.length} items)
                </h3>
                <p className="text-xs text-gray-500">
                  Add, edit, or adjust inventory and sizes for your showcase collection.
                </p>
              </div>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="btn-primary !py-2.5 !px-5 text-xs flex items-center gap-1.5"
              >
                <Plus size={14} />
                <span>Add Runway Piece</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto border border-gray-200 rounded-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#faf8f4] border-b border-gray-200 text-gray-700 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-3">Item</th>
                    <th className="py-3 px-3">Brand & SKU</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Price</th>
                    <th className="py-3 px-3">Sizes & Stock</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-800">
                  {vendorProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.images[0]}
                            alt={p.title}
                            className="w-12 h-14 object-cover rounded-xs border"
                          />
                          <div>
                            <div className="font-semibold text-gray-900">{p.title}</div>
                            <div className="text-[10px] text-gray-400 font-mono">ID: {p.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-gray-900">{p.brand}</div>
                        <div className="text-[10px] text-gray-400 font-mono">{p.sku}</div>
                      </td>
                      <td className="py-3 px-3">{p.category}</td>
                      <td className="py-3 px-3 font-serif font-bold text-sm">
                        {formatPrice(p.price)}
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {p.sizes.map((sz) => (
                            <span
                              key={sz}
                              className="px-1.5 py-0.5 bg-gray-100 border text-[10px] font-mono rounded"
                            >
                              {sz}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="badge-boutique text-[10px]">Active & Verified</span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => navigateTo('product-detail', p.id)}
                            className="p-1.5 hover:bg-gray-100 text-gray-600 rounded"
                            title="Preview Piece"
                          >
                            <ExternalLink size={14} />
                          </button>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-1.5 hover:bg-red-50 text-red-600 rounded"
                            title="Delete Piece"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 3: ORDERS MANAGEMENT ================= */}
        {activeTab === 'orders' && (
          <div className="bg-white p-6 rounded-xs border border-[#e5e0d8] shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-gray-900">
                  Boutique Orders Pipeline ({vendorOrders.length})
                </h3>
                <p className="text-xs text-gray-500">
                  Advance shipment milestones and dispatch international consignments.
                </p>
              </div>

              <button
                onClick={() => exportData('orders', 'csv')}
                className="btn-secondary !py-2 !px-4 text-xs flex items-center gap-1.5"
              >
                <Download size={13} />
                <span>Export Orders (CSV)</span>
              </button>
            </div>

            <div className="space-y-4">
              {vendorOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-5 border border-gray-200 rounded-xs space-y-3 bg-[#faf9f7]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 border-gray-200">
                    <div>
                      <span className="font-serif font-bold text-sm text-gray-900">
                        Order #{ord.id}
                      </span>
                      <span className="text-xs text-gray-500 ml-3">
                        Client: <strong className="text-black">{ord.customer.name}</strong> ({ord.customer.email})
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Status:</span>
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                        className="luxury-select !py-1 text-xs !w-auto font-semibold"
                      >
                        <option value="Order Placed">Order Placed</option>
                        <option value="Boutique Dispatched">Boutique Dispatched</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between gap-4 text-xs">
                    <div>
                      <div className="text-gray-500 font-semibold mb-1">Destination Address</div>
                      <div className="text-gray-800 leading-relaxed">
                        {ord.shippingAddress.street}, {ord.shippingAddress.city}, {ord.shippingAddress.postalCode}, {ord.shippingAddress.country}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-gray-500 font-semibold mb-1">Carrier Tracking</div>
                      <div className="font-mono text-black font-bold">{ord.trackingNumber}</div>
                      <div className="text-[11px] text-gray-500">{ord.shippingMethod}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 4: VIP CLIENTS ================= */}
        {activeTab === 'customers' && (
          <div className="bg-white p-6 rounded-xs border border-[#e5e0d8] shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-gray-900">
              Boutique VIP Client Directory
            </h3>
            <p className="text-xs text-gray-500">
              Private clients who frequently acquire high fashion from {vendorInfo.name}.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 border border-gray-200 rounded-xs space-y-1">
                <div className="font-bold text-sm text-gray-900">Sophia Laurent</div>
                <div className="text-xs text-gray-500">sophia.laurent@luxury-client.com</div>
                <div className="badge-gold text-[9px] mt-1 inline-block">Gold VIP Client</div>
                <div className="text-xs text-gray-700 pt-2">
                  Total Purchases: <strong>$14,250</strong> (4 orders)
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-xs space-y-1">
                <div className="font-bold text-sm text-gray-900">Marcus Aurelius B.</div>
                <div className="text-xs text-gray-500">marcus.a@vance-capital.com</div>
                <div className="badge-luxury text-[9px] mt-1 inline-block">Platinum Elite</div>
                <div className="text-xs text-gray-700 pt-2">
                  Total Purchases: <strong>$28,900</strong> (6 orders)
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 5: EARNINGS & PAYOUTS ================= */}
        {activeTab === 'earnings' && (
          <div className="bg-white p-6 rounded-xs border border-[#e5e0d8] shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b pb-4 border-gray-200">
              <div>
                <h3 className="font-serif text-lg font-bold text-gray-900">
                  Financial Ledger & Escrow Settlement
                </h3>
                <p className="text-xs text-gray-500">
                  Review settled earnings, commission deductions, and wire withdrawals.
                </p>
              </div>

              <button
                onClick={() => setIsPayoutModalOpen(true)}
                className="btn-gold !py-2 !px-5 text-xs flex items-center gap-1.5"
              >
                <DollarSign size={14} />
                <span>Request Payout Settlement</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-[#faf8f4] border border-[#ebd9b5]/60 rounded-xs">
                <div className="text-xs text-gray-500 uppercase font-semibold">Available Balance</div>
                <div className="font-serif text-2xl font-bold text-[#c5a059] mt-1">
                  {formatPrice(availablePayout)}
                </div>
              </div>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xs">
                <div className="text-xs text-gray-500 uppercase font-semibold">Escrow In Transit</div>
                <div className="font-serif text-2xl font-bold text-gray-900 mt-1">
                  {formatPrice(18400)}
                </div>
              </div>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xs">
                <div className="text-xs text-gray-500 uppercase font-semibold">Platform Fee Rate</div>
                <div className="font-serif text-2xl font-bold text-gray-900 mt-1">
                  {vendorInfo.commissionRate}%
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 6: REPORTS & EXPORT TOOLS ================= */}
        {activeTab === 'reports' && (
          <div className="bg-white p-6 rounded-xs border border-[#e5e0d8] shadow-sm space-y-6">
            <h3 className="font-serif text-lg font-bold text-gray-900">
              Automated Data Export Engine
            </h3>
            <p className="text-xs text-gray-500">
              Download complete structured datasets for inventory audits, accounting, and financial reconciliation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-5 border border-gray-200 rounded-xs space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-black">
                  Product Catalog
                </h4>
                <p className="text-xs text-gray-500">
                  Export complete SKU, pricing, category, and size availability matrix.
                </p>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => exportData('products', 'csv')}
                    className="btn-secondary !py-1.5 !px-3 text-xs flex-1"
                  >
                    CSV
                  </button>
                  <button
                    onClick={() => exportData('products', 'json')}
                    className="btn-secondary !py-1.5 !px-3 text-xs flex-1"
                  >
                    JSON
                  </button>
                </div>
              </div>

              <div className="p-5 border border-gray-200 rounded-xs space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-black">
                  Orders & Consignments
                </h4>
                <p className="text-xs text-gray-500">
                  Full list of customer orders, status, delivery addresses, and tracking codes.
                </p>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => exportData('orders', 'csv')}
                    className="btn-secondary !py-1.5 !px-3 text-xs flex-1"
                  >
                    CSV
                  </button>
                  <button
                    onClick={() => exportData('orders', 'json')}
                    className="btn-secondary !py-1.5 !px-3 text-xs flex-1"
                  >
                    JSON
                  </button>
                </div>
              </div>

              <div className="p-5 border border-gray-200 rounded-xs space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-black">
                  Vendors & Partner Data
                </h4>
                <p className="text-xs text-gray-500">
                  Boutique profiles, ratings, and commission benchmarks.
                </p>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => exportData('vendors', 'csv')}
                    className="btn-secondary !py-1.5 !px-3 text-xs flex-1"
                  >
                    CSV
                  </button>
                  <button
                    onClick={() => exportData('vendors', 'json')}
                    className="btn-secondary !py-1.5 !px-3 text-xs flex-1"
                  >
                    JSON
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 7: STORE SETTINGS ================= */}
        {activeTab === 'settings' && (
          <div className="bg-white p-6 rounded-xs border border-[#e5e0d8] shadow-sm space-y-4 max-w-2xl">
            <h3 className="font-serif text-lg font-bold text-gray-900 border-b pb-3 border-gray-200">
              Boutique Storefront Settings
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold uppercase text-gray-700 mb-1">
                  Boutique Name
                </label>
                <input
                  type="text"
                  defaultValue={vendorInfo.name}
                  className="luxury-input text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-gray-700 mb-1">
                  Boutique Story & Bio
                </label>
                <textarea
                  rows={3}
                  defaultValue={vendorInfo.bio}
                  className="luxury-input text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    defaultValue={vendorInfo.city}
                    className="luxury-input text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    defaultValue={vendorInfo.country}
                    className="luxury-input text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-gray-700 mb-1">
                  Shipping SLA Guarantee
                </label>
                <input
                  type="text"
                  defaultValue={vendorInfo.shippingSLA}
                  className="luxury-input text-xs"
                />
              </div>

              <button
                onClick={() => showToast('Boutique profile saved', 'success')}
                className="btn-primary !py-2.5 !px-6 text-xs mt-3"
              >
                Update Storefront Configuration
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ================= MODAL: ADD PRODUCT ================= */}
      {isAddModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-content !max-w-2xl p-6 relative">
            <div className="flex items-center justify-between border-b pb-4 border-gray-200">
              <div>
                <h3 className="font-serif text-lg font-bold text-gray-900">
                  Add New Runway Piece to Boutique
                </h3>
                <p className="text-xs text-gray-500">
                  Listing under {vendorInfo.name} ({vendorInfo.city})
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase text-gray-700 mb-1">
                  Piece Title
                </label>
                <input
                  type="text"
                  value={productForm.title}
                  onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                  placeholder="e.g. Sculptural Wool Tailored Coat"
                  required
                  className="luxury-input text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase text-gray-700 mb-1">
                    Designer Brand
                  </label>
                  <input
                    type="text"
                    value={productForm.brand}
                    onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                    required
                    className="luxury-input text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="luxury-select text-xs"
                  >
                    {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold uppercase text-gray-700 mb-1">
                    Price ($ USD)
                  </label>
                  <input
                    type="number"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    required
                    className="luxury-input text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-gray-700 mb-1">
                    MSRP ($ USD)
                  </label>
                  <input
                    type="number"
                    value={productForm.originalPrice}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                    required
                    className="luxury-input text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-gray-700 mb-1">
                    SKU Code
                  </label>
                  <input
                    type="text"
                    value={productForm.sku}
                    onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                    required
                    className="luxury-input text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-gray-700 mb-1">
                  Sizes Available (Comma separated)
                </label>
                <input
                  type="text"
                  value={productForm.sizes}
                  onChange={(e) => setProductForm({ ...productForm, sizes: e.target.value })}
                  placeholder="FR 36, FR 38, FR 40, FR 42"
                  required
                  className="luxury-input text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-gray-700 mb-1">
                  High-Resolution Image URL (Runway / Lookbook)
                </label>
                <input
                  type="url"
                  value={productForm.imageUrl}
                  onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })}
                  required
                  className="luxury-input text-xs font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-gray-700 mb-1">
                  Editorial Description
                </label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Provide luxury fabric composition, fit, and origin..."
                  className="luxury-input text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="btn-secondary !py-2.5 !px-5 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary !py-2.5 !px-6 text-xs flex items-center gap-1.5"
                >
                  <Plus size={14} />
                  <span>Publish to Global Store</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: PAYOUT REQUEST ================= */}
      {isPayoutModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-content !max-w-md p-6 relative">
            <div className="flex items-center justify-between border-b pb-4 border-gray-200">
              <h3 className="font-serif text-lg font-bold text-gray-900">
                Request Wire Transfer Payout
              </h3>
              <button
                onClick={() => setIsPayoutModalOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleRequestPayoutSubmit} className="mt-4 space-y-4 text-xs">
              <div className="p-3 bg-[#faf8f4] border border-[#ebd9b5] rounded-xs">
                <div className="text-[11px] text-gray-600">Available Escrow Balance</div>
                <div className="font-serif text-xl font-bold text-[#c5a059]">
                  {formatPrice(availablePayout)}
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-gray-700 mb-1">
                  Withdrawal Amount ($ USD)
                </label>
                <input
                  type="number"
                  value={payoutAmount}
                  max={availablePayout}
                  onChange={(e) => setPayoutAmount(e.target.value)}
                  required
                  className="luxury-input text-xs font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-gray-700 mb-1">
                  Destination Bank Account
                </label>
                <select className="luxury-select text-xs">
                  <option>BNP Paribas Paris (IBAN: FR76 •••• 8812)</option>
                  <option>UBS Switzerland (IBAN: CH93 •••• 4401)</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsPayoutModalOpen(false)}
                  className="btn-secondary !py-2.5 !px-5 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gold !py-2.5 !px-6 text-xs flex items-center gap-1.5"
                >
                  <Send size={13} />
                  <span>Submit Wire Request</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
