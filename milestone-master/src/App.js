import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Homepage from "./components/home/HomePage";
import Signup from "./components/home/Signup"; // Create this component
import Login from "./components/home/Login"; // Create this component
import { Box } from "@mui/material";
import ReferenceBooks from "./components/home/ReferenceBooks";
import styles from "./components/home/css/Homepage.module.css";
import Choices from "./components/choices/Choices";
import Goals from "./components/goals/Goals";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Homepage />
      <Box className={styles.mainContent}>
        <Routes>
          <Route path="/" element={<ReferenceBooks />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {token && token!==null ? (
            <>
            <Route path="/choices" element={<Choices />} />
            <Route path="/goals" element={<Goals />} />

            </>
          ) : (
            <Route path="*" element={<Navigate to="/" replace />} />
          )}
          
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
