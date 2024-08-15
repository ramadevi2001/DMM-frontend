import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate, useLocation, Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import styles from "./css/Homepage.module.css"; // Assuming you have appropriate CSS in this file
import { resetStatus } from "./slices/loginSlice";
const Homepage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const location = useLocation();

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
    navigate("/"); // Redirect to homepage after logout
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "rgb(21, 100, 104)" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* First Box: Logo */}
        <Box sx={{ flexBasis: "10%" }}>
          <img
            src="/path-to-logo.png"
            alt="Logo"
            className={styles.logo}
            style={{ maxHeight: 50 }}
          />
        </Box>

        <Box sx={{ flexBasis: "15%" }}>
          {localStorage.getItem("token") && (
            <Link
              className={styles.button}
              to="/observations"
              style={{
                backgroundColor:
                  location.pathname === "/observations" ? "white" : "inherit",
                color:
                  location.pathname === "/observations" ? "black" : "inherit",
                borderRadius: "5px",
                textDecoration: "none",
                marginLeft: "10px",
              }}
            >
              Observations
            </Link>
          )}
        </Box>

        {/* Second Box: Title */}
        <Box sx={{ flexBasis: "30%", textAlign: "center" }}>
          <Typography
            variant="h4"
            className={styles.title}
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Milestone Master
          </Typography>
        </Box>

        {/* Third Box: Navigation Links and User Menu */}
        <Box
          sx={{
            flexBasis: "45%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginTop: "1%",
          }}
        >
          {localStorage.getItem("token") ? (
            <>
              <Link
                className={styles.button}
                to="/choices"
                style={{
                  backgroundColor:
                    location.pathname === "/choices" ? "white" : "inherit",
                  color: location.pathname === "/choices" ? "black" : "inherit",

                  textDecoration: "none",
                }}
              >
                Choices
              </Link>
              <Link
                className={styles.button}
                to="/goals"
                style={{
                  backgroundColor:
                    location.pathname === "/goals" ? "white" : "inherit",
                  color: location.pathname === "/goals" ? "black" : "inherit",

                  textDecoration: "none",
                  marginLeft: "10px",
                }}
              >
                Goals
              </Link>
              <Link
                className={styles.button}
                to="/monthly-goals"
                style={{
                  backgroundColor:
                    location.pathname === "/monthly-goals"
                      ? "white"
                      : "inherit",
                  color:
                    location.pathname === "/monthly-goals"
                      ? "black"
                      : "inherit",

                  textDecoration: "none",
                  marginLeft: "10px",
                }}
              >
                Monthly Goals
              </Link>
              <Link
                className={styles.button}
                to="/habits"
                style={{
                  backgroundColor:
                    location.pathname === "/habits" ? "white" : "inherit",
                  color: location.pathname === "/habits" ? "black" : "inherit",

                  textDecoration: "none",
                  marginLeft: "10px",
                }}
              >
                Habits
              </Link>
              <Button onClick={handleMenuOpen} sx={{ ml: 2 }}>
                <PersonIcon />
                <Typography variant="body1" ml={1} style={{ color: "white" }}>
                  {user ? `${user.first_name} ${user.last_name}` : "User"}
                </Typography>
              </Button>
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
                  backgroundColor:
                    location.pathname === "/signup" ? "white" : "inherit",
                  color: location.pathname === "/signup" ? "black" : "inherit",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  textDecoration: "none",
                  marginRight: "10px",
                }}
              >
                Signup
              </Link>
              <Link
                className={styles.button}
                to="/login"
                style={{
                  backgroundColor:
                    location.pathname === "/login" ? "white" : "inherit",
                  color: location.pathname === "/login" ? "black" : "inherit",
                  padding: "10px 15px",
                  borderRadius: "5px",
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
