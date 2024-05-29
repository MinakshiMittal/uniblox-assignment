import { Route, Routes } from "react-router-dom";
import { Products } from "./pages/products/Products";
import { Cart } from "./pages/cart/Cart";

function App() {
  return (
    <div className="px-8 py-4">
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
