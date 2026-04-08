import express from "express";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";
import Contest from "../models/Contest.js";
import User from "../models/User.js";
import Submission from "../models/Submission.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const contests = await Contest.find()
      .populate("problems", "title difficulty")
      .sort({ createdAt: -1 });

    res.json(contests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.id)
      .populate("problems", "title difficulty");

    if (!contest) {
      return res.status(404).json({ message: "Contest not found" });
    }

    res.json(contest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/create", protect, adminOnly, async (req, res) => {
  try {
    const { title, description, startTime, endTime, problems } = req.body;

    const contest = await Contest.create({
      title,
      description,
      startTime,
      endTime,
      problems,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Contest created",
      contest,
    });
  } catch (err) {
    console.error("Create Contest Error:", err);
    res.status(500).json({ message: err.message });
  }
});


router.get("/:id/leaderboard", async (req, res) => {
  try {
    const contestId = req.params.id;

    const submissions = await Submission.find({ contest: contestId })
      .populate("user", "name email")
      .sort({ createdAt: 1 });

    const leaderboard = {};

    submissions.forEach((sub) => {
      const userId = sub.user._id;

      if (!leaderboard[userId]) {
        leaderboard[userId] = {
          name: sub.user.name,
          email: sub.user.email,
          score: 0,
        };
      }

      if (sub.status === "Accepted") {
        leaderboard[userId].score += 10;
      }
    });

    const result = Object.values(leaderboard).sort(
      (a, b) => b.score - a.score
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;