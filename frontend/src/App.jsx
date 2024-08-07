import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import HomePage from "./pages/HomePage.jsx";
import Footer from "./components/shared/Footer.jsx";
import Header from "./components/shared/Header.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import SignIn from "./pages/SignIn.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import SignUp from "./pages/SignUp.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import ShippingAddressPage from "./pages/ShippingAddressPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import SubmitOrderPage from "./pages/SubmitOrderPage.jsx";
import OrderPage from "./pages/OrderPage.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="d-flex flex-column side-allPage min-width">
          <ToastContainer position="bottom-center" limit={1} />
          <Header />
          <main>
            <Container className="mt-3">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/products/:token" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/shipping" element={<ShippingAddressPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/placeorder" element={<SubmitOrderPage />} />
                <Route path="/order/:id" element={<OrderPage />} />
              </Routes>
            </Container>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
