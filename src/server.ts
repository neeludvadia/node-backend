import express from 'express';
import userRoutes from './routes/userRoutes';
import dotenv from 'dotenv'
import path from 'node:path';
import cors from "cors";
import Session from './middleware/session' 

path.dirname("src/assests/")
dotenv .config()
// Create an Express application
const app = express();

//if hosted with proxy (e.g.nginx)
//app.set('trust proxy',1);

app.use(express.json());
app.use(express.static("src/assests/"))
app.use(cors());
app.use(Session)

// Set the port number for the server
const port = 8000;

app.use("/api",userRoutes);

// Start the server and listen on the specified port
app.listen(port, () => {
  // Log a message when the server is successfully running
  console.log(`Server is running on http://localhost:${port}`);
});