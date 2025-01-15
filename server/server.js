import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from '../routes/imageUpload.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Use image upload routes
app.use('/images', router);
app.get("/login",(req,res)=>{
    res.send("very nice")
})

// app.listen(5000,()=>{
//   console.log(`server is running on port ${5000||port}`)
// })
export default app
