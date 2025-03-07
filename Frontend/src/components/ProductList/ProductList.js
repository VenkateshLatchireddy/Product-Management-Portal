import React, { useState, useEffect } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom"; // import navigate hook
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]); // Store state to hold stores data
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStore, setSelectedStore] = useState("");
  const [uniqueStores, setUniqueStores] = useState([]);
  const navigate = useNavigate();  // use navigate hook to redirect

  useEffect(() => {
    fetchProducts();
    fetchStores();  // Fetch stores data
  }, []);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await API.get("/products");
      setProducts(response.data);
      setEditingProduct(null);

      // Extract unique store names for filtering
      const stores = [...new Set(response.data.map((product) => product.store_name))];
      setUniqueStores(stores);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch stores data
  const fetchStores = async () => {
    try {
      const response = await API.get("/stores");  // Adjust the endpoint to your API
      setStores(response.data);
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };

  // Handle Get Invoice
  const handleGetInvoice = async (productId) => {
    console.log("Get Invoice clicked for product ID:", productId);
    const selectedProduct = products.find((product) => product.id === productId);
    console.log("Selected Product:", selectedProduct);
  
    if (!selectedProduct) return;
  
    // Find store by name
    const store = stores.find((store) => store.name === selectedProduct.store_name);
    if (!store) {
      console.error("Store not found for:", selectedProduct.store_name);
      return;
    }
  
    const storeName = store.name; // Store name
    const orderId = 101; // Replace with actual order ID
  
    // Calculate total price and tax
    const itemTotal = selectedProduct.deal_price * selectedProduct.stock;
    const tax = itemTotal * 0.1; // Assuming 10% tax
  
    const invoiceData = {
      store_name: storeName,
      order_id: orderId,
      order_date: new Date().toISOString().split("T")[0], // YYYY-MM-DD
      quantity: selectedProduct.stock,
      regular_price: selectedProduct.regular_price,
      deal_price: selectedProduct.deal_price,
      item_total: itemTotal,
      tax: tax,
      grand_total_without_tax: itemTotal,
      grand_total_with_tax: itemTotal + tax,
    };
  
    console.log("Invoice Data Sent:", invoiceData); // Debug log for invoice data
  
    try {
      const response = await API.post("/invoices", invoiceData);
      if (response.status === 201) {
        navigate(`/invoice/${response.data.invoice_id}`);
      }
    } catch (error) {
      console.error("Error generating invoice:", error);
      alert("Error generating invoice: " + error.message); // Show error to the user
    }
  };
  
  
  // Handle Edit Product
  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setEditedProduct({ ...product });
  };

  // Handle Change in input fields during Edit
  const handleChange = (e) => {
    setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
  };

  // Handle Save Product Edit
  const handleSave = async (id) => {
    const updatedProduct = {
      name: editedProduct.name,
      deal_price: editedProduct.deal_price || 0,
      stock: editedProduct.stock,
    };

    try {
      await API.put(`/products/${id}`, updatedProduct);
      setEditingProduct(null);
      setEditedProduct({});
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error.response?.data || error);
    }
  };

  // Handle Delete Product
  const handleDelete = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Filter products based on search and store selection
  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedStore === "" || product.store_name === selectedStore)
    );
  });

  return (
    <div className="product-container">
      <h2 className="title">Product List</h2>

      {/* Search and Filter Section */}
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={selectedStore}
          onChange={(e) => setSelectedStore(e.target.value)}
          className="store-filter"
        >
          <option value="">All Stores</option>
          {uniqueStores.map((store, index) => (
            <option key={index} value={store}>
              {store}
            </option>
          ))}
        </select>
      </div>

      {/* Scrollable Table */}
      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Store Name</th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.store_name}</td>
                {editingProduct === product.id ? (
                  <>
                    <td>
                      <input type="text" name="name" value={editedProduct.name} onChange={handleChange} />
                    </td>
                    <td>
                      <input type="number" name="deal_price" value={editedProduct.deal_price} onChange={handleChange} />
                    </td>
                    <td>
                      <input type="number" name="stock" value={editedProduct.stock} onChange={handleChange} />
                    </td>
                    <td>
                      <button className="save-btn" onClick={() => handleSave(product.id)}>Save</button>
                      <button className="cancel-btn" onClick={() => setEditingProduct(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{product.name}</td>
                    <td>{product.deal_price}</td>
                    <td>{product.stock}</td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEdit(product)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(product.id)}>Delete</button>
                      <button className="get-invoice-btn" onClick={() => handleGetInvoice(product.id)}>
                        Generate Invoice
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
