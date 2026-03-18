import "locomotive-scroll/dist/locomotive-scroll.css";

import { AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { LocomotiveScrollProvider, useLocomotiveScroll } from "react-locomotive-scroll";
import { Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import Loader from "./components/Loader";
import ScrollTriggerProxy from "./components/ScrollTriggerProxy";
import ScrollToTop from "./components/ScrollToTop";
import CartSidebar from "./components/CartSidebar";
import SiteNavbar from "./components/SiteNavbar";

import Footer from "./sections/Footer";
import Home from "./sections/Home";
import Marquee from "./sections/Marquee";
import Shop from "./sections/Shop";

import ShopPage from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import NewArrivalsPage from "./pages/NewArrivalsPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";

import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import GlobalStyles from "./styles/GlobalStyles";
import { dark } from "./styles/Themes";

// True only on the very first load; prevents the 3-second loader from
// showing again when the user navigates back to the home page in the same session.
let homeInitialized = false;

// Hides page content until LocomotiveScroll has fully initialised.
// On the first visit the 3-second loader already provides that gap, so this
// is effectively a no-op then. On every subsequent visit (homeInitialized=true)
// it prevents the blank-white flash that occurred while LocomotiveScroll was
// still booting up after re-mount.
function ScrollReadyGate({ children }) {
  const { isReady } = useLocomotiveScroll();
  return (
    <div style={{ visibility: isReady ? "visible" : "hidden" }}>
      {children}
    </div>
  );
}

// Homepage — preserves all Locomotive Scroll + GSAP animations exactly as original
function HomePage() {
  const containerRef = useRef(null);
  const [Loaded, setLoaded] = useState(homeInitialized);

  useEffect(() => {
    if (homeInitialized) return;
    const timer = setTimeout(() => {
      setLoaded(true);
      homeInitialized = true;
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LocomotiveScrollProvider
      options={{
        smooth: true,
        smartphone: { smooth: true },
        tablet: { smooth: true },
      }}
      watch={[]}
      containerRef={containerRef}
    >
      <AnimatePresence>{Loaded ? null : <Loader />}</AnimatePresence>
      <main className="App" data-scroll-container ref={containerRef}>
        <ScrollTriggerProxy />
        <AnimatePresence>
          {Loaded ? null : <Loader />}
        </AnimatePresence>
        {Loaded && (
          <ScrollReadyGate>
            <Home key="home" />
            <Shop key="Shop" />
            <Marquee key="marquee" />
            <Footer key="Footer" />
          </ScrollReadyGate>
        )}
      </main>
    </LocomotiveScrollProvider>
  );
}

// Layout wrapper for non-homepage pages — no Locomotive Scroll
function SiteLayout({ children }) {
  return (
    <>
      <SiteNavbar />
      {children}
    </>
  );
}

function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      // Locomotive Scroll adds these classes to <html> and doesn't always
      // clean them up on unmount, leaving the page with position:fixed /
      // overflow:hidden which makes every non-home page appear blank.
      const html = document.documentElement;
      html.classList.remove(
        "has-scroll-smooth",
        "has-scroll",
        "has-scroll-init",
        "is-ready",
        "is-scrolling",
        "is-dragging"
      );
      html.style.removeProperty("overflow");
      html.style.removeProperty("position");
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("position");
    }
  }, [location.pathname]);

  return (
    <Routes>
      {/* Homepage — Locomotive Scroll + GSAP animations intact */}
      <Route path="/" element={<HomePage />} />

      {/* Shop listing */}
      <Route
        path="/shop"
        element={
          <SiteLayout>
            <ShopPage />
          </SiteLayout>
        }
      />
      <Route
        path="/shop/:category"
        element={
          <SiteLayout>
            <ShopPage />
          </SiteLayout>
        }
      />

      {/* New Arrivals */}
      <Route
        path="/new-arrivals"
        element={
          <SiteLayout>
            <NewArrivalsPage />
          </SiteLayout>
        }
      />

      {/* Product detail */}
      <Route
        path="/product/:id"
        element={
          <SiteLayout>
            <ProductDetailPage />
          </SiteLayout>
        }
      />

      {/* Cart */}
      <Route
        path="/cart"
        element={
          <SiteLayout>
            <CartPage />
          </SiteLayout>
        }
      />

      {/* Checkout */}
      <Route
        path="/checkout"
        element={
          <SiteLayout>
            <CheckoutPage />
          </SiteLayout>
        }
      />

      {/* Order confirmation */}
      <Route
        path="/order-confirmation"
        element={
          <SiteLayout>
            <OrderConfirmationPage />
          </SiteLayout>
        }
      />

      {/* Order history */}
      <Route
        path="/orders"
        element={
          <SiteLayout>
            <OrderHistoryPage />
          </SiteLayout>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={dark}>
        <CartProvider>
          <OrderProvider>
            <ScrollToTop />
            <CartSidebar />
            <AppRoutes />
          </OrderProvider>
        </CartProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
