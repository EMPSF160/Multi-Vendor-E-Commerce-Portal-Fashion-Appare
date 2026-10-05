import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_PRODUCTS,
  INITIAL_VENDORS,
  INITIAL_ORDERS,
  USERS,
  CURRENCY_RATES,
  COUPONS,
  RBAC_ROLES
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation & View State
  const [activePage, setActivePage] = useState('home'); // 'home' | 'shop' | 'product-detail' | 'cart-checkout' | 'account' | 'vendor-dashboard' | 'admin-dashboard'
  const [selectedProductId, setSelectedProductId] = useState('prod-001');

  // Role & Authentication State
  const [activeRole, setActiveRole] = useState('customer'); // 'customer' | 'vendor' | 'admin'
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('aura_luxe_user');
    return saved ? JSON.parse(saved) : USERS[0];
  });
  const [authModal, setAuthModal] = useState({
    isOpen: false,
    mode: 'login', // 'login' | 'register' | 'forgot'
    rolePrefill: 'customer'
  });

  // Global Multi-Vendor Data
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('aura_luxe_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [vendors, setVendors] = useState(() => {
    const saved = localStorage.getItem('aura_luxe_vendors');
    return saved ? JSON.parse(saved) : INITIAL_VENDORS;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('aura_luxe_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Cart & Wishlist
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('aura_luxe_cart');
    return saved ? JSON.parse(saved) : [
      {
        id: "cart-item-1",
        product: INITIAL_PRODUCTS[0],
        selectedSize: "FR 38",
        selectedColor: INITIAL_PRODUCTS[0].colors[0],
        quantity: 1,
        price: INITIAL_PRODUCTS[0].price
      }
    ];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('aura_luxe_wishlist');
    return saved ? JSON.parse(saved) : ["prod-002", "prod-007", "prod-010"];
  });

  // Preferences & Modals
  const [currency, setCurrency] = useState('USD');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [sizeGuideModal, setSizeGuideModal] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Shop Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [vendorFilter, setVendorFilter] = useState('all');
  const [priceMax, setPriceMax] = useState(10000);
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest'

  // Persist storage
  useEffect(() => {
    localStorage.setItem('aura_luxe_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('aura_luxe_vendors', JSON.stringify(vendors));
  }, [vendors]);

  useEffect(() => {
    localStorage.setItem('aura_luxe_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('aura_luxe_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('aura_luxe_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('aura_luxe_user', JSON.stringify(currentUser));
  }, [currentUser]);

  // Toast Notification System
  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Currency Converter & Formatter
  const formatPrice = (amountInUSD) => {
    if (typeof amountInUSD !== 'number' || isNaN(amountInUSD)) return '$0';
    const rateObj = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
    const converted = amountInUSD * rateObj.rate;
    
    if (currency === 'INR') {
      return `₹${Math.round(converted).toLocaleString('en-IN')}`;
    }
    return `${rateObj.symbol}${converted.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })}`;
  };

  // Page Navigation Helper
  const navigateTo = (page, productId = null) => {
    if (productId) {
      setSelectedProductId(productId);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Role Switching & Auth
  const switchRole = (newRole) => {
    setActiveRole(newRole);
    if (newRole === 'customer') {
      setCurrentUser(USERS[0]);
      if (activePage === 'vendor-dashboard' || activePage === 'admin-dashboard') {
        setActivePage('home');
      }
      showToast('Switched to Customer View (VIP Client)');
    } else if (newRole === 'vendor') {
      setCurrentUser(USERS[1]);
      setActivePage('vendor-dashboard');
      showToast('Switched to Vendor Boutique Portal (Atelier Montaigne)');
    } else if (newRole === 'admin') {
      setCurrentUser(USERS[2]);
      setActivePage('admin-dashboard');
      showToast('Switched to Super Admin Global Suite');
    }
  };

  const login = (email, role = 'customer') => {
    let matchedUser = USERS.find((u) => u.role === role);
    if (!matchedUser) {
      matchedUser = {
        id: `usr-${Date.now()}`,
        name: email.split('@')[0],
        email: email,
        role: role,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        tier: "FARFETCH Luxury Member",
        address: { street: "10 Boulevard Haussmann", city: "Paris", postalCode: "75009", country: "France" }
      };
    }
    setCurrentUser(matchedUser);
    setActiveRole(role);
    setAuthModal({ isOpen: false, mode: 'login', rolePrefill: 'customer' });
    showToast(`Welcome back, ${matchedUser.name}! (${role.toUpperCase()})`, 'success');
    if (role === 'vendor') setActivePage('vendor-dashboard');
    else if (role === 'admin') setActivePage('admin-dashboard');
  };

  const register = (userData) => {
    const newUser = {
      id: `usr-${Date.now()}`,
      name: userData.name || 'New VIP Client',
      email: userData.email,
      role: userData.role || 'customer',
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      tier: "FARFETCH Luxury Member",
      address: {
        street: userData.street || "12 Avenue Montaigne",
        city: userData.city || "Paris",
        postalCode: userData.postalCode || "75008",
        country: userData.country || "France"
      }
    };
    setCurrentUser(newUser);
    setActiveRole(newUser.role);
    setAuthModal({ isOpen: false, mode: 'login', rolePrefill: 'customer' });
    showToast(`Account registered successfully for ${newUser.name}!`, 'success');
    if (newUser.role === 'vendor') setActivePage('vendor-dashboard');
  };

  const logout = () => {
    setCurrentUser(USERS[0]);
    setActiveRole('customer');
    setActivePage('home');
    showToast('Logged out. Switched to Guest Client.');
  };

  // Cart Management
  const addToCart = (product, size, color, quantity = 1) => {
    const existingIndex = cart.findIndex(
      (item) => item.product.id === product.id && item.selectedSize === size && item.selectedColor?.name === color?.name
    );

    if (existingIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      const newItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        product,
        selectedSize: size || product.sizes[0] || 'Standard',
        selectedColor: color || product.colors[0],
        quantity,
        price: product.price
      };
      setCart((prev) => [newItem, ...prev]);
    }
    showToast(`Added "${product.title}" to your Shopping Bag`, 'success');
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from shopping bag');
  };

  const updateCartQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist Management
  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      showToast('Removed from Wishlist');
    } else {
      setWishlist((prev) => [...prev, productId]);
      showToast('Saved to your Curated Wishlist', 'success');
    }
  };

  // Order Placement & Lifecycle
  const placeOrder = (orderDetails) => {
    const newOrder = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      customer: {
        name: currentUser.name || orderDetails.customerName || "Sophia Laurent",
        email: currentUser.email || orderDetails.customerEmail || "client@luxury-portal.com",
        phone: orderDetails.phone || "+33 6 42 19 88 10",
        tier: currentUser.tier || "FARFETCH Private Client"
      },
      items: cart.map((item) => ({
        productId: item.product.id,
        title: item.product.title,
        brand: item.product.brand,
        vendorId: item.product.vendorId,
        vendorName: item.product.vendorName,
        price: item.price,
        quantity: item.quantity,
        size: item.selectedSize,
        color: item.selectedColor?.name || "Standard",
        image: item.product.images[0]
      })),
      shippingAddress: orderDetails.shippingAddress,
      shippingMethod: orderDetails.shippingMethod || "DHL Express Luxury Air",
      subtotal: orderDetails.subtotal,
      discount: orderDetails.discount || 0,
      shippingFee: orderDetails.shippingFee || 0,
      taxesAndDuties: orderDetails.taxesAndDuties || Math.round(orderDetails.subtotal * 0.05),
      total: orderDetails.total,
      paymentMethod: orderDetails.paymentMethod || "Credit Card (Encrypted)",
      paymentStatus: "Paid",
      status: "Processing",
      trackingNumber: `DHL-EXP-${Math.floor(10000000 + Math.random() * 90000000)}-EU`,
      timeline: [
        { status: "Order Placed", date: new Date().toLocaleString(), completed: true, note: "Order verified and payment authorized in escrow" },
        { status: "Boutique Dispatched", date: "Pending Hand-off", completed: false, note: "Vendor packaging with museum-grade dust covers" },
        { status: "Customs & Hub Departure", date: "Pending", completed: false, note: "European express flight clearance" },
        { status: "Out for Delivery", date: "Pending", completed: false, note: "Courier scheduled" },
        { status: "Delivered", date: "Estimated 2-3 days", completed: false, note: "Direct signature delivery" }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    showToast(`Order #${newOrder.id} placed successfully!`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId, nextStatus, note = '') => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const updatedTimeline = ord.timeline.map((stage) => {
            if (stage.status.toLowerCase() === nextStatus.toLowerCase()) {
              return { ...stage, completed: true, date: new Date().toLocaleString(), note: note || stage.note };
            }
            return stage;
          });
          return { ...ord, status: nextStatus, timeline: updatedTimeline };
        }
        return ord;
      })
    );
    showToast(`Order #${orderId} status updated to "${nextStatus}"`, 'success');
  };

  // Vendor & Product Catalog Actions
  const addProduct = (newProductData) => {
    const newProduct = {
      ...newProductData,
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
      reviews: [
        {
          id: `rev-${Date.now()}`,
          author: "Boutique Concierge",
          rating: 5,
          date: new Date().toISOString().split('T')[0],
          verified: true,
          title: "New Seasonal Arrival",
          comment: "Freshly curated piece available in limited boutique quantities."
        }
      ]
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Product "${newProduct.title}" added to catalog!`, 'success');
  };

  const editProduct = (productId, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, ...updatedFields } : p))
    );
    showToast('Product specifications updated successfully', 'success');
  };

  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product removed from catalog', 'info');
  };

  const toggleFeaturedProduct = (productId) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, featured: !p.featured } : p))
    );
  };

  const updateVendorStatus = (vendorId, newStatus, newCommission = null) => {
    setVendors((prev) =>
      prev.map((v) => {
        if (v.id === vendorId) {
          return {
            ...v,
            status: newStatus,
            commissionRate: newCommission !== null ? newCommission : v.commissionRate
          };
        }
        return v;
      })
    );
    showToast(`Vendor boutique status updated to "${newStatus}"`, 'success');
  };

  // Product Review Submission
  const addProductReview = (productId, reviewData) => {
    const newRev = {
      id: `rev-${Date.now()}`,
      author: currentUser.name || "Verified Client",
      rating: reviewData.rating || 5,
      date: new Date().toISOString().split('T')[0],
      verified: true,
      title: reviewData.title || "Exceptional luxury purchase",
      comment: reviewData.comment || "Superb quality and packaging."
    };

    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const currentReviews = p.reviews || [];
          const updatedReviews = [newRev, ...currentReviews];
          const avgRating = Number(
            (updatedReviews.reduce((acc, r) => acc + r.rating, 0) / updatedReviews.length).toFixed(2)
          );
          return {
            ...p,
            reviews: updatedReviews,
            reviewsCount: updatedReviews.length,
            rating: avgRating
          };
        }
        return p;
      })
    );
    showToast('Your verified review has been published!', 'success');
  };

  // Export Tools (CSV & JSON generator)
  const exportData = (type = 'orders', format = 'csv') => {
    let dataset = [];
    let filename = `aura_luxe_${type}_${new Date().toISOString().split('T')[0]}`;

    if (type === 'orders') {
      dataset = orders.map((o) => ({
        OrderID: o.id,
        Date: o.date,
        Customer: o.customer.name,
        CustomerEmail: o.customer.email,
        ItemsCount: o.items.length,
        TotalUSD: o.total,
        Status: o.status,
        PaymentStatus: o.paymentStatus,
        TrackingNumber: o.trackingNumber
      }));
    } else if (type === 'products') {
      dataset = products.map((p) => ({
        ID: p.id,
        SKU: p.sku,
        Title: p.title,
        Brand: p.brand,
        Vendor: p.vendorName,
        Category: p.category,
        PriceUSD: p.price,
        OriginalPriceUSD: p.originalPrice,
        InStock: p.inStock ? 'Yes' : 'No',
        Rating: p.rating,
        Reviews: p.reviewsCount
      }));
    } else if (type === 'vendors') {
      dataset = vendors.map((v) => ({
        VendorID: v.id,
        Name: v.name,
        City: v.city,
        Country: v.country,
        Status: v.status,
        CommissionPercent: v.commissionRate,
        ProductsCount: v.productsCount,
        TotalSalesUSD: v.totalSales,
        PayoutBalanceUSD: v.payoutBalance,
        Rating: v.rating
      }));
    }

    if (format === 'json') {
      const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataset, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", jsonStr);
      downloadAnchor.setAttribute("download", `${filename}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast(`Exported ${type.toUpperCase()} as JSON`, 'success');
    } else {
      // CSV Format
      if (!dataset.length) return;
      const headers = Object.keys(dataset[0]);
      const csvRows = [];
      csvRows.push(headers.join(','));
      for (const row of dataset) {
        const values = headers.map((header) => {
          const val = row[header] === null || row[header] === undefined ? '' : row[header];
          return `"${String(val).replace(/"/g, '""')}"`;
        });
        csvRows.push(values.join(','));
      }
      const csvStr = "data:text/csv;charset=utf-8," + encodeURIComponent(csvRows.join('\n'));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", csvStr);
      downloadAnchor.setAttribute("download", `${filename}.csv`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast(`Exported ${type.toUpperCase()} as CSV`, 'success');
    }
  };

  const value = {
    activePage,
    setActivePage,
    selectedProductId,
    setSelectedProductId,
    navigateTo,
    activeRole,
    currentUser,
    switchRole,
    login,
    register,
    logout,
    authModal,
    setAuthModal,
    products,
    vendors,
    orders,
    cart,
    wishlist,
    currency,
    setCurrency,
    quickViewProduct,
    setQuickViewProduct,
    sizeGuideModal,
    setSizeGuideModal,
    toasts,
    showToast,
    removeToast,
    formatPrice,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    brandFilter,
    setBrandFilter,
    vendorFilter,
    setVendorFilter,
    priceMax,
    setPriceMax,
    sortBy,
    setSortBy,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    toggleWishlist,
    placeOrder,
    updateOrderStatus,
    addProduct,
    editProduct,
    deleteProduct,
    toggleFeaturedProduct,
    updateVendorStatus,
    addProductReview,
    exportData,
    rbacRoles: RBAC_ROLES,
    coupons: COUPONS
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
