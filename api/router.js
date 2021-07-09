import express from "express";
import customerRouter from "./customers/router";

const router = express.Router();


router.use('/customers', customerRouter);
router.use('/', customerRouter);

export default router;