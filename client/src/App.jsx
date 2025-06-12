import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Restaurant from "./pages/Restaurant";
import Cart from "./pages/Cart";
import { Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Success from "./pages/Success";
import Orders from "./pages/Orders";

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/home" element={<Home />} /> 
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/restaurant/:id" element={<ProtectedRoute><Restaurant /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/success" element={<Success />} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />


      </Routes>
    </>
  );
}

export default App;
