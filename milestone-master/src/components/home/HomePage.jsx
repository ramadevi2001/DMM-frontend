import React from "react";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { useNavigate} from "react-router-dom"; // Import useHistory
import styles from "./css/homepage.module.css";
import { Link } from "react-router-dom";
const Homepage = () => {
  const navigate = useNavigate(); // Initialize useHistory

  const handleSignup = () => {
    navigate("/signup"); // Navigate to the signup page
  };

  return (
    
      <AppBar position="static" className={styles.appBar} sx={{ backgroundColor: "white" }}>
        <Toolbar className={styles.toolbar}>
          <Box display="flex" alignItems="center">
            <img src="/path-to-logo.png" alt="Logo" className={styles.logo} />
          </Box>
          <Box>
            <Typography variant="h4" className={styles.title} gutterBottom component={Link} 
                  to="/">
              Milestone Master
            </Typography>
          </Box>
          <Box>
            <Link className={styles.button} to="/signup">Signup</Link>
            <Link className={styles.button} to="/login">Login</Link>
          </Box>
        </Toolbar>
      </AppBar>
  );
};

export default Homepage;
