import express from "express";
import uploadFileToS3 from "../controllers/upload.controller.js";
import multer from "multer";
import { abort, completeUpload, initializeUpload, uploadChunk } from "../controllers/multipartupload.controller.js";
const upload = multer();

const router = express.Router();

router.post("/initialize", upload.none(), initializeUpload);
router.post("/abort", abort);

router.post('/',upload.single('chunk'), uploadChunk);
/* router.post('/', upload.fields([{ name: 'chunk' }, { name: 'totalChunks' }, { name: 'chunkIndex' }]), uploadFileToS3); */
router.post('/complete', completeUpload);

export default router;