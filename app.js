// SPORTIFY Main Application Logic & Interactive Controller
// Connects UI, Data, Store, and Router

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Router
  SportifyRouter.init();

  // Initialize Core Subsystems
  initNavbar();
  initCountdownTimer();
  initHomeViews();
  initShopFilters();
  initProductDetailHandler();
  initCartAndCheckout();
  initSearchModal();
  initWishlistView();
  initContactAndFAQ();
  initNewsletter();

  // Listen to router changes
  window.addEventListener("route_changed", (e) => {
    const { route, params } = e.detail;
    handleRouteChange(route, params);
  });

  // Listen to store updates
  SportifyStore.subscribe((event, data) => {
    updateBadges();
    if (event === "cart_updated" || event === "coupon_applied" || event === "coupon_removed") {
      renderCartDrawer();
      if (SportifyRouter.getCurrentRoute() === "cart") {
        renderFullCartPage();
      }
      if (SportifyRouter.getCurrentRoute() === "checkout") {
        renderCheckoutSummary();
      }
    }
    if (event === "wishlist_updated") {
      updateWishlistIcons();
      if (SportifyRouter.getCurrentRoute() === "wishlist") {
        renderWishlistView();
      }
    }
  });

  // Initial badge update
  updateBadges();
});

// ==========================================================================
// TOAST NOTIFICATION SYSTEM
// ==========================================================================
function showToast(title, message, isOrange = false) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast ${isOrange ? 'toast-orange' : ''}`;
  toast.innerHTML = `
    <div style="color: ${isOrange ? 'var(--accent-orange)' : 'var(--accent-green)'};">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    </div>
    <div>
      <div style="font-weight: 800; font-size: 0.9rem;">${title}</div>
      <div style="font-size: 0.8rem; color: var(--text-muted);">${message}</div>
    </div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(50px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ==========================================================================
// NAVBAR & MOBILE MENU
// ==========================================================================
function initNavbar() {
  const navbar = document.querySelector(".navbar");
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("nav-menu");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });

    // Close on link click
    navMenu.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
      });
    });
  }

  // Cart Drawer open button
  const cartBtn = document.getElementById("nav-cart-btn");
  if (cartBtn) {
    cartBtn.addEventListener("click", () => {
      openCartDrawer();
    });
  }

  // Wishlist Nav Button
  const wishlistBtn = document.getElementById("nav-wishlist-btn");
  if (wishlistBtn) {
    wishlistBtn.addEventListener("click", () => {
      SportifyRouter.navigate("wishlist");
    });
  }
}

function updateBadges() {
  const cartBadge = document.getElementById("cart-count-badge");
  const wishlistBadge = document.getElementById("wishlist-count-badge");
  const cartCount = SportifyStore.getCartCount();
  const wishlistCount = SportifyStore.getWishlistCount();

  if (cartBadge) {
    cartBadge.textContent = cartCount;
    cartBadge.style.display = cartCount > 0 ? "flex" : "none";
  }

  if (wishlistBadge) {
    wishlistBadge.textContent = wishlistCount;
    wishlistBadge.style.display = wishlistCount > 0 ? "flex" : "none";
  }
}

// ==========================================================================
// COUNTDOWN TIMER (Flash Sale)
// ==========================================================================
function initCountdownTimer() {
  // 12 hours countdown target from initial load
  let totalSeconds = 12 * 3600 + 44 * 60 + 20;

  function updateDisplay() {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const hElem = document.getElementById("timer-hours");
    const mElem = document.getElementById("timer-minutes");
    const sElem = document.getElementById("timer-seconds");

    if (hElem) hElem.textContent = String(hours).padStart(2, "0");
    if (mElem) mElem.textContent = String(minutes).padStart(2, "0");
    if (sElem) sElem.textContent = String(seconds).padStart(2, "0");

    if (totalSeconds > 0) {
      totalSeconds--;
    } else {
      totalSeconds = 12 * 3600; // Reset loop
    }
  }

  updateDisplay();
  setInterval(updateDisplay, 1000);
}

// ==========================================================================
// PRODUCT CARD HTML GENERATOR
// ==========================================================================
function renderProductCard(product) {
  const isWishlisted = SportifyStore.isInWishlist(product.id);
  const formattedPrice = `₹${product.price.toLocaleString("en-IN")}`;
  const formattedOriginalPrice = product.originalPrice ? `₹${product.originalPrice.toLocaleString("en-IN")}` : "";

  return `
    <div class="product-card" data-id="${product.id}">
      <div class="product-card-thumb">
        <img class="product-card-img" src="${product.image}" alt="${product.name}" loading="lazy" />
        <div class="product-badge-group">
          ${product.badge ? `<span class="badge-tag ${product.isFlashSale ? 'flash' : 'bestseller'}">${product.badge}</span>` : ''}
          ${product.discount ? `<span class="badge-tag sale">${product.discount}% OFF</span>` : ''}
        </div>
        <button class="card-wishlist-btn ${isWishlisted ? 'active' : ''}" data-wishlist-id="${product.id}" aria-label="Add to Wishlist">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? '#ef4444' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
        <button class="card-quick-view" data-quick-view-id="${product.id}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          Quick View
        </button>
      </div>
      <div class="product-card-body">
        <div class="product-category-meta">${product.categoryName} • ${product.brand}</div>
        <h4 class="product-title" data-route="product" data-product-id="${product.id}">${product.name}</h4>
        <div class="product-rating">
          <div class="stars-row">
            ${'★'.repeat(Math.floor(product.rating))}${product.rating % 1 !== 0 ? '½' : ''}
          </div>
          <span class="rating-count">(${product.reviewCount})</span>
        </div>
        <div class="product-price-row">
          <span class="current-price">${formattedPrice}</span>
          ${formattedOriginalPrice ? `<span class="original-price">${formattedOriginalPrice}</span>` : ''}
          ${product.discount ? `<span class="discount-tag">${product.discount}% OFF</span>` : ''}
        </div>
        <button class="add-to-cart-btn" data-add-cart-id="${product.id}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-2z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  `;
}

function updateWishlistIcons() {
  document.querySelectorAll("[data-wishlist-id]").forEach(btn => {
    const id = btn.getAttribute("data-wishlist-id");
    const active = SportifyStore.isInWishlist(id);
    if (active) {
      btn.classList.add("active");
      const svg = btn.querySelector("svg");
      if (svg) {
        svg.setAttribute("fill", "#ef4444");
      }
    } else {
      btn.classList.remove("active");
      const svg = btn.querySelector("svg");
      if (svg) {
        svg.setAttribute("fill", "none");
      }
    }
  });
}

// Global click delegation for product actions
document.addEventListener("click", (e) => {
  // Wishlist toggle
  const wishlistBtn = e.target.closest("[data-wishlist-id]");
  if (wishlistBtn) {
    e.stopPropagation();
    const pid = wishlistBtn.getAttribute("data-wishlist-id");
    const product = PRODUCTS_DATA.find(p => p.id === pid);
    const added = SportifyStore.toggleWishlist(pid);
    if (added) {
      showToast("Added to Wishlist", `${product ? product.name : 'Item'} saved to your wishlist.`);
    } else {
      showToast("Removed from Wishlist", `${product ? product.name : 'Item'} removed from wishlist.`);
    }
    return;
  }

  // Add to cart click
  const addCartBtn = e.target.closest("[data-add-cart-id]");
  if (addCartBtn) {
    e.stopPropagation();
    const pid = addCartBtn.getAttribute("data-add-cart-id");
    const product = PRODUCTS_DATA.find(p => p.id === pid);
    if (product) {
      SportifyStore.addToCart(pid);
      showToast("Added to Cart!", `${product.name} added to your bag.`);
      openCartDrawer();
    }
    return;
  }

  // Quick view click
  const quickViewBtn = e.target.closest("[data-quick-view-id]");
  if (quickViewBtn) {
    e.stopPropagation();
    const pid = quickViewBtn.getAttribute("data-quick-view-id");
    SportifyRouter.navigate("product", { id: pid });
    return;
  }

  // Promo coupon copy
  const copyCouponBtn = e.target.closest("#copy-coupon-btn");
  if (copyCouponBtn) {
    navigator.clipboard?.writeText("SPORTIFY45");
    showToast("Coupon Copied!", "Use code SPORTIFY45 for 45% OFF at checkout.", true);
    return;
  }
});

// ==========================================================================
// HOME PAGE VIEWS INITIALIZATION
// ==========================================================================
function initHomeViews() {
  // 1. Featured Categories
  const catGrid = document.getElementById("featured-categories-grid");
  if (catGrid) {
    const featuredCats = CATEGORIES_DATA.filter(c => c.id !== "all");
    catGrid.innerHTML = featuredCats.map(cat => `
      <div class="category-card" data-route="shop" data-category="${cat.id}">
        <img class="category-img" src="${cat.image}" alt="${cat.name}" loading="lazy" />
        <div class="category-overlay">
          <h4 class="category-title">${cat.name}</h4>
          <span class="category-count">${cat.count} Pro Products</span>
          <span class="category-arrow">Explore Gear &rarr;</span>
        </div>
      </div>
    `).join("");
  }

  // 2. Flash Sale Products
  const flashGrid = document.getElementById("flash-sale-grid");
  if (flashGrid) {
    const flashItems = PRODUCTS_DATA.filter(p => p.isFlashSale).slice(0, 4);
    flashGrid.innerHTML = flashItems.map(p => renderProductCard(p)).join("");
  }

  // 3. Best Sellers Tabbed Products
  renderBestSellers("all");
  const bsTabs = document.querySelectorAll(".bestseller-tab-btn");
  bsTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      bsTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const cat = tab.getAttribute("data-tab-cat");
      renderBestSellers(cat);
    });
  });

  // 4. Trending Products
  const trendingGrid = document.getElementById("trending-products-grid");
  if (trendingGrid) {
    const trendingItems = PRODUCTS_DATA.filter(p => p.isTrending).slice(0, 4);
    trendingGrid.innerHTML = trendingItems.map(p => renderProductCard(p)).join("");
  }

  // 5. New Arrivals
  const newArrivalsGrid = document.getElementById("new-arrivals-grid");
  if (newArrivalsGrid) {
    const newItems = PRODUCTS_DATA.filter(p => p.isNew || p.discount >= 35).slice(0, 4);
    newArrivalsGrid.innerHTML = newItems.map(p => renderProductCard(p)).join("");
  }

  // 6. Recently Viewed in Home
  renderRecentlyViewedSection();
}

function renderBestSellers(category = "all") {
  const container = document.getElementById("bestsellers-grid");
  if (!container) return;

  let items = PRODUCTS_DATA;
  if (category !== "all") {
    items = PRODUCTS_DATA.filter(p => p.category === category);
  }

  // Pick top rated / bestsellers
  items = items.slice(0, 8);
  container.innerHTML = items.map(p => renderProductCard(p)).join("");
}

function renderRecentlyViewedSection() {
  const container = document.getElementById("recently-viewed-grid");
  const section = document.getElementById("recently-viewed-section");
  if (!container || !section) return;

  const recents = SportifyStore.getRecentlyViewedProducts();
  if (recents.length === 0) {
    section.style.display = "none";
  } else {
    section.style.display = "block";
    container.innerHTML = recents.slice(0, 4).map(p => renderProductCard(p)).join("");
  }
}

// ==========================================================================
// SHOP FILTERS & MARKETPLACE
// ==========================================================================
let currentShopFilters = {
  category: "all",
  search: "",
  maxPrice: 30000,
  brands: [],
  rating: 0,
  inStockOnly: false,
  sort: "featured"
};

function initShopFilters() {
  const categoryContainer = document.getElementById("shop-filter-categories");
  if (categoryContainer) {
    categoryContainer.innerHTML = CATEGORIES_DATA.map(c => `
      <div class="filter-cat-item ${c.id === 'all' ? 'active' : ''}" data-cat-id="${c.id}">
        <span>${c.name}</span>
        <span style="font-size:0.75rem; color:var(--text-dim);">(${c.count})</span>
      </div>
    `).join("");

    categoryContainer.addEventListener("click", (e) => {
      const item = e.target.closest(".filter-cat-item");
      if (item) {
        categoryContainer.querySelectorAll(".filter-cat-item").forEach(i => i.classList.remove("active"));
        item.classList.add("active");
        currentShopFilters.category = item.getAttribute("data-cat-id");
        applyShopFilters();
      }
    });
  }

  // Price Slider
  const priceSlider = document.getElementById("price-slider");
  const priceValText = document.getElementById("price-slider-val");
  if (priceSlider && priceValText) {
    priceSlider.addEventListener("input", (e) => {
      currentShopFilters.maxPrice = Number(e.target.value);
      priceValText.textContent = `₹${currentShopFilters.maxPrice.toLocaleString("en-IN")}`;
      applyShopFilters();
    });
  }

  // Brands Checkboxes
  document.querySelectorAll(".brand-filter-checkbox").forEach(cb => {
    cb.addEventListener("change", () => {
      const checkedBrands = Array.from(document.querySelectorAll(".brand-filter-checkbox:checked")).map(b => b.value);
      currentShopFilters.brands = checkedBrands;
      applyShopFilters();
    });
  });

  // Rating Radio
  document.querySelectorAll(".rating-filter-radio").forEach(rb => {
    rb.addEventListener("change", (e) => {
      currentShopFilters.rating = Number(e.target.value);
      applyShopFilters();
    });
  });

  // Sort Select
  const sortSelect = document.getElementById("shop-sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentShopFilters.sort = e.target.value;
      applyShopFilters();
    });
  }

  // Shop Search Bar
  const searchInput = document.getElementById("shop-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentShopFilters.search = e.target.value.trim().toLowerCase();
      applyShopFilters();
    });
  }

  // Clear Filters
  const clearBtn = document.getElementById("clear-filters-btn");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      resetShopFilters();
    });
  }

  // Mobile Filter Drawer Toggle
  const mobileFilterBtn = document.getElementById("mobile-filter-toggle");
  const sidebar = document.getElementById("filter-sidebar");
  if (mobileFilterBtn && sidebar) {
    mobileFilterBtn.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed");
    });
  }
}

function resetShopFilters() {
  currentShopFilters = {
    category: "all",
    search: "",
    maxPrice: 30000,
    brands: [],
    rating: 0,
    inStockOnly: false,
    sort: "featured"
  };

  const priceSlider = document.getElementById("price-slider");
  const priceValText = document.getElementById("price-slider-val");
  if (priceSlider) priceSlider.value = 30000;
  if (priceValText) priceValText.textContent = "₹30,000";

  document.querySelectorAll(".brand-filter-checkbox").forEach(cb => cb.checked = false);
  document.querySelectorAll(".rating-filter-radio").forEach(rb => rb.checked = false);
  const searchInput = document.getElementById("shop-search-input");
  if (searchInput) searchInput.value = "";

  const categoryContainer = document.getElementById("shop-filter-categories");
  if (categoryContainer) {
    categoryContainer.querySelectorAll(".filter-cat-item").forEach(i => {
      if (i.getAttribute("data-cat-id") === "all") i.classList.add("active");
      else i.classList.remove("active");
    });
  }

  applyShopFilters();
}

function applyShopFilters() {
  const container = document.getElementById("shop-products-grid");
  const countIndicator = document.getElementById("shop-results-count");
  if (!container) return;

  let filtered = PRODUCTS_DATA.filter(product => {
    // Category check
    if (currentShopFilters.category !== "all" && product.category !== currentShopFilters.category) {
      return false;
    }

    // Price check
    if (product.price > currentShopFilters.maxPrice) {
      return false;
    }

    // Brand check
    if (currentShopFilters.brands.length > 0 && !currentShopFilters.brands.includes(product.brand)) {
      return false;
    }

    // Rating check
    if (currentShopFilters.rating > 0 && product.rating < currentShopFilters.rating) {
      return false;
    }

    // Search query
    if (currentShopFilters.search) {
      const q = currentShopFilters.search;
      const matchName = product.name.toLowerCase().includes(q);
      const matchCat = product.categoryName.toLowerCase().includes(q);
      const matchBrand = product.brand.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      if (!matchName && !matchCat && !matchBrand && !matchDesc) {
        return false;
      }
    }

    return true;
  });

  // Sorting
  if (currentShopFilters.sort === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentShopFilters.sort === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentShopFilters.sort === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (currentShopFilters.sort === "newest") {
    filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  }

  // Update Count
  if (countIndicator) {
    countIndicator.textContent = `Showing ${filtered.length} of ${PRODUCTS_DATA.length} products`;
  }

  // Render Grid or Empty State
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-state-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <h4 class="empty-state-title">No products match your filters</h4>
        <p class="empty-state-desc">Try clearing your filters or search keywords to view all high-performance gear.</p>
        <button class="btn btn-outline" onclick="resetShopFilters()">Reset All Filters</button>
      </div>
    `;
  } else {
    container.innerHTML = filtered.map(p => renderProductCard(p)).join("");
  }
}

// ==========================================================================
// PRODUCT DETAIL VIEW
// ==========================================================================
let currentDetailProduct = null;
let selectedSize = null;
let selectedColor = null;
let detailQty = 1;

function initProductDetailHandler() {
  // Tabs switcher inside detail view
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-content-panel").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      const target = document.getElementById(btn.getAttribute("data-tab-target"));
      if (target) target.classList.add("active");
    });
  });

  // Quantity Stepper
  const minusBtn = document.getElementById("detail-qty-minus");
  const plusBtn = document.getElementById("detail-qty-plus");
  const qtyInput = document.getElementById("detail-qty-input");

  if (minusBtn && plusBtn && qtyInput) {
    minusBtn.addEventListener("click", () => {
      let val = parseInt(qtyInput.value) || 1;
      if (val > 1) {
        val--;
        qtyInput.value = val;
        detailQty = val;
      }
    });

    plusBtn.addEventListener("click", () => {
      let val = parseInt(qtyInput.value) || 1;
      if (val < 20) {
        val++;
        qtyInput.value = val;
        detailQty = val;
      }
    });

    qtyInput.addEventListener("change", () => {
      let val = parseInt(qtyInput.value) || 1;
      val = Math.max(1, Math.min(20, val));
      qtyInput.value = val;
      detailQty = val;
    });
  }

  // Detail Add to Cart
  const detailAddCartBtn = document.getElementById("detail-add-cart-btn");
  if (detailAddCartBtn) {
    detailAddCartBtn.addEventListener("click", () => {
      if (!currentDetailProduct) return;
      SportifyStore.addToCart(currentDetailProduct.id, selectedSize, selectedColor, detailQty);
      showToast("Added to Cart!", `${currentDetailProduct.name} (${selectedSize || ''}) added.`);
      openCartDrawer();
    });
  }

  // Detail Buy Now
  const detailBuyNowBtn = document.getElementById("detail-buy-now-btn");
  if (detailBuyNowBtn) {
    detailBuyNowBtn.addEventListener("click", () => {
      if (!currentDetailProduct) return;
      SportifyStore.addToCart(currentDetailProduct.id, selectedSize, selectedColor, detailQty);
      SportifyRouter.navigate("checkout");
    });
  }

  // Detail Wishlist Button
  const detailWishlistBtn = document.getElementById("detail-wishlist-btn");
  if (detailWishlistBtn) {
    detailWishlistBtn.addEventListener("click", () => {
      if (!currentDetailProduct) return;
      const added = SportifyStore.toggleWishlist(currentDetailProduct.id);
      if (added) {
        showToast("Added to Wishlist", `${currentDetailProduct.name} saved.`);
      } else {
        showToast("Removed from Wishlist", `${currentDetailProduct.name} removed.`);
      }
      updateDetailWishlistState();
    });
  }

  // Write Review Form
  const reviewForm = document.getElementById("detail-review-form");
  if (reviewForm) {
    reviewForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const author = document.getElementById("review-name-input").value.trim();
      const comment = document.getElementById("review-comment-input").value.trim();
      if (!author || !comment) return;

      if (currentDetailProduct) {
        currentDetailProduct.reviews.unshift({
          author,
          rating: 5,
          date: "Just now",
          comment
        });
        currentDetailProduct.reviewCount++;
        renderProductReviews(currentDetailProduct);
        reviewForm.reset();
        showToast("Review Submitted", "Thank you for sharing your athlete feedback!", true);
      }
    });
  }
}

function renderProductDetailPage(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId) || PRODUCTS_DATA[0];
  currentDetailProduct = product;
  detailQty = 1;

  // Add to recently viewed in store
  SportifyStore.addRecentlyViewed(product.id);

  // Breadcrumbs
  const breadcrumbCat = document.getElementById("detail-breadcrumb-cat");
  const breadcrumbName = document.getElementById("detail-breadcrumb-name");
  if (breadcrumbCat) breadcrumbCat.textContent = product.categoryName;
  if (breadcrumbName) breadcrumbName.textContent = product.name;

  // Title, Brand & Ratings
  const titleElem = document.getElementById("detail-title");
  const brandElem = document.getElementById("detail-brand");
  const ratingStars = document.getElementById("detail-rating-stars");
  const ratingCount = document.getElementById("detail-rating-count");

  if (titleElem) titleElem.textContent = product.name;
  if (brandElem) brandElem.textContent = product.brand;
  if (ratingStars) ratingStars.textContent = '★'.repeat(Math.floor(product.rating)) + (product.rating % 1 !== 0 ? '½' : '');
  if (ratingCount) ratingCount.textContent = `${product.rating} (${product.reviewCount} verified athlete reviews)`;

  // Pricing
  const priceElem = document.getElementById("detail-price");
  const origPriceElem = document.getElementById("detail-orig-price");
  const discountElem = document.getElementById("detail-discount");

  if (priceElem) priceElem.textContent = `₹${product.price.toLocaleString("en-IN")}`;
  if (origPriceElem) origPriceElem.textContent = product.originalPrice ? `₹${product.originalPrice.toLocaleString("en-IN")}` : "";
  if (discountElem) discountElem.textContent = `${product.discount}% OFF`;

  // Gallery
  const mainImg = document.getElementById("detail-main-img");
  const thumbsContainer = document.getElementById("detail-gallery-thumbs");
  if (mainImg) mainImg.src = product.image;

  if (thumbsContainer && product.gallery) {
    thumbsContainer.innerHTML = product.gallery.map((imgSrc, idx) => `
      <div class="gallery-thumb ${idx === 0 ? 'active' : ''}" data-gallery-src="${imgSrc}">
        <img src="${imgSrc}" alt="${product.name} thumb ${idx + 1}" />
      </div>
    `).join("");

    thumbsContainer.querySelectorAll(".gallery-thumb").forEach(thumb => {
      thumb.addEventListener("click", () => {
        thumbsContainer.querySelectorAll(".gallery-thumb").forEach(t => t.classList.remove("active"));
        thumb.classList.add("active");
        if (mainImg) mainImg.src = thumb.getAttribute("data-gallery-src");
      });
    });
  }

  // Size Options
  const sizeContainer = document.getElementById("detail-size-options");
  if (sizeContainer && product.sizes) {
    selectedSize = product.sizes[0];
    sizeContainer.innerHTML = product.sizes.map((s, i) => `
      <button class="variant-btn ${i === 0 ? 'active' : ''}" data-val="${s}">${s}</button>
    `).join("");

    sizeContainer.querySelectorAll(".variant-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        sizeContainer.querySelectorAll(".variant-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedSize = btn.getAttribute("data-val");
      });
    });
  }

  // Color Options
  const colorContainer = document.getElementById("detail-color-options");
  if (colorContainer && product.colors) {
    selectedColor = product.colors[0];
    colorContainer.innerHTML = product.colors.map((c, i) => `
      <button class="variant-btn ${i === 0 ? 'active' : ''}" data-val="${c}">${c}</button>
    `).join("");

    colorContainer.querySelectorAll(".variant-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        colorContainer.querySelectorAll(".variant-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedColor = btn.getAttribute("data-val");
      });
    });
  }

  // Reset Quantity
  const qtyInput = document.getElementById("detail-qty-input");
  if (qtyInput) qtyInput.value = 1;

  // Description
  const descElem = document.getElementById("detail-description-text");
  if (descElem) descElem.textContent = product.description;

  // Specs Table
  const specsTbody = document.getElementById("detail-specs-tbody");
  if (specsTbody && product.specs) {
    specsTbody.innerHTML = Object.keys(product.specs).map(key => `
      <tr>
        <th>${key}</th>
        <td>${product.specs[key]}</td>
      </tr>
    `).join("");
  }

  // Reviews
  renderProductReviews(product);

  // Related Products
  const relatedGrid = document.getElementById("detail-related-grid");
  if (relatedGrid) {
    const related = PRODUCTS_DATA
      .filter(p => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
      .slice(0, 4);
    relatedGrid.innerHTML = related.map(p => renderProductCard(p)).join("");
  }

  updateDetailWishlistState();
}

function updateDetailWishlistState() {
  const detailWishlistBtn = document.getElementById("detail-wishlist-btn");
  if (!detailWishlistBtn || !currentDetailProduct) return;

  const isSaved = SportifyStore.isInWishlist(currentDetailProduct.id);
  if (isSaved) {
    detailWishlistBtn.classList.add("active");
    detailWishlistBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#ef4444" stroke="#ef4444" stroke-width="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
      Saved in Wishlist
    `;
  } else {
    detailWishlistBtn.classList.remove("active");
    detailWishlistBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
      Add to Wishlist
    `;
  }
}

function renderProductReviews(product) {
  const reviewsList = document.getElementById("detail-reviews-list");
  if (!reviewsList || !product.reviews) return;

  reviewsList.innerHTML = product.reviews.map(r => `
    <div class="review-item" style="padding: 18px 0; border-bottom: 1px solid var(--border-subtle);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <div style="font-weight: 700; color: #fff;">${r.author} <span class="verified-badge">✓ Verified Athlete</span></div>
        <div style="font-size: 0.78rem; color: var(--text-dim);">${r.date}</div>
      </div>
      <div style="color: var(--accent-yellow); font-size: 0.85rem; margin-bottom: 6px;">
        ${'★'.repeat(r.rating)}
      </div>
      <p style="color: #cbd5e1; font-size: 0.92rem; line-height: 1.5;">${r.comment}</p>
    </div>
  `).join("");
}

// ==========================================================================
// CART DRAWER & FULL CART PAGE
// ==========================================================================
function openCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const backdrop = document.getElementById("cart-drawer-backdrop");
  if (drawer && backdrop) {
    drawer.classList.add("open");
    backdrop.classList.add("open");
    renderCartDrawer();
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const backdrop = document.getElementById("cart-drawer-backdrop");
  if (drawer && backdrop) {
    drawer.classList.remove("open");
    backdrop.classList.remove("open");
  }
}

function initCartAndCheckout() {
  // Drawer close events
  const closeBtn = document.getElementById("cart-drawer-close");
  const backdrop = document.getElementById("cart-drawer-backdrop");
  if (closeBtn) closeBtn.addEventListener("click", closeCartDrawer);
  if (backdrop) backdrop.addEventListener("click", closeCartDrawer);

  // Drawer Coupon Apply
  const applyCouponBtn = document.getElementById("drawer-apply-coupon-btn");
  const couponInput = document.getElementById("drawer-coupon-input");
  if (applyCouponBtn && couponInput) {
    applyCouponBtn.addEventListener("click", () => {
      const res = SportifyStore.applyCoupon(couponInput.value);
      if (res.success) {
        showToast("Coupon Applied!", res.message);
        couponInput.value = "";
      } else {
        showToast("Coupon Error", res.message, true);
      }
    });
  }

  // Full Cart Coupon Apply
  const fullApplyCouponBtn = document.getElementById("full-apply-coupon-btn");
  const fullCouponInput = document.getElementById("full-coupon-input");
  if (fullApplyCouponBtn && fullCouponInput) {
    fullApplyCouponBtn.addEventListener("click", () => {
      const res = SportifyStore.applyCoupon(fullCouponInput.value);
      if (res.success) {
        showToast("Coupon Applied!", res.message);
        fullCouponInput.value = "";
      } else {
        showToast("Coupon Error", res.message, true);
      }
    });
  }

  // Checkout Form Submission
  const checkoutForm = document.getElementById("checkout-form");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleCheckoutSubmit();
    });
  }

  // Payment Tabs Selector
  document.querySelectorAll(".payment-tab-option").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".payment-tab-option").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const radio = tab.querySelector("input[type='radio']");
      if (radio) radio.checked = true;

      const targetBox = tab.getAttribute("data-payment-target");
      document.querySelectorAll(".payment-details-box").forEach(b => b.style.display = "none");
      const activeBox = document.getElementById(targetBox);
      if (activeBox) activeBox.style.display = "block";
    });
  });

  // Order Success Modal close
  const successCloseBtn = document.getElementById("order-success-close-btn");
  if (successCloseBtn) {
    successCloseBtn.addEventListener("click", () => {
      document.getElementById("order-success-modal").classList.remove("active");
      SportifyRouter.navigate("home");
    });
  }
}

function renderCartDrawer() {
  const container = document.getElementById("cart-drawer-items");
  if (!container) return;

  const cart = SportifyStore.getCart();
  const calcs = SportifyStore.getCalculations();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-2z"></path>
          </svg>
        </div>
        <h4 class="empty-state-title">Your cart is empty</h4>
        <p class="empty-state-desc">Explore our pro sports collections and gear up for greatness.</p>
        <button class="btn btn-primary btn-sm" onclick="closeCartDrawer(); SportifyRouter.navigate('shop');">Explore Shop</button>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="cart-item-list">
        ${cart.map(item => `
          <div class="cart-item-card">
            <img class="cart-item-img" src="${item.product.image}" alt="${item.product.name}" />
            <div class="cart-item-info">
              <div>
                <h5 class="cart-item-title">${item.product.name}</h5>
                <div class="cart-item-meta">${item.size ? `Size: ${item.size} • ` : ''}${item.color || ''}</div>
              </div>
              <div class="cart-item-bottom">
                <span class="cart-item-price">₹${(item.price * item.quantity).toLocaleString("en-IN")}</span>
                <div class="qty-stepper" style="transform: scale(0.85); transform-origin: right;">
                  <button class="qty-btn" onclick="SportifyStore.updateQuantity('${item.cartItemId}', ${item.quantity - 1})">-</button>
                  <span style="padding: 0 10px; font-weight: 700; color:#fff;">${item.quantity}</span>
                  <button class="qty-btn" onclick="SportifyStore.updateQuantity('${item.cartItemId}', ${item.quantity + 1})">+</button>
                </div>
                <button class="cart-item-remove" onclick="SportifyStore.removeFromCart('${item.cartItemId}')" aria-label="Remove item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  // Update Drawer Totals
  const subtotalElem = document.getElementById("drawer-calc-subtotal");
  const discountElem = document.getElementById("drawer-calc-discount");
  const shippingElem = document.getElementById("drawer-calc-shipping");
  const totalElem = document.getElementById("drawer-calc-total");

  if (subtotalElem) subtotalElem.textContent = `₹${calcs.subtotal.toLocaleString("en-IN")}`;
  if (discountElem) discountElem.textContent = `-₹${calcs.discount.toLocaleString("en-IN")}`;
  if (shippingElem) shippingElem.textContent = calcs.shipping === 0 ? "FREE" : `₹${calcs.shipping}`;
  if (totalElem) totalElem.textContent = `₹${calcs.total.toLocaleString("en-IN")}`;
}

function renderFullCartPage() {
  const container = document.getElementById("full-cart-items-container");
  if (!container) return;

  const cart = SportifyStore.getCart();
  const calcs = SportifyStore.getCalculations();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-2z"></path>
          </svg>
        </div>
        <h4 class="empty-state-title">Your shopping cart is empty</h4>
        <p class="empty-state-desc">You have no items in your shopping bag. Start exploring championship-level gear today!</p>
        <button class="btn btn-primary" onclick="SportifyRouter.navigate('shop')">Explore Shop Now</button>
      </div>
    `;
  } else {
    container.innerHTML = `
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="border-bottom: 1px solid var(--border-subtle); text-align: left; font-size: 0.82rem; color: var(--text-dim); text-transform: uppercase;">
            <th style="padding: 12px 0;">Product</th>
            <th style="padding: 12px 10px;">Price</th>
            <th style="padding: 12px 10px;">Quantity</th>
            <th style="padding: 12px 10px;">Subtotal</th>
            <th style="padding: 12px 0; text-align: right;">Action</th>
          </tr>
        </thead>
        <tbody>
          ${cart.map(item => `
            <tr style="border-bottom: 1px solid var(--border-subtle);">
              <td style="padding: 18px 0; display: flex; align-items: center; gap: 16px;">
                <img src="${item.product.image}" alt="${item.product.name}" style="width: 64px; height: 64px; border-radius: 8px; object-fit: cover; border: 1px solid var(--border-subtle);" />
                <div>
                  <h5 style="font-weight: 700; color: #fff; font-size: 0.95rem;">${item.product.name}</h5>
                  <div style="font-size: 0.78rem; color: var(--text-dim);">${item.size ? `Size: ${item.size}` : ''} ${item.color ? `• ${item.color}` : ''}</div>
                </div>
              </td>
              <td style="padding: 18px 10px; font-weight: 700; color: var(--accent-green);">₹${item.price.toLocaleString("en-IN")}</td>
              <td style="padding: 18px 10px;">
                <div class="qty-stepper">
                  <button class="qty-btn" onclick="SportifyStore.updateQuantity('${item.cartItemId}', ${item.quantity - 1})">-</button>
                  <span style="padding: 0 10px; font-weight: 700; color:#fff;">${item.quantity}</span>
                  <button class="qty-btn" onclick="SportifyStore.updateQuantity('${item.cartItemId}', ${item.quantity + 1})">+</button>
                </div>
              </td>
              <td style="padding: 18px 10px; font-weight: 800; color: #fff;">₹${(item.price * item.quantity).toLocaleString("en-IN")}</td>
              <td style="padding: 18px 0; text-align: right;">
                <button class="cart-item-remove" onclick="SportifyStore.removeFromCart('${item.cartItemId}')">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
  }

  // Update Page Totals
  const fullSubtotal = document.getElementById("full-calc-subtotal");
  const fullDiscount = document.getElementById("full-calc-discount");
  const fullShipping = document.getElementById("full-calc-shipping");
  const fullTotal = document.getElementById("full-calc-total");

  if (fullSubtotal) fullSubtotal.textContent = `₹${calcs.subtotal.toLocaleString("en-IN")}`;
  if (fullDiscount) fullDiscount.textContent = `-₹${calcs.discount.toLocaleString("en-IN")}`;
  if (fullShipping) fullShipping.textContent = calcs.shipping === 0 ? "FREE" : `₹${calcs.shipping}`;
  if (fullTotal) fullTotal.textContent = `₹${calcs.total.toLocaleString("en-IN")}`;
}

function renderCheckoutSummary() {
  const container = document.getElementById("checkout-summary-items");
  if (!container) return;

  const cart = SportifyStore.getCart();
  const calcs = SportifyStore.getCalculations();

  if (cart.length === 0) {
    container.innerHTML = `<p style="color:var(--text-muted); font-size: 0.9rem;">No items in cart.</p>`;
    return;
  }

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 20px;">
      ${cart.map(item => `
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <img src="${item.product.image}" alt="${item.product.name}" style="width: 44px; height: 44px; border-radius: 6px; object-fit: cover;" />
            <div>
              <div style="font-size: 0.85rem; font-weight: 700; color: #fff;">${item.product.name}</div>
              <div style="font-size: 0.74rem; color: var(--text-dim);">Qty: ${item.quantity} ${item.size ? `• ${item.size}` : ''}</div>
            </div>
          </div>
          <div style="font-size: 0.9rem; font-weight: 800; color: var(--accent-green);">₹${(item.price * item.quantity).toLocaleString("en-IN")}</div>
        </div>
      `).join("")}
    </div>
  `;

  const checkoutSubtotal = document.getElementById("checkout-calc-subtotal");
  const checkoutDiscount = document.getElementById("checkout-calc-discount");
  const checkoutShipping = document.getElementById("checkout-calc-shipping");
  const checkoutTotal = document.getElementById("checkout-calc-total");

  if (checkoutSubtotal) checkoutSubtotal.textContent = `₹${calcs.subtotal.toLocaleString("en-IN")}`;
  if (checkoutDiscount) checkoutDiscount.textContent = `-₹${calcs.discount.toLocaleString("en-IN")}`;
  if (checkoutShipping) checkoutShipping.textContent = calcs.shipping === 0 ? "FREE" : `₹${calcs.shipping}`;
  if (checkoutTotal) checkoutTotal.textContent = `₹${calcs.total.toLocaleString("en-IN")}`;
}

function handleCheckoutSubmit() {
  const cart = SportifyStore.getCart();
  if (cart.length === 0) {
    showToast("Cart Empty", "Please add items to cart before checking out.", true);
    SportifyRouter.navigate("shop");
    return;
  }

  // Field validation
  const name = document.getElementById("co-name").value.trim();
  const email = document.getElementById("co-email").value.trim();
  const phone = document.getElementById("co-phone").value.trim();
  const address = document.getElementById("co-address").value.trim();
  const city = document.getElementById("co-city").value.trim();
  const pincode = document.getElementById("co-pincode").value.trim();

  let hasError = false;
  function validate(id, condition) {
    const el = document.getElementById(id);
    if (!condition) {
      el.classList.add("error");
      hasError = true;
    } else {
      el.classList.remove("error");
    }
  }

  validate("co-name", name.length >= 3);
  validate("co-email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
  validate("co-phone", /^[0-9]{10}$/.test(phone.replace(/\D/g, "")));
  validate("co-address", address.length >= 5);
  validate("co-city", city.length >= 2);
  validate("co-pincode", /^[0-9]{6}$/.test(pincode.replace(/\D/g, "")));

  if (hasError) {
    showToast("Validation Error", "Please fill all required shipping information accurately.", true);
    return;
  }

  // Selected payment
  const activePaymentRadio = document.querySelector("input[name='payment-method']:checked");
  const paymentMethod = activePaymentRadio ? activePaymentRadio.value : "UPI";

  // Place order
  const order = SportifyStore.placeOrder({
    customer: { name, email, phone },
    shipping: { address, city, pincode },
    paymentMethod
  });

  // Show Order Confirmation Modal
  const successModal = document.getElementById("order-success-modal");
  const successOrderId = document.getElementById("success-order-id");
  const successTotal = document.getElementById("success-order-total");

  if (successOrderId) successOrderId.textContent = order.orderId;
  if (successTotal) successTotal.textContent = `₹${order.calculations.total.toLocaleString("en-IN")}`;
  if (successModal) successModal.classList.add("active");

  showToast("Order Placed Successfully!", `Order ID: ${order.orderId}`);
}

// ==========================================================================
// WISHLIST VIEW
// ==========================================================================
function initWishlistView() {
  // Attached to store subscriptions
}

function renderWishlistView() {
  const container = document.getElementById("wishlist-products-grid");
  if (!container) return;

  const items = SportifyStore.getWishlistProducts();
  if (items.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-state-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </div>
        <h4 class="empty-state-title">Your Wishlist is Empty</h4>
        <p class="empty-state-desc">Explore our top gear and tap the heart icon on any product to save it here for later.</p>
        <button class="btn btn-primary" onclick="SportifyRouter.navigate('shop')">Explore Shop</button>
      </div>
    `;
  } else {
    container.innerHTML = items.map(p => renderProductCard(p)).join("");
  }
}

// ==========================================================================
// SEARCH MODAL
// ==========================================================================
function initSearchModal() {
  const modal = document.getElementById("search-modal");
  const openBtn = document.getElementById("nav-search-btn");
  const closeBtn = document.getElementById("search-modal-close");
  const input = document.getElementById("search-modal-input");
  const resultsContainer = document.getElementById("search-modal-results");

  if (openBtn && modal) {
    openBtn.addEventListener("click", () => {
      modal.classList.add("active");
      if (input) {
        input.value = "";
        input.focus();
      }
      if (resultsContainer) resultsContainer.innerHTML = "";
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  }

  // Keyboard shortcut Ctrl+K
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      modal.classList.add("active");
      input?.focus();
    }
    if (e.key === "Escape" && modal?.classList.contains("active")) {
      modal.classList.remove("active");
    }
  });

  if (input && resultsContainer) {
    input.addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (!q) {
        resultsContainer.innerHTML = "";
        return;
      }

      const matches = PRODUCTS_DATA.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
      );

      if (matches.length === 0) {
        resultsContainer.innerHTML = `<div style="padding: 20px; text-align: center; color: var(--text-muted);">No products found for "${q}"</div>`;
      } else {
        resultsContainer.innerHTML = matches.map(p => `
          <div class="search-result-item" data-route="product" data-product-id="${p.id}" onclick="document.getElementById('search-modal').classList.remove('active');">
            <img src="${p.image}" alt="${p.name}" style="width: 48px; height: 48px; border-radius: 8px; object-fit: cover;" />
            <div style="flex:1;">
              <div style="font-weight: 700; color: #fff; font-size: 0.95rem;">${p.name}</div>
              <div style="font-size: 0.78rem; color: var(--text-dim);">${p.categoryName} • ${p.brand}</div>
            </div>
            <div style="font-weight: 800; color: var(--accent-green);">₹${p.price.toLocaleString("en-IN")}</div>
          </div>
        `).join("");
      }
    });
  }
}

// ==========================================================================
// CONTACT & FAQ ACCORDION
// ==========================================================================
function initContactAndFAQ() {
  // FAQ toggles
  document.querySelectorAll(".faq-item").forEach(item => {
    const q = item.querySelector(".faq-question");
    if (q) {
      q.addEventListener("click", () => {
        const isActive = item.classList.contains("active");
        document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("active"));
        if (!isActive) item.classList.add("active");
      });
    }
  });

  // Contact form
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast("Message Sent!", "Thank you for reaching out. A Sportify Athlete Specialist will reply within 2 hours.", true);
      contactForm.reset();
    });
  }
}

// ==========================================================================
// NEWSLETTER
// ==========================================================================
function initNewsletter() {
  const form = document.getElementById("newsletter-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input[type='email']");
      if (input && input.value) {
        showToast("Welcome to Club Sportify!", "Check your inbox for your 15% VIP welcome coupon code.");
        input.value = "";
      }
    });
  }
}

// ==========================================================================
// ROUTE CHANGE DISPATCHER
// ==========================================================================
function handleRouteChange(route, params) {
  if (route === "home") {
    renderRecentlyViewedSection();
  } else if (route === "shop") {
    if (params.category) {
      currentShopFilters.category = params.category;
      const catElem = document.querySelector(`.filter-cat-item[data-cat-id="${params.category}"]`);
      if (catElem) {
        document.querySelectorAll(".filter-cat-item").forEach(i => i.classList.remove("active"));
        catElem.classList.add("active");
      }
    }
    applyShopFilters();
  } else if (route === "product") {
    const id = params.id || PRODUCTS_DATA[0].id;
    renderProductDetailPage(id);
  } else if (route === "cart") {
    renderFullCartPage();
  } else if (route === "checkout") {
    renderCheckoutSummary();
  } else if (route === "wishlist") {
    renderWishlistView();
  }
}
