require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// Create Invoice API
// Create Invoice API
// POST /invoices
app.post("/invoices", (req, res) => {
    const {
      store_name,
      order_id,
      order_date,
      quantity,
      regular_price,
      deal_price,
      item_total,
      tax,
      grand_total_without_tax,
      grand_total_with_tax,
    } = req.body;
  
    const invoiceQuery = `INSERT INTO invoices (
      store_name, 
      order_id, 
      order_date, 
      quantity, 
      regular_price, 
      deal_price, 
      item_total, 
      tax, 
      grand_total_without_tax, 
      grand_total_with_tax
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
    const invoiceData = [
      store_name,
      order_id,
      order_date,
      quantity,
      regular_price,
      deal_price,
      item_total,
      tax,
      grand_total_without_tax,
      grand_total_with_tax,
    ];
  
    db.query(invoiceQuery, invoiceData, (err, result) => {
      if (err) {
        console.error("Error inserting invoice:", err); // Log the error to check it
        return res.status(500).json({ error: "Failed to create invoice", details: err });
      }
  
      res.status(201).json({
        message: "Invoice created successfully",
        invoice_id: result.insertId, // Return the inserted invoice ID
      });
    });
  });
  
  
  

// Fetch Invoice Details API
app.get("/invoices/:id", (req, res) => {
    const invoiceId = req.params.id;
    const query = `SELECT * FROM invoices WHERE id = ?`;
  
    db.query(query, [invoiceId], (err, result) => {
      if (err) {
        console.error("Error fetching invoice:", err); // Debugging log
        return res.status(500).json({ error: err.message });
      }
  
      if (result.length === 0) {
        return res.status(404).json({ error: "Invoice not found" });
      }
  
      res.json(result[0]);
    });
  });
  

// Add a new product
app.post("/products", (req, res) => {
  const { store_id, name, regular_price, deal_price, stock } = req.body;

  db.query(
    "INSERT INTO products (store_id, name, regular_price, deal_price, stock) VALUES (?, ?, ?, ?, ?)",
    [store_id, name, regular_price, deal_price, stock],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        message: "Product added successfully",
        product_id: result.insertId,
      });
    }
  );
});

// Get all products or filter by store_id
app.get("/products", (req, res) => {
    const query = `
      SELECT products.id, products.name, products.deal_price, products.stock, 
             products.regular_price, stores.name AS store_name
      FROM products
      JOIN stores ON products.store_id = stores.id
    `;
  
    db.query(query, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });
  

// Update product details
app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, deal_price, stock } = req.body;

  if (!name || stock === undefined || deal_price === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = "UPDATE products SET name = ?, deal_price = ?, stock = ? WHERE id = ?";
  const values = [name, deal_price, stock, id];

  db.query(sql, values, (error, result) => {
    if (error) {
      console.error("❌ Database Error:", error);
      return res.status(500).json({ error: "Failed to update product", details: error.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product updated successfully" });
  });
});


// Fetch all stores
app.get("/stores", (req, res) => {
    const query = "SELECT id, name FROM stores"; // Select only id and name of stores
    db.query(query, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results); // Send store data back
    });
  });
  


// Delete product by ID
app.delete("/products/:id", (req, res) => {
  const productId = req.params.id;

  db.query("DELETE FROM products WHERE id = ?", [productId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Product deleted successfully" });
  });
});

app.get("/test", (req, res) => {
  res.send("Server is working!");
});

// Start the server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
