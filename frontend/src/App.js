import NavBar from "./Components/Header/NavBar";
import Home from "./Pages/Home";
import Product from "./Pages/Products";
import Auth from "./Pages/Auth";
import Shop from "./Pages/Shop";
import Footer from "./Components/Footer/footer";
import { Routes, Route } from "react-router-dom";
import Checkout from "./Pages/Checkout";
import Shipment from "./Pages/Shipment";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop/:category/:productid" element={<Product />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/shop/:category" element={<Shop />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/shipment" element={<Shipment />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
