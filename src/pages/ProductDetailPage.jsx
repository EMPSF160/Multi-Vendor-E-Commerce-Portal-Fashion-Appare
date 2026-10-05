import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Heart,
  ShoppingBag,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Store,
  Ruler,
  ChevronDown,
  ChevronUp,
  Share2,
  Check,
  ArrowRight,
  Send
} from 'lucide-react';

export const ProductDetailPage = () => {
  const {
    selectedProductId,
    products,
    vendors,
    formatPrice,
    addToCart,
    toggleWishlist,
    wishlist,
    setSizeGuideModal,
    navigateTo,
    addProductReview,
    showToast
  } = useApp();

  const product = products.find((p) => p.id === selectedProductId) || products[0];
  const vendor = vendors.find((v) => v.id === product.vendorId) || vendors[0];
  const isWishlisted = wishlist.includes(product.id);

  // States
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);

  // Accordions
  const [openAccordion, setOpenAccordion] = useState('details'); // 'details' | 'shipping' | 'boutique'

  // Review Form
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  // Related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    navigateTo('cart-checkout');
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewTitle.trim() || !reviewComment.trim()) return;
    addProductReview(product.id, {
      rating: reviewRating,
      title: reviewTitle,
      comment: reviewComment
    });
    setReviewTitle('');
    setReviewComment('');
    setShowReviewForm(false);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfbfa] py-10">
      <div className="luxury-container">
        {/* Breadcrumbs */}
        <div className="text-xs text-gray-500 uppercase tracking-widest mb-6">
          <button onClick={() => navigateTo('home')} className="hover:text-black">
            Home
          </button>
          <span className="mx-2">/</span>
          <button onClick={() => navigateTo('shop')} className="hover:text-black">
            {product.category}
          </button>
          <span className="mx-2">/</span>
          <span className="text-gray-400">{product.brand}</span>
          <span className="mx-2">/</span>
          <span className="text-black font-semibold truncate max-w-xs">{product.title}</span>
        </div>

        {/* Top Product Section: Gallery + Editorial Spec */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* ================= LEFT: EDITORIAL GALLERY (7 Cols) ================= */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-[3/4] w-full bg-[#f4f2ed] border border-[#e8e4dc] rounded-xs overflow-hidden shadow-sm">
              <img
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                {product.tag && <span className="badge-luxury text-xs">{product.tag}</span>}
                {product.discount > 0 && (
                  <span className="badge-gold text-xs">-{product.discount}% OFF</span>
                )}
              </div>

              {/* Wishlist & Share */}
              <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-full bg-white/85 hover:bg-white text-gray-700 shadow-md transition-colors"
                  title="Share Piece"
                >
                  <Share2 size={16} />
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="p-2.5 rounded-full bg-white/85 hover:bg-white text-gray-700 shadow-md transition-transform active:scale-95"
                  title="Save to Wishlist"
                >
                  <Heart
                    size={18}
                    className={isWishlisted ? "fill-[#c5a059] text-[#c5a059]" : ""}
                  />
                </button>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-20 h-24 rounded-xs overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIdx === idx
                        ? 'border-black scale-105 shadow-md'
                        : 'border-transparent opacity-65 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ================= RIGHT: LUXURY PRODUCT SPEC & ACTIONS (5 Cols) ================= */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              {/* Brand & Boutique Link */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-gray-900">
                  {product.brand}
                </h3>
                <span className="badge-boutique text-[11px]">
                  Boutique: {product.vendorName}
                </span>
              </div>

              <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                {product.title}
              </h1>

              {/* SKU & Verified Rating */}
              <div className="flex items-center justify-between text-xs text-gray-500 mt-2 pb-4 border-b border-gray-200">
                <span className="font-mono text-[11px] text-gray-400">SKU: {product.sku}</span>
                <div className="flex items-center gap-1.5">
                  <div className="flex text-[#c5a059]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        className={i < Math.floor(product.rating) ? "fill-[#c5a059]" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-gray-900">{product.rating}</span>
                  <span>({product.reviewsCount} reviews)</span>
                </div>
              </div>
            </div>

            {/* Price Block */}
            <div className="bg-[#faf8f5] p-4 rounded-xs border border-[#ebd9b5]/60 flex items-baseline justify-between">
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Boutique Price</div>
                <div className="flex items-baseline gap-3 mt-0.5">
                  <span className="font-serif text-3xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Import Duties Included
                </span>
              </div>
            </div>

            {/* Color Swatches */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold uppercase text-gray-700 mb-2">
                <span>Color Option</span>
                <span className="text-gray-500 font-normal">{selectedColor?.name}</span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xs border text-xs font-medium transition-all ${
                      selectedColor?.name === c.name
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 bg-white text-gray-800 hover:border-gray-500'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-gray-400 shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold uppercase text-gray-700 mb-2">
                <span>Select Runway Size</span>
                <button
                  type="button"
                  onClick={() => setSizeGuideModal(true)}
                  className="text-[11px] text-gray-500 hover:text-black underline flex items-center gap-1"
                >
                  <Ruler size={12} className="text-[#c5a059]" />
                  <span>Size Conversion Chart</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((sz) => {
                  const stock = product.stockPerSize?.[sz] ?? 3;
                  return (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2 text-xs font-semibold border rounded-xs transition-colors flex flex-col items-center justify-center ${
                        selectedSize === sz
                          ? 'bg-black text-white border-black shadow-md'
                          : 'bg-white text-gray-900 border-gray-300 hover:border-black'
                      }`}
                    >
                      <span>{sz}</span>
                      <span className={`text-[9px] ${selectedSize === sz ? 'text-gray-300' : 'text-gray-400'}`}>
                        {stock > 0 ? `${stock} left` : 'Sold out'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold uppercase text-gray-700">Quantity</span>
              <div className="flex items-center border border-gray-300 rounded-xs bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:text-black hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-xs font-bold text-gray-900 font-mono">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:text-black hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <span className="text-[11px] text-gray-500">
                Total: <strong className="text-black">{formatPrice(product.price * quantity)}</strong>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full btn-primary !py-3.5 text-xs flex items-center justify-center gap-2"
              >
                <ShoppingBag size={16} />
                <span>Add To Shopping Bag</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full btn-gold !py-3.5 text-xs flex items-center justify-center gap-2"
              >
                <Sparkles size={16} />
                <span>Express Boutique Checkout</span>
              </button>
            </div>

            {/* Direct Boutique Origin Card */}
            <div className="p-4 bg-white border border-[#e5e0d8] rounded-xs space-y-3">
              <div className="flex items-start gap-3">
                <Store size={18} className="text-[#c5a059] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-gray-900">
                    Direct Boutique Partner: {vendor.name}
                  </h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Located in {vendor.city}, {vendor.country}. Rating: {vendor.rating}★ ({vendor.reviewsCount} buyer verifications).
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-gray-600 pt-2 border-t border-gray-100">
                <Truck size={14} className="text-gray-400" />
                <span>{vendor.shippingSLA}</span>
              </div>
            </div>

            {/* Collapsible Accordions */}
            <div className="border-t border-gray-200 pt-4 space-y-3">
              {/* 1. Details & Composition */}
              <div className="border border-gray-200 rounded-xs bg-white">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'details' ? '' : 'details')}
                  className="w-full text-left p-3.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-900"
                >
                  <span>Composition & Product Highlights</span>
                  {openAccordion === 'details' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openAccordion === 'details' && (
                  <div className="p-4 border-t border-gray-100 text-xs text-gray-600 space-y-2">
                    <p className="leading-relaxed">{product.description}</p>
                    <ul className="list-disc list-inside space-y-1 mt-2 text-gray-700">
                      {product.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* 2. Shipping & Returns */}
              <div className="border border-gray-200 rounded-xs bg-white">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'shipping' ? '' : 'shipping')}
                  className="w-full text-left p-3.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-900"
                >
                  <span>Shipping, Duties & Free Returns</span>
                  {openAccordion === 'shipping' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openAccordion === 'shipping' && (
                  <div className="p-4 border-t border-gray-100 text-xs text-gray-600 space-y-2 leading-relaxed">
                    <p>
                      <strong>Global Delivery:</strong> Hand-inspected and dispatched within 24 hours. Transit time is 1-3 business days via DHL Express Luxury Air.
                    </p>
                    <p>
                      <strong>Customs & Taxes:</strong> All international duties and import fees are calculated and paid upfront during checkout—guaranteeing zero unexpected fees upon doorstep delivery.
                    </p>
                    <p>
                      <strong>Complimentary Return Policy:</strong> 14 days worldwide free return window with pre-arranged doorstep concierge pickup.
                    </p>
                  </div>
                )}
              </div>

              {/* 3. Boutique Authenticity */}
              <div className="border border-gray-200 rounded-xs bg-white">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'boutique' ? '' : 'boutique')}
                  className="w-full text-left p-3.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-900"
                >
                  <span>100% Authenticity Guarantee & NFC</span>
                  {openAccordion === 'boutique' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openAccordion === 'boutique' && (
                  <div className="p-4 border-t border-gray-100 text-xs text-gray-600 space-y-2 leading-relaxed">
                    <p>
                      Every garment sold on AURA LUXE carries an encrypted NFC chip registered on the blockchain certifying verified provenance from the brand's authorized European showroom.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM: VERIFIED REVIEWS & RATINGS ================= */}
        <section className="mt-20 pt-10 border-t border-gray-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c5a059]">
                Client Experience
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mt-1">
                Verified Client Reviews ({product.reviewsCount})
              </h3>
            </div>

            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="btn-secondary !py-2.5 !px-5 text-xs flex items-center gap-1.5 self-start"
            >
              <Sparkles size={14} className="text-[#c5a059]" />
              <span>{showReviewForm ? 'Cancel Review' : 'Write Verified Review'}</span>
            </button>
          </div>

          {/* Review Submission Form Modal / Box */}
          {showReviewForm && (
            <form
              onSubmit={handleReviewSubmit}
              className="bg-white border border-[#e5e0d8] p-6 rounded-xs mb-8 shadow-sm space-y-4 max-w-2xl"
            >
              <h4 className="font-serif font-bold text-base text-gray-900">
                Review this Runway Acquisition
              </h4>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  Your Rating
                </label>
                <div className="flex items-center gap-2 text-[#c5a059]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setReviewRating(s)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        size={20}
                        className={s <= reviewRating ? "fill-[#c5a059]" : "text-gray-300"}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-gray-600 font-semibold ml-2">
                    {reviewRating} of 5 Stars
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  Headline / Title
                </label>
                <input
                  type="text"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  placeholder="e.g. Pure masterclass in Parisian tailoring"
                  required
                  className="luxury-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                  Review Details & Fabric Feedback
                </label>
                <textarea
                  rows={4}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Describe the fit, drape, texture, packaging, and boutique delivery speed..."
                  required
                  className="luxury-input text-xs"
                />
              </div>

              <button
                type="submit"
                className="btn-primary !py-2.5 !px-6 text-xs flex items-center gap-1.5"
              >
                <Send size={13} />
                <span>Publish Verified Review</span>
              </button>
            </form>
          )}

          {/* Reviews List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white border border-[#ece8e0] p-5 rounded-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex text-[#c5a059]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        className={i < rev.rating ? "fill-[#c5a059]" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-gray-400 font-mono">{rev.date}</span>
                </div>

                <div>
                  <h5 className="font-serif font-bold text-sm text-gray-900">{rev.title}</h5>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{rev.comment}</p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-gray-100 text-[11px] text-gray-500">
                  <span className="font-semibold text-gray-800">{rev.author}</span>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-0.5 text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
                      <Check size={11} /> Verified Buyer
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= RELATED / COMPLETE THE LOOK ================= */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-10 border-t border-gray-300">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c5a059]">
                  Editorial Curation
                </span>
                <h3 className="font-serif text-2xl font-bold text-gray-900 mt-1">
                  Complete The Runway Look
                </h3>
              </div>
              <button
                onClick={() => navigateTo('shop')}
                className="text-xs font-semibold uppercase tracking-wider text-black hover:text-[#c5a059] flex items-center gap-1"
              >
                <span>Explore Full Lookbook</span>
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => navigateTo('product-detail', rel.id)}
                  className="bg-white border border-[#ece8e0] rounded-xs overflow-hidden p-3 cursor-pointer group hover:shadow-md transition-all"
                >
                  <div className="aspect-[3/4] bg-[#f7f6f4] overflow-hidden rounded-xs mb-3">
                    <img
                      src={rel.images[0]}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    {rel.brand}
                  </div>
                  <h4 className="font-medium text-xs text-gray-900 line-clamp-1 mt-0.5 group-hover:text-[#c5a059]">
                    {rel.title}
                  </h4>
                  <div className="font-serif font-bold text-sm text-gray-900 mt-1">
                    {formatPrice(rel.price)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
