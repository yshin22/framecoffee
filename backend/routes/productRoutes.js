import express from "express";
const router = express.Router();
import { 
    getProducts, 
    getProductById, 
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getTopProducts,
} from "../controllers/productController.js";
import { protect, admin} from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

// Functions in "controllers" file
router.route('/').get(getProducts).post(protect, admin, createProduct);
router.get('/top', getTopProducts);
router.route('/:id').get(checkObjectId, getProductById).put(protect, admin, checkObjectId, updateProduct)
.delete(protect, admin, checkObjectId, deleteProduct);
router.route('/:id/reviews').post(protect, createProductReview);

export default router;