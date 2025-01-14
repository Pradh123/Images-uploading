import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http'
import router from '../routes/imageUpload.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Use image upload routes
app.use('/user/images', router);
app.get("/user/login",(req,res)=>{
    res.send("very nice")
})
// Start the server
const servermodule= (req, res) => {
  const server = http.createServer(app);
  server.emit('request', req, res);
};
export default servermodule
