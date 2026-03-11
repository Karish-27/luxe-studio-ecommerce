import "locomotive-scroll/dist/locomotive-scroll.css";

import { AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
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

// Homepage — preserves all Locomotive Scroll + GSAP animations exactly as original
function HomePage() {
  const containerRef = useRef(null);
  const [Loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
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
          <Home key="home" />
          <Shop key="Shop" />
          <Marquee key="marquee" />
          <Footer key="Footer" />
        </AnimatePresence>
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

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
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
    </AnimatePresence>
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
