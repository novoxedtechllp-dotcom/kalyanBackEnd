import express from "express";
import { getDashboardData } from "../controllers/dashboardData.controller.js";
const router = express.Router();

//........dashboard datas...........//
router.get("/api/dashboard", getDashboardData);

// Removed duplicate /api/low-stock-products from here to use the one in subProductRoute.js

export default router;
