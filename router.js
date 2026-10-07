// SPORTIFY Hash-based Client-Side Router
// Handles seamless navigation across Home, Shop, Product Detail, Cart, Checkout, About, Contact, Wishlist

const SportifyRouter = (function () {
  const routes = {
    "home": "view-home",
    "shop": "view-shop",
    "product": "view-product-detail",
    "cart": "view-cart",
    "checkout": "view-checkout",
    "about": "view-about",
    "contact": "view-contact",
    "wishlist": "view-wishlist"
  };

  let currentRoute = "home";
  let currentParams = {};

  function parseHash() {
    const rawHash = window.location.hash.replace(/^#\/?/, "") || "home";
    const [path, queryString] = rawHash.split("?");
    const params = {};

    if (queryString) {
      queryString.split("&").forEach(pair => {
        const [k, v] = pair.split("=");
        if (k) params[decodeURIComponent(k)] = decodeURIComponent(v || "");
      });
    }

    return { path: path.toLowerCase() || "home", params };
  }

  function navigate(path, params = {}) {
    const queryParts = Object.keys(params).map(
      k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`
    );
    const hash = path + (queryParts.length ? `?${queryParts.join("&")}` : "");
    window.location.hash = hash;
  }

  function handleRoute() {
    const { path, params } = parseHash();
    currentRoute = routes[path] ? path : "home";
    currentParams = params;

    // Hide all views
    document.querySelectorAll(".view-section").forEach(view => {
      view.classList.remove("active");
    });

    // Show active view
    const activeViewId = routes[currentRoute] || "view-home";
    const activeView = document.getElementById(activeViewId);
    if (activeView) {
      activeView.classList.add("active");
    }

    // Update active nav link
    document.querySelectorAll(".nav-link").forEach(link => {
      const targetRoute = link.getAttribute("data-route");
      if (targetRoute === currentRoute) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Dispatch custom route changed event
    window.dispatchEvent(
      new CustomEvent("route_changed", {
        detail: { route: currentRoute, params: currentParams }
      })
    );

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function init() {
    window.addEventListener("hashchange", handleRoute);
    window.addEventListener("DOMContentLoaded", handleRoute);

    // Intercept internal routing clicks
    document.addEventListener("click", e => {
      const link = e.target.closest("[data-route]");
      if (link) {
        const route = link.getAttribute("data-route");
        const category = link.getAttribute("data-category");
        const productId = link.getAttribute("data-product-id");

        if (route) {
          e.preventDefault();
          const params = {};
          if (category) params.category = category;
          if (productId) params.id = productId;
          navigate(route, params);
        }
      }
    });

    // Handle initial state immediately if DOM already loaded
    if (document.readyState === "complete" || document.readyState === "interactive") {
      handleRoute();
    }
  }

  return {
    init,
    navigate,
    getCurrentRoute: () => currentRoute,
    getCurrentParams: () => ({ ...currentParams })
  };
})();
