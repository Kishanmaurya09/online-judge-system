import { Container, Typography, Button, Box } from "@mui/material"
import { Link } from "react-router-dom"

function AdminPanel() {
    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Admin Panel
            </Typography>

            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button variant="contained"
                    sx={{
                        background: "linear-gradient(135deg, #6366f1, #22c55e)",
                        borderRadius: "10px",
                        px: 3,
                        py: 1,
                        fontWeight: "bold",
                        "&:hover": {
                            opacity: 0.9,
                        },
                    }} component={Link} to="/admin/create-problem">
                    Create Problem
                </Button>

                <Button variant="contained"
                    sx={{
                        background: "linear-gradient(135deg, #6366f1, #22c55e)",
                        borderRadius: "10px",
                        px: 3,
                        py: 1,
                        fontWeight: "bold",
                        "&:hover": {
                            opacity: 0.9,
                        },
                    }} component={Link} to="/admin/problems">
                    🗂 Manage Problems
                </Button>

                <Button variant="contained"
                    sx={{
                        background: "linear-gradient(135deg, #6366f1, #22c55e)",
                        borderRadius: "10px",
                        px: 3,
                        py: 1,
                        fontWeight: "bold",
                        "&:hover": {
                            opacity: 0.9,
                        },
                    }} component={Link} to="/admin/create-contest">
                    Create Contest
                </Button>

            </Box>
        </Container>
    )
}

export default AdminPanel