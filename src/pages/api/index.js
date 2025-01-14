 // Import the Express app
import { createServer } from 'http';
import app from '../../../server'
app
const app1= (req, res) => {
  const server = createServer(app);
  server.emit('request', req, res);
};
export default app1
