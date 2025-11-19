import EyewearProduct from "../models/eyewearProductModel.js";

// Add Product (Manager only)
export const addProduct = async (req, res) => {
  try {
    const { frameType, imageUrl, userId, ...rest } = req.body;

    const product = await EyewearProduct.create({
      ...rest,
      frametype: frameType,
      imageurl: imageUrl,
      createdBy: userId || req.user?._id, // fallback to req.body.userId
    });

    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Get All / View Products
export const getProducts = async (req, res) => {
  try {
    const products = await EyewearProduct.find().populate("createdBy", "firstname email");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Product (Manager/Employee)
export const updateProduct = async (req, res) => {
  try {
    const product = await EyewearProduct.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product updated", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Product (Manager only)
export const deleteProduct = async (req, res) => {
  try {
    await EyewearProduct.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search by name or brand
export const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    const products = await EyewearProduct.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { brand: { $regex: query, $options: "i" } },
      ],
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Sort by price
export const sortProducts = async (req, res) => {
  try {
    const { order } = req.query; // asc or desc
    const products = await EyewearProduct.find().sort({ price: order === "desc" ? -1 : 1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await EyewearProduct.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

