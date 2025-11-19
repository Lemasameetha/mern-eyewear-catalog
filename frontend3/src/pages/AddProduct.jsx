import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/AddProduct.css"; // ✅ use this instead of Dashboard.css

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    category: "",
    gender: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:4000/products/add", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("✅ Product added successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("❌ Failed to add product. Please try again!");
    }
  };

  return (
    <div className="add-product-container">
      <h3>Add New Eyewear Product</h3>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category (Eyeglasses / Sunglasses)"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="gender"
          placeholder="Gender (Male / Female / Unisex)"
          value={formData.gender}
          onChange={handleChange}
          required
        />

        <div className="button-group">
          <button type="submit" className="add-btn">
            Add Product
          </button>
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
