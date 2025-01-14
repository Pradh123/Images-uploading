import express from 'express';
import dotenv from 'dotenv';
import imageUploadRoutes from './routes/imageUpload.js'; // Import the image upload routes
import cors from 'cors';

dotenv.config(); // Load environment variables if needed

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Use image upload routes
app.use('/images', imageUploadRoutes);
app.get("/login",(req,res)=>{
    res.send("very nice")
})
// Start the server
export default app
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
