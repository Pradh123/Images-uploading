import express from 'express'
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import User from '../src/Models/User.js';
import DbConnection from '../utils/DbConnection.js';
const router = express.Router();
const __dirname = path.resolve();
const uploadDirectory = path.join(__dirname, 'public', 'user');
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true }); 
  } else {
    console.log("hi bro kaise ho");
  }
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory); 
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}${ext}`; 
    cb(null, filename);
  }
});
const upload = multer({ storage});
router.post('/upload', upload.single('image'),async (req, res) => {
    DbConnection();
  try {
    if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded' });
    }
    const {name,age,title}=req.body;
    console.log("req -body ",req.body)
     const schemaData={
        name,age,title,path:`user/${req.file.filename}`,
     }
    const data=await User.create(schemaData);
     if(!data){
        return res.status(300).json({message:"something went wrong"})
     }
    return res.status(200).json({
      message: 'File uploaded successfully',
      data
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default router
