import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPanel from "./components/AdminPanel";
import Home from "./components/Home";
import Category from "./components/Category";
import Products from "./components/Products";
import SingleProduct from "./components/SingleProduct";
import AddProducts from "./components/AddProducts";
import "semantic-ui-css/semantic.min.css";
import Adminlogin from "./components/Adminlogin";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Adminlogin />} />
        <Route path="/" element={<AdminPanel />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/addProducts/:id" element={<AddProducts />} />
        <Route path="/category" element={<Category />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
