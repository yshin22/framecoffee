import express from "express";
const router = express.Router();

import {
    createShippoLabel,
    validateAddress,
} from "../controllers/shippoController.js";

router.route('/').post(createShippoLabel);
router.route('/validate').post(validateAddress);

export default router;