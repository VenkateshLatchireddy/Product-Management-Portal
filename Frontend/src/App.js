import React from "react";
import { Routes, Route } from "react-router-dom"; 
import ProductList from "./components/ProductList/ProductList";
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./Pages/LoginPage/LoginPage";
import InvoiceDetails from "./components/InvoiceDetails/InvoiceDetails.js";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ProductList />} />
        {/* Updated Invoice route to use a dynamic path with store name */}
        <Route path="/invoice/:invoiceId" element={<InvoiceDetails />} />
      </Routes>
    </>
  );
};

export default App;
