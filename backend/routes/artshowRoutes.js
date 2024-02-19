import express from "express";
const router = express.Router();
import {
    getArtshows,
    getArtshowById,
    getArtshowFeat,
    createArtshow,
    updateArtshow,
    deleteArtshow,
    updateFeatForAll,
} from "../controllers/artshowController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route('/').get(getArtshows).post(protect, admin, createArtshow)
.put(protect, admin, updateFeatForAll);
router.route('/featured').get(getArtshowFeat);
router.route('/:id').get(getArtshowById).put(protect, admin, updateArtshow)
.delete(protect, admin, deleteArtshow);

export default router;