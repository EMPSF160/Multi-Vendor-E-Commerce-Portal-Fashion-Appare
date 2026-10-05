import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Heart, Star, ShoppingBag, ShieldCheck, ArrowRight, Check } from 'lucide-react';

export const QuickViewModal = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    formatPrice,
    addToCart,
    toggleWishlist,
    wishlist,
    navigateTo,
    setSizeGuideModal
  } = useApp();

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isWishlisted = wishlist.includes(product.id);

  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  const handleAdd = () => {
    addToCart(product, selectedSize, selectedColor, 1);
    setQuickViewProduct(null);
  };

  const handleFullView = () => {
    navigateTo('product-detail', product.id);
    setQuickViewProduct(null);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content !max-w-4xl p-0 overflow-hidden relative">
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md transition-colors"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Gallery */}
          <div className="bg-[#f7f6f2] p-6 flex flex-col justify-between">
            <div className="aspect-[3/4] w-full overflow-hidden rounded-xs bg-white border border-[#e5e0d8] shadow-sm">
              <img
                src={product.images[selectedImgIndex] || product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImgIndex(idx)}
                    className={`w-14 h-16 rounded-xs overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImgIndex === idx ? 'border-black scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details & Buying */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              {/* Brand & Boutique Tag */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">
                  {product.brand}
                </span>
                <span className="badge-boutique text-[10px]">
                  Boutique: {product.vendorName} ({product.vendorCity})
                </span>
              </div>

              <h2 className="font-serif text-xl font-bold text-gray-900 leading-snug">
                {product.title}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-600">
                <div className="flex text-[#c5a059]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      className={i < Math.floor(product.rating) ? "fill-[#c5a059]" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="font-semibold text-gray-900">{product.rating}</span>
                <span>({product.reviewsCount} verified reviews)</span>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 mt-4">
                <span className="font-serif text-2xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="badge-gold text-[10px]">-{product.discount}% OFF</span>
                )}
              </div>

              <p className="text-xs text-gray-600 mt-3 line-clamp-3 leading-relaxed">
                {product.description}
              </p>

              {/* Color selection */}
              <div className="mt-5">
                <div className="text-xs font-semibold uppercase text-gray-700 mb-2">
                  Color: <span className="font-normal text-gray-600">{selectedColor?.name}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`w-7 h-7 rounded-full border-2 p-0.5 transition-all flex items-center justify-center ${
                        selectedColor?.name === c.name ? 'border-black scale-110' : 'border-gray-300 hover:border-gray-500'
                      }`}
                      title={c.name}
                    >
                      <span className="w-full h-full rounded-full" style={{ backgroundColor: c.hex }} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size selection */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase text-gray-700">Select Size</span>
                  <button
                    type="button"
                    onClick={() => setSizeGuideModal(true)}
                    className="text-[11px] text-gray-500 hover:text-black underline"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1.5 text-xs font-semibold border rounded-xs transition-colors ${
                        selectedSize === s
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-gray-800 border-gray-300 hover:border-black'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAdd}
                  className="flex-1 btn-primary !py-3 flex items-center justify-center gap-2 text-xs"
                >
                  <ShoppingBag size={15} />
                  <span>Add To Shopping Bag</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="p-3 border border-gray-300 hover:border-black rounded-xs transition-colors"
                  title="Wishlist"
                >
                  <Heart
                    size={18}
                    className={isWishlisted ? "fill-[#c5a059] text-[#c5a059]" : "text-gray-700"}
                  />
                </button>
              </div>

              <button
                onClick={handleFullView}
                className="w-full text-center text-xs font-semibold uppercase tracking-wider text-gray-600 hover:text-black mt-3 py-1 flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>View Full Runway Details & Reviews</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
