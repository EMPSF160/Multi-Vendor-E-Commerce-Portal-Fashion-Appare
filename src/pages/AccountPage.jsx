import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  CreditCard,
  Settings,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Download,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Plus,
  Trash2,
  ShieldCheck
} from 'lucide-react';

export const AccountPage = () => {
  const {
    currentUser,
    orders,
    wishlist,
    products,
    formatPrice,
    navigateTo,
    addToCart,
    toggleWishlist,
    setQuickViewProduct,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'wishlist' | 'addresses' | 'payments' | 'settings'
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(orders[0] || null);

  // Filter orders for current user or show platform sample orders
  const clientOrders = orders;
  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleDownloadInvoice = (orderId) => {
    showToast(`Downloading official tax invoice for #${orderId}...`, 'info');
  };

  return (
    <div className="min-h-screen bg-[#fcfbfa] py-10">
      <div className="luxury-container">
        {/* Profile Banner */}
        <div className="bg-[#0c0c0c] text-white p-6 md:p-8 rounded-xs border border-[#222] mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-[#c5a059] shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-xl md:text-2xl font-bold text-white">
                  {currentUser.name}
                </h1>
                <span className="badge-gold text-[10px]">
                  {currentUser.tier || 'VIP CLIENT'}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">{currentUser.email}</p>
              <div className="flex items-center gap-4 text-xs text-gray-300 mt-2">
                <span>Total Orders: <strong className="text-white">{clientOrders.length}</strong></span>
                <span>•</span>
                <span>Saved Pieces: <strong className="text-white">{wishlist.length}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('shop')}
              className="btn-gold !py-2.5 !px-5 text-xs flex items-center gap-1.5"
            >
              <Sparkles size={14} />
              <span>Browse New SS26 Runway</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Sidebar Nav (3 Cols) */}
          <div className="md:col-span-3 space-y-1">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider flex items-center justify-between rounded-xs transition-colors ${
                activeTab === 'orders'
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-[#f3f0ea] border border-[#e5e0d8]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Package size={16} />
                <span>Orders & Tracking</span>
              </div>
              <span className="text-[10px] font-mono bg-white/20 px-1.5 py-0.5 rounded">
                {clientOrders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`w-full text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider flex items-center justify-between rounded-xs transition-colors ${
                activeTab === 'wishlist'
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-[#f3f0ea] border border-[#e5e0d8]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Heart size={16} />
                <span>Curated Wishlist</span>
              </div>
              <span className="text-[10px] font-mono bg-white/20 px-1.5 py-0.5 rounded">
                {wishlistedProducts.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider flex items-center justify-between rounded-xs transition-colors ${
                activeTab === 'addresses'
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-[#f3f0ea] border border-[#e5e0d8]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MapPin size={16} />
                <span>Saved Addresses</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('payments')}
              className={`w-full text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider flex items-center justify-between rounded-xs transition-colors ${
                activeTab === 'payments'
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-[#f3f0ea] border border-[#e5e0d8]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <CreditCard size={16} />
                <span>Payment Cards</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider flex items-center justify-between rounded-xs transition-colors ${
                activeTab === 'settings'
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-[#f3f0ea] border border-[#e5e0d8]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Settings size={16} />
                <span>Account Settings</span>
              </div>
            </button>
          </div>

          {/* Main Display Area (9 Cols) */}
          <div className="md:col-span-9 space-y-6">
            {/* ================= TAB 1: ORDERS & LIVE TRACKING ================= */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                  <h3 className="font-serif text-lg font-bold text-gray-900">
                    Active & Past Orders ({clientOrders.length})
                  </h3>
                  <span className="text-xs text-gray-500">
                    Live GPS tracking synced with DHL & FedEx
                  </span>
                </div>

                {clientOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-white border border-[#e5e0d8] rounded-xs overflow-hidden shadow-sm space-y-4 p-5"
                  >
                    {/* Order Top Bar */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                      <div>
                        <div className="flex items-center gap-2.5">
                          <span className="font-serif font-bold text-base text-gray-900">
                            Order #{ord.id}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-xs text-[10px] font-bold uppercase tracking-wider ${
                              ord.status === 'Delivered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : ord.status === 'In Transit'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {ord.status}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          Placed on {ord.date} • {ord.items.length} boutique piece(s) • Total:{' '}
                          <strong className="text-black">{formatPrice(ord.total)}</strong>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDownloadInvoice(ord.id)}
                          className="btn-secondary !py-1.5 !px-3 text-xs flex items-center gap-1"
                        >
                          <Download size={13} />
                          <span>PDF Invoice</span>
                        </button>
                      </div>
                    </div>

                    {/* Items in this Order */}
                    <div className="space-y-3">
                      {ord.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-12 h-14 object-cover rounded-xs border shrink-0"
                            />
                            <div>
                              <div className="text-[10px] font-bold uppercase text-gray-400">
                                {item.brand}
                              </div>
                              <h5 className="font-semibold text-gray-900">{item.title}</h5>
                              <div className="text-[11px] text-gray-500">
                                Size: {item.size} • Color: {item.color} • Boutique: {item.vendorName}
                              </div>
                            </div>
                          </div>
                          <div className="font-serif font-bold text-sm text-gray-900">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Live Tracking Milestone Timeline */}
                    <div className="bg-[#faf8f5] p-4 rounded-xs border border-[#ebd9b5]/40 mt-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-900">
                          <Truck size={15} className="text-[#c5a059]" />
                          <span>Tracking: {ord.trackingNumber}</span>
                        </div>
                        <span className="text-[11px] text-gray-500">{ord.shippingMethod}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
                        {ord.timeline.map((stage, sIdx) => (
                          <div
                            key={sIdx}
                            className={`flex flex-col text-xs ${
                              stage.completed ? 'text-black' : 'text-gray-400'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
                                  stage.completed
                                    ? 'bg-black text-white font-bold'
                                    : 'border border-gray-300 bg-white'
                                }`}
                              >
                                {stage.completed ? '✓' : sIdx + 1}
                              </span>
                              <span className="font-bold text-[11px]">{stage.status}</span>
                            </div>
                            <div className="text-[10px] text-gray-500 font-mono">{stage.date}</div>
                            <div className="text-[10px] text-gray-400 mt-0.5 line-clamp-2">
                              {stage.note}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ================= TAB 2: CURATED WISHLIST ================= */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                  <h3 className="font-serif text-lg font-bold text-gray-900">
                    My Saved Runway Pieces ({wishlistedProducts.length})
                  </h3>
                  {wishlistedProducts.length > 0 && (
                    <button
                      onClick={() => {
                        wishlistedProducts.forEach((p) => addToCart(p, p.sizes[0], p.colors[0], 1));
                        navigateTo('cart-checkout');
                      }}
                      className="btn-primary !py-1.5 !px-3 text-xs flex items-center gap-1"
                    >
                      <ShoppingBag size={13} />
                      <span>Move All to Shopping Bag</span>
                    </button>
                  )}
                </div>

                {wishlistedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistedProducts.map((prod) => (
                      <div
                        key={prod.id}
                        className="bg-white border border-[#ece8e0] rounded-xs p-4 flex flex-col justify-between"
                      >
                        <div>
                          <div className="aspect-[3/4] bg-[#f7f6f4] rounded-xs overflow-hidden mb-3 relative">
                            <img
                              src={prod.images[0]}
                              alt={prod.title}
                              className="w-full h-full object-cover"
                            />
                            <button
                              onClick={() => toggleWishlist(prod.id)}
                              className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-red-600 shadow"
                              title="Remove from wishlist"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                            {prod.brand}
                          </div>
                          <h4
                            onClick={() => navigateTo('product-detail', prod.id)}
                            className="font-medium text-xs text-gray-900 line-clamp-1 hover:text-[#c5a059] cursor-pointer mt-0.5"
                          >
                            {prod.title}
                          </h4>
                          <div className="font-serif font-bold text-sm text-gray-900 mt-1">
                            {formatPrice(prod.price)}
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2">
                          <button
                            onClick={() => addToCart(prod, prod.sizes[0], prod.colors[0], 1)}
                            className="w-full btn-primary !py-2 text-xs flex items-center justify-center gap-1"
                          >
                            <ShoppingBag size={13} />
                            <span>Add To Bag</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white border border-[#e5e0d8] p-12 text-center rounded-xs">
                    <Heart size={36} className="text-gray-400 mx-auto mb-2" />
                    <h4 className="font-serif text-lg font-bold">Your Wishlist is Empty</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      Save pieces as you browse to create your personal luxury lookbook.
                    </p>
                    <button
                      onClick={() => navigateTo('shop')}
                      className="mt-5 btn-primary !py-2.5 !px-6 text-xs"
                    >
                      Discover Collections
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ================= TAB 3: SAVED ADDRESSES ================= */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                  <h3 className="font-serif text-lg font-bold text-gray-900">Saved Addresses</h3>
                  <button
                    onClick={() => showToast('Address manager ready', 'info')}
                    className="btn-secondary !py-1.5 !px-3 text-xs flex items-center gap-1"
                  >
                    <Plus size={13} />
                    <span>Add New Residence</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white border-2 border-black p-5 rounded-xs relative">
                    <span className="badge-luxury text-[9px] mb-2 inline-block">Default Residence</span>
                    <h4 className="font-serif font-bold text-sm text-gray-900">{currentUser.name}</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      {currentUser.address?.street || '14 Rue du Faubourg Saint-Honoré'}<br />
                      {currentUser.address?.city || 'Paris'}, {currentUser.address?.postalCode || '75008'}<br />
                      {currentUser.address?.country || 'France'}<br />
                      Phone: {currentUser.phone || '+33 6 42 19 88 10'}
                    </p>
                  </div>

                  <div className="bg-white border border-gray-200 p-5 rounded-xs">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-2 inline-block">
                      Secondary Vacation Villa
                    </span>
                    <h4 className="font-serif font-bold text-sm text-gray-900">{currentUser.name}</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      Villa Belle Époque, 88 Boulevard de la Croisette<br />
                      Cannes, 06400<br />
                      France
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ================= TAB 4: SAVED PAYMENTS ================= */}
            {activeTab === 'payments' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                  <h3 className="font-serif text-lg font-bold text-gray-900">Encrypted Payment Cards</h3>
                  <button
                    onClick={() => showToast('Card manager ready', 'info')}
                    className="btn-secondary !py-1.5 !px-3 text-xs flex items-center gap-1"
                  >
                    <Plus size={13} />
                    <span>Add New Card</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentUser.savedCards?.map((card) => (
                    <div
                      key={card.id}
                      className="bg-gradient-to-br from-[#1c1c1c] to-[#0a0a0a] text-white p-5 rounded-xs border border-[#333] shadow-md flex flex-col justify-between min-h-[160px]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm tracking-widest">{card.type}</span>
                        {card.isDefault && (
                          <span className="badge-gold text-[9px]">DEFAULT</span>
                        )}
                      </div>
                      <div className="font-mono text-base tracking-widest my-3">
                        {card.number}
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>Cardholder: {currentUser.name}</span>
                        <span>Exp: {card.expiry}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================= TAB 5: SETTINGS ================= */}
            {activeTab === 'settings' && (
              <div className="bg-white border border-[#e5e0d8] p-6 rounded-xs space-y-4">
                <h3 className="font-serif text-lg font-bold text-gray-900 border-b border-gray-200 pb-3">
                  Client Profile & Preferences
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={currentUser.name}
                      className="luxury-input text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                      Primary Email
                    </label>
                    <input
                      type="email"
                      defaultValue={currentUser.email}
                      className="luxury-input text-xs"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => showToast('Preferences updated successfully', 'success')}
                    className="btn-primary !py-2.5 !px-6 text-xs"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
