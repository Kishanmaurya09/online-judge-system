import protect from "../middleware/authMiddleware.js";
import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Submission from "../models/Submission.js";


const router = express.Router();

router.get("/leaderboard", async (req, res) => {
    try {
        const users = await User.find()
            .select("name score")
            .sort({ score: -1 })
            .limit(10);

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/stats", protect, async (req, res) => {
    try {
        const userId = req.user.id;

        const total = await Submission.countDocuments({ user: userId });
        const accepted = await Submission.countDocuments({ user: userId, status: "Accepted" });
        const wrong = await Submission.countDocuments({ user: userId, status: "Wrong Answer" });
        const runtime = await Submission.countDocuments({ user: userId, status: "Runtime Error" });

        const successRate = total === 0 ? 0 : ((accepted / total) * 100).toFixed(2);

        res.json({
            totalSubmissions: total,
            accepted,
            wrongAnswers: wrong,
            runtimeErrors: runtime,
            successRate: successRate + "%"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/profile", protect, async (req, res) => {
    try {

        const user = await User.findById(req.user.id).select("-password");

        const submissions = await Submission.find({ user: req.user.id });

        const accepted = submissions.filter(s => s.status === "Accepted").length;

        res.json({
            name: user.name,
            email: user.email,
            score: user.score,
            totalSubmissions: submissions.length,
            acceptedSubmissions: accepted
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/leaderboard", async (req, res) => {
    try {
        const users = await User.find()
            .select("name score")
            .sort({ score: -1 })
            .limit(10);

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "login successful",
            token,
            user,
        });

    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ message: error.message });
    }
});

router.get("/me", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select("-password");

        const totalSubmissions = await Submission.countDocuments({ user: req.user.id });
        const accepted = await Submission.countDocuments({
            user: req.user.id,
            status: "Accepted"
        });

        res.json({
            user,
            stats: {
                totalSubmissions,
                accepted
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        const handledPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: handledPassword,
        });
        res.status(201).json({
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        console.error("Signup Error:", error.message);
        res.status(500).json({ message: error.message });
    }
});

export default router;