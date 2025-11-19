import express from "express";
import { signup, login, getAllUsers } from "../controllers/userController.js";
import { protect, authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/all", protect, authorizeRoles("Manager"), getAllUsers);

export default router;
