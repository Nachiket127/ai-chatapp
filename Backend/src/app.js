import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import chatRouter from "./routes/chat.routes.js";
import morgan from "morgan";
import cors from "cors";
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'


const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173'
const allowedOrigins = new Set(
    FRONTEND_ORIGIN.split(',').map(o => o.trim()).filter(Boolean)
)

const publicDir = path.join(process.cwd(), 'public')
if (fs.existsSync(publicDir)) {
    app.use(express.static(publicDir))
}

app.use(cors({
    origin: function(origin, callback) {
        if (!origin) return callback(null, true)
        if (allowedOrigins.has(origin)) return callback(null, true)
        return callback(null, true)
    },
    credentials: true,
    methods: [ "GET", "POST", "PUT", "DELETE" ],
}))

// Health check
app.get("/", (req, res) => {
    res.json({ message: "Server is running" });
});

app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter);

// Serve frontend production build when available
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
// const clientDist = path.join(__dirname, '../../Frontend/dist')

// if (fs.existsSync(clientDist)) {
//     app.use(express.static(clientDist))

//     app.get('*', (req, res) => {
//         res.sendFile(path.join(clientDist, 'index.html'))
//     })
// }

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.get('*name', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
});

export default app;