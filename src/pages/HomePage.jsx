import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Store,
  Star,
  Heart,
  Eye,
  ShoppingBag,
  TrendingUp,
  Award,
  ChevronRight
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

export const HomePage = () => {
  const {
    navigateTo,
    products,
    vendors,
    formatPrice,
    setCategoryFilter,
    setVendorFilter,
    setQuickViewProduct,
    toggleWishlist,
    wishlist,
    addToCart
  } = useApp();

  const [heroSlide, setHeroSlide] = useState(0);

  const heroSlides = [
    {
      title: "SS26 RUNWAY COUTURE",
      subtitle: "DIRECT FROM PARIS & MILANO BOUTIQUES",
      desc: "Immerse yourself in structured tailoring, fluid silk charmeuse gowns, and rare archival pieces curated from over 120 verified European fashion houses.",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=85",
      cta: "Explore The Runway Edit",
      category: "Women"
    },
    {
      title: "THE SARTORIAL MASTERCLASS",
      subtitle: "SAVILE ROW & TOKYO TAILORING",
      desc: "Super 180s cashmere suits, deconstructed wool flannel blazers, and artisanal leather crafted by generational master tailors.",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=85",
      cta: "Discover Men's Sartorial",
      category: "Men"
    },
    {
      title: "HAUTE LEATHER & ACCESSORIES",
      subtitle: "BOTTEGA VENETA, LOEWE & PRADA",
      desc: "Hand-woven nappa leather cassettes, architectural comma pumps, and GIA-certified high jewelry dispatched with white-glove security.",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1600&q=85",
      cta: "Shop Luxury Bags & Shoes",
      category: "Bags"
    }
  ];

  const currentSlide = heroSlides[heroSlide];
  const trendingProducts = products.filter((p) => p.trending || p.featured).slice(0, 4);
  const featuredBoutiques = vendors.slice(0, 4);

  const designerBrands = [
    "SAINT LAURENT",
    "BOTTEGA VENETA",
    "PRADA",
    "JACQUEMUS",
    "LOEWE",
    "MAISON MARGIELA",
    "BALENCIAGA",
    "TOM FORD",
    "SAVILE ROW BESPOKE"
  ];

  return (
    <div className="min-h-screen bg-[#fcfbfa] pb-20">
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="relative bg-[#0c0c0c] text-white overflow-hidden min-h-[560px] md:min-h-[640px] flex items-center">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            className="w-full h-full object-cover object-center opacity-40 transition-all duration-1000 transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="luxury-container relative z-10 py-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af37] mb-4">
            <Sparkles size={13} className="text-[#d4af37]" />
            <span>Curated Multi-Vendor Haute Collection</span>
          </div>

          <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-gray-300 font-medium mb-2">
            {currentSlide.subtitle}
          </p>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight mb-5">
            {currentSlide.title}
          </h2>

          <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-xl mb-8 font-light">
            {currentSlide.desc}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                setCategoryFilter(currentSlide.category);
                navigateTo('shop');
              }}
              className="btn-gold !py-3.5 !px-8 text-xs flex items-center gap-2"
            >
              <span>{currentSlide.cta}</span>
              <ArrowRight size={15} />
            </button>

            <button
              onClick={() => navigateTo('shop')}
              className="px-6 py-3.5 text-xs font-semibold tracking-luxury uppercase text-white hover:text-[#d4af37] border border-white/30 hover:border-[#d4af37] transition-colors rounded-xs"
            >
              View Full SS26 Catalog
            </button>
          </div>

          {/* Slide Indicator Buttons */}
          <div className="flex items-center gap-2 mt-12">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setHeroSlide(idx)}
                className={`h-1.5 transition-all rounded-full ${
                  heroSlide === idx ? 'w-8 bg-[#d4af37]' : 'w-2.5 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. DESIGNER BRANDS TICKER */}
      <section className="bg-white border-y border-[#ece8e0] py-4 overflow-hidden">
        <div className="luxury-container flex items-center justify-between gap-6 overflow-x-auto no-scrollbar opacity-75">
          {designerBrands.map((brand) => (
            <span
              key={brand}
              onClick={() => {
                navigateTo('shop');
              }}
              className="text-xs md:text-sm font-serif font-bold tracking-[0.25em] text-[#333] hover:text-black cursor-pointer whitespace-nowrap px-4 transition-colors"
            >
              {brand}
            </span>
          ))}
        </div>
      </section>

      {/* 3. FEATURED FASHION CATEGORIES GRID */}
      <section className="luxury-container pt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c5a059]">
              Curated Departments
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mt-1">
              Explore By Category
            </h3>
          </div>
          <button
            onClick={() => {
              setCategoryFilter('all');
              navigateTo('shop');
            }}
            className="text-xs font-semibold uppercase tracking-wider text-black hover:text-[#c5a059] flex items-center gap-1 mt-2 md:mt-0 transition-colors"
          >
            <span>View All Collections</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {CATEGORIES.filter((c) => c.id !== 'all').slice(0, 4).map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setCategoryFilter(cat.id);
                navigateTo('shop');
              }}
              className="group relative cursor-pointer overflow-hidden rounded-xs bg-black aspect-[3/4] shadow-sm"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover object-center opacity-85 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] uppercase font-bold tracking-[0.18em] text-[#d4af37] mb-1">
                  {cat.count} Curated Pieces
                </span>
                <h4 className="font-serif text-lg md:text-xl font-bold leading-tight group-hover:text-[#d4af37] transition-colors">
                  {cat.name}
                </h4>
                <div className="flex items-center gap-1 text-xs text-gray-300 font-medium mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Shop Collection</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TRENDING RUNWAY DROPS (Product Highlights) */}
      <section className="luxury-container pt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#c5a059]">
              <TrendingUp size={14} />
              <span>Trending Worldwide</span>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mt-1">
              SS26 Trending Runway Highlights
            </h3>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-xs font-semibold uppercase tracking-wider text-black hover:text-[#c5a059] flex items-center gap-1 mt-2 md:mt-0 transition-colors"
          >
            <span>See All Runway Pieces ({products.length})</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((prod) => {
            const isWishlisted = wishlist.includes(prod.id);
            return (
              <div
                key={prod.id}
                className="product-card group bg-white border border-[#ece8e0] rounded-xs overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:border-[#c5a059]/40"
              >
                {/* Image & Badges */}
                <div className="product-image-container">
                  <img
                    src={prod.images[0]}
                    alt={prod.title}
                    className="main-img"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
                    {prod.tag && <span className="badge-luxury text-[9px]">{prod.tag}</span>}
                    {prod.discount > 0 && (
                      <span className="badge-gold text-[9px]">-{prod.discount}%</span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(prod.id);
                    }}
                    className="absolute top-2.5 right-2.5 z-10 p-2 rounded-full bg-white/85 hover:bg-white text-gray-700 shadow-sm transition-transform active:scale-90"
                    title="Add to Wishlist"
                  >
                    <Heart
                      size={16}
                      className={isWishlisted ? "fill-[#c5a059] text-[#c5a059]" : ""}
                    />
                  </button>

                  {/* Quick View Overlay on Hover */}
                  <div className="quick-view-overlay">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(prod);
                      }}
                      className="btn-primary !py-2 !px-4 text-xs w-full flex items-center justify-center gap-1.5 shadow-xl"
                    >
                      <Eye size={14} />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    {/* Boutique & Brand */}
                    <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
                      <span className="font-bold uppercase tracking-widest text-black">
                        {prod.brand}
                      </span>
                      <span className="text-[10px] text-emerald-800 font-medium truncate max-w-[120px]">
                        {prod.vendorName}
                      </span>
                    </div>

                    <h4
                      onClick={() => navigateTo('product-detail', prod.id)}
                      className="font-medium text-xs text-gray-900 line-clamp-2 hover:text-[#c5a059] cursor-pointer transition-colors leading-snug"
                    >
                      {prod.title}
                    </h4>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mt-1.5 text-[11px] text-gray-500">
                      <div className="flex text-[#c5a059]">
                        <Star size={11} className="fill-[#c5a059]" />
                      </div>
                      <span className="font-semibold text-gray-800">{prod.rating}</span>
                      <span>({prod.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Price & Add to Bag */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-gray-900 font-serif">
                        {formatPrice(prod.price)}
                      </div>
                      {prod.originalPrice && (
                        <div className="text-[11px] text-gray-400 line-through">
                          {formatPrice(prod.originalPrice)}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(prod, prod.sizes[0], prod.colors[0], 1)}
                      className="p-2 bg-black hover:bg-[#222] text-white rounded-xs transition-transform active:scale-95"
                      title="Add to Shopping Bag"
                    >
                      <ShoppingBag size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. MULTI-VENDOR BOUTIQUE SPOTLIGHT */}
      <section className="luxury-container pt-20">
        <div className="bg-[#111] text-white p-8 md:p-12 rounded-xs border border-[#262626] relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c5a059]">
              Verified Partner Boutiques
            </span>
            <h3 className="font-serif text-2xl md:text-4xl font-bold text-white mt-1">
              Global Boutiques. Direct Dispatch.
            </h3>
            <p className="text-xs md:text-sm text-gray-300 mt-2 leading-relaxed">
              Every item ordered through AURA LUXE ships directly from independent luxury boutiques in Paris, Milan, London, and Tokyo. Enjoy guaranteed authenticity, concierge packaging, and duty-free express air delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 relative z-10">
            {featuredBoutiques.map((b) => (
              <div
                key={b.id}
                onClick={() => {
                  setVendorFilter(b.id);
                  navigateTo('shop');
                }}
                className="bg-[#1c1c1c] hover:bg-[#242424] border border-[#333] hover:border-[#c5a059] p-5 rounded-xs cursor-pointer transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={b.logo}
                    alt={b.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#c5a059]"
                  />
                  <div>
                    <h4 className="font-serif font-bold text-sm text-white">{b.name}</h4>
                    <span className="text-[11px] text-gray-400">
                      {b.city}, {b.country}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed mb-3">
                  {b.bio}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-[#2d2d2d] text-[11px]">
                  <span className="text-[#c5a059] font-bold flex items-center gap-1">
                    <Star size={11} className="fill-[#c5a059]" /> {b.rating} Rating
                  </span>
                  <span className="text-gray-300 font-medium">
                    {b.productsCount} Runway Items
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CURATED EDITORIAL OFFERS & CONCIERGE PROMO */}
      <section className="luxury-container pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Promo Card 1 */}
          <div className="relative overflow-hidden rounded-xs bg-[#1a1714] text-white p-8 md:p-12 flex flex-col justify-between min-h-[320px]">
            <div className="relative z-10">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c5a059]">
                Private Client Exclusive
              </span>
              <h4 className="font-serif text-2xl md:text-3xl font-bold mt-2">
                15% Off Your First Couture Acquisition
              </h4>
              <p className="text-xs text-gray-300 mt-2 max-w-md leading-relaxed">
                Use code <strong className="text-white font-mono bg-white/10 px-1.5 py-0.5 rounded">LUXURY2026</strong> during checkout on any order over $500. Includes insured air courier.
              </p>
            </div>
            <div className="relative z-10 mt-6">
              <button
                onClick={() => navigateTo('shop')}
                className="btn-gold !py-3 !px-6 text-xs flex items-center gap-2"
              >
                <span>Redeem & Shop Now</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Promo Card 2 */}
          <div className="relative overflow-hidden rounded-xs bg-[#0e161c] text-white p-8 md:p-12 flex flex-col justify-between min-h-[320px]">
            <div className="relative z-10">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#4ea8de]">
                SaaS Multi-Vendor Ecosystem
              </span>
              <h4 className="font-serif text-2xl md:text-3xl font-bold mt-2">
                Are You a Designer Boutique?
              </h4>
              <p className="text-xs text-gray-300 mt-2 max-w-md leading-relaxed">
                Join 120+ verified fashion houses on AURA LUXE. Access automated inventory sync, international customs handling, and real-time sales dashboards.
              </p>
            </div>
            <div className="relative z-10 mt-6 flex items-center gap-4">
              <button
                onClick={() => navigateTo('vendor-dashboard')}
                className="btn-primary !bg-white !text-black hover:!bg-gray-200 !py-3 !px-6 text-xs flex items-center gap-2"
              >
                <Store size={14} />
                <span>Launch Vendor Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
