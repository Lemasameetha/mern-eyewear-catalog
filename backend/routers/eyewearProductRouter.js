import express from "express";
import {
  addProduct,
  getProducts,
  getProductById, 
  updateProduct,
  deleteProduct,
  searchProducts,
  sortProducts,
} from "../controllers/eyewearProductController.js";
import { protect, authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// View, Search, Sort → All roles
router.get("/", protect, getProducts);
router.get("/search", protect, searchProducts);
router.get("/sort", protect, sortProducts);
router.get("/:id", protect, getProductById);  

// Update → Manager, Employee
router.put("/:id", protect, authorizeRoles("Manager", "Employee"), updateProduct);

// Add/Delete → Manager only
router.post("/add", protect, authorizeRoles("Manager"), addProduct);
router.delete("/:id", protect, authorizeRoles("Manager"), deleteProduct);

export default router;
