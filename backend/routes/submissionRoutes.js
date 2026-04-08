import express from "express";
import protect from "../middleware/authMiddleware.js";
import Submission from "../models/Submission.js";
import Problem from "../models/Problem.js";
import { runCode } from "../utils/runCode.js";
import User from "../models/User.js";
import { reviewCode } from "../utils/codeReview.js";
import Contest from "../models/Contest.js";



const router = express.Router();




router.post("/", protect, async (req, res) => {
    try {
        const { problemId, code, language } = req.body;


        const problem = await Problem.findById(problemId);
        if (!problem) {
            return res.status(404).json({ message: "Problem not found" });
        }

        if (!problem.testCases || problem.testCases.length === 0) {
            return res.status(400).json({ message: "No testcases found for this problem" });
        }

        let status = "Accepted";


        for (let tc of problem.testCases) {
            const userOutput = await runCode(code, language, tc.input);

            if (!userOutput || userOutput.includes("Error")) {
                status = "Runtime Error";
                break;
            }

            const cleanUser = String(userOutput).replace(/\s+/g, ' ').trim();
            const cleanExpected = String(tc.output).replace(/\s+/g, ' ').trim();

            if (cleanUser !== cleanExpected) {
                status = "Wrong Answer";
                break;
            }
        }

        const contest = await Contest.findById(req.body.contestId);

        if (contest) {
            const now = new Date();

            if (now > new Date(contest.endTime)) {
                return res.status(403).json({
                    message: "Contest has ended. Submissions are closed.",
                });
            }
        }

        const submission = await Submission.create({
            user: req.user.id,
            problem: problemId,
            code,
            language,
            status,
        });

        if (status === "Accepted") {
            const existing = await Submission.findOne({
                user: req.user.id,
                problem: problemId,
                contest: req.body.contestId,
                status: "Accepted",
            });

            if (!existing) {
                await User.findByIdAndUpdate(
                    req.user.id,
                    { $inc: { score: 10 } }
                );
                console.log("Score Updated +10 (first solve)");
            } else {
                console.log("Already solved, no extra score");
            }
        }

        const feedback = reviewCode(code);

        res.json({
            message: "Judging done",
            status,
            aiFeedback: feedback

        });

    } catch (error) {
        console.error("Submission Error:", error);
        res.status(500).json({ message: error.message });
    }
});



router.get("/my", protect, async (req, res) => {
    try {
        const submissions = await Submission.find({ user: req.user.id })
            .populate("problem", "title difficulty")
            .sort({ createdAt: -1 });

        res.json(submissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/problem/:id", protect, async (req, res) => {
    try {
        const problemId = req.params.id;

        const submissions = await Submission.find({
            user: req.user.id,
            problem: problemId
        })
            .sort({ createdAt: -1 });

        res.json(submissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/run", protect, async (req, res) => {
    try {
        const { code, language, input } = req.body;

        const output = await runCode(code, language, input);

        res.json({
            message: "Code executed",
            output
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/contest/:contestId", protect, async (req, res) => {
    try {
        const { contestId } = req.params;
        const submissions = await Submission.find({
            contest: contestId,
            user: req.user.id,
        });
        res.json(submissions);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/contest/:id", async (req, res) => {
  try {
    const submissions = await Submission.find({
      contest: req.params.id,
      status: "Accepted"
    }).populate("user", "name email");

    const leaderboard = {};

    submissions.forEach(sub => {
      const userId = sub.user._id;

      if (!leaderboard[userId]) {
        leaderboard[userId] = {
          name: sub.user.name,
          email: sub.user.email,
          score: 0
        };
      }

      leaderboard[userId].score += 10;
    });

    
    const result = Object.values(leaderboard).sort(
      (a, b) => b.score - a.score
    );

    res.json(result);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;