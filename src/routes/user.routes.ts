import express from "express";
import { test } from "../controllers/test";

const router = express.Router();


router.get("/",test)

export default router;