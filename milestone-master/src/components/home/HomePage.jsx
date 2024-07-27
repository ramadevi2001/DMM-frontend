import React from "react";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import ReferneceBooks from "./ReferenceBooks";
import styles from "./css/Homepage.module.css";

const Homepage = () => {
  return (
    <>
      <AppBar position="static" className={styles.appBar}>
        <Toolbar className={styles.toolbar}>
          <Box display="flex" alignItems="center">
            <img src="/path-to-logo.png" alt="Logo" className={styles.logo} />
          </Box>
          <Box>
            <Typography variant="h4" className={styles.title} gutterBottom>
              Milestone Master
            </Typography>
          </Box>
          <Box>
            <Button className={styles.button}>Login</Button>
            <Button className={styles.button}>Signup</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box className={styles.mainContent}>
        <ReferneceBooks />
      </Box>
    </>
  );
};

export default Homepage;
