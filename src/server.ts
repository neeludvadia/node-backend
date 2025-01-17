// Import the 'express' module
import express from 'express';
import userRoutes from './routes/userRoutes';
import dotenv from 'dotenv'
dotenv .config()
// Create an Express application
const app = express();
console.log(process.env.DBCONNECTION)
app.use(express.json());

// Set the port number for the server
const port = 8000;

// Define a route for the root path ('/')
app.get('/', (req, res) => {
  // Send a response to the client
  res.send('Hello, TypeScript + Node.js + Express!');
});

app.use("/api",userRoutes);

// Start the server and listen on the specified port
app.listen(port, () => {
  // Log a message when the server is successfully running
  console.log(`Server is running on http://localhost:${port}`);
});