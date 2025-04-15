import { Request, Response } from "express";

interface MulterRequest extends Request {
  file: Express.Multer.File;
}

class FileUpload {
public async uploadData (req:Request,res:Response):Promise<void>{
    const file = (req as MulterRequest).file;
  
    if (!file) {
       res.status(400).send('No file uploaded.'); 
       return
    }
  
    console.log('Uploaded file:', file);
    res.send('File uploaded successfully!');
    return
  }
}

export default FileUpload;