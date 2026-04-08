import { useState } from "react"
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Box
} from "@mui/material"
import API from "../../api/axios"



function CreateProblem() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    difficulty: "easy",
    constraints: "",
    inputFormate: "",
    outputFormate: "",
    sampleInput: "",
    sampleOutput: "",
    testCases: ""
  })

  const handleGenerateAI = async () => {
    try {
      const res = await API.get("/problems/generate-ai");

      console.log("AI RESPONSE:", res.data);

      const data = res.data;

      setTitle(data.title || "");
      setDescription(data.description || "");
      setInputFormat(data.inputFormat || "");
      setOutputFormat(data.outputFormat || "");
      setConstraints(data.constraints || "");

      const formatted = data.testCases
        ?.map((tc) => `${tc.input} | ${tc.output}`)
        .join("\n");

      setTestCases(formatted || "");

    } catch (err) {
      console.log("ERROR:", err.response?.data);

      alert(
        err.response?.data?.message || "AI generation failed"
      );
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const formattedTestCases = form.testCases
        .split("\n")
        .map(line => {
          const [input, output] = line.split("|")
          return { input: input.trim(), output: output.trim() }
        })

      await API.post("/problems/create", {
        ...form,
        testCases: formattedTestCases
      })
      alert("Problem created successfully")
    } catch (err) {
      console.error(err)
      alert("Error creating problem")
    }
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        ➕ Create Problem
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2 }}>
        <TextField label="Title" name="title" onChange={handleChange} required />
        <TextField label="Description" name="description" multiline rows={3} onChange={handleChange} required />

        <TextField select label="Difficulty" name="difficulty" value={form.difficulty} onChange={handleChange}>
          <MenuItem value="easy">Easy</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="hard">Hard</MenuItem>
        </TextField>

        <TextField label="Constraints" name="constraints" multiline rows={2} onChange={handleChange} />
        <TextField label="Input Format" name="inputFormat" multiline rows={2} onChange={handleChange} />
        <TextField label="Output Format" name="outputFormat" multiline rows={2} onChange={handleChange} />
        <TextField label="Sample Input" name="sampleInput" multiline rows={2} onChange={handleChange} />
        <TextField label="Sample Output" name="sampleOutput" multiline rows={2} onChange={handleChange} />

        <TextField
          label="Test Cases"
          name="testCases"
          multiline
          rows={4}
          onChange={handleChange}
          helperText="Format: input | output (one per line)"
        />

        <Button type="submit" variant="contained">
          Create Problem
        </Button>

        <Button variant="contained" sx={{ mb: 2 }} onClick={handleGenerateAI}>🤖 Generate with AI</Button>
      </Box>
    </Container>
  )
}

export default CreateProblem