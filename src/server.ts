import express from 'express';
import userRoutes from './routes/userRoutes';
import dotenv from 'dotenv'
import path from 'node:path';
import cors from "cors";
import session from "express-session";
import IORedis from 'ioredis';
import {RedisStore} from "connect-redis";

path.dirname("src/assests/")
dotenv .config()
// Create an Express application
const app = express();

//if hosted with proxy (e.g.nginx)
//app.set('trust proxy',1);

const redisClient = new IORedis(process.env.REDIS_URL || "redis://127.0.0.1:6379");
if(redisClient){
  console.log("redis is running on port 6379")
}
app.use(express.json());
app.use(express.static("src/assests/"))
app.use(cors());
app.use(
    session({
        store: new RedisStore({client:redisClient}) ,
        secret: process.env.SESSION_SECRET as string || "mysecretsession",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 3,
        },
    })
)

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