// SPORTIFY State Management & LocalStorage Store
// Handles Cart, Wishlist, Recently Viewed, Coupons, and Order History

const SportifyStore = (function () {
  const STORAGE_KEYS = {
    CART: "sportify_cart",
    WISHLIST: "sportify_wishlist",
    RECENTLY_VIEWED: "sportify_recently_viewed",
    COUPON: "sportify_applied_coupon",
    ORDERS: "sportify_orders"
  };

  const COUPONS = {
    "SPORTIFY45": { code: "SPORTIFY45", type: "percent", value: 45, minAmount: 1999, description: "45% OFF on orders above ₹1,999" },
    "CHAMPION10": { code: "CHAMPION10", type: "percent", value: 10, minAmount: 0, description: "10% Instant Discount on all orders" },
    "FREESHIP": { code: "FREESHIP", type: "shipping", value: 100, minAmount: 0, description: "Free Express Shipping on your order" },
    "POWER20": { code: "POWER20", type: "percent", value: 20, minAmount: 999, description: "20% Pro Athletes Discount" }
  };

  // Safe localStorage helper
  function load(key, defaultVal) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultVal;
    } catch (e) {
      console.warn("Storage read error:", e);
      return defaultVal;
    }
  }

  function save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn("Storage save error:", e);
    }
  }

  // State
  let cart = load(STORAGE_KEYS.CART, []);
  let wishlist = load(STORAGE_KEYS.WISHLIST, []);
  let recentlyViewed = load(STORAGE_KEYS.RECENTLY_VIEWED, []);
  let appliedCoupon = load(STORAGE_KEYS.COUPON, null);
  let orders = load(STORAGE_KEYS.ORDERS, []);

  // Event dispatchers for reactive updates
  const listeners = [];
  function subscribe(fn) {
    listeners.push(fn);
    return () => {
      const index = listeners.indexOf(fn);
      if (index > -1) listeners.splice(index, 1);
    };
  }
  function notify(event, payload) {
    listeners.forEach(fn => fn(event, payload));
  }

  return {
    // CART METHODS
    getCart() {
      return [...cart];
    },

    getCartCount() {
      return cart.reduce((total, item) => total + item.quantity, 0);
    },

    addToCart(productId, size = null, color = null, quantity = 1) {
      const product = PRODUCTS_DATA.find(p => p.id === productId);
      if (!product) return false;

      const chosenSize = size || (product.sizes && product.sizes[0]) || "Standard";
      const chosenColor = color || (product.colors && product.colors[0]) || "Standard";

      const existingIndex = cart.findIndex(
        item => item.productId === productId && item.size === chosenSize && item.color === chosenColor
      );

      if (existingIndex > -1) {
        cart[existingIndex].quantity += quantity;
      } else {
        cart.push({
          cartItemId: `${productId}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          productId,
          product,
          size: chosenSize,
          color: chosenColor,
          price: product.price,
          quantity: Math.max(1, quantity)
        });
      }

      save(STORAGE_KEYS.CART, cart);
      notify("cart_updated", cart);
      return true;
    },

    updateQuantity(cartItemId, quantity) {
      const item = cart.find(i => i.cartItemId === cartItemId);
      if (item) {
        if (quantity <= 0) {
          this.removeFromCart(cartItemId);
        } else {
          item.quantity = quantity;
          save(STORAGE_KEYS.CART, cart);
          notify("cart_updated", cart);
        }
      }
    },

    removeFromCart(cartItemId) {
      cart = cart.filter(i => i.cartItemId !== cartItemId);
      save(STORAGE_KEYS.CART, cart);
      notify("cart_updated", cart);
    },

    clearCart() {
      cart = [];
      save(STORAGE_KEYS.CART, cart);
      notify("cart_updated", cart);
    },

    getCalculations() {
      const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      let discount = 0;
      let shipping = subtotal > 1999 || subtotal === 0 ? 0 : 149;

      if (appliedCoupon && subtotal > 0) {
        if (appliedCoupon.type === "percent") {
          if (subtotal >= appliedCoupon.minAmount) {
            discount = Math.round((subtotal * appliedCoupon.value) / 100);
          }
        } else if (appliedCoupon.type === "shipping") {
          shipping = 0;
        }
      }

      const total = Math.max(0, subtotal - discount + shipping);

      return {
        subtotal,
        discount,
        shipping,
        coupon: appliedCoupon,
        total,
        itemCount: this.getCartCount()
      };
    },

    // COUPONS
    applyCoupon(code) {
      const cleanCode = (code || "").trim().toUpperCase();
      const coupon = COUPONS[cleanCode];

      if (!coupon) {
        return { success: false, message: "Invalid promo code. Try SPORTIFY45 or POWER20" };
      }

      const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      if (coupon.minAmount && subtotal < coupon.minAmount) {
        return {
          success: false,
          message: `Coupon requires minimum order of ₹${coupon.minAmount.toLocaleString("en-IN")}`
        };
      }

      appliedCoupon = coupon;
      save(STORAGE_KEYS.COUPON, appliedCoupon);
      notify("coupon_applied", coupon);
      return { success: true, message: `Promo code ${coupon.code} applied successfully!`, coupon };
    },

    removeCoupon() {
      appliedCoupon = null;
      save(STORAGE_KEYS.COUPON, null);
      notify("coupon_removed", null);
    },

    getAppliedCoupon() {
      return appliedCoupon;
    },

    // WISHLIST METHODS
    getWishlist() {
      return [...wishlist];
    },

    getWishlistCount() {
      return wishlist.length;
    },

    isInWishlist(productId) {
      return wishlist.includes(productId);
    },

    toggleWishlist(productId) {
      const exists = wishlist.includes(productId);
      if (exists) {
        wishlist = wishlist.filter(id => id !== productId);
      } else {
        wishlist.push(productId);
      }
      save(STORAGE_KEYS.WISHLIST, wishlist);
      notify("wishlist_updated", { productId, inWishlist: !exists, count: wishlist.length });
      return !exists;
    },

    getWishlistProducts() {
      return PRODUCTS_DATA.filter(p => wishlist.includes(p.id));
    },

    // RECENTLY VIEWED
    addRecentlyViewed(productId) {
      if (!productId) return;
      recentlyViewed = [productId, ...recentlyViewed.filter(id => id !== productId)].slice(0, 8);
      save(STORAGE_KEYS.RECENTLY_VIEWED, recentlyViewed);
      notify("recently_viewed_updated", recentlyViewed);
    },

    getRecentlyViewedProducts() {
      return recentlyViewed
        .map(id => PRODUCTS_DATA.find(p => p.id === id))
        .filter(Boolean);
    },

    // ORDERS
    placeOrder(orderPayload) {
      const orderId = `SPT-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;
      const order = {
        orderId,
        date: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }),
        items: [...cart],
        calculations: this.getCalculations(),
        customer: orderPayload.customer,
        shipping: orderPayload.shipping,
        paymentMethod: orderPayload.paymentMethod,
        status: "Confirmed - Preparing for Dispatch"
      };

      orders.unshift(order);
      save(STORAGE_KEYS.ORDERS, orders);
      this.clearCart();
      appliedCoupon = null;
      save(STORAGE_KEYS.COUPON, null);
      notify("order_placed", order);
      return order;
    },

    getOrders() {
      return [...orders];
    },

    subscribe
  };
})();
