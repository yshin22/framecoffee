import express from "express";
const router = express.Router();

import {
    createShippoLabel,
    validateAddress,
    calcShipping,
} from "../controllers/shippoController.js";

router.route('/').post(createShippoLabel);
router.route('/validate').post(validateAddress);
router.route('/calcship').post(calcShipping);

export default router;