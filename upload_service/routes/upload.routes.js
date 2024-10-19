import express from "express";
import uploadFileToS3 from "../controllers/upload.controller.js";
import multer from "multer";/* 
import { initializeUpload } from "../controllers/multipartupload.controller.js"; */
const upload = multer();

const router = express.Router();

/* router.post("initialize", upload.none(), initializeUpload);

router.post('/',uplaod.single('file'), uploadFileToS3); */
router.post('/', upload.fields([{ name: 'chunk' }, { name: 'totalChunks' }, { name: 'chunkIndex' }]), uploadFileToS3);

export default router;