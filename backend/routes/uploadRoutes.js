import express from 'express';
const router = express.Router();

import {
  getMenus,
  postMenu,
  deleteMenus,
  postProductImage,
  postArtShowImages,
} from "../controllers/uploadController.js";
import { protect, admin } from '../middleware/authMiddleware.js';


router.get('/', getMenus);
router.post('/menu', postMenu);
router.delete('/menudelete', deleteMenus);
router.post('/productimage', postProductImage);
router.route('/artshowimage').post(postArtShowImages);

export default router;