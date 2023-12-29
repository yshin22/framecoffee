import express from 'express';
const router = express.Router();

import {
  getMenus,
  postMenu,
} from "../controllers/uploadController.js";
import { protect, admin } from '../middleware/authMiddleware.js';


router.get('/', getMenus);
router.post('/menu', postMenu);

export default router;