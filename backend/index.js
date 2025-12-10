import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { Server as SocketIO } from "socket.io";
import { createServer } from "node:http";
import { body, param, query, validationResult } from "express-validator";

    // Models
import User from "./models/User.js";
import Post from "./models/Post.js";

    // Routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";

    // Controllers
import { register } from "./controllers/auth.js";
import { createPost, deletePostSocket } from "./controllers/posts.js";

    // Middleware
import { verifyToken } from "./middleware/auth.js";
import { globalLimiter } from "./middleware/ratelimit.js";

/* --- CONFIGURATIONS --- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
const server = createServer(app);
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
app.use(globalLimiter);




const io = new SocketIO(server, { cors: { origin: "*" }, });

app.use((req, res, next) => { req.io = io; next(); });

/* --- SOCKET CONNECTIONS & EVENTS --- */
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("deletePost", (postId) => {
        deletePostSocket(postId, io);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});


/* --- FILE STORAGE --- */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });



/* --- ROUTES WITH FILES --- */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);



/* --- ROUTES --- */
app.use("/auth", authRoutes);
app.use("/users", userRoutes); 
app.use("/posts", postRoutes);



/* --- MONGOOSE SETUP --- */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    server.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));