import express from 'express'
import multer from 'multer';
import path from 'path';
import fs from 'fs';
const router = express.Router();
const __dirname = path.resolve();
const uploadDirectory = path.join(__dirname, 'uploads', 'user');
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
router.post('/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded' });
    }
    res.status(200).send({
      message: 'File uploaded successfully',
      filePath: `/uploads/${req.file.filename}`,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default router
