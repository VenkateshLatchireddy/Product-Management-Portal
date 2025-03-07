import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./InvoiceDetails.css"; // Import the CSS file

const InvoiceDetails = () => {
  const { invoiceId } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const fetchInvoiceDetails = async (invoiceId) => {
      try {
        const response = await axios.get(`http://localhost:5000/invoices/${invoiceId}`);
        setInvoice(response.data);
      } catch (error) {
        console.error("Error fetching invoice details:", error);
      }
    };

    if (invoiceId) {
      fetchInvoiceDetails(invoiceId);
    }
  }, [invoiceId]);

  if (!invoice) {
    return <div>Loading...</div>;
  }

  return (
    <div className="invoice-container">
      <h2 className="invoice-header">Invoice Details</h2>
      <div className="invoice-details">
        <p><span>Store Name:</span> {invoice.store_name}</p>
        <p><span>Order ID:</span> {invoice.order_id}</p>
        <p><span>Order Date:</span> {invoice.order_date}</p>
        <p><span>Grand Total (Without Tax):</span> {invoice.grand_total_without_tax}</p>
        <p><span>Grand Total (With Tax):</span> {invoice.grand_total_with_tax}</p>
      </div>

      <h3 className="invoice-header">Items</h3>
      <table className="invoice-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Regular Price</th>
            <th>Deal Price</th>
            <th>Item Total</th>
            <th>Tax</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items && invoice.items.length > 0 ? (
            invoice.items.map((item) => (
              <tr key={item.product_id}>
                <td>{item.product_name}</td>
                <td>{item.quantity}</td>
                <td>{item.regular_price}</td>
                <td>{item.deal_price}</td>
                <td>{item.item_total}</td>
                <td>{item.item_tax}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-items">No items available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceDetails;
