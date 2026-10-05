import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  SlidersHorizontal,
  Search,
  Filter,
  X,
  Heart,
  Eye,
  ShoppingBag,
  Star,
  Grid,
  LayoutGrid,
  List,
  RotateCcw,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

export const ShopPage = () => {
  const {
    products,
    vendors,
    formatPrice,
    navigateTo,
    categoryFilter,
    setCategoryFilter,
    brandFilter,
    setBrandFilter,
    vendorFilter,
    setVendorFilter,
    priceMax,
    setPriceMax,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    setQuickViewProduct,
    toggleWishlist,
    wishlist,
    addToCart
  } = useApp();

  const [inStockOnly, setInStockOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [gridCols, setGridCols] = useState(4); // 4, 3, or 1 (list)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Unique brands list
  const allBrands = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.brand))).sort();
  }, [products]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category
        if (categoryFilter !== 'all' && p.category.toLowerCase() !== categoryFilter.toLowerCase()) {
          return false;
        }
        // Brand
        if (brandFilter !== 'all' && p.brand !== brandFilter) {
          return false;
        }
        // Vendor
        if (vendorFilter !== 'all' && p.vendorId !== vendorFilter) {
          return false;
        }
        // Price
        if (p.price > priceMax) {
          return false;
        }
        // Stock
        if (inStockOnly && !p.inStock) {
          return false;
        }
        // Rating
        if (minRating > 0 && p.rating < minRating) {
          return false;
        }
        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = p.title.toLowerCase().includes(q);
          const matchesBrand = p.brand.toLowerCase().includes(q);
          const matchesCategory = p.category.toLowerCase().includes(q);
          const matchesVendor = p.vendorName.toLowerCase().includes(q);
          if (!matchesTitle && !matchesBrand && !matchesCategory && !matchesVendor) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return b.id.localeCompare(a.id);
        // default: featured
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, categoryFilter, brandFilter, vendorFilter, priceMax, inStockOnly, minRating, searchQuery, sortBy]);

  const resetFilters = () => {
    setCategoryFilter('all');
    setBrandFilter('all');
    setVendorFilter('all');
    setPriceMax(10000);
    setMinRating(0);
    setInStockOnly(false);
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters =
    categoryFilter !== 'all' ||
    brandFilter !== 'all' ||
    vendorFilter !== 'all' ||
    priceMax < 10000 ||
    inStockOnly ||
    minRating > 0 ||
    searchQuery.trim() !== '';

  return (
    <div className="min-h-screen bg-[#fcfbfa] py-8">
      <div className="luxury-container">
        {/* Breadcrumb & Header */}
        <div className="border-b border-[#ece8e0] pb-6 mb-8">
          <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">
            Aura Luxe <span className="mx-1.5">/</span> Catalog <span className="mx-1.5">/</span>{' '}
            <span className="text-black font-semibold">
              {categoryFilter === 'all' ? 'All Collections' : categoryFilter}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
                {categoryFilter === 'all'
                  ? 'The Global Luxury Runway Edit'
                  : `${categoryFilter} Designer Collections`}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Showing {filteredProducts.length} curated runway pieces from independent Parisian, Milanese & Tokyo boutiques.
              </p>
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="md:hidden flex items-center justify-center gap-2 btn-secondary !py-2 text-xs"
            >
              <Filter size={14} />
              <span>Filters ({hasActiveFilters ? 'Active' : 'All'})</span>
            </button>
          </div>
        </div>

        {/* Layout Grid (Sidebar + Main Catalog) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* ================= SIDEBAR FILTERS (Desktop) ================= */}
          <aside className="hidden md:block space-y-6">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-black flex items-center gap-1.5">
                <SlidersHorizontal size={14} className="text-[#c5a059]" />
                <span>Boutique Filters</span>
              </span>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] text-gray-500 hover:text-black flex items-center gap-1 underline"
                >
                  <RotateCcw size={11} />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* 1. Category Filter */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2.5">
                Department
              </h4>
              <div className="space-y-1 text-xs">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategoryFilter(cat.id)}
                    className={`w-full text-left py-1.5 px-2 rounded-xs flex items-center justify-between transition-colors ${
                      categoryFilter.toLowerCase() === cat.id.toLowerCase()
                        ? 'bg-black text-white font-semibold'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className={`text-[10px] ${categoryFilter.toLowerCase() === cat.id.toLowerCase() ? 'text-gray-300' : 'text-gray-400'}`}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Vendor / Boutique Filter */}
            <div className="border-t border-gray-200 pt-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2.5">
                Partner Boutique
              </h4>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => setVendorFilter('all')}
                  className={`w-full text-left py-1.5 px-2 rounded-xs flex items-center justify-between transition-colors ${
                    vendorFilter === 'all'
                      ? 'bg-black text-white font-semibold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span>All Boutiques</span>
                </button>
                {vendors.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setVendorFilter(v.id)}
                    className={`w-full text-left py-1.5 px-2 rounded-xs flex items-center justify-between transition-colors ${
                      vendorFilter === v.id
                        ? 'bg-black text-white font-semibold'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span className="truncate pr-1">{v.name}</span>
                    <span className="text-[10px] text-gray-400 shrink-0">{v.city}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Designer Brand Filter */}
            <div className="border-t border-gray-200 pt-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2.5">
                Designer Brand
              </h4>
              <div className="space-y-1 text-xs max-h-48 overflow-y-auto pr-1">
                <button
                  onClick={() => setBrandFilter('all')}
                  className={`w-full text-left py-1.5 px-2 rounded-xs flex items-center justify-between transition-colors ${
                    brandFilter === 'all'
                      ? 'bg-black text-white font-semibold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span>All Designers</span>
                </button>
                {allBrands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setBrandFilter(brand)}
                    className={`w-full text-left py-1.5 px-2 rounded-xs flex items-center justify-between transition-colors ${
                      brandFilter === brand
                        ? 'bg-black text-white font-semibold'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span>{brand}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Price Max Range */}
            <div className="border-t border-gray-200 pt-5">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Max Price
                </h4>
                <span className="text-xs font-bold font-serif text-black">
                  {formatPrice(priceMax)}
                </span>
              </div>
              <input
                type="range"
                min={500}
                max={10000}
                step={250}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-black cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>$500</span>
                <span>$5,000</span>
                <span>$10,000+</span>
              </div>
            </div>

            {/* 5. In Stock & Rating */}
            <div className="border-t border-gray-200 pt-5 space-y-3">
              <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded-xs accent-black w-4 h-4 cursor-pointer"
                />
                <span className="font-medium">In Stock Only</span>
              </label>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Minimum Rating
                </label>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="luxury-select !py-1.5 text-xs"
                >
                  <option value={0}>Any Rating</option>
                  <option value={4.5}>4.5★ and above</option>
                  <option value={4.8}>4.8★ and above (Master Pieces)</option>
                  <option value={5.0}>5.0★ Pure Perfection</option>
                </select>
              </div>
            </div>
          </aside>

          {/* ================= MAIN PRODUCTS GRID ================= */}
          <main className="md:col-span-3 space-y-6">
            {/* Top Toolbar: Search, Sort, Grid View Switcher */}
            <div className="bg-white p-3.5 border border-[#e5e0d8] rounded-xs flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Search Within Catalog */}
              <div className="relative w-full sm:w-72">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by name, color, style..."
                  className="luxury-input !py-1.5 !pl-8 text-xs w-full"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>

              {/* Sort & Grid View Switcher */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-gray-500 font-medium">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="luxury-select !py-1.5 !px-2 text-xs !w-auto bg-transparent border-gray-300 font-semibold"
                  >
                    <option value="featured">Featured Runway</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest Additions</option>
                  </select>
                </div>

                {/* Grid Switchers (Desktop) */}
                <div className="hidden lg:flex items-center border border-gray-300 rounded-xs p-0.5">
                  <button
                    onClick={() => setGridCols(4)}
                    className={`p-1.5 rounded-xs transition-colors ${
                      gridCols === 4 ? 'bg-black text-white' : 'text-gray-500 hover:text-black'
                    }`}
                    title="4 Columns"
                  >
                    <LayoutGrid size={14} />
                  </button>
                  <button
                    onClick={() => setGridCols(3)}
                    className={`p-1.5 rounded-xs transition-colors ${
                      gridCols === 3 ? 'bg-black text-white' : 'text-gray-500 hover:text-black'
                    }`}
                    title="3 Columns"
                  >
                    <Grid size={14} />
                  </button>
                  <button
                    onClick={() => setGridCols(1)}
                    className={`p-1.5 rounded-xs transition-colors ${
                      gridCols === 1 ? 'bg-black text-white' : 'text-gray-500 hover:text-black'
                    }`}
                    title="List View"
                  >
                    <List size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters Pill Bar */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-gray-500 font-medium">Active Filters:</span>

                {categoryFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-black text-white rounded-xs text-[11px]">
                    Category: {categoryFilter}
                    <X size={12} className="cursor-pointer" onClick={() => setCategoryFilter('all')} />
                  </span>
                )}

                {brandFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-black text-white rounded-xs text-[11px]">
                    Brand: {brandFilter}
                    <X size={12} className="cursor-pointer" onClick={() => setBrandFilter('all')} />
                  </span>
                )}

                {vendorFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-black text-white rounded-xs text-[11px]">
                    Boutique: {vendors.find((v) => v.id === vendorFilter)?.name}
                    <X size={12} className="cursor-pointer" onClick={() => setVendorFilter('all')} />
                  </span>
                )}

                {priceMax < 10000 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-black text-white rounded-xs text-[11px]">
                    Under {formatPrice(priceMax)}
                    <X size={12} className="cursor-pointer" onClick={() => setPriceMax(10000)} />
                  </span>
                )}

                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-black text-white rounded-xs text-[11px]">
                    "{searchQuery}"
                    <X size={12} className="cursor-pointer" onClick={() => setSearchQuery('')} />
                  </span>
                )}

                <button
                  onClick={resetFilters}
                  className="text-xs text-red-600 hover:underline font-medium ml-2"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Products Listing */}
            {filteredProducts.length > 0 ? (
              <div
                className={`grid gap-6 ${
                  gridCols === 4
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                    : gridCols === 3
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1'
                }`}
              >
                {filteredProducts.map((prod) => {
                  const isWishlisted = wishlist.includes(prod.id);

                  if (gridCols === 1) {
                    // LIST VIEW
                    return (
                      <div
                        key={prod.id}
                        className="bg-white border border-[#e5e0d8] rounded-xs p-4 flex flex-col sm:flex-row gap-5 items-center justify-between hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                          <img
                            src={prod.images[0]}
                            alt={prod.title}
                            className="w-24 h-32 object-cover rounded-xs border shrink-0"
                          />
                          <div>
                            <div className="text-xs font-bold uppercase tracking-widest text-black">
                              {prod.brand}
                            </div>
                            <h4
                              onClick={() => navigateTo('product-detail', prod.id)}
                              className="font-serif font-bold text-base text-gray-900 hover:text-[#c5a059] cursor-pointer mt-0.5"
                            >
                              {prod.title}
                            </h4>
                            <div className="text-xs text-emerald-800 font-medium mt-1">
                              Boutique: {prod.vendorName} ({prod.vendorCity})
                            </div>
                            <p className="text-xs text-gray-500 line-clamp-2 max-w-lg mt-1">
                              {prod.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto shrink-0 gap-3">
                          <div className="text-right">
                            <div className="font-serif text-lg font-bold">{formatPrice(prod.price)}</div>
                            {prod.originalPrice && (
                              <div className="text-xs text-gray-400 line-through">
                                {formatPrice(prod.originalPrice)}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setQuickViewProduct(prod)}
                              className="btn-secondary !py-2 !px-3 text-xs"
                            >
                              Quick View
                            </button>
                            <button
                              onClick={() => addToCart(prod, prod.sizes[0], prod.colors[0], 1)}
                              className="btn-primary !py-2 !px-4 text-xs flex items-center gap-1"
                            >
                              <ShoppingBag size={13} />
                              <span>Add</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  // GRID CARD
                  return (
                    <div
                      key={prod.id}
                      className="product-card group bg-white border border-[#ece8e0] rounded-xs overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:border-[#c5a059]/40"
                    >
                      <div className="product-image-container">
                        <img
                          src={prod.images[0]}
                          alt={prod.title}
                          className="main-img"
                        />

                        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
                          {prod.tag && <span className="badge-luxury text-[9px]">{prod.tag}</span>}
                          {prod.discount > 0 && (
                            <span className="badge-gold text-[9px]">-{prod.discount}%</span>
                          )}
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(prod.id);
                          }}
                          className="absolute top-2.5 right-2.5 z-10 p-2 rounded-full bg-white/85 hover:bg-white text-gray-700 shadow-sm transition-transform active:scale-90"
                          title="Wishlist"
                        >
                          <Heart
                            size={16}
                            className={isWishlisted ? "fill-[#c5a059] text-[#c5a059]" : ""}
                          />
                        </button>

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

                      <div className="p-4 flex flex-col justify-between flex-1">
                        <div>
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

                          <div className="flex items-center gap-1 mt-1.5 text-[11px] text-gray-500">
                            <div className="flex text-[#c5a059]">
                              <Star size={11} className="fill-[#c5a059]" />
                            </div>
                            <span className="font-semibold text-gray-800">{prod.rating}</span>
                            <span>({prod.reviewsCount})</span>
                          </div>
                        </div>

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
            ) : (
              <div className="bg-white border border-[#e5e0d8] p-12 text-center rounded-xs">
                <Sparkles size={36} className="text-[#c5a059] mx-auto mb-3" />
                <h3 className="font-serif text-xl font-bold text-gray-900">No Runway Items Found</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                  We couldn't find any pieces matching your current filter configuration. Try clearing your filters or changing your search terms.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 btn-primary !py-2.5 !px-6 text-xs"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
