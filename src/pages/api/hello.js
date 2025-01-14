// api/hello.js
import express from 'express';
import http from 'http'
import cors from 'cors';
import dotenv from 'dotenv';
import router from '../../../routes/imageUpload';
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
// Sample GET route
app.use('/images', router);
app.get("/login",(req,res)=>{
    res.send("very nice")
})
const servermodule= (req, res) => {
  const server = http.createServer(app);
  server.emit('request', req, res);
};
export default servermodule
