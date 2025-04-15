import { promises } from "dns";
import { Router, Request,Response } from "express";
import multer from "multer";
import path from "path";
import FileUpload from "../controllers/fileUploadController";

const upload = multer({
  dest: path.join(__dirname, 'uploads'), // save files to /uploads
});


const fileRoutes = Router();
const fileUploadController = new FileUpload();

fileRoutes.post('/testing',upload.single('file'),fileUploadController.uploadData)

export default fileRoutes;

