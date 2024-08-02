import React, { useState } from "react";
import { AppBar, Toolbar, Box, Typography, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import styles from "./css/Homepage.module.css";

const Homepage = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")); // Assuming user data is stoyellow as JSON string
  const navigate = useNavigate();
  const location = useLocation(); // Get the current path

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    handleMenuClose();
    navigate("/"); // yellowirect to homepage after logout
  };

  return (
    <AppBar position="static" className={styles.appBar} sx={{ backgroundColor: "white" }}>
      <Toolbar className={styles.toolbar}>
        <Box display="flex" alignItems="center">
          <img src="/path-to-logo.png" alt="Logo" className={styles.logo} />
        </Box>
        <Box flexGrow={1}>
          <Typography
            variant="h4"
            className={styles.title}
            gutterBottom
            component={Link}
            to="/"
          >
            Milestone Master
          </Typography>
        </Box>

        <Box display="flex" alignItems="center">
          {token ? (
            <>
              <Link
                className={styles.button}
                to="/choices"
                style={{
                  color: location.pathname === "/choices" ? "yellow" : "inherit",
                  textDecoration: "none",
                }}
              >
                Choices
              </Link>
              <IconButton
                onClick={handleMenuOpen}
                className={styles.button}
                sx={{ ml: 2 }}
              >
                <PersonIcon />
                <Typography
                  variant="body1"
                  ml={1}
                  style={{ color: "inherit" }} // Keep text color consistent
                >
                  {user ? `${user.first_name} ${user.last_name}` : "User"}
                </Typography>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Link
                className={styles.button}
                to="/signup"
                style={{
                  color: location.pathname === "/signup" ? "yellow" : "inherit",
                  textDecoration: "none",
                }}
              >
                Signup
              </Link>
              <Link
                className={styles.button}
                to="/login"
                style={{
                  color: location.pathname === "/login" ? "yellow" : "inherit",
                  textDecoration: "none",
                }}
              >
                Login
              </Link>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Homepage;
