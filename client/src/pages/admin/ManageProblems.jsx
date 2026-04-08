import { useEffect, useState } from "react"
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button
} from "@mui/material"
import { Link } from "react-router-dom"
import API from "../../api/axios"

function ManageProblems() {
  const [problems, setProblems] = useState([])

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await API.get("/problems")
        setProblems(res.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchProblems()
  }, [])

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        🗂 Manage Problems
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Difficulty</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {problems.map((p) => (
            <TableRow key={p._id}>
              <TableCell>{p.title}</TableCell>
              <TableCell>{p.difficulty}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  component={Link}
                  to={`/admin/edit-problem/${p._id}`}
                  sx={{ mr: 1 }}
                >
                  ✏ Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  )
}

export default ManageProblems