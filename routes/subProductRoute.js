import express from "express";
import { authorizeRoles } from "../middlewares/auth.middleware.js";
import {
  createSubProduct,
  getAllSubProduct,
  getAllSubProductByFranchise,
  getSingleSubProduct,
  removeSubProduct,
  updateSubProduct,
} from "../controllers/subProduct.controller.js";
import { subProductValidator } from "../middlewares/subProduct.middleware.js";
import SubProduct from "../models/subProduct.js";

const router = express.Router();
const path = "/subproduct";

// Existing Subproduct Routes
router.get(`${path}/all`, getAllSubProduct);
router.get(`${path}/all_franchise`, getAllSubProductByFranchise);
router.post(`${path}/create`, authorizeRoles, subProductValidator, createSubProduct);
router.put(`${path}/update/:id`, authorizeRoles, updateSubProduct);
router.get(`${path}/single/:id`, getSingleSubProduct);
router.delete(`${path}/delete/:id`, authorizeRoles, removeSubProduct);

/**
 * @route GET /api/low-stock-products
 * @desc Get list of products where quantity <= minimumQuantity
 */
router.get('/api/low-stock-products', async (req, res) => {
  try {
    const { page = 1, limit = 20, franchise, search } = req.query;

    // Use current logic: compare quantity at top level
    let query = {
      $expr: { $lte: ["$quantity", "$minimumQuantity"] }
    };

    // If searching
    if (search && search.trim() !== '') {
      query.$or = [
        { productCode: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } },
        { productName: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by franchise if provided
    // Note: This filters products that have ANY stock entry for this franchise
    if (franchise && franchise.trim() !== '') {
      query["stock.franchiseId"] = franchise;
    }

    const lowStockProducts = await SubProduct.find(query)
      .populate('stock.franchiseId')
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .sort({ quantity: 1 });

    const totalCount = await SubProduct.countDocuments(query);

    res.status(200).json({
      status: 'success',
      count: totalCount,
      totalProducts: totalCount, // Added for dashboard redundancy
      products: lowStockProducts,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error("Low Stock API Error:", error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch low stock products',
      error: error.message
    });
  }
});

/**
 * @route GET /api/low-stock-count
 * @desc Simple helper to get the count for the dashboard
 */
router.get('/api/low-stock-count', async (req, res) => {
  try {
    const count = await SubProduct.countDocuments({
      $expr: { $lte: ["$quantity", "$minimumQuantity"] }
    });
    res.json({ status: 'success', count });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;
