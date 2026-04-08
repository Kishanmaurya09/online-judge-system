import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"

const Navbar = () => {

    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    const logout = () => {
        localStorage.removeItem("token")
        navigate("/")
    }

    return (
        <AppBar position="static" elevation={1}>
            <Toolbar>
                <Typography
                    variant="h6"
                    sx={{ flexGrow: 1, fontWeight: "bold" }}
                >
                    CodeJudge
                </Typography>


                <Box sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    px: 4,
    py: 2,
    background: "rgba(30,41,59,0.7)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  }}>
                    <Button color="inherit" component={Link} to="/dashboard">
                        Dashboard
                    </Button>
                    <Button color="inherit" component={Link} to="/problems">
                        Problems
                    </Button>
                    <Button color="inherit" component={Link} to="/my-submissions"> My Submissions </Button>
                    <Button color="inherit" component={Link} to="/contests">
                        Contests
                    </Button>
                    <Button color="inherit" component={Link} to="/leaderboard">
                        Leaderboard
                    </Button>

                    <Button color="inherit" component={Link} to="/admin">
                        Admin
                    </Button>

                    <Button component={Link} to="/profile" color="inherit">
                        PROFILE
                    </Button>

                    {token && (
                        <Button
                            color="error"
                            variant="contained"
                            onClick={logout}
                            sx={{ ml: 2 }}
                        >
                            Logout
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar


