import { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home";
import Product from "./Pages/Products";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Shop from "./Pages/Shop";
import Footer from "./Components/Footer/footer";
import { Routes, Route } from "react-router-dom";
import Checkout from "./Pages/Checkout";
import Shipment from "./Pages/Shipment";
import Search from "./Pages/Search";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Profile from "./Pages/Profile";

function App() {
  const queryClient = new QueryClient({
    queries: {
      refetchOnWindowFocus: false,
      retryDelay: 3000,
    },
  });

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop/:category/:productid" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/shop/:category" element={<Shop />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/shipment" element={<Shipment />} />
          <Route path="/search/:query" element={<Search />} />
          <Route path="/search/:query/:productid" element={<Product />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
