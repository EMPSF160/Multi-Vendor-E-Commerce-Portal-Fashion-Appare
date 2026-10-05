import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  QrCode,
  Landmark,
  Truck,
  Sparkles,
  Check,
  Lock,
  Tag,
  Store,
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CartCheckoutPage = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    formatPrice,
    navigateTo,
    placeOrder,
    currentUser,
    coupons,
    showToast
  } = useApp();

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('LUXURY2026'); // default sample coupon for great UX

  // Address state
  const [address, setAddress] = useState({
    name: currentUser.name || 'Sophia Laurent',
    email: currentUser.email || 'sophia.laurent@luxury-client.com',
    phone: currentUser.phone || '+33 6 42 19 88 10',
    street: currentUser.address?.street || '14 Rue du Faubourg Saint-Honoré',
    city: currentUser.address?.city || 'Paris',
    postalCode: currentUser.address?.postalCode || '75008',
    country: currentUser.address?.country || 'France'
  });

  // Shipping Method
  const [shippingMethod, setShippingMethod] = useState('dhl_express'); // 'dhl_express' | 'fedex_lux' | 'white_glove'

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState('credit_card'); // 'credit_card' | 'upi' | 'netbanking' | 'cod'
  const [cardInfo, setCardInfo] = useState({
    number: '4829 •••• •••• 8842',
    name: 'SOPHIA LAURENT',
    expiry: '09/29',
    cvv: '884'
  });

  const [upiId, setUpiId] = useState('sophia.laurent@okhdfcbank');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Group cart items by Boutique/Vendor
  const groupedCart = cart.reduce((acc, item) => {
    const vId = item.product.vendorId || 'v-default';
    if (!acc[vId]) {
      acc[vId] = {
        vendorName: item.product.vendorName || 'Luxury Partner Boutique',
        vendorCity: item.product.vendorCity || 'Paris',
        items: []
      };
    }
    acc[vId].items.push(item);
    return acc;
  }, {});

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Coupon Calculation
  let discountAmount = 0;
  if (appliedCoupon && coupons[appliedCoupon]) {
    const c = coupons[appliedCoupon];
    if (c.discountPercent) {
      discountAmount = Math.round((subtotal * c.discountPercent) / 100);
    }
  }

  // Shipping Fee
  let shippingFee = 0;
  if (appliedCoupon && coupons[appliedCoupon]?.freeShipping) {
    shippingFee = 0;
  } else {
    if (shippingMethod === 'white_glove') shippingFee = 150;
    else if (shippingMethod === 'fedex_lux') shippingFee = 45;
    else shippingFee = subtotal > 1000 ? 0 : 35; // Free DHL above $1000
  }

  // Import Duties & Taxes (5% nominal luxury insurance & VAT)
  const taxesAndDuties = Math.round(subtotal * 0.05);
  const total = Math.max(0, subtotal - discountAmount + shippingFee + taxesAndDuties);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const cleanCode = couponCode.trim().toUpperCase();
    if (coupons[cleanCode]) {
      setAppliedCoupon(cleanCode);
      showToast(`Coupon "${cleanCode}" applied: ${coupons[cleanCode].label}`, 'success');
      setCouponCode('');
    } else {
      showToast('Invalid promo code. Try "LUXURY2026" or "FARFETCH10"', 'error');
    }
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!cart.length) {
      showToast('Your shopping bag is empty.', 'error');
      return;
    }

    setIsPlacingOrder(true);

    // Trigger luxury confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#c5a059', '#111111', '#e2c275', '#ffffff']
      });
    } catch {
      // safe fallback
    }

    setTimeout(() => {
      const placed = placeOrder({
        customerName: address.name,
        customerEmail: address.email,
        phone: address.phone,
        shippingAddress: {
          street: address.street,
          city: address.city,
          postalCode: address.postalCode,
          country: address.country
        },
        shippingMethod:
          shippingMethod === 'white_glove'
            ? 'White Glove Concierge Courier'
            : shippingMethod === 'fedex_lux'
            ? 'FedEx Luxury International'
            : 'DHL Express Luxury Air',
        paymentMethod:
          paymentMethod === 'credit_card'
            ? `Visa Signature (${cardInfo.number})`
            : paymentMethod === 'upi'
            ? `UPI Instant (${upiId})`
            : paymentMethod === 'netbanking'
            ? 'Swiss Private Wire / NetBanking'
            : 'Concierge Cash on Delivery',
        subtotal,
        discount: discountAmount,
        shippingFee,
        taxesAndDuties,
        total
      });

      setIsPlacingOrder(false);
      navigateTo('account');
    }, 1200);
  };

  if (!cart.length) {
    return (
      <div className="min-h-screen bg-[#fcfbfa] py-20">
        <div className="luxury-container max-w-lg text-center bg-white p-12 border border-[#e5e0d8] rounded-xs shadow-sm">
          <ShoppingBag size={48} className="text-[#c5a059] mx-auto mb-4 stroke-1" />
          <h2 className="font-serif text-2xl font-bold text-gray-900">Your Shopping Bag Is Empty</h2>
          <p className="text-xs text-gray-500 mt-2 leading-relaxed">
            Discover exceptional runway collections from over 120 verified European and global designer boutiques.
          </p>
          <button
            onClick={() => navigateTo('shop')}
            className="mt-6 btn-primary !py-3 !px-8 text-xs inline-flex items-center gap-2"
          >
            <span>Explore SS26 Runway Collections</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfbfa] py-10">
      <div className="luxury-container">
        {/* Header */}
        <div className="border-b border-[#ece8e0] pb-5 mb-8">
          <h1 className="font-serif text-3xl font-bold text-gray-900">
            Shopping Bag & Secure Checkout
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Review multi-vendor items, select international delivery, and complete encrypted payment.
          </p>
        </div>

        <form onSubmit={handleCheckoutSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* ================= LEFT: CART ITEMS & CHECKOUT STEPS (7 Cols) ================= */}
            <div className="lg:col-span-7 space-y-8">
              {/* 1. Multi-Vendor Shopping Bag Items */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-black flex items-center gap-2">
                    <ShoppingBag size={14} className="text-[#c5a059]" />
                    <span>Selected Runway Pieces ({cart.length})</span>
                  </h3>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-xs text-red-600 hover:underline flex items-center gap-1"
                  >
                    <Trash2 size={12} />
                    <span>Empty Bag</span>
                  </button>
                </div>

                {/* Grouped by Boutique */}
                {Object.entries(groupedCart).map(([vId, group]) => (
                  <div
                    key={vId}
                    className="bg-white border border-[#e5e0d8] rounded-xs overflow-hidden shadow-sm"
                  >
                    {/* Boutique Header Tag */}
                    <div className="bg-[#faf8f5] px-4 py-2.5 border-b border-[#ebd9b5]/50 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-gray-900 font-semibold">
                        <Store size={14} className="text-[#c5a059]" />
                        <span>Dispatched directly by {group.vendorName}</span>
                      </div>
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider font-mono">
                        {group.vendorCity} • Express Air Cargo
                      </span>
                    </div>

                    {/* Items List */}
                    <div className="divide-y divide-gray-100 p-4 space-y-4">
                      {group.items.map((item) => (
                        <div
                          key={item.id}
                          className="pt-3 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-4">
                            <img
                              src={item.product.images[0]}
                              alt={item.product.title}
                              className="w-16 h-20 object-cover rounded-xs border shrink-0"
                            />
                            <div>
                              <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                                {item.product.brand}
                              </div>
                              <h4
                                onClick={() => navigateTo('product-detail', item.product.id)}
                                className="font-serif font-semibold text-xs text-gray-900 hover:text-[#c5a059] cursor-pointer max-w-sm"
                              >
                                {item.product.title}
                              </h4>
                              <div className="text-[11px] text-gray-500 mt-1 flex items-center gap-3">
                                <span>
                                  Size: <strong className="text-black">{item.selectedSize}</strong>
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  Color:
                                  <span
                                    className="w-2.5 h-2.5 rounded-full inline-block border"
                                    style={{ backgroundColor: item.selectedColor?.hex || '#000' }}
                                  />
                                  <strong className="text-black">{item.selectedColor?.name || 'Standard'}</strong>
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Quantity & Price Controls */}
                          <div className="flex items-center justify-between w-full sm:w-auto gap-6 self-end sm:self-center">
                            <div className="flex items-center border border-gray-300 rounded-xs bg-white">
                              <button
                                type="button"
                                onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-100"
                              >
                                <Minus size={11} />
                              </button>
                              <span className="px-2.5 text-xs font-bold font-mono">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-100"
                              >
                                <Plus size={11} />
                              </button>
                            </div>

                            <div className="text-right">
                              <div className="font-serif font-bold text-sm text-gray-900">
                                {formatPrice(item.price * item.quantity)}
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFromCart(item.id)}
                                className="text-[10px] text-gray-400 hover:text-red-600 underline mt-0.5"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* 2. Delivery Address Step */}
              <div className="bg-white border border-[#e5e0d8] p-6 rounded-xs shadow-sm space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-black flex items-center gap-2">
                  <Truck size={14} className="text-[#c5a059]" />
                  <span>1. Delivery Destination</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                      Recipient Full Name
                    </label>
                    <input
                      type="text"
                      value={address.name}
                      onChange={(e) => setAddress({ ...address, name: e.target.value })}
                      required
                      className="luxury-input text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={address.email}
                      onChange={(e) => setAddress({ ...address, email: e.target.value })}
                      required
                      className="luxury-input text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                      Street Address / Residence
                    </label>
                    <input
                      type="text"
                      value={address.street}
                      onChange={(e) => setAddress({ ...address, street: e.target.value })}
                      required
                      className="luxury-input text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      required
                      className="luxury-input text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      required
                      className="luxury-input text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={address.postalCode}
                      onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                      required
                      className="luxury-input text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      value={address.country}
                      onChange={(e) => setAddress({ ...address, country: e.target.value })}
                      required
                      className="luxury-input text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Shipping Courier Selection */}
              <div className="bg-white border border-[#e5e0d8] p-6 rounded-xs shadow-sm space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-black flex items-center gap-2">
                  <ShieldCheck size={14} className="text-[#c5a059]" />
                  <span>2. Express Air Courier SLA</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label
                    onClick={() => setShippingMethod('dhl_express')}
                    className={`p-3.5 border rounded-xs cursor-pointer transition-all flex flex-col justify-between ${
                      shippingMethod === 'dhl_express'
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 bg-white text-gray-800 hover:border-gray-400'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs">DHL Express Luxury Air</div>
                      <div className={`text-[10px] mt-1 ${shippingMethod === 'dhl_express' ? 'text-gray-300' : 'text-gray-500'}`}>
                        1-3 Business Days
                      </div>
                    </div>
                    <div className="mt-3 font-serif font-bold text-xs">
                      {subtotal > 1000 ? 'FREE' : '$35.00'}
                    </div>
                  </label>

                  <label
                    onClick={() => setShippingMethod('fedex_lux')}
                    className={`p-3.5 border rounded-xs cursor-pointer transition-all flex flex-col justify-between ${
                      shippingMethod === 'fedex_lux'
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 bg-white text-gray-800 hover:border-gray-400'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs">FedEx Priority International</div>
                      <div className={`text-[10px] mt-1 ${shippingMethod === 'fedex_lux' ? 'text-gray-300' : 'text-gray-500'}`}>
                        2-4 Business Days
                      </div>
                    </div>
                    <div className="mt-3 font-serif font-bold text-xs">$45.00</div>
                  </label>

                  <label
                    onClick={() => setShippingMethod('white_glove')}
                    className={`p-3.5 border rounded-xs cursor-pointer transition-all flex flex-col justify-between ${
                      shippingMethod === 'white_glove'
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 bg-white text-gray-800 hover:border-gray-400'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs flex items-center gap-1">
                        <Sparkles size={11} className="text-[#c5a059]" />
                        <span>White Glove Concierge</span>
                      </div>
                      <div className={`text-[10px] mt-1 ${shippingMethod === 'white_glove' ? 'text-gray-300' : 'text-gray-500'}`}>
                        Armored & Hand Delivered
                      </div>
                    </div>
                    <div className="mt-3 font-serif font-bold text-xs">$150.00</div>
                  </label>
                </div>
              </div>

              {/* 4. Payment Gateway Simulator */}
              <div className="bg-white border border-[#e5e0d8] p-6 rounded-xs shadow-sm space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-black flex items-center gap-2">
                  <Lock size={14} className="text-[#c5a059]" />
                  <span>3. 256-Bit Encrypted Payment Method</span>
                </h3>

                {/* Gateway Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('credit_card')}
                    className={`p-2.5 border rounded-xs text-xs font-semibold flex flex-col items-center gap-1.5 transition-colors ${
                      paymentMethod === 'credit_card'
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <CreditCard size={16} />
                    <span>Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-2.5 border rounded-xs text-xs font-semibold flex flex-col items-center gap-1.5 transition-colors ${
                      paymentMethod === 'upi'
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <QrCode size={16} />
                    <span>UPI / QR Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-2.5 border rounded-xs text-xs font-semibold flex flex-col items-center gap-1.5 transition-colors ${
                      paymentMethod === 'netbanking'
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Landmark size={16} />
                    <span>NetBanking</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-2.5 border rounded-xs text-xs font-semibold flex flex-col items-center gap-1.5 transition-colors ${
                      paymentMethod === 'cod'
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <ShieldCheck size={16} />
                    <span>Concierge COD</span>
                  </button>
                </div>

                {/* Gateway Details Form */}
                {paymentMethod === 'credit_card' && (
                  <div className="bg-[#faf8f5] p-4 rounded-xs border border-[#e5e0d8] space-y-3">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>Visa, Mastercard, Amex Centurion Supported</span>
                      <span className="font-mono text-[10px]">PCI-DSS COMPLIANT</span>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase text-gray-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardInfo.number}
                        onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                        className="luxury-input text-xs font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-1">
                        <label className="block text-[11px] font-semibold uppercase text-gray-700 mb-1">
                          Expiry
                        </label>
                        <input
                          type="text"
                          value={cardInfo.expiry}
                          onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                          className="luxury-input text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold uppercase text-gray-700 mb-1">
                          CVV / CVC
                        </label>
                        <input
                          type="password"
                          value={cardInfo.cvv}
                          onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                          className="luxury-input text-xs font-mono"
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-[11px] font-semibold uppercase text-gray-700 mb-1">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          value={cardInfo.name}
                          onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })}
                          className="luxury-input text-xs"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div className="bg-[#faf8f5] p-4 rounded-xs border border-[#e5e0d8] space-y-3 text-xs">
                    <label className="block font-semibold uppercase text-gray-700">
                      Virtual Payment Address (VPA / UPI ID)
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@okhdfcbank"
                      className="luxury-input text-xs font-mono"
                    />
                    <div className="text-[11px] text-gray-500">
                      Supported: Google Pay, PhonePe, Paytm, BHIM, Cred UPI. Instant payment request will be triggered upon checkout.
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="bg-[#faf8f5] p-4 rounded-xs border border-[#e5e0d8] space-y-2 text-xs">
                    <label className="block font-semibold uppercase text-gray-700">
                      Select Financial Institution
                    </label>
                    <select className="luxury-select text-xs">
                      <option>HSBC Premier Private Banking</option>
                      <option>Barclays International Wealth</option>
                      <option>BNP Paribas Private Client</option>
                      <option>HDFC Bank Imperia</option>
                      <option>J.P. Morgan Private Bank</option>
                    </select>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="bg-[#faf8f5] p-4 rounded-xs border border-[#e5e0d8] text-xs text-gray-600 leading-relaxed">
                    Pay securely via cash or luxury terminal upon direct doorstep delivery by our dedicated white-glove courier concierge.
                  </div>
                )}
              </div>
            </div>

            {/* ================= RIGHT: LUXURY ORDER SUMMARY & PLACE ORDER (5 Cols) ================= */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-[#e5e0d8] p-6 rounded-xs shadow-sm sticky top-24 space-y-5">
                <h3 className="font-serif text-lg font-bold text-gray-900 border-b border-gray-200 pb-3">
                  Order Summary
                </h3>

                {/* Coupon Code Engine */}
                <div>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Coupon: LUXURY2026"
                        className="luxury-input !py-2 !pl-8 text-xs font-mono uppercase"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="btn-secondary !py-2 !px-4 text-xs font-bold shrink-0"
                    >
                      Apply
                    </button>
                  </div>

                  {appliedCoupon && (
                    <div className="flex items-center justify-between text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xs mt-2">
                      <div className="flex items-center gap-1.5 font-medium">
                        <Check size={13} />
                        <span>Code "{appliedCoupon}" Active</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAppliedCoupon('')}
                        className="text-[10px] text-gray-500 hover:text-black underline"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* Financial Breakdown */}
                <div className="space-y-2.5 text-xs text-gray-600 border-t border-gray-100 pt-4">
                  <div className="flex justify-between">
                    <span>Runway Subtotal</span>
                    <span className="font-semibold text-gray-900">{formatPrice(subtotal)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#c5a059] font-semibold">
                      <span>Promo Discount ({appliedCoupon})</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Express Boutique Air Freight</span>
                    <span className="font-semibold text-gray-900">
                      {shippingFee === 0 ? 'COMPLIMENTARY' : formatPrice(shippingFee)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Prepaid Import Duties & Luxury VAT (5%)</span>
                    <span className="font-semibold text-gray-900">{formatPrice(taxesAndDuties)}</span>
                  </div>

                  <div className="border-t border-gray-200 pt-3 flex justify-between items-baseline text-black">
                    <span className="font-bold uppercase tracking-wider text-sm">Total Due</span>
                    <span className="font-serif text-2xl font-bold">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Place Order CTA */}
                <button
                  type="submit"
                  disabled={isPlacingOrder}
                  className="w-full btn-gold !py-4 text-xs font-bold tracking-widest flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
                >
                  {isPlacingOrder ? (
                    <span className="animate-pulse">Authorizing Encrypted Transaction...</span>
                  ) : (
                    <>
                      <Lock size={15} />
                      <span>Authorize Payment & Place Order ({formatPrice(total)})</span>
                    </>
                  )}
                </button>

                <div className="text-[10px] text-gray-400 text-center flex items-center justify-center gap-1.5 pt-1">
                  <ShieldCheck size={12} className="text-[#c5a059]" />
                  <span>Backed by AURA LUXE Verified Boutique Authenticity Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
