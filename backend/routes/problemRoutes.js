import express from "express";
import Problem from "../models/Problem.js";
import adminOnly from "../middleware/adminMiddleware.js";
import protect from "../middleware/authMiddleware.js";
import Submission from "../models/Submission.js";
import { generateProblem } from "../utils/aiProblem.js";

const router = express.Router();

router.get("/generate-ai", protect, adminOnly, async (req, res) => {
  try {
    const data = await generateProblem();

    console.log("AI RAW RESPONSE:", data);

    let parsed;

    try {
      parsed = JSON.parse(data);
    } catch (err) {
      return res.status(500).json({
        message: "AI returned invalid JSON",
        raw: data,
      });
    }

    res.json(parsed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id/stats", async (req, res) => {
  try {
    const problemId = req.params.id;

    const total = await Submission.countDocuments({ problem: problemId });
    const accepted = await Submission.countDocuments({ problem: problemId, status: "Accepted" });
    const wrong = await Submission.countDocuments({ problem: problemId, status: "Wrong Answer" });

    const successRate = total === 0 ? 0 : ((accepted / total) * 100).toFixed(2);

    res.json({
      totalSubmissions: total,
      accepted,
      wrongAnswers: wrong,
      successRate: successRate + "%"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/create", protect, adminOnly, async(req, res) => {
    try{
        const problem = await Problem.create(req.body);

        res.status(201).json({
            message:"Problem created",
            problem
        });
    } catch (error){
        res.status(500).json({ message: error.message});
    }
});

router.delete("/:id", protect, adminOnly, async (req, res) => {
    try{
        await Problem.findByIdAndDelete(req.params.id);
        res.json({ message: "Problem deleted"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put("/:id", protect, adminOnly, async (req, res) => {
    try{
        const problem = await Problem.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json({ message: "problem updated", problem });
    } catch (error){
        res.status(500).json({ message: error.message });
    }
});

router.get("/", async(req, res) => {
    try{
        const { difficulty } = req.query;

        let filter = {};
        if (difficulty){
            filter.difficulty = difficulty;
        }

        const problems = await Problem.find(filter);
        res.json(problems);
    } catch (error){
        res.status(500).json({ message: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try{
        const problem = await Problem.findById(req.params.id);

        res.json(problem);
    } catch (error){
        res.status(500).json({ message: error.message });
    }
});

router.get("/tag/:tagName", async (req, res) => {
    try{
        const tag = req.params.tagName;
        const problems = await Problem.find({
            tags: tag
        });

        res.json(problems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export default router;