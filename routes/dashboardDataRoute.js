import express from "express";
import { getDashboardData, getLowStockData } from "../controllers/dashboardData.controller.js";
const router = express.Router();

//........dashboard datas...........//
router.get("/api/dashboard", getDashboardData);
router.get("/api/low-stock-products", getLowStockData);


export default router;
