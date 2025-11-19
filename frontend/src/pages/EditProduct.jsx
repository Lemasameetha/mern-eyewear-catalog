import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/EditProduct.css";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [role] = useState(localStorage.getItem("role"));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    frameType: "",
    gender: "",
    imageUrl: "",
    availability: true,
  });

  // ✅ Fetch product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:4000/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Fetched product data:", res.data);

        // ✅ Handle different response shapes
        const product = res.data.product || res.data;

        setFormData({
          name: product.name || "",
          brand: product.brand || "",
          description: product.description || "",
          price: product.price || "",
          category: product.category || "",
          frameType: product.frameType || "",
          gender: product.gender || "",
          imageUrl: product.imageUrl || "",
          availability: product.availability ?? true,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product details.");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ✅ Handle form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ✅ Submit updated product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:4000/products/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Product updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Update failed");
    }
  };

  // ✅ Loading and Error States
  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "40px" }}>Loading product...</p>;
  }

  if (error) {
    return <p style={{ textAlign: "center", marginTop: "40px", color: "red" }}>{error}</p>;
  }

  return (
    <div className="edit-product-container">
      <h2>Update Eyewear Product</h2>

      <form onSubmit={handleSubmit} className="edit-form">
        <label>Product Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={role === "Employee"}
        />

        <label>Brand</label>
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          disabled={role === "Employee"}
        />

        <label>Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          disabled={role === "Employee"}
        />

        <label>Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          disabled={role === "Employee"}
        />

        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          disabled={role === "Employee"}
        >
          <option value="">Select</option>
          <option value="Eyeglasses">Eyeglasses</option>
          <option value="Sunglasses">Sunglasses</option>
          <option value="Computer Glasses">Computer Glasses</option>
        </select>

        <label>Frame Type</label>
        <select
          name="frameType"
          value={formData.frameType}
          onChange={handleChange}
          disabled={role === "Employee"}
        >
          <option value="">Select</option>
          <option value="Full-Rim">Full-Rim</option>
          <option value="Half-Rim">Half-Rim</option>
          <option value="Rimless">Rimless</option>
        </select>

        <label>Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          disabled={role === "Employee"}
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Unisex">Unisex</option>
        </select>

        <label>Image URL</label>
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          disabled={role === "Employee"}
        />

        <label>
          <input
            type="checkbox"
            name="availability"
            checked={formData.availability}
            onChange={handleChange}
            disabled={role !== "Employee"}
          />{" "}
          Available
        </label>

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
