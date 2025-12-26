import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import useUserStore from "./store/useUserStore";

// Pages
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

// Components
import NavBar from "./components/NavBar";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import CategoryPage from "./pages/CategoryPage";
import { useProductStore } from "./store/useProductStore";
import useCartStore from "./store/useCartStore";
import CartPage from "./pages/CartPage";

const App = () => {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { cart, getCartItems } = useCartStore();
  console.log(cart);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (cart.length > 0) {
      getCartItems();
    }
  }, [getCartItems]);

  if (checkingAuth) return <LoadingSpinner />;
  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]" />
        </div>
      </div>
      <div className="relative z-50 pt-20">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/signup"
            element={!user ? <SignUpPage /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to="/" />}
          />{" "}
          <Route
            path="/secret-dashboard"
            element={
              user?.role === "admin" ? (
                <AdminDashboardPage />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/cart" element={!user ? <HomePage /> : <CartPage />} />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
};

export default App;
