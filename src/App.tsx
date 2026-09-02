import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { ScrollToTop } from "./components/ScrollToTop";
import { Footer } from "./components/layout/Footer";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { ProductDetail } from "./pages/ProductDetail";
import { TeamIndex } from "./pages/TeamIndex";
import { TeamDetail } from "./pages/TeamDetail";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Confirmation } from "./pages/Confirmation";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";

function Layout() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col ">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="shop/:category" element={<Shop />} />
          <Route path="product/:slug" element={<ProductDetail />} />
          <Route path="teams" element={<TeamIndex />} />
          <Route path="teams/:teamId" element={<TeamDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order/:id/confirmation" element={<Confirmation />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
