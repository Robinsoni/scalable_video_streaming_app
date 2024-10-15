import express from "express";
import uploadFileToS3 from "../controllers/upload.controller.js";
import multer from "multer";
const uplaod = multer();

const router = express.Router();
router.post('/',uplaod.single('file'), uploadFileToS3);
export default router;