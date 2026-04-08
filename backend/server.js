import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import problemRoutes from "./routes/problemRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";
import contestRoutes from "./routes/contestRoutes.js";
import cors from "cors";

dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);
connectDB();
const app = express();

app.use(cors({
    origin: "https://online-judge-system.vercel.app",
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/contests", contestRoutes);


app.get("/", (req, res) => {
    res.send("Backend Running ");

});

const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
    console.log("Server started on port 5000");
});