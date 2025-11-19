import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const userRole = localStorage.getItem("role");
        setRole(userRole);

        const res = await axios.get("http://localhost:4000/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // 🧹 Search filter
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔃 Sort by name or price
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    return a.name.localeCompare(b.name);
  });

  // 🗑 Delete product (Manager)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:4000/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p._id !== id));
      alert("Product deleted!");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // 🔄 Toggle Availability (Employee)
  const handleAvailability = async (id, availability) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:4000/products/${id}`,
        { availability: !availability },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts(
        products.map((p) =>
          p._id === id ? { ...p, availability: !availability } : p
        )
      );
    } catch (error) {
      console.error("Error updating availability:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Welcome, {role} 👋</h2>

      <div className="dashboard-card">
        <div className="dashboard-header">
          <h3>Eyewear Product Management</h3>

          {role === "Manager" && (
            <button
              className="add-btn"
              onClick={() => navigate("/add-product")}
            >
              + Add Product
            </button>
          )}
        </div>

        {/* Search & Sort Controls */}
        <div className="filter-section">
          <input
            type="text"
            placeholder="🔍 Search by product name"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="search-input"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
          </select>
        </div>

        {/* 🧾 Table - Scrolls only inside */}
        <div className="table-wrapper">
          <table className="product-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Category</th>
                <th>Gender</th>
                <th>Availability</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.length > 0 ? (
                sortedProducts.map((p) => (
                  <tr key={p._id}>
                    <td>{p.name}</td>
                    <td>{p.brand}</td>
                    <td>₹{p.price}</td>
                    <td>{p.category}</td>
                    <td>{p.gender}</td>
                    <td>{p.availability ? "✅ Yes" : "❌ No"}</td>
                    <td>
                      {role === "Manager" && (
                        <>
                          <button
                            className="edit-btn"
                            onClick={() => navigate(`/edit-product/${p._id}`)}
                          >
                            Edit
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(p._id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                      {role === "Employee" && (
                        <button
                          className="edit-btn"
                          onClick={() =>
                            handleAvailability(p._id, p.availability)
                          }
                        >
                          Toggle Availability
                        </button>
                      )}
                      {role === "User" && <span>View Only</span>}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
