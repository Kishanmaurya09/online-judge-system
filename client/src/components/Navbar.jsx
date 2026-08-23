// import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material"
// import { Link, useNavigate } from "react-router-dom"

// const Navbar = () => {

//     const navigate = useNavigate()
//     const token = localStorage.getItem("token")

//     const logout = () => {
//         localStorage.removeItem("token")
//         navigate("/")
//     }

//     return (
//         <AppBar position="static" elevation={1}>
//             <Toolbar>
//                 <Typography
//                     variant="h6"
//                     sx={{ flexGrow: 1, fontWeight: "bold" }}
//                 >
//                     CodeJudge
//                 </Typography>


//                 <Box sx={{
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     px: 4,
//     py: 2,
//     background: "rgba(30,41,59,0.7)",
//     backdropFilter: "blur(10px)",
//     borderBottom: "1px solid rgba(255,255,255,0.1)",
//   }}>
//                     <Button color="inherit" component={Link} to="/dashboard">
//                         Dashboard
//                     </Button>
//                     <Button color="inherit" component={Link} to="/problems">
//                         Problems
//                     </Button>
//                     <Button color="inherit" component={Link} to="/my-submissions"> My Submissions </Button>
//                     <Button color="inherit" component={Link} to="/contests">
//                         Contests
//                     </Button>
//                     <Button color="inherit" component={Link} to="/leaderboard">
//                         Leaderboard
//                     </Button>

//                     <Button color="inherit" component={Link} to="/admin">
//                         Admin
//                     </Button>

//                     <Button component={Link} to="/profile" color="inherit">
//                         PROFILE
//                     </Button>

//                     {token && (
//                         <Button
//                             color="error"
//                             variant="contained"
//                             onClick={logout}
//                             sx={{ ml: 2 }}
//                         >
//                             Logout
//                         </Button>
//                     )}
//                 </Box>
//             </Toolbar>
//         </AppBar>
//     )
// }

// export default Navbar



import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Problems", path: "/problems" },
    { name: "Submissions", path: "/submissions" },
    { name: "Contests", path: "/contests" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Admin", path: "/admin" },
  ];

  return (
    <>
      {/* CSS Injected Inside Same File */}
      <style>{`
        .navbar {
          background-color: #161b22;
          border-bottom: 1px solid #30363d;
          position: sticky;
          top: 0;
          z-index: 1000;
          width: 100%;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .logo-badge {
          background: rgba(88, 166, 255, 0.15);
          color: #58a6ff;
          border: 1px solid rgba(88, 166, 255, 0.3);
          padding: 4px 8px;
          border-radius: 8px;
          font-size: 14px;
        }

        .logo-text {
          color: #ffffff;
          font-weight: 700;
          font-size: 18px;
          letter-spacing: -0.3px;
        }

        .nav-menu {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex: 1;
          margin-left: 40px;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .nav-item {
          color: #8b949e;
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
          padding: 8px 12px;
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .nav-item:hover {
          color: #f0f6fc;
          background-color: rgba(177, 186, 196, 0.12);
        }

        .active-link {
          color: #ffffff !important;
          background-color: #21262d;
          font-weight: 600;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .profile-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #c9d1d9;
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
          padding: 4px 10px 4px 6px;
          border-radius: 20px;
          background-color: #21262d;
          border: 1px solid #30363d;
          transition: 0.2s;
        }

        .profile-btn:hover, .active-profile {
          border-color: #58a6ff;
        }

        .avatar-mini {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: #388bfd;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
        }

        .logout-btn {
          background-color: rgba(248, 113, 113, 0.1);
          color: #f87171;
          border: 1px solid rgba(248, 113, 113, 0.25);
          padding: 6px 14px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .logout-btn:hover {
          background-color: #f87171;
          color: #ffffff;
        }

        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 24px;
          height: 18px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .bar {
          width: 100%;
          height: 2px;
          background-color: #c9d1d9;
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        /* Half-screen & Mobile Responsive Rules */
        @media (max-width: 960px) {
          .hamburger {
            display: flex;
          }

          .nav-menu {
            position: absolute;
            top: 64px;
            left: 0;
            right: 0;
            background-color: #161b22;
            border-bottom: 1px solid #30363d;
            flex-direction: column;
            align-items: stretch;
            margin-left: 0;
            padding: 20px;
            gap: 16px;
            display: none;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
          }

          .nav-menu.active {
            display: flex;
          }

          .nav-links {
            flex-direction: column;
            align-items: stretch;
            gap: 6px;
          }

          .nav-item {
            padding: 10px 14px;
            font-size: 14px;
          }

          .nav-actions {
            flex-direction: column;
            align-items: stretch;
            border-top: 1px solid #21262d;
            padding-top: 16px;
          }

          .profile-btn {
            justify-content: center;
            padding: 8px;
          }

          .logout-btn {
            padding: 10px;
            text-align: center;
          }
        }
      `}</style>

      <nav className="navbar">
        <div className="nav-container">
          {/* Brand Logo */}
          <Link to="/dashboard" className="nav-logo">
            <span className="logo-badge">⚡</span>
            <span className="logo-text">CodeJudge</span>
          </Link>

          {/* Hamburger Menu Toggle (Shows on Half-Screen) */}
          <button 
            className="hamburger"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>

          {/* Navigation Links */}
          <div className={`nav-menu ${isOpen ? "active" : ""}`}>
            <div className="nav-links">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`nav-item ${isActive ? "active-link" : ""}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Right Side Options */}
            <div className="nav-actions">
              <Link 
                to="/profile" 
                className={`profile-btn ${location.pathname === "/profile" ? "active-profile" : ""}`}
                onClick={() => setIsOpen(false)}
              >
                <div className="avatar-mini">K</div>
                <span>Profile</span>
              </Link>

              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
